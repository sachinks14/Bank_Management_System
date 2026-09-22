package com.student.bms.Exceptions;

public class InsufficientBalance extends RuntimeException {
    public InsufficientBalance(String message) {
        super(message);
    }
}
