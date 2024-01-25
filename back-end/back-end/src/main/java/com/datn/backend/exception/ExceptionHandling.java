package com.datn.backend.exception;

import com.datn.backend.exception.custom_exception.EntityNotFoundException;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.exception_response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestControllerAdvice
public class ExceptionHandling {

    @ExceptionHandler(Exception.class)
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

//            return new ResponseEntity<>("error", BAD_REQUEST);

            Map<String, String> errorMap = new HashMap<>();
            ((MethodArgumentNotValidException) ex).getBindingResult().getFieldErrors().forEach(error -> {
                errorMap.put(error.getField(), error.getDefaultMessage());
            });
            return new ResponseEntity<>(errorMap, BAD_REQUEST);

        } else if (ex instanceof EntityNotFoundException) {
            ErrorResponse response = new ErrorResponse(ex.getMessage());
            return new ResponseEntity<>(response, BAD_REQUEST);

        } else if (ex instanceof AccessDeniedException) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        else {
            System.out.println(ex);
            return new ResponseEntity<>("Server occurs an error!", INTERNAL_SERVER_ERROR);
        }
    }
}
