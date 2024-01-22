package com.datn.backend.exception;

import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.exception_response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        if (ex instanceof ResourceExistsException) {
            ErrorResponse response = new ErrorResponse(ex.getMessage());
            return new ResponseEntity<>(response, BAD_REQUEST);
        } else if (ex instanceof MethodArgumentNotValidException) {
//            List<FieldErrorResponse> errors = new ArrayList<>();
//            ((MethodArgumentNotValidException) ex).getBindingResult().getAllErrors().forEach(err -> {
//                String fieldName = ((FieldError) err).getField();
//                String message = err.getDefaultMessage();
//
//                errors.add(new FieldErrorResponse(fieldName, message));
//            });
//            return new ResponseEntity<>(errors, BAD_REQUEST);
//        } else if (ex instanceof ResourceNotFoundException || ex instanceof NoSuchElementException) {
//            ErrorResponse error = new ErrorResponse(ex.getMessage());
            return new ResponseEntity<>("error", BAD_REQUEST);
        } else {
            return new ResponseEntity<>("Server occurs an error!", INTERNAL_SERVER_ERROR);
        }
    }
}
