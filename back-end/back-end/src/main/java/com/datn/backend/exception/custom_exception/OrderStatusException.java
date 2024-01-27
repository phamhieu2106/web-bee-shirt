package com.datn.backend.exception.custom_exception;

/**
 * @author HungDV
 */
public class OrderStatusException extends RuntimeException {
    public OrderStatusException(String message) {
        super(message);
    }
}
