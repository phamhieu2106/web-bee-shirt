package com.datn.backend.exception.custom_exception;

public class ResourceBlankException extends RuntimeException{

    public ResourceBlankException(String message) {
        super(message);
    }
}
