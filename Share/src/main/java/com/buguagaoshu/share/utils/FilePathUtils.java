package com.buguagaoshu.share.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-02 17:55
 */
public class FilePathUtils {

    public final static String ROOT = "file";


    private final static SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    public static String filePath() {
        return ROOT + "/" + DATE_FORMAT.format(new Date());
    }

    public static String fileDate() {
        return DATE_FORMAT.format(new Date());
    }


    public static String newFilename(String filename) {
        return UUID.randomUUID().toString().replace("-", "") + getFileSuffix(filename);
    }

    public static String getFileSuffix(String filename) {
        int number = filename.lastIndexOf(".");
        if (number <= 0) {
            return "";
        }
        return filename.substring(number).toLowerCase();
    }
}
