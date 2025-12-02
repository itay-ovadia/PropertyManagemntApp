package itay.rentalapp.Controllers;

import itay.rentalapp.PropertyCrud;
import itay.rentalapp.RentalCrud;
import itay.rentalapp.UserCrud;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // allows React to fetch
public class DashboardController {

    private final PropertyCrud propertyCrud;
    private final UserCrud userCrud;
    private final RentalCrud rentalCrud;

    public DashboardController(PropertyCrud propertyCrud, UserCrud userCrud, RentalCrud rentalCrud) {
        this.propertyCrud = propertyCrud;
        this.userCrud = userCrud;
        this.rentalCrud = rentalCrud;
    }

    @GetMapping ( path={"/api/dashboard" })
    public Map<String, Object> getDashboardData() {

        long apartmentsCount = propertyCrud.count();
        long usersCount = userCrud.count();
        long rentalCount = rentalCrud.count();

        Map<String, Object> response = new HashMap<>();
        response.put("apartmentsCount", apartmentsCount);

        // If you add tenants/rentals later, include them:
        response.put("usersCount", usersCount);
        response.put("rentalsCount", rentalCount);

        return response;
    }
}
