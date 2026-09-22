package com.student.bms.Entity.Dtos;

import com.student.bms.Entity.type.ROLE;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Data
public class SignUpReqDTO {
    private String fullName;
    private String mobilNo;
    private String password;
    private String email;
    private LocalDate DateOfBirth;
    private ROLE role;
    private String Branch;
}