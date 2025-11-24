package itay.rentalapp.Entities;

import java.util.List;
import java.util.stream.Collectors;

public class LandlordEntity extends UserEntity {

    private List<ApartmentEntity> ownedApartmentEntities;  // List of apartments owned by the landlord

    // Default constructor (calls the parent constructor)
    public LandlordEntity() {
        super();  // Calls User's default constructor
        setRole(Role.LANDLORD);  // Ensures the user is always set as a landlord
    }

    // Parameterized constructor to create a fully initialized Landlord object
    public LandlordEntity(String name, String email, String phoneNumber, String passwordHash, List<ApartmentEntity> ownedApartmentEntities) {
        super(name, email, phoneNumber, passwordHash, Role.LANDLORD); // Calls User's parameterized constructor
        this.ownedApartmentEntities = ownedApartmentEntities;
    }

    // Getter for owned apartments
    public List<ApartmentEntity> getOwnedApartments() {
        return ownedApartmentEntities;
    }

    // Setter for owned apartments
    public void setOwnedApartments(List<ApartmentEntity> ownedApartmentEntities) {
        this.ownedApartmentEntities = ownedApartmentEntities;
    }

    @Override
    public String toString() {
        String apartmentIds = "null";
        if (ownedApartmentEntities != null) {
            apartmentIds = ownedApartmentEntities.stream()
                    .map(apartment -> apartment.getApartmentId())  // Just get the apartment ID to avoid recursion
                    .collect(Collectors.joining(", ", "[", "]"));
        }
        return "Landlord{" +
                "name='" + getName() + '\'' +
                ", email='" + getEmail() + '\'' +
                ", ownedApartments=" + apartmentIds +
                '}';
    }
}
