package itay.rentalapp.Entities;

import org.apache.catalina.User;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rentals")
public class RentalEntity {
    @Id
    private String rentalId;          // Unique identifier for the rental
    private PropertyEntity propertyEntity;       // The apartment being rented
    private TenantEntity tenantEntity;             // The tenant renting the apartment
    private List<UserEntity> landlords;  // List of landlords for the apartment
    private int rentPrice;          // Monthly rent price
    private LocalDate startDate;       // Rental start date
    private LocalDate endDate;         // Rental end date
    private String rentalTerms;        // Special terms for the rental agreement

    // Default constructor
    public RentalEntity() {

        this.landlords = new ArrayList<>();
    }


    // Parameterized constructor
    public RentalEntity(String rentalId, PropertyEntity propertyEntity, TenantEntity tenantEntity, List<UserEntity> landlords, int rentPrice, LocalDate startDate, LocalDate endDate, String rentalTerms) {
        if (propertyEntity == null || tenantEntity == null || landlords == null || landlords.isEmpty()) {
            throw new IllegalArgumentException("Apartment, tenant, and at least one landlord must be provided");
        }
        if (rentPrice < 0) {
            throw new IllegalArgumentException("Rent price cannot be negative");
        }
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }
        this.rentalId = rentalId;
        this.propertyEntity = propertyEntity;
        this.tenantEntity = tenantEntity;
        this.landlords = new ArrayList<>(landlords);
        this.rentPrice = rentPrice;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rentalTerms = rentalTerms;
    }

    // Getters and Setters
    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public PropertyEntity getApartment() {
        return propertyEntity;
    }

    public void setApartment(PropertyEntity propertyEntity) {
        if (propertyEntity == null) {
            throw new IllegalArgumentException("Apartment cannot be null");
        }
        this.propertyEntity = propertyEntity;
    }

    public TenantEntity getTenant() {
        return tenantEntity;
    }

    public void setTenant(TenantEntity tenantEntity) {
        if (tenantEntity == null) {
            throw new IllegalArgumentException("Tenant cannot be null");
        }
        this.tenantEntity = tenantEntity;
    }

    public List<UserEntity> getLandlords() {
        return new ArrayList<>(landlords);
    }

    public void setLandlords(List<UserEntity> landlordEntities) {
        if (landlordEntities == null || landlordEntities.isEmpty()) {
            throw new IllegalArgumentException("At least one landlord must be provided");
        }
        this.landlords = new ArrayList<>(landlordEntities);
    }

    public void addLandlord(UserEntity landlordEntity) {
        if (landlordEntity != null && !landlords.contains(landlordEntity)) {
            landlords.add(landlordEntity);
        }
    }

    public void removeLandlord(UserEntity landlordEntity) {
        if (landlords.size() <= 1) {
            throw new IllegalStateException("Cannot remove the last landlord");
        }
        landlords.remove(landlordEntity);
    }

    public int getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(int rentPrice) {
        if (rentPrice < 0) {
            throw new IllegalArgumentException("Rent price cannot be negative");
        }
        this.rentPrice = rentPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date must be after or equal to start date");
        }
        this.endDate = endDate;
    }

    public String getRentalTerms() {
        return rentalTerms;
    }

    public void setRentalTerms(String rentalTerms) {
        this.rentalTerms = rentalTerms;
    }

    @Override
    public String toString() {
        return "Rental{" +
                "rentalId='" + rentalId + '\'' +
                ", apartment=" + propertyEntity +
                ", tenant=" + tenantEntity +
                ", landlords=" + landlords +
                ", rentPrice=" + rentPrice +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", rentalTerms='" + rentalTerms + '\'' +
                '}';
    }
}