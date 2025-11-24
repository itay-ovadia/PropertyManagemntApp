package itay.rentalapp.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "apartments")
public class ApartmentEntity {
    @Id
    private String apartmentId; // Unique identifier for the apartment
    private String name;
    private AddressEntity address;
    @JsonProperty("sq_meter")
    private int sqMeter;
    @JsonProperty("is_rental")
    private boolean rental;

    private double bedrooms;
    private double bathrooms;
    private boolean hasElevator;
    private boolean hasBunker;
    private List<LandlordEntity> landlords;

    // Default constructor
    public ApartmentEntity() {
        this.landlords = new ArrayList<>();
    }

    // Parameterized constructor
    public ApartmentEntity(String apartmentId, String name, AddressEntity address, int sqMeter, double bedrooms,
                           double bathrooms, boolean hasElevator, boolean hasBunker,
                           boolean rental, List<LandlordEntity> landlords) {
        this.apartmentId = apartmentId;
        this.name = name;
        this.address = address;
        this.sqMeter = sqMeter;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.hasElevator = hasElevator;
        this.hasBunker = hasBunker;
        this.rental = rental;
        this.landlords = landlords != null ? new ArrayList<>(landlords) : new ArrayList<>();
    }

    // Getters and Setters
    public String getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(String apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressEntity getAddress() {
        return address;
    }

    public void setAddress(AddressEntity addressEntity) {
        this.address = addressEntity;
    }

    public int getSqMeter() {
        return sqMeter;
    }

    public void setSqMeter(int sqMeter) {
        if (sqMeter < 0) {
            throw new IllegalArgumentException("Square meters cannot be negative");
        }
        this.sqMeter = sqMeter;
    }

    public double getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(double bedrooms) {
        if (bedrooms < 0) {
            throw new IllegalArgumentException("Number of bedrooms cannot be negative");
        }
        this.bedrooms = bedrooms;
    }

    public double getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(double bathrooms) {
        if (bathrooms < 0) {
            throw new IllegalArgumentException("Number of bathrooms cannot be negative");
        }
        this.bathrooms = bathrooms;
    }

    public boolean isHasElevator() {
        return hasElevator;
    }

    public void setHasElevator(boolean hasElevator) {
        this.hasElevator = hasElevator;
    }

    public boolean isHasBunker() {
        return hasBunker;
    }

    public void setHasBunker(boolean hasBunker) {
        this.hasBunker = hasBunker;
    }

    public boolean isRental() {
        return rental;
    }

    public void setRental(boolean isRental) {
        this.rental = isRental;
    }

    public List<LandlordEntity> getLandlords() {
        return new ArrayList<>(landlords);
    }

    public void setLandlords(List<LandlordEntity> landlordEntities) {
        this.landlords = landlordEntities != null ? new ArrayList<>(landlordEntities) : new ArrayList<>();
    }

    public void addLandlord(LandlordEntity landlordEntity) {
        if (landlordEntity != null && !landlords.contains(landlordEntity)) {
            landlords.add(landlordEntity);
        }
    }

    public void removeLandlord(LandlordEntity landlordEntity) {
        landlords.remove(landlordEntity);
    }

    @Override
    public String toString() {
        String landlordInfo = "null";
        if (landlords != null) {
            landlordInfo = landlords.stream()
                    .map(landlordEntity -> landlordEntity.getId())
                    .collect(Collectors.joining(", ", "[", "]"));
        }

        return "Apartment{" +
                "apartmentId='" + apartmentId + '\'' +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", sqMeter=" + sqMeter +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", hasElevator=" + hasElevator +
                ", hasBunker=" + hasBunker +
                ", isRental=" + rental +
                ", landlords=" + landlordInfo +
                '}';
    }
}