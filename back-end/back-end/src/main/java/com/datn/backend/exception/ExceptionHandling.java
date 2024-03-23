package com.datn.backend.exception;

import com.datn.backend.exception.custom_exception.*;
import com.datn.backend.exception.exception_response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice
public class ExceptionHandling {

    @ExceptionHandler(PlaceOrderException.class)
    public ResponseEntity<?> handlePlaceOrderException(PlaceOrderException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, BAD_REQUEST);
    }

    @ExceptionHandler(IdNotFoundException.class)
    public ResponseEntity<?> handleIdNotFoundException(IdNotFoundException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, NOT_FOUND);
    }

    @ExceptionHandler(OrderStatusException.class)
    public ResponseEntity<?> handleOrderStatusException(OrderStatusException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//        });
        String errorMessage = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        ErrorResponse response = new ErrorResponse(errorMessage);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, BAD_REQUEST);
    }

    @ExceptionHandler(OperationNotAllowException.class)
    public ResponseEntity<ErrorResponse> handleOperationNotAllowException(OperationNotAllowException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        if (ex instanceof ResourceExistsException) {
            ErrorResponse response = new ErrorResponse(ex.getMessage());
            return new ResponseEntity<>(response, BAD_REQUEST);
        } else if (ex instanceof MethodArgumentNotValidException) {
            Map<String, String> errorMap = new HashMap<>();
            ((MethodArgumentNotValidException) ex).getBindingResult().getFieldErrors().forEach(error -> {
                errorMap.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<>(errorMap, BAD_REQUEST);
        } else if (ex instanceof ResourceNotFoundException) {
            ErrorResponse response = new ErrorResponse(ex.getMessage());
            return new ResponseEntity<>(response, BAD_REQUEST);
        } else if (ex instanceof AccessDeniedException) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>("Server occurs an error!", INTERNAL_SERVER_ERROR);
        }
    }
}

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
//            return new ResponseEntity<>("error", BAD_REQUEST);