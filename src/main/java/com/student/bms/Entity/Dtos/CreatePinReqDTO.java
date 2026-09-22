package com.student.bms.Entity.Dtos;

import lombok.Data;

@Data
public class CreatePinReqDTO {
    private Long accId;
    private int newPin;
    private int oldPin;
}
