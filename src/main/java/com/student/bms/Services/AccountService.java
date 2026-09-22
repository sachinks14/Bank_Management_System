package com.student.bms.Services;

import com.student.bms.Entity.Accounts;
import com.student.bms.Entity.Dtos.CreateAccountDTO;
import com.student.bms.Entity.type.NET_BANKING_PERMISSION;

public interface AccountService {
    public Accounts createAccount(CreateAccountDTO acc);
    public boolean deleteAccount(Long accId);
    public String sendMoney(Long fromAcc, Long toAcc, float amt, int pin);
    public float getAccBalance(Long Id);
    public void allowOnlineBanking(Long accId);
    public NET_BANKING_PERMISSION getNetBankingPermission(Long accId);
}
