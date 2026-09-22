package com.student.bms.Repos;

import com.student.bms.Entity.Accounts;
import com.student.bms.Entity.type.NET_BANKING_PERMISSION;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Accounts, Long> {
    public Accounts getAccountById(Long Id);
    public float getAmountById(Long Id);
    public NET_BANKING_PERMISSION getPermissionById(Long Id);
}
