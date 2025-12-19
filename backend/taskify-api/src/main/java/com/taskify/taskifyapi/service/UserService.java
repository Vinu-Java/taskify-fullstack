package com.taskify.taskifyapi.service;

import com.taskify.taskifyapi.dto.LoginDto;
import com.taskify.taskifyapi.dto.RegisterRequestDto;
import com.taskify.taskifyapi.dto.UserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    UserResponseDto login(LoginDto loginDto);

    UserResponseDto register(RegisterRequestDto registerRequestDto);

    UserResponseDto updateUser(Long userId, RegisterRequestDto registerRequestDto);

    void deleteUser(Long userId);
}
