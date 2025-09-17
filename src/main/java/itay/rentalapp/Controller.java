package itay.rentalapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {

    @GetMapping("/")
    public String hello() {
        return "Hello, welcome to my Spring Boot application!";
    }


}
