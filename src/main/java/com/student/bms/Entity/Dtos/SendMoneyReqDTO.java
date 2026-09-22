package com.student.bms.Entity.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMoneyReqDTO {
    private Long fromAccount;
    private Long toAccount;
    private float amount;

    @JsonProperty("pin")
    private int PIN;

    @JsonProperty("message")
    private String Message;
}
