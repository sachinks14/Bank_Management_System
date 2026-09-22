package com.student.bms.Repos;

import com.student.bms.Entity.MongoEntities.Pin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepo extends MongoRepository<Pin, Long> {
    public Pin findByAccId(Long accId);
    public Pin findByPIN(int pin);
}
