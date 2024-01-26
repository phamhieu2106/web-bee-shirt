package com.datn.backend.exception.custom_exception;

/**
 * @author HungDV
 */
public class IdNotFoundException extends RuntimeException{
    public IdNotFoundException(String message) {
        super(message);
    }
}
