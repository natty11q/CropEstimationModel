package com.app.prediction_model.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.app.prediction_model.model.User;

/**
 * Student Repository used for all Grades.
 *
 * @author Nathaniel Frimpong-Santeng
 * @version 1.0
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}