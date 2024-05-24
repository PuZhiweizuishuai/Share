package com.buguagaoshu.share.service.impl;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.service.PublicShareService;
import com.buguagaoshu.share.service.ShareService;
import com.buguagaoshu.share.service.ViewCountService;
import com.buguagaoshu.share.utils.AesUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Service
public class PublicShareServiceImpl implements PublicShareService {
    private final ShareService shareService;
    private final FileMessageRepository fileMessageRepository;
    private final ViewCountService viewCountService;

    public PublicShareServiceImpl(ShareService shareService, FileMessageRepository fileMessageRepository, ViewCountService viewCountService) {
        this.shareService = shareService;
        this.fileMessageRepository = fileMessageRepository;
        this.viewCountService = viewCountService;
    }

    @Override
    public Share publicShare(Share share, User user) {
        Share shareById = shareService.getShareById(share.getId());
        if (shareById == null) {
            return null;
        }
        shareById.setCreatePublicShareUserId(user.getId());
        shareById.setPublicUser(true);


        if (share.isHaveUserSeeKey()) {
            shareById.setUserSeeKey(share.getUserSeeKey());
            shareById.setHaveUserSeeKey(true);
        } else {
            shareById.setHaveUserSeeKey(false);
        }
        shareById.setUrl(UUID.randomUUID().toString().replaceAll("-", ""));

        shareService.update(shareById);
        shareById.setUserSeeKey("");
        return shareById;
    }

    @Override
    public FileMessage publicFile(FileMessage file, User user) {
        FileMessage fileMessage = fileMessageRepository.findById(file.getId()).get();
        if (fileMessage == null) {
            return null;
        }
        fileMessage.setPublicUser(true);
        fileMessage.setCreatePublicShareUserId(user.getId());
        if (file.isHaveUserSeeKey()) {
            fileMessage.setUserSeeKey(file.getUserSeeKey());
            fileMessage.setHaveUserSeeKey(true);
        } else {
            fileMessage.setHaveUserSeeKey(false);
        }
        fileMessage.setUrl(UUID.randomUUID().toString().replaceAll("-", ""));
        fileMessageRepository.save(fileMessage);
        fileMessage.setUserSeeKey("");
        return fileMessage;
    }

    @Override
    public Share getPublicShare(String url, String password, String ip) {
        Share shareByUrl = shareService.getShareByUrl(url);
        if (shareByUrl != null) {
            if (shareByUrl.getPublicUser()) {

                if (shareByUrl.isHaveUserSeeKey()) {
                    if (shareByUrl.getUserSeeKey().equals(password)) {

                        viewCountService.addViewCountLog(WebConstant.VIEW_LOG_TYPE_SHARE, shareByUrl.getId(), ip);
                        shareByUrl.setId(null);
                        String key = AesUtil.encrypt(System.currentTimeMillis() + "#" + ip, WebConstant.AES_KEY);
                        shareByUrl.setUserSeeKey(key);

                        return shareByUrl;
                    }
                } else {
                    String key = AesUtil.encrypt(System.currentTimeMillis() + "#" + ip, WebConstant.AES_KEY);
                    viewCountService.addViewCountLog(WebConstant.VIEW_LOG_TYPE_SHARE, shareByUrl.getId(), ip);
                    shareByUrl.setUserSeeKey(key);
                    shareByUrl.setId(null);
                    return shareByUrl;
                }
            }
            return null;
        }
        return null;
    }

    @Override
    public FileMessage getPublicFile(String url, String password, String ip) {
        FileMessage file = fileMessageRepository.findByUrl(url);
        if (file != null) {
            if (file.getPublicUser()) {

                if (file.isHaveUserSeeKey()) {
                    if (password.equals(file.getUserSeeKey())) {

                        String key = AesUtil.encrypt(System.currentTimeMillis() + "#" + ip, WebConstant.AES_KEY);
                        viewCountService.addViewCountLog(WebConstant.VIEW_LOG_TYPE_FILE, file.getId(), ip);
                        file.setUserSeeKey(key);
                        file.setId(null);
                        return file;
                    }
                } else {
                    String key = AesUtil.encrypt(System.currentTimeMillis() + "#" + ip, WebConstant.AES_KEY);
                    file.setUserSeeKey(key);
                    viewCountService.addViewCountLog(WebConstant.VIEW_LOG_TYPE_FILE, file.getId(), ip);
                    file.setId(null);
                    return file;
                }
            }
            return null;
        }
        return null;
    }

    @Override
    public Share checkShare(String url) {
        Share shareByUrl = shareService.getShareByUrl(url);
        if (shareByUrl != null) {
            if (shareByUrl.getPublicUser()) {
                return shareByUrl;
            }
        }
        return null;
    }

    @Override
    public FileMessage checkFile(String url) {
        FileMessage file = fileMessageRepository.findByUrl(url);
        if (file != null) {
            if (file.getPublicUser()) {
                return file;
            }
        }
        return null;
    }

    @Override
    public Boolean cancelpublicShare(Share share, User user) {
        Share shareById = shareService.getShareById(share.getId());
        if (shareById == null) {
            return false;
        }
        shareById.setPublicUser(false);
        shareById.setUrl("");
        shareById.setHaveUserSeeKey(false);
        shareById.setCreatePublicShareUserId(user.getId());
        shareById.setUserSeeKey("");
        shareService.update(shareById);
        return true;
    }

    @Override
    public Boolean cancelpublicFile(FileMessage fileMessage, User user) {
        FileMessage file = fileMessageRepository.findById(fileMessage.getId()).get();
        if (file == null) {
            return false;
        }
        file.setPublicUser(false);
        file.setUrl("");
        file.setHaveUserSeeKey(false);
        file.setCreatePublicShareUserId(user.getId());
        file.setUserSeeKey("");
        fileMessageRepository.save(file);
        return true;
    }
}
