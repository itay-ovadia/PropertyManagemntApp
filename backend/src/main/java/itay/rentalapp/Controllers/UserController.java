package itay.rentalapp.Controllers;

import itay.rentalapp.Boundaries.UserBoundary;
import itay.rentalapp.Entities.UserEntity;
import itay.rentalapp.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // optional if using React frontend
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public List<UserBoundary> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(UserBoundary::new)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public UserBoundary getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(UserBoundary::new)
                .orElse(null); // optional: throw 404 instead
    }

    // Create a new user
    @PostMapping
    public UserBoundary createUser(@RequestBody UserBoundary boundary) {
        // TODO: hash password securely; using placeholder here
        String defaultPasswordHash = "defaultPasswordHash";
        UserEntity entity = boundary.toEntityWithoutPassword(defaultPasswordHash);
        UserEntity saved = userService.createUser(entity);
        return new UserBoundary(saved);
    }

    // Update user
    @PutMapping("/{id}")
    public UserBoundary updateUser(
            @PathVariable String id,
            @RequestBody UserBoundary boundary) {
        return userService.getUserById(id)
                .map(existing -> {
                    existing.setName(boundary.getName());
                    existing.setEmail(boundary.getEmail());
                    existing.setPhoneNumber(boundary.getPhoneNumber());
                    existing.setAge(boundary.getAge());
                    existing.setRole(UserEntity.Role.valueOf(boundary.getRole()));
                    UserEntity updated = userService.createUser(existing);
                    return new UserBoundary(updated);
                })
                .orElse(null); // optional: handle 404
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    // Delete all users
    @DeleteMapping
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }
}
