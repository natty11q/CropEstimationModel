package com.app.prediction_model.repository;

// import org.springframework.data.repository.CrudRepository;
// import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.app.prediction_model.model.User;

// /**
//  * User Repository used for all Grades.
//  *
//  * @author Nathaniel Frimpong-Santeng
//  * @version 1.0
//  */
// @Repository
// public interface UserRepository extends CrudRepository<User, Long> {

// }


public interface UserRepository {
    User save(User u);
    Optional<User> findById(long id);
    Iterable<User> findAll();
}


