package com.buguagaoshu.share;

import java.io.IOException;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2021-08-11 17:03
 */
public class Test {
    public static void main(String[] args) {
        try{
            readFile("d:\\c.txt");
            System.out.println("未完待续...");
        }catch (IOException e){
           // System.out.println("catch - 传递的文件后缀不是.txt");
            e.printStackTrace();
        }
        System.out.println("后续代码");
    }

    public static void readFile(String fileName) throws IOException {

        if(!fileName.endsWith(".txt")){
            throw new IOException("1");
        }
        if(!fileName.equals("d:\\a.txt")){
            throw new IOException("2文件路径不是 -> d:\\a.txt \n"+"您输入的路径为："+fileName);
        }

        System.out.println("路径没有问题,读取文件");
    }
}
