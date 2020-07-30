package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.VditorFiles;
import com.buguagaoshu.share.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 18:12
 */
@RestController
public class FileController {

    private final FileRepository fileRepository;

    @Autowired
    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @GetMapping("/api/upload/disk")
    public ResponseDetails diskMessage() {
        return ResponseDetails.ok().put("data", fileRepository.diskMessage());
    }

    @PostMapping("/api/upload")
    public VditorFiles save(@RequestParam(value = "file[]") MultipartFile[] files) {
        return fileRepository.save(files);
    }

    @GetMapping("/api/file/list")
    public ResponseDetails loadAll(@RequestParam(value = "page", required = false) Integer page,
                                   @RequestParam(value = "size", required = false) Integer size) throws IOException {
        return ResponseDetails.ok().put("page", fileRepository.loadAll(page, size));
    }

    @DeleteMapping("/api/file/delete")
    public ResponseDetails delete(@RequestBody FileMessage fileMessage) {
        return ResponseDetails.ok(fileRepository.delete(fileMessage));

    }

    @PostMapping("/api/file/rename")
    public ResponseDetails rename(@RequestBody FileMessage fileMessage) {
        return ResponseDetails.ok(fileRepository.rename(fileMessage));
    }


    @GetMapping("/api/upload/file/{date}/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Object> get(@PathVariable(value = "date") String date,
                          @PathVariable(value = "filename") String filename,
                          @RequestParam(value = "filename", required = false) String name,
                          @RequestParam(value = "type", required = false) String type,
                          HttpServletRequest request) {
        try {
            Path path = fileRepository.load(date + "/" + filename);
            Resource resource = new UrlResource(path.toUri());
            String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(HttpHeaders.CONTENT_TYPE, contentType);
            if (name == null) {
                httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, type + "; filename=" + filename);
            } else {
                httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, type+ "; filename=" + java.net.URLEncoder.encode(name, StandardCharsets.UTF_8));
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .headers(httpHeaders)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ResponseDetails.ok(404, "没有找到相应的资源！").put("error", e.getMessage()));
        }
    }
}
