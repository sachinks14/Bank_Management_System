package com.student.bms.Services;

import com.student.bms.Entity.MongoEntities.Transactions;
import com.student.bms.Entity.type.TRANSACTION_TYPE;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionsService {
    public List<Transactions> getAllTransactionsById(Long accId);
    public List<Transactions> getAllTransactionsBetweenDates(Long accId, LocalDateTime from, LocalDateTime till);
    public List<Transactions> getByTransactionType(Long accId, TRANSACTION_TYPE type);
    public void recordTransaction(Long fromAccId, Long toAccId, float amount, TRANSACTION_TYPE type);
}
