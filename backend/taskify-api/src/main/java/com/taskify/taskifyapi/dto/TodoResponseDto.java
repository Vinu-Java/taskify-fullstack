package com.taskify.taskifyapi.dto;

import com.taskify.taskifyapi.enums.Priority;
import com.taskify.taskifyapi.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
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
    private Instant createdAt;
    private Instant updatedAt;
}