package com.student.bms.Entity.Dtos;

import lombok.Data;

@Data
public class UserRequestDTO {
    private Long accId;

    private String type;

    private UpdateAccountDTO update;
}
