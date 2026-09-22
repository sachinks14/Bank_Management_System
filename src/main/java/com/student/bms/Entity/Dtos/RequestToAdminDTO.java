package com.student.bms.Entity.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
public class RequestToAdminDTO {

    private Long accId;
    private String fullName;
    private String mobilNo;
    private String DateOfBirth;
    private String email;
}
