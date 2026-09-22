package com.student.bms.Services;

public interface PinService {
    /** Returns "OK", "WRONG_OLD_PIN", or "PERMISSION_DENIED" - caller decides the HTTP response. */
    public String createUpdatePin(Long accId, int oldPin, int newPin, boolean isFirstTime);
    /** Returns the account's PIN, or -1 if none is set yet. */
    public int findPin(Long accId);
    /** Returns the account ID tied to this PIN, or null if no match. */
    public Long findAccountIdByPin(int pin);
}
