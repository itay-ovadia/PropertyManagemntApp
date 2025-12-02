package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.AddressEntity;
import itay.rentalapp.Entities.PropertyEntity;
import itay.rentalapp.Entities.PropertyType;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyBoundary {

    private String propertyId;
    private String name;
    private AddressEntity address;
    private int sqMeter;
    private double bedrooms;
    private double bathrooms;
    private PropertyType propertyType;
    private boolean hasElevator;
    private boolean hasBunker;
    private boolean isRental;

    // Only expose landlord IDs to avoid recursion
    private List<String> landlordIds;

    public PropertyBoundary() {}
    // Convert Entity → Boundary
    public PropertyBoundary(PropertyEntity propertyEntity) {
        this.propertyId = propertyEntity.getPropertyId();
        this.name = propertyEntity.getName();
        this.address = propertyEntity.getAddress();
        this.sqMeter = propertyEntity.getSqMeter();
        this.bedrooms = propertyEntity.getBedrooms();
        this.bathrooms = propertyEntity.getBathrooms();
        this.propertyType = propertyEntity.getPropertyType();
        this.hasElevator = propertyEntity.getHasElevator() != null && propertyEntity.getHasElevator();
        this.hasBunker = propertyEntity.getHasBunker() != null && propertyEntity.getHasBunker();
        this.isRental = propertyEntity.isRental();

        // Directly copy the list of landlord IDs
        this.landlordIds = propertyEntity.getlandlordIDs() != null
                ? new ArrayList<>(propertyEntity.getlandlordIDs())
                : new ArrayList<>();
    }

    // Convert Boundary → Entity
    public PropertyEntity toEntity() {
        return new PropertyEntity(
                propertyId,
                name,
                address,
                sqMeter,
                bedrooms,
                bathrooms,
                propertyType,
                hasElevator,
                hasBunker,
                isRental,
                landlordIds // directly pass the list of IDs
        );
    }

    // Getters and Setters

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

    public void setAddress(AddressEntity addressEntity) {
        this.address = addressEntity;
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
        return isRental;
    }

    public void setRental(boolean rental) {
        isRental = rental;
    }

    public List<String> getLandlordIds() {
        return landlordIds;
    }

    public void setLandlordIds(List<String> landlordIds) {
        this.landlordIds = landlordIds;
    }
}
