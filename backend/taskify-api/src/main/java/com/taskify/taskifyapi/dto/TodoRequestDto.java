package com.taskify.taskifyapi.dto;

import com.taskify.taskifyapi.enums.Status;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private Status status;

    @FutureOrPresent(message = "Due date must be in the future")
    @NotNull(message = "Due date is required")
    private Instant dueDate;

    @NotNull(message = "Priority is required")
    private Instant priority;

}
