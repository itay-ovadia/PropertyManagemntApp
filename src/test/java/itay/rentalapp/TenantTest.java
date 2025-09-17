package itay.rentalapp;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

  /*
public class TenantTest {



    @Test
    public void testTenantCreationWithValidApartment() {
        // Create a sample address and apartment
        Landlord l1 = new Landlord("user1", "aaa@gmail.com", "1111111111","password",  );
        Address address = new Address("123 Main St", 5, "Springfield", "USA", "12345");
        Apartment apartment = new Apartment("Apartment A", address, 100, 2, 1, true, false, true, l1);

        // Create a tenant with a valid apartment
        Tenant tenant = new Tenant("John Doe", "john.doe@email.com", "1234567890", "hashedpassword", apartment);

        // Test that the tenant is created successfully
        assertNotNull(tenant);
        assertEquals("John Doe", tenant.getName());
        assertEquals(apartment, tenant.getRentedApartment());
    }

    @Test
    public void testTenantCreationWithNullApartment() {
        // Test that creating a tenant without an apartment throws an exception
        try {
            Tenant tenant = new Tenant("Jane Doe", "jane.doe@email.com", "0987654321", "hashedpassword", null);
            fail("Expected IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            // Assert that the exception message is as expected
            assertEquals("Tenant must be assigned a valid apartment", e.getMessage());
        }
    }



        @Test
        public void testTenantAssignedToApartment() {
            // Create an Address
            Address address = new Address("Street", 123, "City", "Country", "12345");

            // Create an Apartment with all necessary parameters
            Apartment apartment = new Apartment(
                    "Apartment 1",
                    address,
                    100, // sqMeter
                    3,   // bedrooms
                    2,   // bathrooms
                    true, // hasElevator
                    false, // hasBunker
                    true, // isRental
                    null  // landlords, assuming no landlords for now
            );

            // Create a Tenant with all required parameters (phoneNumber, passwordHash)
            Tenant tenant = new Tenant("John Doe", "john@example.com", "1234567890", "passwordHash", apartment);

            // Assert that tenant is assigned to a valid apartment
            assertNotNull(tenant.getRentedApartment(), "Tenant must be assigned a valid apartment");

            // Optional: You can also check the details of the apartment if you want
            assertEquals("Apartment 1", tenant.getRentedApartment().getName(), "Apartment name should match");
        }

    @Test
    public void testTenantWithNullApartment() {
        // This test case will check if the IllegalArgumentException is thrown when apartment is null
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () -> {
            new Tenant("John Doe", "john@example.com", "1234567890", "passwordHash", null);
        });

        assertEquals("Tenant must be assigned a valid apartment.", e.getMessage());
    }
}

*/