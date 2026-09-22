package com.student.bms.Services;

import com.student.bms.Entity.Accounts;
import com.student.bms.Entity.Dtos.CreateAccountDTO;
import com.student.bms.Entity.User;
import com.student.bms.Entity.type.NET_BANKING_PERMISSION;
import com.student.bms.Entity.type.ROLE;
import com.student.bms.Entity.type.TRANSACTION_TYPE;
import com.student.bms.Repos.AccountRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepo AccRepo;

    @Autowired
    private UserServiceImpl UserService;

    @Autowired
    private PinServiceImpl PinService;

    @Autowired
    private TransactionsServiceImpl TransService;

    @Transactional
    @Override
    public Accounts createAccount(CreateAccountDTO acc)
    {
        User us = new User(acc.getFullName(), acc.getEmail(), acc.getMobileNo(), ROLE.CUSTOMER, acc.getDateOfBirth().atStartOfDay(), acc.getBranch(), acc.getPassword());
        UserService.insertUser(us);
        Accounts a = new Accounts(us, acc.getAccountType(), acc.getAmount());
        a.setPermission(NET_BANKING_PERMISSION.NOT_ALLOWED);
        return AccRepo.save(a);
    }

    @Transactional
    @Override
    public boolean deleteAccount(Long accId)
    {
        AccRepo.deleteById(accId);
        return true;
    }

    @Transactional
    @Override
    public String sendMoney(Long fromAcc, Long toAcc, float amt, int pin)
    {
        int actualPin = PinService.findPin(fromAcc);
        if (actualPin == -1) {
            return "PIN_NOT_SET";
        }
        if (actualPin != pin) {
            return "INVALID_PIN";
        }

        Accounts FromAcc = AccRepo.getAccountById(fromAcc);
        Accounts ToAcc = AccRepo.getAccountById(toAcc);
        if (FromAcc == null || ToAcc == null) {
            return "ACCOUNT_NOT_FOUND";
        }

        if (FromAcc.getAmount() >= amt)
        {
            FromAcc.setAmount(FromAcc.getAmount() - amt);
            ToAcc.setAmount(ToAcc.getAmount() + amt);
        }
        else return "INSUFFICIENT_BALANCE";

        TransService.recordTransaction(fromAcc, toAcc, amt, TRANSACTION_TYPE.TRANSFER);
        return "SUCCESS";
    }

    @Override
    public float getAccBalance(Long Id)
    {
        return AccRepo.getAmountById(Id);
    }

    @Transactional
    @Override
    public void allowOnlineBanking(Long accId)
    {
        Accounts acc = AccRepo.getAccountById(accId);
        acc.setPermission(NET_BANKING_PERMISSION.ALLOWED);
    }

    @Override
    public NET_BANKING_PERMISSION getNetBankingPermission(Long accId)
    {
        return AccRepo.getPermissionById(accId);
    }
}
