package com.datn.backend.exception.custom_exception;

public class ResourceInvalidException extends RuntimeException {

    public ResourceInvalidException(String message) {
        super(message);
    }
}
