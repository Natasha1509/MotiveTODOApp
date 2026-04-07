package com.todoapp.backend.dto;

import com.todoapp.backend.model.Task;
import lombok.Data;

@Data
public class TaskResponse {

    private Long id;
    private String title;
    private Task.Type type;
    private Task.Status status;
    private Long targetTimeSeconds;
    private Long timeSpentSeconds;

    public static TaskResponse from(Task task) {
        TaskResponse r = new TaskResponse();
        r.setId(task.getId());
        r.setTitle(task.getTitle());
        r.setType(task.getType());
        r.setStatus(task.getStatus());
        r.setTargetTimeSeconds(task.getTargetTimeSeconds());
        r.setTimeSpentSeconds(task.getTimeSpentSeconds());
        return r;
    }
}
