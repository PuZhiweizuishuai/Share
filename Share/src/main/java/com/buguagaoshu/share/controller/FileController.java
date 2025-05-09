package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.*;
import com.buguagaoshu.share.repository.FileRepository;
import com.buguagaoshu.share.repository.impl.InMemoryIpCache;
import com.buguagaoshu.share.utils.AesUtil;
import com.buguagaoshu.share.utils.IpUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 18:12
 */
@RestController
public class FileController {

    private final FileRepository fileRepository;

    private final IpUtils ipUtils;

    private final InMemoryIpCache inMemoryIpCache;

    @Autowired
    public FileController(FileRepository fileRepository, IpUtils ipUtils, InMemoryIpCache inMemoryIpCache) {
        this.fileRepository = fileRepository;
        this.ipUtils = ipUtils;
        this.inMemoryIpCache = inMemoryIpCache;
    }

    @GetMapping("/api/upload/disk")
    public ResponseDetails diskMessage() {
        return ResponseDetails.ok().put("data", fileRepository.diskMessage());
    }

    @PostMapping("/api/upload/setting/filemax")
    public ResponseDetails uploadFileMax(@Param("type") String type, @RequestBody DiskMessage diskMessage, HttpSession session) {
        DiskMessage disked = fileRepository.diskMessage();
        if ("setting".equals(type)) {
            disked.setEditType(diskMessage.getEditType());
            return ResponseDetails.ok(fileRepository.uploadFileMax(disked));
        } else {
            User user = (User) session.getAttribute(WebConstant.LOGIN_USER);
            if (user != null) {
                if (user.getUsername().equals("admin")) {
                    disked.setUploadFileMax(diskMessage.getUploadFileMax());
                    return ResponseDetails.ok(fileRepository.uploadFileMax(disked));
                }
            }
        }
        return ResponseDetails.ok().put("data", fileRepository.diskMessage());

    }

    /**
     * @param type 自定义返回数据格式
     *             type = 1时
     *             {
     *             "errno": 0, // 注意：值是数字，不能是字符串
     *             "data": {
     *             "url": "xxx", // 图片 src ，必须
     *             "alt": "yyy", // 图片描述文字，非必须
     *             "href": "zzz" // 图片的链接，非必须
     *             }
     *             }
     */
    @PostMapping("/api/upload")
    public Object save(@RequestParam(value = "files") MultipartFile[] files, @RequestParam(value = "type", defaultValue = "0") Integer type) {
        VditorFiles vditorFiles = fileRepository.save(files);
        if (type == 1) {
            HashMap<String, Object> map = new HashMap<>(2);
            map.put("errno", 0);
            HashMap<String, String> data = new HashMap<>(3);
            HashMap<String, String> succMap = (HashMap<String, String>) vditorFiles.getData().get("succMap");
            for (String name : succMap.keySet()) {
                String url = succMap.get(name);
                data.put("url", url);
                data.put("alt", name);
                data.put("href", url);
            }
            map.put("data", data);
            return map;
        } else {
            return vditorFiles;
        }
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
                                      @RequestParam(value = "key", required = false) String key,
                                      HttpServletRequest request) {
        try {
            boolean lock = checkSeePower(key, request);
            if (lock) {
                Path path = fileRepository.load(date + "/" + filename);
                Resource resource = new UrlResource(path.toUri());
                String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(HttpHeaders.CONTENT_TYPE, contentType);
                if (name == null) {
                    httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, type + "; filename=" + filename);
                } else {
                    httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, type + "; filename=" + java.net.URLEncoder.encode(name, StandardCharsets.UTF_8));
                }

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .headers(httpHeaders)
                        .body(resource);
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(ResponseDetails.ok(404, "没有找到相应的资源！").put("error", "no power!"));
            }

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ResponseDetails.ok(404, "没有找到相应的资源！").put("error", e.getMessage()));
        }
    }

    private boolean checkSeePower(String key, HttpServletRequest request) {
        boolean lock = false;
        String ip = ipUtils.getIpAddr(request);
        if (key != null) {
            try {
                String deKey = AesUtil.decrypt(key, WebConstant.AES_KEY);
                String[] sp = deKey.split("#");
                Long nowTime = System.currentTimeMillis();

                Long startTime = Long.parseLong(sp[0]);
                if (nowTime - startTime <= 3600000 && ip.equals(sp[1])) {
                    lock = true;
                } 
            } catch (Exception e) {
                lock = false;
            }
        } else {
            IpData ipData = inMemoryIpCache.getWhitelistIpMap().get(ip);

            // 对非白名单IP进行鉴权
            if (ipData == null) {
                User user = (User) request.getSession().getAttribute(WebConstant.LOGIN_USER);
                if (user != null) {
                    lock = true;
                }
            } else {
                lock = true;
            }
        }
        return lock;
    }
}
