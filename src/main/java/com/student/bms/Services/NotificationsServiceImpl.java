package com.student.bms.Services;

import com.student.bms.Entity.MongoEntities.Notifications;
import com.student.bms.Repos.NotificationsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationsServiceImpl implements NotificationsService {

    @Autowired
    private NotificationsRepo notiRepo;

    @Override
    public List<Notifications> getNotifications()
    {
        return notiRepo.findAll();
    }

    @Override
    public Notifications getById(String id)
    {
        return notiRepo.findById(id).orElse(null);
    }

    @Override
    public Notifications saveNotification(Notifications n)
    {
        return notiRepo.save(n);
    }

    @Override
    public void deleteNotif(String notiId)
    {
        notiRepo.deleteById(notiId);
    }
}
