package com.todoapp.backend.dto;

import com.todoapp.backend.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Task type is required")
    private Task.Type type;

    // Only required for TIME_BASED tasks
    private Long targetTimeSeconds;
}
