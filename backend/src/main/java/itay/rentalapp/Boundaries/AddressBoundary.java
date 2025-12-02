package itay.rentalapp.Boundaries;
import itay.rentalapp.Entities.AddressEntity;
public class AddressBoundary {

        private String street;
        private int streetNumber;
        private String city;
        private String country;
        private String zipCode;

        public AddressBoundary() {}

        public AddressBoundary(AddressEntity entity) {
            this.street = entity.getStreet();
            this.streetNumber = entity.getStreetNumber();
            this.city = entity.getCity();
            this.country = entity.getCountry();
            this.zipCode = entity.getZipCode();
        }

        public AddressEntity toEntity() {
            return new AddressEntity(street, streetNumber, city, country, zipCode);
        }

        // Getters and setters
        public String getStreet() {
            return street;
        }

        public void setStreet(String street) {
            this.street = street;
        }

        public int getStreetNumber() {
            return streetNumber;
        }

        public void setStreetNumber(int streetNumber) {
            this.streetNumber = streetNumber;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getZipCode() {
            return zipCode;
        }

        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }
    }


