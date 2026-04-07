package com.todoapp.backend.dto;

import com.todoapp.backend.model.Task;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskStatusUpdate {

    @NotNull(message = "Status is required")
    private Task.Status status;

    // For time-based tasks: updated elapsed time in seconds
    private Long timeSpentSeconds;
}
