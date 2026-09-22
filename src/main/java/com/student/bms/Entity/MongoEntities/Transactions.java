package com.student.bms.Entity.MongoEntities;

import com.student.bms.Entity.type.TRANSACTION_TYPE;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document
@Getter
@Setter
public class Transactions {
    @Id
    private String id;

    private Long accId;
    private Long counterpartyAccId;

    @CreatedDate
    private LocalDateTime timeOfTransaction;

    @Enumerated(EnumType.STRING)
    private TRANSACTION_TYPE transactionType;

    private float amount;
}
