package com.student.bms.Entity.Dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.student.bms.Entity.type.AccountType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Data
public class CreateAccountDTO {
    private String fullName;
    private String email;
    private String mobileNo;
    private String branch;
    private float amount;
    private AccountType accountType;

    @JsonProperty("dateOfBirth")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate DateOfBirth;

    @JsonProperty("password")
    private String Password;
}
