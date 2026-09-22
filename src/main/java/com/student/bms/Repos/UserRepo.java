package com.student.bms.Repos;

import com.student.bms.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    public Optional<User> getUserByMobileNo(String MobileNo);
    public User getUserByAccountId(Long Id);
}
