package com.app.prediction_model.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
// import com.app.prediction_model.repository.UserRepository;
import com.app.prediction_model.model.User;
import com.app.prediction_model.repository.InMemoryUserRepository;


@RestController
public class UserController {
    
    private final InMemoryUserRepository userRepository;

    /**
     * Constructs a new {@code UserController}.
     *
     * @param userRepository the repository used to access user data
     */
    public UserController(InMemoryUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> addUser(@RequestBody Map<String, String> params) {

        if (params.get("id") == null) {
            throw new IllegalArgumentException("user_id is required");
        }
        final Long id = Long.valueOf(params.get("id"));
        
        String firstName = params.get("firstName");
        if (firstName == null) {
            throw new IllegalArgumentException("firstname is required");
        }
        
        String lastName = params.get("lastName");
        if (lastName == null) {
            throw new IllegalArgumentException("lastname is required");
        }
        
        String username = params.get("username");
        if (username == null) {
            throw new IllegalArgumentException("username is required");
        }
        
        String email = params.get("email");
        if (email == null) {
            throw new IllegalArgumentException("email is required");
        }

        User user = new User(
            id,
            firstName,
            lastName,
            username,
            email
        );

        return ResponseEntity.ok(user);
    }


    @GetMapping("/Users")
    public Map<String, Object> getUsers() {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> embedded = new HashMap<>();
    
        embedded.put("users", userRepository.findAll());
        response.put("_embedded", embedded);
    
    
        return response;
    }
    }
