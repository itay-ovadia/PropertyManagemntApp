package itay.rentalapp.Service;

import itay.rentalapp.PropertyCrud;
import itay.rentalapp.Entities.PropertyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImplementation implements PropertyService {

    private final PropertyCrud propertyCrud;

    @Autowired
    public PropertyServiceImplementation(PropertyCrud propertyCrud) {
        this.propertyCrud = propertyCrud;
    }

    @Override
    public List<PropertyEntity> getAllProperties() {
        return propertyCrud.findAll();
    }

    @Override
    public PropertyEntity getPropertyById(String id) {
        Optional<PropertyEntity> property = propertyCrud.findById(id);
        return property.orElse(null); // or throw an exception
    }

    @Override
    public PropertyEntity createProperty(PropertyEntity property) {
        return propertyCrud.save(property);
    }
    @Override
    public void updateProperty(String id, PropertyEntity property) {
        // 1. Check if the entity exists. If not, throw an exception.
        if (!propertyCrud.existsById(id)) {
            // Throwing a RuntimeException (or custom exception) is standard when
            // a PUT request targets a resource that doesn't exist.
            throw new RuntimeException("Property with ID " + id + " not found for update.");
        }

        // 2. Ensure ID is correct (as you intended)
        property.setPropertyId(id);

        // 3. Save the updated entity. NO 'return' keyword needed.
        propertyCrud.save(property);
    }

    @Override
    public void deleteProperty(String id) {
        propertyCrud.deleteById(id);
    }

    @Override
    public void deleteAllProperties(){
        propertyCrud.deleteAll();
    }
}
