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
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<TodoResponseDto>> getTodos(
            @PathVariable Long userId,
            @RequestParam(name = "search", required = false, defaultValue = "") String searchText,
            @RequestParam(name = "page", defaultValue = "0") int pageNumber,
            @RequestParam(name = "size", defaultValue = "10") int pageSize) {

        return new ResponseEntity<>(
                todoService.getTodos(userId, searchText, pageNumber, pageSize),
                HttpStatus.OK);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<TodoResponseDto> addTodo(
            @PathVariable Long userId,
            @Valid @RequestBody TodoRequestDto todoRequestDto) {

        return new ResponseEntity<>(
                todoService.addTodo(userId, todoRequestDto),
                HttpStatus.CREATED);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoResponseDto> updateTodo(
            @PathVariable Long todoId,
            @Valid @RequestBody TodoRequestDto todoRequestDto) {

        return new ResponseEntity<>(
                todoService.updateTodo(todoId, todoRequestDto),
                HttpStatus.OK);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.noContent().build();
    }
}
