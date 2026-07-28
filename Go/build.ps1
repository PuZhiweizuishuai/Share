# Share Go Backend Cross-Platform Build Script
# Usage: .\build.ps1 in Go directory
# Feature: Build frontend first, then cross-compile for Windows/Linux
#
# Optional Parameters:
#   -SkipFrontend     Skip frontend build
#   -FrontendOnly     Build frontend only
#   -GoOnly           Build Go only (skip frontend)
#   -Target           Target platform (all/windows/linux), default all
#
# Optional Environment Variables:
#   $env:FRONTEND_DIST  - Frontend dist path (default ../web_v2/share_v3/dist)
#   $env:IP2REGION_XDB  - ip2region.xdb path (default ../Share/ip2region.xdb)

param(
    [switch]$SkipFrontend,
    [switch]$FrontendOnly,
    [switch]$GoOnly,
    [ValidateSet("all", "windows", "linux")]
    [string]$Target = "all",
    [string]$FrontendDist = "",
    [string]$Ip2regionXdb = "",
    [string]$OutputDir = ""
)

$ErrorActionPreference = "Stop"

# Version info, keep in sync with Spring pom.xml <version>3.1.7</version>
# Injected into Go binary via -ldflags -X main.AppVersion
$AppVersion = "3.1.7"

# Script directory (Go project root)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# Resolve default paths
if ($FrontendDist -eq "") {
    $FrontendDist = Join-Path $ScriptDir "..\web_v2\share_v3\dist"
}
if ($Ip2regionXdb -eq "") {
    $Ip2regionXdb = Join-Path $ScriptDir "..\Share\ip2region.xdb"
}
if ($OutputDir -eq "") {
    $OutputDir = Join-Path $ScriptDir "release"
}

$FrontendDir = Join-Path $ScriptDir "..\web_v2\share_v3"
$AssetsDir = Join-Path $ScriptDir "internal\assets"
$WebTarget = Join-Path $AssetsDir "web"
$XdbTarget = Join-Path $AssetsDir "ip2region.xdb"

# Target platforms: GOOS, GOARCH, output suffix
# Note: windows/386 removed due to modernc.org/sqlite 32-bit incompatibility
$Platforms = @(
    @{ GOOS = "windows"; GOARCH = "amd64"; Suffix = "windows-amd64" },
    @{ GOOS = "linux";   GOARCH = "amd64"; Suffix = "linux-amd64" },
    @{ GOOS = "linux";   GOARCH = "arm64"; Suffix = "linux-arm64" }
)

function Write-Step {
    param([string]$Message)
    Write-Host "  $Message" -ForegroundColor DarkGray
}

function Write-Success {
    param([string]$Message)
    Write-Host "  $Message" -ForegroundColor Green
}

function Write-Err {
    param([string]$Message)
    Write-Host "  $Message" -ForegroundColor Red
}

# ========== Start ==========
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Share Cross-Platform Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Step "Frontend Dir  : $FrontendDir"
Write-Step "Frontend Dist : $FrontendDist"
Write-Step "ip2region.xdb : $Ip2regionXdb"
Write-Step "Output Dir    : $OutputDir"
Write-Step "Assets Dir    : $AssetsDir"
Write-Host ""

# ========== Step 1: Build Frontend ==========
if (-not $GoOnly) {
    Write-Host "[Step 1] Building frontend ..." -ForegroundColor Yellow

    # Check Node.js
    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCmd) {
        Write-Err "ERROR: Node.js not found, please install Node.js first"
        exit 1
    }
    $nodeExe = $nodeCmd.Source
    $nodeVersion = & $nodeExe --version 2>&1
    Write-Step "Node.js ver   : $nodeVersion"
    Write-Step "node exe      : $nodeExe"

    $npmCmd = Get-Command npm.cmd -ErrorAction SilentlyContinue
    if (-not $npmCmd) {
        $npmCmd = Get-Command npm -ErrorAction SilentlyContinue
    }
    if (-not $npmCmd) {
        Write-Err "ERROR: npm not found, please install Node.js first"
        exit 1
    }
    $npmExe = $npmCmd.Source
    Write-Step "npm exe       : $npmExe"

    Set-Location $FrontendDir

    if (-not (Test-Path "node_modules")) {
        Write-Step "[1/2] npm install ..."
        & $npmExe install
        if ($LASTEXITCODE -ne 0) {
            Write-Err "ERROR: npm install failed"
            Set-Location $ScriptDir
            exit 1
        }
        Write-Success "npm install done"
    } else {
        Write-Step "Skip npm install (node_modules exists)"
    }

    Write-Step "[2/2] npm run build ..."
    & $npmExe run build
    if ($LASTEXITCODE -ne 0) {
        Write-Err "ERROR: npm run build failed"
        Set-Location $ScriptDir
        exit 1
    }
    Write-Success "Frontend build done"

    Set-Location $ScriptDir

    # Verify frontend output
    if (-not (Test-Path $FrontendDist)) {
        Write-Err "ERROR: Frontend dist not found: $FrontendDist"
        exit 1
    }
    if (-not (Test-Path (Join-Path $FrontendDist "index.html"))) {
        Write-Err "ERROR: index.html not found in: $FrontendDist"
        exit 1
    }
    Write-Success "Frontend output verified"
} else {
    Write-Host "[Step 1] Skip frontend build (-GoOnly)" -ForegroundColor DarkGray
    if (-not (Test-Path $FrontendDist) -or -not (Test-Path (Join-Path $FrontendDist "index.html"))) {
        Write-Err "ERROR: Frontend dist missing or index.html not found, build frontend first"
        exit 1
    }
}

