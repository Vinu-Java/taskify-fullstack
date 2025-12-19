package com.taskify.taskifyapi.dto;

import com.taskify.taskifyapi.enums.Priority;
import com.taskify.taskifyapi.enums.Status;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoResponseDto {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDate dueDate;
    private Priority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}