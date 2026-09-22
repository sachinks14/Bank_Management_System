package com.student.bms.Services;

import com.student.bms.Entity.MongoEntities.Notifications;

import java.util.List;

public interface NotificationsService {
    public List<Notifications> getNotifications();
    public Notifications getById(String id);
    public Notifications saveNotification(Notifications n);
    public void deleteNotif(String notiId);
}
