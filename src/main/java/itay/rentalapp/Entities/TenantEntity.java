package itay.rentalapp.Entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "tenants")
public class TenantEntity extends UserEntity {

    @Field("rentedApartment")
    private ApartmentEntity rentedApartmentEntity; // Reference to the apartment that the tenant is renting
    private String tenantHistory; // Optional: Could hold tenant's rental history or other related information

    // Default constructor
    public TenantEntity() {}

    // Parameterized constructor
    public TenantEntity(String name, String email, String phoneNumber, String passwordHash, ApartmentEntity rentedApartmentEntity) {
        super(name, email, phoneNumber, passwordHash, Role.TENANT);

        // Validation: Ensure that the rentedApartment is not null
        if (rentedApartmentEntity == null) {
            throw new IllegalArgumentException("Tenant must be assigned a valid apartment.");
        }

        this.rentedApartmentEntity = rentedApartmentEntity;
    }

    // Getter for rentedApartment
    public ApartmentEntity getRentedApartment() {
        return rentedApartmentEntity;
    }

    // Setter for rentedApartment with validation
    public void setRentedApartment(ApartmentEntity rentedApartmentEntity) {
        if (rentedApartmentEntity == null) {
            throw new IllegalArgumentException("Apartment cannot be null.");
        }
        this.rentedApartmentEntity = rentedApartmentEntity;
    }

    // Getter for tenantHistory (optional field for tenant's rental history)
    public String getTenantHistory() {
        return tenantHistory;
    }

    // Setter for tenantHistory
    public void setTenantHistory(String tenantHistory) {
        this.tenantHistory = tenantHistory;
    }

    // Override toString for Tenant representation
    @Override
    public String toString() {
        return "Tenant{id='" + getId() + "', name='" + getName() + "', rentedApartment=" + rentedApartmentEntity + "}";
    }
}
