package itay.rentalapp.Service;

import itay.rentalapp.Entities.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserService {


    List<UserEntity> getAllUsers();
    Optional<UserEntity> getUserById(String id);
    UserEntity createUser(UserEntity user);
    UserEntity updateUser(String id, UserEntity user);
    void deleteUser(String id);
    void deleteAllUsers();
}
