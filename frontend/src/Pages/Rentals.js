
import React, { useState, useEffect } from "react";
import { Rental, Apartment, Tenant } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, DollarSign, MapPin, User } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

export default function Rentals() {
    const [rentals, setRentals] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [filteredRentals, setFilteredRentals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Helper functions for data lookup
    const getApartmentById = (id) => {
        return apartments.find(apt => apt.id === id);
    };

    const getTenantById = (id) => {
        return tenants.find(tenant => tenant.id === id);
    };

    // Effect to load initial data
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [rentalData, apartmentData, tenantData] = await Promise.all([
                Rental.list('-created_date'),
                Apartment.list(),
                Tenant.list()
            ]);

            setRentals(rentalData);
            setApartments(apartmentData);
            setTenants(tenantData);
            setIsLoading(false);
        };
        loadData();
    }, []); // Empty dependency array means this runs once on mount

    // Effect to filter rentals based on changes to rentals, apartments, tenants, or searchTerm
    useEffect(() => {
        if (!searchTerm) {
            setFilteredRentals(rentals);
            return;
        }

        const filtered = rentals.filter(rental => {
            // These helper functions depend on 'apartments' and 'tenants' state,
            // so 'apartments' and 'tenants' must be in the dependency array.
            const apartment = getApartmentById(rental.apartment_id);
            const tenant = getTenantById(rental.tenant_id);

            return (
                apartment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apartment?.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tenant?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredRentals(filtered);
    }, [rentals, apartments, tenants, searchTerm, getApartmentById, getTenantById]);
    // Added getApartmentById and getTenantById to dependencies to be fully compliant,
    // though typically ESLint might only warn if they were defined inside the effect
    // or if they weren't stable (memoized or defined outside render).
    // In this case, since they depend on state variables (apartments, tenants) which are already dependencies,
    // it might be redundant, but safer for strict ESLint rules.

    const getStatusColor = (status, leaseEnd) => {
        if (status === 'terminated') return 'bg-red-100 text-red-700 border-red-200';
        if (status === 'expired') return 'bg-gray-100 text-gray-700 border-gray-200';
        if (status === 'pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';

        // Check if lease is expiring soon (within 30 days)
        if (leaseEnd && isAfter(new Date(leaseEnd), new Date()) &&
            isBefore(new Date(leaseEnd), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))) {
            return 'bg-orange-100 text-orange-700 border-orange-200';
        }

        return 'bg-green-100 text-green-700 border-green-200';
    };

    const getStatusText = (status, leaseEnd) => {
        if (status === 'terminated') return 'Terminated';
        if (status === 'expired') return 'Expired';
        if (status === 'pending') return 'Pending';

        // Check if lease is expiring soon
        if (leaseEnd && isAfter(new Date(leaseEnd), new Date()) &&
            isBefore(new Date(leaseEnd), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))) {
            return 'Expiring Soon';
        }

        return 'Active';
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-slate-200 rounded w-64"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Rentals</h1>
                        <p className="text-slate-600">Track active leases and rental agreements</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        New Rental
                    </Button>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search rentals by property, tenant, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {filteredRentals.length === 0 && !isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No rentals found</h3>
                        <p className="text-slate-600 mb-6">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Start by creating rental agreements for your properties.'}
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            New Rental
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimatePresence>
                            {filteredRentals.map((rental) => {
                                const apartment = getApartmentById(rental.apartment_id);
                                const tenant = getTenantById(rental.tenant_id);

                                return (
                                    <motion.div
                                        key={rental.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-slate-800 mb-1">
                                                            {apartment?.name || 'Property Not Found'}
                                                        </h3>
                                                        <div className="flex items-center text-slate-600 text-sm">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {apartment?.address?.city || 'Location Unknown'}
                                                        </div>
                                                    </div>
                                                    <Badge className={getStatusColor(rental.status, rental.lease_end)}>
                                                        {getStatusText(rental.status, rental.lease_end)}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center text-slate-700">
                                                    <User className="w-4 h-4 mr-2" />
                                                    <span className="font-medium">{tenant?.full_name || 'Tenant Not Found'}</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-slate-600 text-sm">
                                                        <DollarSign className="w-4 h-4 mr-1" />
                                                        Monthly Rent
                                                    </div>
                                                    <span className="font-semibold text-slate-800">₪{rental.monthly_rent?.toLocaleString()}</span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Start Date:</span>
                                                        <span className="text-slate-800">
                              {rental.lease_start ? format(new Date(rental.lease_start), "MMM d, yyyy") : 'N/A'}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">End Date:</span>
                                                        <span className="text-slate-800">
                              {rental.lease_end ? format(new Date(rental.lease_end), "MMM d, yyyy") : 'N/A'}
                            </span>
                                                    </div>
                                                    {rental.payment_day && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Payment Due:</span>
                                                            <span className="text-slate-800">{rental.payment_day} of each month</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 pt-3 border-t border-slate-100">
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        View Details
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        Edit
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
