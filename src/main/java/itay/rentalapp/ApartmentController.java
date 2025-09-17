package itay.rentalapp;

import itay.rentalapp.Entities.ApartmentEntity;
import itay.rentalapp.Service.ApartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@CrossOrigin(origins = "http://localhost:63342  ")  // only allow frontend running on localhost:3000
public class ApartmentController {

    private final ApartmentService apartmentService;

    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @GetMapping
    public List<ApartmentEntity> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    @PostMapping
    public ApartmentEntity createApartment(@RequestBody ApartmentEntity apartment) {
        return apartmentService.createApartment(apartment);
    }

    // other endpoints as needed
}
