package com.datn.backend.exception.custom_exception;

public class ResourceOutOfRangeException extends RuntimeException {

    public ResourceOutOfRangeException(String message) {
        super(message);
    }
}
