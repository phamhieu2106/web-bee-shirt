package com.datn.backend.exception.custom_exception;

public class PlaceOrderException extends RuntimeException {

    public PlaceOrderException(String message) {
        super(message);
    }
}
