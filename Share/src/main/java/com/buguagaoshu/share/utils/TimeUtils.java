package com.buguagaoshu.share.utils;

import java.text.SimpleDateFormat;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 15:34
 */
public class TimeUtils {
    private final static SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    public static String timeFormat(long date) {
        return DATE_FORMAT.format(date);
    }
}
