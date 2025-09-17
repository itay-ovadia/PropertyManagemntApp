package itay.rentalapp.Service;

import itay.rentalapp.Entities.ApartmentEntity;
import java.util.List;

public interface ApartmentService {
    List<ApartmentEntity> getAllApartments();
    ApartmentEntity getApartmentById(String id);
    ApartmentEntity createApartment(ApartmentEntity apartment);
    ApartmentEntity updateApartment(String id, ApartmentEntity apartment);
    void deleteApartment(String id);


}
