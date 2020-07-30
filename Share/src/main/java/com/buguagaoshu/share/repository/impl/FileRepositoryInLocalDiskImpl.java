package com.buguagaoshu.share.repository.impl;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.VditorFiles;
import com.buguagaoshu.share.enums.ReturnCodeEnum;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.repository.FileRepository;
import com.buguagaoshu.share.utils.FilePathUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;


/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 17:52
 */
@Repository
public class FileRepositoryInLocalDiskImpl implements FileRepository {

    private final Path location;

    private final FileMessageRepository fileMessageRepository;

    private final DiskMessageRepository diskMessageRepository;

    @Autowired
    public FileRepositoryInLocalDiskImpl(FileMessageRepository fileMessageRepository, DiskMessageRepository diskMessageRepository) throws IOException {
        this.fileMessageRepository = fileMessageRepository;
        this.diskMessageRepository = diskMessageRepository;
        this.location = Paths.get(FilePathUtils.ROOT);
        if (Files.notExists(this.location)) {
            Files.createDirectories(this.location);
        }
    }

    @Override
    public VditorFiles save(MultipartFile[] files) {
        VditorFiles vditorFiles = new VditorFiles();
        Map<String, Object> succMap = new HashMap<>(2);
        List<String> errFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            String path = FilePathUtils.filePath();
            String filename = FilePathUtils.newFilename(file.getOriginalFilename());
            File dest = new File(path);
            if (!dest.exists() && !dest.mkdirs()) {
                errFiles.add(file.getOriginalFilename());
                continue;
            }
            try {
                FileMessage fileMessage = new FileMessage();
                Files.copy(file.getInputStream(), Paths.get(path, filename));
                succMap.put(file.getOriginalFilename(),"/api/upload/" + path + "/" + filename);
                fileMessage.setCreateTime(System.currentTimeMillis());
                fileMessage.setPath("/api/upload/" + path + "/" + filename);
                fileMessage.setFilename(filename);
                fileMessage.setSize(file.getSize());
                fileMessage.setUploadFilename(file.getOriginalFilename());
                fileMessage.setDate(FilePathUtils.fileDate());
                Optional<DiskMessage> byId = diskMessageRepository.findById(1);
                byId.get().setAvailableDisk(byId.get().getAvailableDisk() - fileMessage.getSize());
                byId.get().setUserDisk(byId.get().getUserDisk() + fileMessage.getSize());
                diskMessageRepository.save(byId.get());
                fileMessageRepository.save(fileMessage);
            } catch (Exception e) {
                errFiles.add(file.getOriginalFilename());
            }
        }

        Map<String, Object> data = new HashMap<>(2);
        vditorFiles.setCode(0);
        vditorFiles.setMsg("上传成功");
        data.put("succMap", succMap);
        data.put("errFiles", errFiles);
        vditorFiles.setData(data);
        return vditorFiles;
    }

    @Override
    public Path load(String filePath) throws FileNotFoundException {
        Path path = location.resolve(filePath);
        if (Files.notExists(path)) {
            throw new FileNotFoundException("Cannot load file! File " + filePath + " not exists!");
        }
        return path;
    }

    @Override
    public Page<FileMessage> loadAll(Integer page, Integer size) {
//        if (date == null) {
//            Files.walk(location, 1)
//                    .filter((file) -> Files.isDirectory(file) && !file.getFileName().toString().equals("file"))
//                    .forEach(file -> {
//                        FileMessage fileMessage = new FileMessage();
//                        fileMessage.setFilename(file.getFileName().toString());
//                        try {
//                            fileMessage.setTime(TimeUtils.timeFormat(Files.getLastModifiedTime(file).toMillis()));
//                        } catch (IOException e) {
//                            fileMessage.setTime("时间获取失败，未知时间！");
//                        }
//                        fileMessageList.add(fileMessage);
//                    });
//            return fileMessageList;
//        }
        if (page == null || page < 0) {
            page = 1;
        }
        if (size == null) {
            size = 20;
        }
        Page<FileMessage> fileMessages = fileMessageRepository.findAll(
                PageRequest.of(page - 1, size, Sort.by(Sort.Order.desc("createTime")))
        );

        return fileMessages;
    }

    @Override
    public ReturnCodeEnum delete(FileMessage fileMessage) {
        if (fileMessage.getId() == null) {
            return ReturnCodeEnum.ERROR_FILE_ID;
        }
        Optional<FileMessage> sysFile = fileMessageRepository.findById(fileMessage.getId());
        fileMessageRepository.delete(fileMessage);
        try {

            String filePath = sysFile.get().getDate() + "/" + sysFile.get().getFilename();
            Path path = location.resolve(filePath);
            Files.delete(path);
            Optional<DiskMessage> byId = diskMessageRepository.findById(1);
            byId.get().setAvailableDisk(byId.get().getAvailableDisk() + sysFile.get().getSize());
            byId.get().setUserDisk(byId.get().getUserDisk() - sysFile.get().getSize());
            diskMessageRepository.save(byId.get());
            // 删除空文件夹
            path = location.resolve(sysFile.get().getDate());
            Stream<Path> walk = Files.walk(path, 1);
            if (walk.count() == 1) {
                Files.delete(path);
            }
            return ReturnCodeEnum.SUCCESS;
        } catch (IOException e) {
            return ReturnCodeEnum.ERROR_FILE_ID;
        }
    }

    @Override
    public DiskMessage diskMessage() {
        Optional<DiskMessage> byId = diskMessageRepository.findById(1);
        return byId.get();
    }

    @Override
    public ReturnCodeEnum rename(FileMessage fileMessage) {
        if (fileMessage.getId() == null) {
            return ReturnCodeEnum.ERROR_FILE_ID;
        }
        Optional<FileMessage> sysFile = fileMessageRepository.findById(fileMessage.getId());
        if (sysFile.isPresent()) {
            FileMessage file = sysFile.get();
            String suffix = FilePathUtils.getFileSuffix(fileMessage.getUploadFilename());
            if ("".equals(suffix)) {
                file.setUploadFilename(fileMessage.getUploadFilename() + FilePathUtils.getFileSuffix(file.getFilename()));
            } else {
                file.setUploadFilename(fileMessage.getUploadFilename());
            }
            fileMessageRepository.save(file);
            return ReturnCodeEnum.SUCCESS;
        } else {
            return ReturnCodeEnum.ERROR_FILE_ID;
        }
    }
}
