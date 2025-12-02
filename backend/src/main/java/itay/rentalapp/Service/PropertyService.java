package itay.rentalapp.Service;
import itay.rentalapp.Entities.PropertyEntity;
import java.util.List;

public interface PropertyService {
    List<PropertyEntity> getAllProperties();
    PropertyEntity getPropertyById(String id);
    PropertyEntity createProperty(PropertyEntity property);

    void updateProperty(String id, PropertyEntity property);
    void deleteProperty(String id);
    void deleteAllProperties();


}


