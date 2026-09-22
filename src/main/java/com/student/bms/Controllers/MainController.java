package com.student.bms.Controllers;

import com.student.bms.Entity.Accounts;
import com.student.bms.Entity.Dtos.*;
import com.student.bms.Entity.MongoEntities.Notifications;
import com.student.bms.Entity.MongoEntities.Transactions;
import com.student.bms.Entity.type.NET_BANKING_PERMISSION;
import com.student.bms.Entity.type.NOTIFICATION_TYPE;
import com.student.bms.Exceptions.InvalidCredentialsException;
import com.student.bms.Exceptions.UserNotFoundException;
import com.student.bms.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MainController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private AccountServiceImpl accountService;

    @Autowired
    private TransactionsServiceImpl transService;

    @Autowired
    private NotificationsServiceImpl notifService;

    @Autowired
    private PinServiceImpl pinService;


    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginReqDTO logReq) {
        try {
            LoginRespUserDTO log = userService.loginUser(logReq.getMobileNo(), logReq.getPassword());
            return ResponseEntity.ok(log);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody CreateAccountDTO req) {
        try {
            Accounts a = accountService.createAccount(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(a != null ? "Signup successful" : "Signup failed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Signup failed: " + e.getMessage());
        }
    }


    @PostMapping("/admin/accountCreate")
    public boolean createAccountByAdmin(@RequestBody CreateAccountDTO acc)
    {
        Accounts a = accountService.createAccount(acc);
        return a != null;
    }

    @DeleteMapping("/admin/accounts/{accountId}")
    public boolean deleteAccount(@PathVariable Long accountId)
    {
        return accountService.deleteAccount(accountId);
    }

    @PutMapping("/admin/accounts/{accountId}")
    public ResponseEntity<?> updateAccount(@PathVariable Long accountId, @RequestBody UpdateAccountDTO accountDTO)
    {
        var updated = userService.updateAccount(accountDTO, accountId);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }
        return ResponseEntity.ok("Account updated");
    }

    @GetMapping("/admin/accounts/{accId}/transactions")
    public List<Transactions> getTransactions(@PathVariable Long accId)
    {
        return transService.getAllTransactionsById(accId);
    }


    @GetMapping("/admin/notifications")
    public List<Notifications> getNotifications()
    {
        return notifService.getNotifications();
    }

    // Approve a pending request: actually applies the change it describes.
    @PostMapping("/admin/notifications/{id}/approve")
    public ResponseEntity<?> approveNotification(@PathVariable String id)
    {
        Notifications req = notifService.getById(id);
        if (req == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }

        switch (req.getType()) {
            case ADMIN_REQUEST -> userService.makeAdmin(req.getAccId());
            case ONLINE_BANKING_REQUEST -> accountService.allowOnlineBanking(req.getAccId());
            case UPDATE -> userService.updateAccount(req.getUpdate(), req.getAccId());
        }

        notifService.deleteNotif(id);
        return ResponseEntity.ok("Request approved");
    }

    @DeleteMapping("/admin/notifications/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable String id)
    {
        notifService.deleteNotif(id);
        return ResponseEntity.ok("Notification deleted");
    }

    @PostMapping("/user/sendMoney")
    public ResponseEntity<?> sendMoney(@RequestBody SendMoneyReqDTO sendM)
    {
        String result = accountService.sendMoney(sendM.getFromAccount(), sendM.getToAccount(), sendM.getAmount(), sendM.getPIN());
        return switch (result) {
            case "SUCCESS" -> ResponseEntity.ok("Money sent");
            case "INVALID_PIN" -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect PIN");
            case "PIN_NOT_SET" -> ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Set up a PIN before sending money");
            case "INSUFFICIENT_BALANCE" -> ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("Insufficient balance");
            case "ACCOUNT_NOT_FOUND" -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        };
    }

    @PostMapping("/user/balance")
    public ResponseEntity<?> getBalance(@RequestBody BalanceCheckReqDTO req)
    {
        Long accId = pinService.findAccountIdByPin(req.getPIN());
        if (accId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid PIN");
        }
        BalanceCheckRespDTO resp = new BalanceCheckRespDTO();
        resp.setAmount(accountService.getAccBalance(accId));
        return ResponseEntity.ok(resp);
    }


    @PostMapping("/user/pin")
    public ResponseEntity<?> createOrUpdatePin(@RequestBody CreatePinReqDTO req)
    {
        NET_BANKING_PERMISSION p = accountService.getNetBankingPermission(req.getAccId());
        if (p != NET_BANKING_PERMISSION.ALLOWED) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Net Banking Permission Not Granted, Ask admin for Permission");
        }

        boolean isFirstTime = req.getOldPin() == 0;
        String result = pinService.createUpdatePin(req.getAccId(), req.getOldPin(), req.getNewPin(), isFirstTime);

        return switch (result) {
            case "OK" -> ResponseEntity.status(HttpStatus.CREATED).body("Pin saved");
            case "WRONG_OLD_PIN" -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old PIN is incorrect");
            case "PIN_ALREADY_EXISTS" -> ResponseEntity.status(HttpStatus.CONFLICT).body("A PIN already exists - provide the old PIN to change it");
            case "NO_PIN_SET" -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("No PIN set yet - leave old PIN blank to create one");
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        };
    }


    @PostMapping("/user/requests")
    public ResponseEntity<?> sendRequestToAdmin(@RequestBody UserRequestDTO req)
    {
        NOTIFICATION_TYPE type;
        try {
            type = NOTIFICATION_TYPE.valueOf(req.getType());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request type");
        }

        Notifications n = Notifications.builder()
                .Type(type)
                .accId(req.getAccId())
                .update(req.getUpdate())
                .build();

        notifService.saveNotification(n);
        return ResponseEntity.ok("Request submitted, pending admin approval");
    }
}
