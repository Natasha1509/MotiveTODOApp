package com.todoapp.backend.service;

import com.todoapp.backend.dto.TaskRequest;
import com.todoapp.backend.dto.TaskResponse;
import com.todoapp.backend.dto.TaskStatusUpdate;
import com.todoapp.backend.model.Task;
import com.todoapp.backend.model.User;
import com.todoapp.backend.repository.TaskRepository;
import com.todoapp.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public List<TaskResponse> getAllTasks(String username) {
        User user = getUser(username);
        return taskRepository.findByUserOrderByIdDesc(user)
                .stream()
                .map(TaskResponse::from)
                .collect(Collectors.toList());
    }

    public TaskResponse createTask(String username, TaskRequest request) {
        User user = getUser(username);

        Task task = Task.builder()
                .title(request.getTitle())
                .type(request.getType())
                .targetTimeSeconds(request.getTargetTimeSeconds())
                .user(user)
                .build();

        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse updateTask(String username, Long taskId, TaskRequest request) {
        User user = getUser(username);
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        task.setTitle(request.getTitle());
        task.setType(request.getType());
        task.setTargetTimeSeconds(request.getTargetTimeSeconds());

        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse updateStatus(String username, Long taskId, TaskStatusUpdate update) {
        User user = getUser(username);
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        task.setStatus(update.getStatus());
        if (update.getTimeSpentSeconds() != null) {
            task.setTimeSpentSeconds(update.getTimeSpentSeconds());
        }

        return TaskResponse.from(taskRepository.save(task));
    }

    public void deleteTask(String username, Long taskId) {
        User user = getUser(username);
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        taskRepository.delete(task);
    }
}
