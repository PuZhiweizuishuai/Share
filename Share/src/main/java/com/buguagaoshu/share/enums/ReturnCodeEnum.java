package com.buguagaoshu.share.enums;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-06-04 13:04
 * 系统返回错误代码
 */
public enum ReturnCodeEnum {
    /**
     * 系统错误吗
     * */
    SUCCESS(200, "Success!"),
    ERROR_SHARE_ID(1001, "错误的分享ID！"),
    ERROR_FILE_ID(2001, "文件不存在，或者文件ID错误！")
    ;

    int code;
    String msg;

    ReturnCodeEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

}
