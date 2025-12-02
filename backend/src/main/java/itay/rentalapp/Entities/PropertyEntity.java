package itay.rentalapp.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "properties")
public class PropertyEntity {

    @Id
    private String propertyId;

    private String name;
    private AddressEntity address;

    @JsonProperty("sq_meter")
    private int sqMeter;

    private double bedrooms;
    private double bathrooms;

    private PropertyType propertyType;  // NEW FIELD
    private Boolean hasElevator; // nullable
    private Boolean hasBunker;   // nullable

    @JsonProperty("is_rental")
    private boolean rental;

    private List<String> landlordIDs = new ArrayList<>();

    public PropertyEntity() {}

    public PropertyEntity(String propertyId,
                          String name,
                          AddressEntity address,
                          int sqMeter,
                          double bedrooms,
                          double bathrooms,
                          PropertyType propertyType,
                          Boolean hasElevator,
                          Boolean hasBunker,
                          boolean rental,
                          List<String> landlordIDs) {

        this.propertyId = propertyId;
        this.name = name;
        this.address = address;
        this.sqMeter = sqMeter;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.propertyType = propertyType;
        this.hasElevator = hasElevator;
        this.hasBunker = hasBunker;
        this.rental = rental;
        this.landlordIDs = landlordIDs != null ? new ArrayList<>(landlordIDs) : new ArrayList<>();
    }

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
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

    public void setAddress(AddressEntity address) {
        this.address = address;
    }

    public int getSqMeter() {
        return sqMeter;
    }

    public void setSqMeter(int sqMeter) {
        this.sqMeter = sqMeter;
    }

    public double getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(double bedrooms) {
        this.bedrooms = bedrooms;
    }

    public double getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(double bathrooms) {
        this.bathrooms = bathrooms;
    }

    public PropertyType getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(PropertyType propertyType) {
        this.propertyType = propertyType;
    }

    public Boolean getHasElevator() {
        return hasElevator;
    }

    public void setHasElevator(Boolean hasElevator) {
        this.hasElevator = hasElevator;
    }

    public Boolean getHasBunker() {
        return hasBunker;
    }

    public void setHasBunker(Boolean hasBunker) {
        this.hasBunker = hasBunker;
    }

    public boolean isRental() {
        return rental;
    }

    public void setRental(boolean rental) {
        this.rental = rental;
    }

    public List<String> getlandlordIDs() {
        return landlordIDs;
    }

    public void setLandlords(List<String> landlordIDs) {
        this.landlordIDs = landlordIDs;
    }

    // Getters / Setters...

    @Override
    public String toString() {
        String landlordIds = landlordIDs == null ? "null"
                : landlordIDs.stream()
                .collect(Collectors.joining(", ", "[", "]"));

        return "Property{" +
                "propertyId='" + propertyId + '\'' +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", sqMeter=" + sqMeter +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", propertyType=" + propertyType +
                ", hasElevator=" + hasElevator +
                ", hasBunker=" + hasBunker +
                ", isRental=" + rental +
                ", landlords=" + landlordIds +
                '}';
    }
}
