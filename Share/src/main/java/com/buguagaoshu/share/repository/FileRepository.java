package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.VditorFiles;
import com.buguagaoshu.share.enums.ReturnCodeEnum;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

import java.nio.file.Path;


/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 17:49
 */
public interface FileRepository {
    VditorFiles save(MultipartFile[] files);

    Path load(String filePath) throws FileNotFoundException;

    Page<FileMessage> loadAll(Integer page, Integer size);

    ReturnCodeEnum delete(FileMessage fileMessage);

    DiskMessage diskMessage();

    ReturnCodeEnum rename(FileMessage fileMessage);
}
