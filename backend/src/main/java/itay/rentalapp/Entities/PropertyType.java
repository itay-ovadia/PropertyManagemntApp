package itay.rentalapp.Entities;


import jakarta.validation.constraints.NotBlank;
import org.springframework.lang.NonNull;

@NotBlank (message = "Must enter Property Type!")
public enum PropertyType {
    APARTMENT,
    HOUSE,
    CONDO,
    MOBILE_HOME,
    ROOM,
    STUDIO,
    VILLA,
    CABIN,
    LOFT,
    DUPLEX
}


