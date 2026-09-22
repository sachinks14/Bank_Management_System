package com.student.bms.Entity.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class BalanceCheckReqDTO {
    @JsonProperty("pin")
    private int PIN;
}
