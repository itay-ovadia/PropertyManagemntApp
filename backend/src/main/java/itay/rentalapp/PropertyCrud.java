package itay.rentalapp;

import itay.rentalapp.Entities.PropertyEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyCrud extends MongoRepository<PropertyEntity, String> {
    // You can add custom query methods here if needed
}
