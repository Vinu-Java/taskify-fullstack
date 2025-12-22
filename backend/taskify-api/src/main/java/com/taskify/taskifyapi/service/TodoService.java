package com.taskify.taskifyapi.service;

import com.taskify.taskifyapi.dto.TodoRequestDto;
import com.taskify.taskifyapi.dto.TodoResponseDto;
import org.springframework.data.domain.Page;

public interface TodoService {
    Page<TodoResponseDto> getTodos(Long userId, String searchText, int pageNumber, int pageSize);

    TodoResponseDto addTodo(Long userId, TodoRequestDto todoRequestDto);

    TodoResponseDto updateTodo(Long todoId, TodoRequestDto todoRequestDto);

    void deleteTodo(Long todoId);
}
