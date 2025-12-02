

package itay.rentalapp.Controllers;

import itay.rentalapp.Entities.PropertyEntity;
import itay.rentalapp.Service.PropertyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<PropertyEntity> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @PostMapping
    public PropertyEntity createProperty(@RequestBody PropertyEntity property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public void updateProperty(
            @PathVariable("id") String id,
            @RequestBody PropertyEntity property) {
        property.setPropertyId(id);
        propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(
            @PathVariable("id") String id) {
        propertyService.deleteProperty(id);
    }

    @DeleteMapping
    public void deleteAllProperties(){
        propertyService.deleteAllProperties();
    }

}







