package itay.rentalapp;

import itay.rentalapp.Entities.RentalEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RentalCrud extends MongoRepository <RentalEntity, String> {


}
