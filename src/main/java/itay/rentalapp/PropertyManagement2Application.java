package itay.rentalapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PropertyManagement2Application {

    public static void main(String[] args) {
        SpringApplication.run(PropertyManagement2Application.class, args);
        //url is http://localhost:8081/swagger-ui/index.html
        //base44 is itay.ovadia@s.afeka.ac.il  Afeka111!
        /*
        Address address = new Address("Street", 123, "City", "Country", "12345");
        Apartment apartment = new Apartment("12345678", "Apt 1",address,100,3,2,true,false,true,null);
        Landlord landlord = new Landlord("l1","l1@l1.com", "1111111111","password",null);
        System.out.println("before change: ");
        System.out.println(landlord);
        landlord.setOwnedApartments(Arrays.asList(apartment));
    //    apartment.setLandlords(Arrays.asList(landlord));
        System.out.println("after change: " + landlord);

    }
    */
    }

}
