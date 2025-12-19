package com.taskify.taskifyapi.service.implementation;

import com.taskify.taskifyapi.dto.LoginDto;
import com.taskify.taskifyapi.dto.RegisterRequestDto;
import com.taskify.taskifyapi.dto.UserResponseDto;
import com.taskify.taskifyapi.entity.User;
import com.taskify.taskifyapi.exception.UserNotFoundException;
import com.taskify.taskifyapi.repository.UserRepository;
import com.taskify.taskifyapi.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto login(LoginDto loginDto) {
        
        User user = userRepository
                .findByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword())
                .orElseThrow(() -> new UserNotFoundException("Invalid credential"));
        
        return new UserResponseDto(
                user.getId(), 
                user.getUserName(), 
                user.getEmail());
    }

    @Override
    public UserResponseDto register(RegisterRequestDto registerRequestDto) {
        User user = new User();
        user.setUserName(registerRequestDto.getUserName());
        user.setEmail(registerRequestDto.getEmail());
        user.setPassword(registerRequestDto.getPassword());
        
        User newUser = userRepository.save(user);
        
        return new UserResponseDto(
                newUser.getId(),
                newUser.getUserName(),
                newUser.getEmail());
    }

    @Transactional
    @Override
    public UserResponseDto updateUser(Long userId, RegisterRequestDto registerRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("Invalid user id : " + userId));
        
        if (registerRequestDto.getUserName() != null) user.setUserName(registerRequestDto.getUserName());
        if (registerRequestDto.getEmail() != null) user.setEmail(registerRequestDto.getEmail());
        if (registerRequestDto.getPassword() != null) user.setPassword(registerRequestDto.getPassword());
        
        User updatedUser = userRepository.save(user);
        
        return new UserResponseDto(
                updatedUser.getId(),
                updatedUser.getUserName(),
                updatedUser.getEmail()
        );
    }

    @Override
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("Invalid user id : " + userId));

        userRepository.delete(user);
    }

}
