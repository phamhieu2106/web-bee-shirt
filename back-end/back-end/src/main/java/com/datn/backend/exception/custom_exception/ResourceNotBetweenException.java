package com.datn.backend.exception.custom_exception;

public class ResourceNotBetweenException extends RuntimeException{
    public ResourceNotBetweenException(String message) {
        super(message);
    }
}
