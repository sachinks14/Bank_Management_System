package com.student.bms.Entity.MongoEntities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.student.bms.Entity.Dtos.UpdateAccountDTO;
import com.student.bms.Entity.type.NOTIFICATION_TYPE;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document
@Getter
@Setter
public class Notifications {
    @Id
    private String id;

    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private NOTIFICATION_TYPE Type;

    private UpdateAccountDTO update;

    private Long accId;
}
