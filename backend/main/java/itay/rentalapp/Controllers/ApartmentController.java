

package itay.rentalapp.Controllers;

import itay.rentalapp.Entities.ApartmentEntity;
import itay.rentalapp.Service.ApartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PutMapping("/{id}")
    public void updateApartment(
            @PathVariable("id") String id,
            @RequestBody ApartmentEntity apartment) {
        apartment.setApartmentId(id);
        apartmentService.updateApartment(id, apartment);
    }

    @DeleteMapping("/{id}")
    public void deleteApartment(
            @PathVariable("id") String id) {
        apartmentService.deleteApartment(id);
    }

    @DeleteMapping
    public void deleteAllApartments(){
        apartmentService.deleteAllApartments();
    }

}







