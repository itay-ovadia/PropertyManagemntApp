package itay.rentalapp;

import itay.rentalapp.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserCrud extends MongoRepository<UserEntity,String> {
}
