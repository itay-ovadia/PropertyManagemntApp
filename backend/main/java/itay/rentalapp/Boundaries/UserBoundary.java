package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.UserEntity;

public class UserBoundary {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private int age;
    private String role;

    public UserBoundary() {}

    // Constructor from Entity
    public UserBoundary(UserEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phoneNumber = entity.getPhoneNumber();
        this.age = entity.getAge();
        this.role = entity.getRole().name();
    }

    // Converts boundary back to entity (only when needed)
    public UserEntity toEntityWithoutPassword(String passwordHash) {
        UserEntity entity = new UserEntity();
        entity.setId(this.id);
        entity.setName(this.name);
        entity.setEmail(this.email);
        entity.setPhoneNumber(this.phoneNumber);
        entity.setAge(this.age);
        entity.setPasswordHash(passwordHash); // pass securely hashed password here
        entity.setRole(UserEntity.Role.valueOf(this.role));
        return entity;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
