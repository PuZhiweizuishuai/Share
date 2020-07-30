package com.buguagaoshu.share.advice;

import com.buguagaoshu.share.controller.ShareController;
import com.buguagaoshu.share.domain.ResponseDetails;
import org.apache.tomcat.util.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 18:30
 */
//@RestControllerAdvice(basePackages = {"com.buguagaoshu.share.controller"})
public class ControllerAdvice {
    @ExceptionHandler(value = {IOException.class})
    public ResponseEntity<ResponseDetails> handleIoException(IOException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ResponseDetails.ok(404, "没有找到相应的资源！").put("error", e.getMessage()));

    }

    @ExceptionHandler(value = {Throwable.class})
    public ResponseDetails handleException(Throwable e) {
        return ResponseDetails.ok(500, e.getMessage());
    }
}
