package com.student.bms.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.student.bms.Entity.type.ROLE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "users")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private String fullName;

    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate DateOfBirth;

    @Column
    private String email;

    @Column(nullable = false)
    private String mobileNo;

    @Enumerated(EnumType.STRING)
    private ROLE role;

    @Column
    private String branch;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Accounts account;

    @Column
    private String Password;

    public User(String fullName, String email, String mobileNo, ROLE role, LocalDateTime dateOfBirth, String branch, String pass) {
        setFullName(fullName);
        setBranch(branch);
        setEmail(email);
        setMobileNo(mobileNo);
        setDateOfBirth(LocalDate.from(dateOfBirth));
        setRole(role);
        setPassword(pass);
    }
}
