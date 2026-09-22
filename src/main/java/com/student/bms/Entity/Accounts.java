package com.student.bms.Entity;

import com.student.bms.Entity.type.AccountType;
import com.student.bms.Entity.type.NET_BANKING_PERMISSION;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Table
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Accounts {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @OneToOne
    @JoinColumn
    private User user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column
    private float amount;

    @Column
    private NET_BANKING_PERMISSION permission;

    public Accounts(User us, AccountType accountType, float amount) {
        setUser(us);
        setAccountType(accountType);
        setAmount(amount);
    }
}