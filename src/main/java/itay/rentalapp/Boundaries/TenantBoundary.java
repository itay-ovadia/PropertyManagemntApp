package itay.rentalapp.Boundaries;

import itay.rentalapp.Entities.ApartmentEntity;
import itay.rentalapp.Entities.TenantEntity;

public class TenantBoundary {

    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String apartmentId;
    private String tenantHistory;

    public TenantBoundary() {}

    // Convert from entity to boundary
    public TenantBoundary(TenantEntity tenantEntity) {
        this.id = tenantEntity.getId();
        this.name = tenantEntity.getName();
        this.email = tenantEntity.getEmail();
        this.phoneNumber = tenantEntity.getPhoneNumber();
        this.tenantHistory = tenantEntity.getTenantHistory();
        this.apartmentId = tenantEntity.getRentedApartment() != null
                ? tenantEntity.getRentedApartment().getApartmentId()
                : null;
    }

    public TenantEntity toEntity(ApartmentEntity apartmentEntity, String passwordHash) {
        TenantEntity tenant = new TenantEntity(
                this.name,
                this.email,
                this.phoneNumber,
                passwordHash,
                apartmentEntity
        );
        tenant.setTenantHistory(this.tenantHistory);
        tenant.setId(this.id); // Optional if updating
        return tenant;
    }


    // ---------------- Getters & Setters ----------------

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

    public void setPhoneNumber(String phoneNumber)
   {
        this.phoneNumber = phoneNumber;
    }

    public String getApartmentId() {
        return apartmentId;
    }

    public void setApartmentId(String apartmentId) {
        this.apartmentId = apartmentId;
    }

    public String getTenantHistory() {
        return tenantHistory;
    }

    public void setTenantHistory(String tenantHistory) {
        this.tenantHistory = tenantHistory;
    }
}
