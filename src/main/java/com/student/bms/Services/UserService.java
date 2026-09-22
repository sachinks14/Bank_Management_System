package com.student.bms.Services;

import com.student.bms.Entity.Dtos.UpdateAccountDTO;
import com.student.bms.Entity.User;

import java.util.Optional;

public interface UserService {
    public Optional<User> getById(Long Id);
    public User updateUser(Long id, User user);
    public User insertUser(User us);
    public boolean deleteUser(Long accId);
    public User updateAccount(UpdateAccountDTO updAcc, Long Id);
    public void makeAdmin(Long accId);
}
