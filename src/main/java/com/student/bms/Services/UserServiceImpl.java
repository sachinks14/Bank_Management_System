package com.student.bms.Services;

import com.student.bms.Entity.Dtos.LoginRespUserDTO;
import com.student.bms.Entity.Dtos.UpdateAccountDTO;
import com.student.bms.Entity.User;
import com.student.bms.Entity.type.ROLE;
import com.student.bms.Exceptions.InvalidCredentialsException;
import com.student.bms.Exceptions.UserNotFoundException;
import com.student.bms.Repos.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepo userRepo;

    @Override
    @Transactional
    public boolean deleteUser(Long accId)
    {
        userRepo.deleteById(accId);
        return true;
    }

    @Override
    @Transactional
    public User insertUser(User us)
    {
        return userRepo.save(us);
    }

    @Override
    @Transactional
    public User updateUser(Long id, User user)
    {
        User us = userRepo.findById(id).orElse(null);
        if(us != null)
        {
            return userRepo.save(us);
        }
        else {
            throw new RuntimeException("User not found with Id: "+ id);
        }
    }

    @Transactional
    @Override
    public User updateAccount(UpdateAccountDTO updAcc, Long Id)
    {
        Optional<User> u = userRepo.findById(Id);
        if(u.isPresent())
        {
            if(updAcc.getFullName() != null)
            {
                u.orElseThrow().setFullName(updAcc.getFullName());
            }
            if(updAcc.getMobileNo() != null)
            {
                u.orElseThrow().setMobileNo(updAcc.getMobileNo());
            }
            if(updAcc.getDateOfBirth() != null)
            {
                u.orElseThrow().setDateOfBirth(updAcc.getDateOfBirth());
            }
            if(updAcc.getEmail() != null)
            {
                u.orElseThrow().setEmail(updAcc.getEmail());
            }
            return userRepo.save(u.orElseThrow());
        }
        else return null;
    }

    public LoginRespUserDTO loginUser(String mobNo, String pass) {
        Optional<User> us = userRepo.getUserByMobileNo(mobNo);

        if (!us.isPresent()) {
            throw new UserNotFoundException("User Not Found");
        }

        User user = us.get();

        if (!user.getPassword().equals(pass)) {
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        LoginRespUserDTO ans = new LoginRespUserDTO();
        ans.setId(user.getId());
        ans.setRole(String.valueOf(user.getRole()));
        ans.setFullName(user.getFullName());

        return ans;
    }

    @Override
    @Transactional
    public Optional<User> getById(Long Id)
    {
        return userRepo.findById(Id);
    }


    @Override
    @Transactional
    public void makeAdmin(Long accId)
    {
        User u = userRepo.getUserByAccountId(accId);
        u.setRole(ROLE.ADMIN);
    }

}