    package itay.rentalapp.Entities;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;
    import jakarta.validation.constraints.Email;
    import jakarta.validation.constraints.NotBlank;
    import jakarta.validation.constraints.Pattern;

    @Document(collection = "users")
    public class UserEntity {
        @Id
        private String id;  // Unique identifier for each user

        @NotBlank(message = "Name is mandatory")
        private String name;  // User's name

        private int age;  // User's age (optional, based on your use case)

        @Email(message = "Email should be valid")
        private String email;  // User's email address

        @Pattern(regexp = "^[0-9]{10}$", message = "Phone number should be 10 digits")
        private String phoneNumber;  // User's phone number

        @NotBlank(message = "Password is mandatory")
        private String passwordHash;  // Store hashed password (not plain text)

        private Role role;  // Role of the user (e.g., LANDLORD, TENANT, ADMIN)

        public enum Role {
            LANDLORD,
            TENANT,
            ADMIN
        }
        // Default constructor
        public UserEntity() {}

        // Parameterized constructor
        public UserEntity(String name, String email, String phoneNumber, String passwordHash, Role role) {
            this.name = name;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.passwordHash = passwordHash;
            this.role = role;
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

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
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

        public String getPasswordHash() {
            return passwordHash;
        }

        public void setPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
        }

        public Role getRole() {
            return role;
        }

        public void setRole(Role role) {
            this.role = role;
        }


        @Override
        public String toString() {
            return "User{id='" + id + "', name='" + name + "', email='" + email + "', role=" + role + "}";
        }

    }
