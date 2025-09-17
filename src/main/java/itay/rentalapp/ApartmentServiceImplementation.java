package itay.rentalapp;

import itay.rentalapp.Entities.ApartmentEntity;
import itay.rentalapp.ApartmentCrud;
import itay.rentalapp.Service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApartmentServiceImplementation implements ApartmentService {

    private final ApartmentCrud apartmentCrud;

    @Autowired
    public ApartmentServiceImplementation(ApartmentCrud apartmentCrud) {
        this.apartmentCrud = apartmentCrud;

    }

    @Override
    public List<ApartmentEntity> getAllApartments() {
        return apartmentCrud.findAll();
    }

    @Override
    public ApartmentEntity getApartmentById(String id) {
        Optional<ApartmentEntity> apartment = apartmentCrud.findById(id);
        return apartment.orElse(null); // or throw an exception
    }

    @Override
    public ApartmentEntity createApartment(ApartmentEntity apartment) {
        return apartmentCrud.save(apartment);
    }

    @Override
    public ApartmentEntity updateApartment(String id, ApartmentEntity apartment) {
        if (!apartmentCrud.existsById(id)) {
            return null; // or throw exception
        }
        apartment.setApartmentId(id);  // ensure ID is set
        return apartmentCrud.save(apartment);
    }

    @Override
    public void deleteApartment(String id) {
        apartmentCrud.deleteById(id);
    }
}
