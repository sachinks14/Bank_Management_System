package com.student.bms.Entity.MongoEntities;

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
public class Pin {
    @Id
    private Long AccId;
    private int PIN;
}
