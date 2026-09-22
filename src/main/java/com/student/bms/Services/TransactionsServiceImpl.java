package com.student.bms.Services;

import com.student.bms.Entity.MongoEntities.Transactions;
import com.student.bms.Entity.type.TRANSACTION_TYPE;
import com.student.bms.Repos.TransactionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionsServiceImpl implements TransactionsService {

    @Autowired
    private TransactionsRepo trRepo;

    @Override
    public List<Transactions> getAllTransactionsById(Long accId)
    {
        return trRepo.findByAccId(accId);
    }

    @Override
    public List<Transactions> getAllTransactionsBetweenDates(Long accId, LocalDateTime from, LocalDateTime till)
    {
        return trRepo.findByAccIdAndTimeOfTransactionBetween(accId, from, till);
    }

    @Override
    public List<Transactions> getByTransactionType(Long accId, TRANSACTION_TYPE type)
    {
        return trRepo.findByAccIdAndTransactionType(accId, type);
    }

    @Override
    public void recordTransaction(Long fromAccId, Long toAccId, float amount, TRANSACTION_TYPE type)
    {
        trRepo.save(Transactions.builder()
                .accId(fromAccId)
                .counterpartyAccId(toAccId)
                .amount(amount)
                .transactionType(type)
                .build());

        trRepo.save(Transactions.builder()
                .accId(toAccId)
                .counterpartyAccId(fromAccId)
                .amount(amount)
                .transactionType(type)
                .build());
    }
}
