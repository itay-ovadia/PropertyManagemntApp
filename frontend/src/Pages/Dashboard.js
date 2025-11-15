import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [apartments, setApartments] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // simulate backend call
        fetch("http://localhost:8081/api/dashboard") // your spring boot endpoint
            .then(res => res.json())
            .then(data => {
                setApartments(data.apartments || []);
                setTenants(data.tenants || []);
                setRentals(data.rentals || []);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading dashboard...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Properties: {apartments.length}</p>
            <p>Tenants: {tenants.length}</p>
            <p>Rentals: {rentals.length}</p>
        </div>
    );
}
