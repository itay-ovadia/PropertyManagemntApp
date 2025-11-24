package itay.rentalapp.Entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rentals")
public class RentalEntity {
    @Id
    private String rentalId;          // Unique identifier for the rental
    private ApartmentEntity apartmentEntity;       // The apartment being rented
    private TenantEntity tenantEntity;             // The tenant renting the apartment
    private List<LandlordEntity> landlordEntities;  // List of landlords for the apartment
    private int rentPrice;          // Monthly rent price
    private LocalDate startDate;       // Rental start date
    private LocalDate endDate;         // Rental end date
    private String rentalTerms;        // Special terms for the rental agreement

    // Default constructor
    public RentalEntity() {
        this.landlordEntities = new ArrayList<>();
    }

    // Parameterized constructor
    public RentalEntity(String rentalId, ApartmentEntity apartmentEntity, TenantEntity tenantEntity, List<LandlordEntity> landlordEntities, int rentPrice, LocalDate startDate, LocalDate endDate, String rentalTerms) {
        if (apartmentEntity == null || tenantEntity == null || landlordEntities == null || landlordEntities.isEmpty()) {
            throw new IllegalArgumentException("Apartment, tenant, and at least one landlord must be provided");
        }
        if (rentPrice < 0) {
            throw new IllegalArgumentException("Rent price cannot be negative");
        }
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }
        this.rentalId = rentalId;
        this.apartmentEntity = apartmentEntity;
        this.tenantEntity = tenantEntity;
        this.landlordEntities = new ArrayList<>(landlordEntities);
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

    public ApartmentEntity getApartment() {
        return apartmentEntity;
    }

    public void setApartment(ApartmentEntity apartmentEntity) {
        if (apartmentEntity == null) {
            throw new IllegalArgumentException("Apartment cannot be null");
        }
        this.apartmentEntity = apartmentEntity;
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

    public List<LandlordEntity> getLandlords() {
        return new ArrayList<>(landlordEntities);
    }

    public void setLandlords(List<LandlordEntity> landlordEntities) {
        if (landlordEntities == null || landlordEntities.isEmpty()) {
            throw new IllegalArgumentException("At least one landlord must be provided");
        }
        this.landlordEntities = new ArrayList<>(landlordEntities);
    }

    public void addLandlord(LandlordEntity landlordEntity) {
        if (landlordEntity != null && !landlordEntities.contains(landlordEntity)) {
            landlordEntities.add(landlordEntity);
        }
    }

    public void removeLandlord(LandlordEntity landlordEntity) {
        if (landlordEntities.size() <= 1) {
            throw new IllegalStateException("Cannot remove the last landlord");
        }
        landlordEntities.remove(landlordEntity);
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
                ", apartment=" + apartmentEntity +
                ", tenant=" + tenantEntity +
                ", landlords=" + landlordEntities +
                ", rentPrice=" + rentPrice +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", rentalTerms='" + rentalTerms + '\'' +
                '}';
    }
}