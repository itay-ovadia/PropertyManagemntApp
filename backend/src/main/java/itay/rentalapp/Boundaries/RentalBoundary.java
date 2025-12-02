package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RentalBoundary {

    private String rentalId;
    private String apartmentId;
    private String tenantId;
    private List<String> landlordIds = new ArrayList<>();
    private int rentPrice;
    private LocalDate startDate;
    private LocalDate endDate;
    private String rentalTerms;

    public RentalBoundary() {}

    // Convert Entity → Boundary
    public RentalBoundary(RentalEntity entity) {
        this.rentalId = entity.getRentalId();
        this.apartmentId = entity.getApartment() != null ? entity.getApartment().getPropertyId() : null;
        this.tenantId = entity.getTenant() != null ? entity.getTenant().getId() : null;
        if (entity.getLandlords() != null) {
            this.landlordIds = entity.getLandlords().stream()
                    .map(UserEntity::getId)
                    .collect(Collectors.toList());
        }
        this.rentPrice = entity.getRentPrice();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.rentalTerms = entity.getRentalTerms();
    }

    // Convert Boundary → Entity
    public RentalEntity toEntity(PropertyEntity apartment, TenantEntity tenant, List<UserEntity> landlords) {
        // Only include users with LANDLORD role
        List<UserEntity> validLandlords = landlords != null
                ? landlords.stream()
                .filter(u -> u.getRole() == UserEntity.Role.LANDLORD)
                .toList()
                : List.of();

        return new RentalEntity(
                this.rentalId,
                apartment,
                tenant,
                validLandlords,
                this.rentPrice,
                this.startDate,
                this.endDate,
                this.rentalTerms
        );
    }

    // ---------------- Getters & Setters ----------------

    public String getRentalId() {
        return rentalId;
    }

    public void setRentalId(String rentalId) {
        this.rentalId = rentalId;
    }

    public String getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(String apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public List<String> getLandlordIds() {
        return landlordIds;
    }

    public void setLandlordIds(List<String> landlordIds) {
        this.landlordIds = landlordIds;
    }

    public int getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(int rentPrice) {
        this.rentPrice = rentPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getRentalTerms() {
        return rentalTerms;
    }

    public void setRentalTerms(String rentalTerms) {
        this.rentalTerms = rentalTerms;
    }
}
