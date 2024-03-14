package com.datn.backend.exception.custom_exception;

public class OperationNotAllowException extends RuntimeException {

    public OperationNotAllowException(String message) {
        super(message);
    }
}
