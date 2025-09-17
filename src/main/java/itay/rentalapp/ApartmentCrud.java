package itay.rentalapp;

import itay.rentalapp.Entities.ApartmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApartmentCrud extends MongoRepository<ApartmentEntity, String> {
    // You can add custom query methods here if needed
}
