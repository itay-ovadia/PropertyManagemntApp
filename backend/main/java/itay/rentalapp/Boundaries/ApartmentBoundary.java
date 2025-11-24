package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.AddressEntity;
import itay.rentalapp.Entities.ApartmentEntity;
import itay.rentalapp.Entities.LandlordEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ApartmentBoundary {

    private String apartmentId;
    private String name;
    private AddressEntity addressEntity;
    private int sqMeter;
    private double bedrooms;
    private double bathrooms;
    private boolean hasElevator;
    private boolean hasBunker;
    private boolean isRental;

    // Only expose landlord IDs to avoid recursion
    private List<String> landlordIds;

    public ApartmentBoundary() {}

    // Convert Entity → Boundary
    public ApartmentBoundary(ApartmentEntity apartmentEntity) {
        this.apartmentId = apartmentEntity.getApartmentId();
        this.name = apartmentEntity.getName();
        this.addressEntity = apartmentEntity.getAddress();
        this.sqMeter = apartmentEntity.getSqMeter();
        this.bedrooms = apartmentEntity.getBedrooms();
        this.bathrooms = apartmentEntity.getBathrooms();
        this.hasElevator = apartmentEntity.isHasElevator();
        this.hasBunker = apartmentEntity.isHasBunker();
        this.isRental = apartmentEntity.isRental();

        if (apartmentEntity.getLandlords() != null) {
            this.landlordIds = apartmentEntity.getLandlords().stream()
                    .map(LandlordEntity::getId)
                    .collect(Collectors.toList());
        } else {
            this.landlordIds = new ArrayList<>();
        }
    }

    // Convert Boundary → Entity
    public ApartmentEntity toEntity(List<LandlordEntity> resolvedLandlordEntities) {
        return new ApartmentEntity(
                apartmentId,
                name,
                addressEntity,
                sqMeter,
                bedrooms,
                bathrooms,
                hasElevator,
                hasBunker,
                isRental,
                resolvedLandlordEntities
        );
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
        return addressEntity;
    }

    public void setAddress(AddressEntity addressEntity) {
        this.addressEntity = addressEntity;
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
