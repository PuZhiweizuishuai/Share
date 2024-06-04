package com.buguagaoshu.share.service;

import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.domain.User;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
public interface PublicShareService {
    Share publicShare(Share share,  User user);

    FileMessage publicFile(FileMessage file, User user);

    Share getPublicShare(String url, String password, String ip, String ua);

    FileMessage getPublicFile(String url, String password, String ip, String ua);

    Share checkShare(String url);

    FileMessage checkFile(String url);

    Boolean cancelpublicShare(Share share, User user);

    Boolean cancelpublicFile(FileMessage fileMessage, User user);
}