# Frontend only - done
if ($FrontendOnly) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Frontend build done (-FrontendOnly)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    exit 0
}

# ========== Step 2: Verify ip2region.xdb ==========
Write-Host ""
Write-Host "[Step 2] Verifying ip2region.xdb ..." -ForegroundColor Yellow
if (-not (Test-Path $Ip2regionXdb)) {
    Write-Err "ERROR: ip2region.xdb not found: $Ip2regionXdb"
    exit 1
}
Write-Success "ip2region.xdb verified"

# ========== Step 3: Prepare embedded assets ==========
Write-Host ""
Write-Host "[Step 3] Preparing embedded assets ..." -ForegroundColor Yellow

if (Test-Path $WebTarget) {
    Remove-Item -Recurse -Force $WebTarget
}
New-Item -ItemType Directory -Force -Path $WebTarget | Out-Null

Write-Step "Copying frontend dist to internal/assets/web ..."
Copy-Item -Path (Join-Path $FrontendDist "*") -Destination $WebTarget -Recurse -Force

Write-Step "Copying ip2region.xdb to internal/assets/ ..."
Copy-Item -Path $Ip2regionXdb -Destination $XdbTarget -Force
Write-Success "Embedded assets ready"

# ========== Step 4: Go mod tidy ==========
Write-Host ""
Write-Host "[Step 4] go mod tidy ..." -ForegroundColor Yellow
& go mod tidy
if ($LASTEXITCODE -ne 0) {
    Write-Err "ERROR: go mod tidy failed"
    exit 1
}
Write-Success "go mod tidy done"

# ========== Step 5: Cross-platform build ==========
Write-Host ""
Write-Host "[Step 5] Cross-platform build (CGO_ENABLED=0) ..." -ForegroundColor Yellow

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

$env:CGO_ENABLED = "0"
$buildFailed = $false
$buildResults = @()

foreach ($platform in $Platforms) {
    $goos = $platform.GOOS
    $goarch = $platform.GOARCH
    $suffix = $platform.Suffix

    # Filter by Target
    if ($Target -eq "windows" -and $goos -ne "windows") {
        continue
    }
    if ($Target -eq "linux" -and $goos -ne "linux") {
        continue
    }

    $outputName = "share-go-$suffix"
    if ($goos -eq "windows") {
        $outputName += ".exe"
    }
    $outputPath = Join-Path $OutputDir $outputName

    Write-Step "Building $goos/$goarch -> $outputName ..."

    $env:GOOS = $goos
    $env:GOARCH = $goarch

    & go build -ldflags "-s -w -X main.AppVersion=$AppVersion" -o $outputPath . 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Err "  FAILED: $goos/$goarch"
        $buildFailed = $true
        continue
    }

    $size = (Get-Item $outputPath).Length
    $sizeMB = [math]::Round($size / 1MB, 2)
    Write-Success "  OK: $outputName ($sizeMB MB)"
    $buildResults += @{ Name = $outputName; Size = $sizeMB }
}

# Clean up env vars
Remove-Item Env:\GOOS -ErrorAction SilentlyContinue
Remove-Item Env:\GOARCH -ErrorAction SilentlyContinue

# ========== Done ==========
Write-Host ""
if ($buildFailed) {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Some builds FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    exit 1
} else {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  All builds SUCCEEDED!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Output: $OutputDir" -ForegroundColor Cyan
    Write-Host ""
    foreach ($result in $buildResults) {
        Write-Host "  $($result.Name)  ($($result.Size) MB)" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Run:" -ForegroundColor Yellow
    Write-Host "  Windows: .\share-go-windows-amd64.exe" -ForegroundColor White
    Write-Host "  Linux:   ./share-go-linux-amd64" -ForegroundColor White
}
