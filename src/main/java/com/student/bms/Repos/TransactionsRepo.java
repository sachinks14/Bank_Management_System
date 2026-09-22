package com.student.bms.Repos;

import com.student.bms.Entity.MongoEntities.Transactions;
import com.student.bms.Entity.type.TRANSACTION_TYPE;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionsRepo extends MongoRepository<Transactions, String> {
    public List<Transactions> findByAccId(Long accId);
    public List<Transactions> findByAccIdAndTimeOfTransactionBetween(Long accId, LocalDateTime from, LocalDateTime till);
    public List<Transactions> findByAccIdAndTransactionType(Long accId, TRANSACTION_TYPE type);
}
