package com.datn.backend.exception.custom_exception;

public class ResourceInvalidExecption extends RuntimeException{
    public ResourceInvalidExecption(String message) {
        super(message);
    }
}
