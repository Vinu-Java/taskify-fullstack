package com.taskify.taskifyapi.service.implementation;

import com.taskify.taskifyapi.dto.TodoRequestDto;
import com.taskify.taskifyapi.dto.TodoResponseDto;
import com.taskify.taskifyapi.entity.Todo;
import com.taskify.taskifyapi.entity.User;
import com.taskify.taskifyapi.exception.TodoNotFoundException;
import com.taskify.taskifyapi.exception.UserNotFoundException;
import com.taskify.taskifyapi.repository.TodoRepository;
import com.taskify.taskifyapi.repository.UserRepository;
import com.taskify.taskifyapi.service.TodoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoServiceImpl(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<TodoResponseDto> getTodos(Long userId, String searchText, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        searchText = (searchText == null) ? "" : searchText.trim();

        Page<Todo> todos;
        if (searchText.isEmpty()) {
            todos = todoRepository.findByUserId(userId, pageable);
        } else {
            todos = todoRepository.findByUserIdAndTitleContainingIgnoreCaseOrUserIdAndDescriptionContainingIgnoreCase(userId, searchText, userId, searchText, pageable);
        }

        return todos.map(this::mapToDto);
    }

    @Override
    public TodoResponseDto addTodo(Long userId, TodoRequestDto todoRequestDto) {
        Todo todo = new Todo();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("invalid user userId : " + userId));

        todo.setTitle(todoRequestDto.getTitle());
        todo.setDescription(todoRequestDto.getDescription());
        todo.setStatus(todoRequestDto.getStatus());
        todo.setDueDate(todoRequestDto.getDueDate());
        todo.setPriority(todoRequestDto.getPriority());
        todo.setUser(user);

        return mapToDto(todoRepository.save(todo));
    }

    @Transactional
    @Override
    public TodoResponseDto updateTodo(Long todoId, TodoRequestDto todoRequestDto) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(
                () -> new TodoNotFoundException("invalid todo id : " + todoId));

        if (todoRequestDto.getTitle() != null) todo.setTitle(todoRequestDto.getTitle());
        if (todoRequestDto.getDescription() != null) todo.setDescription(todoRequestDto.getDescription());
        if (todoRequestDto.getStatus() != null) todo.setStatus(todoRequestDto.getStatus());
        if (todoRequestDto.getDueDate() != null) todo.setDueDate(todoRequestDto.getDueDate());
        if (todoRequestDto.getPriority() != null) todo.setPriority(todoRequestDto.getPriority());

        return mapToDto(todo);
    }

    @Override
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(
                () -> new TodoNotFoundException("invalid todo id : " + todoId));

        todoRepository.delete(todo);
    }

    private TodoResponseDto mapToDto(Todo todo) {
        TodoResponseDto dto = new TodoResponseDto();

        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setStatus(todo.getStatus());
        dto.setDueDate(todo.getDueDate());
        dto.setPriority(todo.getPriority());
        dto.setCreatedAt(todo.getCreatedAt());
        dto.setUpdatedAt(todo.getUpdatedAt());

        return dto;
    }


}
