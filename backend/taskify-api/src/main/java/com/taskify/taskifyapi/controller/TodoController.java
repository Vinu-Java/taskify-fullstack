package com.taskify.taskifyapi.controller;

import com.taskify.taskifyapi.dto.TodoRequestDto;
import com.taskify.taskifyapi.dto.TodoResponseDto;
import com.taskify.taskifyapi.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/users/{userId}/todos")
    public ResponseEntity<Page<TodoResponseDto>> getTodos(@PathVariable Long userId, @RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "10") int pageSize) {

        return new ResponseEntity<>(
                todoService.getTodos(userId, pageNumber, pageSize),
                HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/todos")
    public ResponseEntity<TodoResponseDto> addTodo(@PathVariable Long userId, @Valid @RequestBody TodoRequestDto todoRequestDto) {

        return new ResponseEntity<>(
                todoService.addTodo(userId, todoRequestDto),
                HttpStatus.CREATED);
    }

    @PutMapping("/todos/{todoId}")
    public ResponseEntity<TodoResponseDto> updateTodo(@PathVariable Long todoId, @Valid @RequestBody TodoRequestDto todoRequestDto) {

        return new ResponseEntity<>(
                todoService.updateTodo(todoId, todoRequestDto),
                HttpStatus.OK);
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.noContent().build();
    }
}
