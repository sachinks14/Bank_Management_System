package com.student.bms.Entity.Dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAccountDTO {
    private String fullName;
    private String mobileNo;

    @JsonProperty("dateOfBirth")
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private LocalDate DateOfBirth;

    private String email;
}
