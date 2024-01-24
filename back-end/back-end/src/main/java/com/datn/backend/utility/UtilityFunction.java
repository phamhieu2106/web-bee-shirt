package com.datn.backend.utility;

public class UtilityFunction {

    public static int[] getPageNumberArr(int totalPage) {
        int[] pageNumberArr = new int[totalPage];
        for (int i = 1; i <= totalPage; ++i) {
            pageNumberArr[i - 1] = i;
        }
        return pageNumberArr;
    }
}
