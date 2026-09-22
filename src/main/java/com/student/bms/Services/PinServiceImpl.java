package com.student.bms.Services;

import com.student.bms.Entity.MongoEntities.Pin;
import com.student.bms.Repos.PinRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PinServiceImpl implements PinService {

    @Autowired
    private PinRepo pinRepo;

    @Override
    public String createUpdatePin(Long accId, int oldPin, int newPin, boolean isFirstTime)
    {
        Pin existing = pinRepo.findByAccId(accId);

        if (isFirstTime) {
            if (existing != null) {
                return "PIN_ALREADY_EXISTS";
            }
            pinRepo.save(Pin.builder().AccId(accId).PIN(newPin).build());
            return "OK";
        }

        if (existing == null) {
            return "NO_PIN_SET";
        }
        if (existing.getPIN() != oldPin) {
            return "WRONG_OLD_PIN";
        }
        existing.setPIN(newPin);
        pinRepo.save(existing);
        return "OK";
    }

    @Override
    public int findPin(Long accId)
    {
        Pin p = pinRepo.findByAccId(accId);
        return p != null ? p.getPIN() : -1;
    }

    @Override
    public Long findAccountIdByPin(int pin)
    {
        Pin p = pinRepo.findByPIN(pin);
        return p != null ? p.getAccId() : null;
    }
}
