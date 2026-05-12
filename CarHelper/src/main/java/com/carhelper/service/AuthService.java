package com.carhelper.service;

import com.carhelper.dto.AuthRequest;
import com.carhelper.dto.ResetPasswordRequest;
import com.carhelper.model.User;
import com.carhelper.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(AuthRequest request) {
        if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Username, email and password are required.");
        }

        if (request.getUsername().trim().isEmpty() || request.getEmail().trim().isEmpty() || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Username, email and password are required.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        return userRepository.save(newUser);
    }

    public User login(AuthRequest request) {
        User foundUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!foundUser.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        return foundUser;
    }

    public User resetPassword(ResetPasswordRequest request) {
        if (request.getEmail() == null || request.getNewPassword() == null) {
            throw new IllegalArgumentException("Email and new password are required.");
        }

        if (request.getEmail().trim().isEmpty() || request.getNewPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Email and new password are required.");
        }

        if (request.getNewPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters.");
        }

        User foundUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email not found."));

        foundUser.setPassword(request.getNewPassword());
        return userRepository.save(foundUser);
    }
}