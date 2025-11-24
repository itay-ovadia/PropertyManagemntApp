package itay.rentalapp.Service;

import itay.rentalapp.ApartmentCrud;
import itay.rentalapp.Entities.ApartmentEntity;
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
    public void updateApartment(String id, ApartmentEntity apartment) {
        // 1. Check if the entity exists. If not, throw an exception.
        if (!apartmentCrud.existsById(id)) {
            // Throwing a RuntimeException (or custom exception) is standard when
            // a PUT request targets a resource that doesn't exist.
            throw new RuntimeException("Apartment with ID " + id + " not found for update.");
        }

        // 2. Ensure ID is correct (as you intended)
        apartment.setApartmentId(id);

        // 3. Save the updated entity. NO 'return' keyword needed.
        apartmentCrud.save(apartment);
    }

    @Override
    public void deleteApartment(String id) {
        apartmentCrud.deleteById(id);
    }

    @Override
    public void deleteAllApartments(){
        apartmentCrud.deleteAll();
    }
}
