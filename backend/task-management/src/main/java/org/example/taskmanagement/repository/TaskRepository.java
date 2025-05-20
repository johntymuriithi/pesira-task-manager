package org.example.taskmanagement.repository;

import org.example.taskmanagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Spring Data JPA provides all basic CRUD operations
    // Custom queries can be added here if needed
}