package com.student.bms.Entity.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoginRespUserDTO {
    @JsonProperty("id")
    private Long Id;
    private String fullName;
    private String role;
}
