package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.LandlordEntity;
import itay.rentalapp.Entities.ApartmentEntity;

import java.util.List;
import java.util.stream.Collectors;

public class LandlordBoundary {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private List<String> ownedApartmentIds;

    // Default constructor
    public LandlordBoundary() {}

    // Constructor to build boundary from entity
    public LandlordBoundary(LandlordEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phoneNumber = entity.getPhoneNumber();
        if (entity.getOwnedApartments() != null) {
            this.ownedApartmentIds = entity.getOwnedApartments().stream()
                    .map(ApartmentEntity::getApartmentId)
                    .collect(Collectors.toList());
        }
    }

    // Optionally, if you want to convert this boundary to an entity (for input)
    public LandlordEntity toEntity() {
        LandlordEntity landlord = new LandlordEntity();
        landlord.setId(this.id);
        landlord.setName(this.name);
        landlord.setEmail(this.email);
        landlord.setPhoneNumber(this.phoneNumber);
        // You can set password and apartments separately in service layer
        return landlord;
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

    public List<String> getOwnedApartmentIds() {
        return ownedApartmentIds;
    }

    public void setOwnedApartmentIds(List<String> ownedApartmentIds) {
        this.ownedApartmentIds = ownedApartmentIds;
    }

    @Override
    public String toString() {
        return "LandlordBoundary{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", ownedApartmentIds=" + ownedApartmentIds +
                '}';
    }
}
