package com.buguagaoshu.share.config;

import java.util.UUID;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
public class WebConstant {
    public final static String LOGIN_USER = "login_user";

    public final static String LOGIN_COUNT = "login_count";

    public final static long ONE_HOUR = 3600000;

    public final static String AES_KEY = UUID.randomUUID().toString().replaceAll("-", "");

    public final static int VIEW_LOG_TYPE_SHARE = 0;

    public final static int VIEW_LOG_TYPE_FILE = 1;
}
