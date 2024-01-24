package com.datn.backend.exception.custom_exception;

public class ResourceNumberException extends RuntimeException{
    public ResourceNumberException(String message) {
        super(message);
    }
}
