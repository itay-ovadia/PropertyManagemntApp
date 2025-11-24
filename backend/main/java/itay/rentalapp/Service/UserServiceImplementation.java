package itay.rentalapp.Service;

import itay.rentalapp.Entities.UserEntity;
import itay.rentalapp.UserCrud;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserServiceImplementation implements UserService {

    private final UserCrud userCrud; // inject your MongoDB repository

    public UserServiceImplementation(UserCrud userCrud) {
        this.userCrud = userCrud;
    }

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10}$");

    @Override
    public List<UserEntity> getAllUsers() {
        return userCrud.findAll();
    }

    @Override
    public Optional<UserEntity> getUserById(String id) {
        return userCrud.findById(id)
                .or(() -> { throw new RuntimeException("User not found with id: " + id); });
    }

    @Override
    public UserEntity createUser(UserEntity user) {
        validateUser(user);
        return userCrud.save(user);
    }

    @Override
    public UserEntity updateUser(String id, UserEntity user) {
        validateUser(user); // validate updated data
        return userCrud.findById(id)
                .map(existing -> {
                    if (user.getName() != null) existing.setName(user.getName());
                    if (user.getEmail() != null) existing.setEmail(user.getEmail());
                    if (user.getPhoneNumber() != null) existing.setPhoneNumber(user.getPhoneNumber());
                    existing.setAge(user.getAge());
                    if (user.getPasswordHash() != null) existing.setPasswordHash(user.getPasswordHash());
                    if (user.getRole() != null) existing.setRole(user.getRole());
                    return userCrud.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public void deleteUser(String id) {
        if (!userCrud.existsById(id)) {
            throw new RuntimeException("Cannot delete. User not found with id: " + id);
        }
        userCrud.deleteById(id);
    }

    @Override
    public void deleteAllUsers() {
        userCrud.deleteAll();
    }

    // -------------------------
    // Validation helper method
    // -------------------------
    private void validateUser(UserEntity user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new RuntimeException("Email cannot be null or empty");
        }
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            throw new RuntimeException("Invalid email format: " + user.getEmail());
        }

        if (user.getPhoneNumber() != null && !PHONE_PATTERN.matcher(user.getPhoneNumber()).matches()) {
            throw new RuntimeException("Phone number must be exactly 10 digits: " + user.getPhoneNumber());
        }

        if (user.getRole() == null) {
            throw new RuntimeException("User role cannot be null");
        }

        if (user.getName() == null || user.getName().isBlank()) {
            throw new RuntimeException("User name cannot be empty");
        }

        if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
            throw new RuntimeException("Password cannot be empty");
        }
        if (user.getAge() <=0 || user.getAge()>120){
            throw new RuntimeException("Please enter a valid age");
        }
    }
}
