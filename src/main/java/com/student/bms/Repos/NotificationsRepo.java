package com.student.bms.Repos;

import com.student.bms.Entity.MongoEntities.Notifications;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepo extends MongoRepository<Notifications, String> {
}
