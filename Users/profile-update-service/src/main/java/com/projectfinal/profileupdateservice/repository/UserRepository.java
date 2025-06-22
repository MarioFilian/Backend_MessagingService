package com.projectfinal.profileupdateservice.repository;

import com.projectfinal.profileupdateservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}