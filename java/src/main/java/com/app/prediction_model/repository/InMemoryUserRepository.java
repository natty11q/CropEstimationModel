package com.app.prediction_model.repository;

import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import org.springframework.stereotype.Repository;

import com.app.prediction_model.model.User;

@Repository
public class InMemoryUserRepository implements UserRepository
{
    private final Map<Long, User> users = new HashMap<>();

    @Override
    public User save(User u)
    {
        users.put(u.getId(), u);
        return u;
    }

    @Override
    public Optional<User> findById(long id)
    {
        User u = (User)users.get(id);
        Optional<User> userResult = Optional.ofNullable(u);
        return userResult;
    }

    @Override
    public Iterable<User> findAll()
    {
        return (Iterable<User>) users.values();
    }
}
