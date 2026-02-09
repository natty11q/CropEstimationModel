package com.app.prediction_model.model;

// import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;

public class User {

    @Id
    @GeneratedValue
    private long id;
    
    private String firstName;
    private String lastName;
    private String username;
    private String email;


    protected User() {}

      /**
   * Constructs a new user object.
   *
   * @param id the unique ID of the user
   * @param firstName the first name of the user
   * @param lastName the last name of the user
   * @param username the username of the user
   * @param email the email address of the user
   */
    public User(long id, String firstName, String lastName, String username, String email)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
    }


    /**
     * Gets the user's UUId.
     *
     * @return the user's UUId
     */
    public long getId()
    {
        return id;
    }

    /**
     *
     * Sets the user's UUId.
     * @param id the new id
     **/
    public void setId(long id)
    {
        this.id = id;
    }

     /**
     * Gets the user's first name.
     *
     * @return the user's first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the user's first name.
     *
     * @param newFirstName the new firstname
     */
    public void setFirstName(String newFirstName) {
        firstName = newFirstName;
    }

    /**
     * Gets the user's last name.
     *
     * @return the user's last name
     */
    public String getLastName() {
        return lastName;
    }


    /**
     * Sets the user's last name.
     *
     * @param newLastName the new lastname
     */
    public void setLastName(String newLastName) {
        lastName = newLastName;
    }

      /**
     * Gets the user's full name.
     *
     * @return the full name in the format "First Last"
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }



    /**
     * Gets the user's username.
     *
     * @return the user's username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the user's username.
     *
     * @param newUserName the user's new username
     */
    public void setUsername(String newUserName) {
        username = newUserName;
    }


    /**
     * Gets the user's email address.
     *
     * @return the email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email address.
     *
     * @param newEmail the new email address
     */
    public void setEmail(String newEmail) {
        email = newEmail;
    }
}
