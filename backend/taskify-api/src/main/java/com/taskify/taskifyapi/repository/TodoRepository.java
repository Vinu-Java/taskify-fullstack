package com.taskify.taskifyapi.repository;

import com.taskify.taskifyapi.dto.TodoRequestDto;
import com.taskify.taskifyapi.dto.TodoResponseDto;
import com.taskify.taskifyapi.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Page<Todo> findByUserId(Long id, Pageable pageable);
}
