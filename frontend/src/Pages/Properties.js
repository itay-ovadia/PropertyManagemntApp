import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import PropertyCard from "../Components/properties/PropertyCard";
import PropertyForm from "../Components/properties/PropertyForm";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Load apartment list
    const loadProperties = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8081/api/apartments");
            const data = await res.json();
            setProperties(data);
            setFilteredProperties(data);
        } catch (error) {
            console.error("Failed to load apartments:", error);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadProperties();
    }, [loadProperties]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("action") === "add") {
            setShowForm(true);
        }
    }, []);

    // Filter search
    useEffect(() => {
        if (!searchTerm) {
            setFilteredProperties(properties);
            return;
        }

        const filtered = properties.filter((property) =>
            property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.address?.street?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProperties(filtered);
    }, [properties, searchTerm]);

    // SAVE (POST or PUT)
    const handleSaveProperty = async (propertyData) => {
        try {
            let url = "http://localhost:8081/api/apartments";
            let method = "POST";

            if (editingProperty) {
                url = `http://localhost:8081/api/apartments/${editingProperty.apartmentId}`;
                method = "PUT";
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) throw new Error("Failed to save property");

            setShowForm(false);
            setEditingProperty(null);
            loadProperties();
        } catch (error) {
            console.error("Failed to save property:", error);
            alert("Error saving property. Check console for details.");
        }
    };

    const handleEditProperty = (property) => {
        setEditingProperty(property);
        setShowForm(true);
    };

    const handleViewProperty = (property) => {
        setSelectedProperty(property);
    };

    // DELETE FUNCTION (NEW)
    const handleDeleteProperty = async (id) => {
        if (!window.confirm("Delete this apartment?")) return;

        try {
            await fetch(`http://localhost:8081/api/apartments/${id}`, {
                method: "DELETE",
            });

            setProperties((prev) => prev.filter((p) => p.apartmentId !== id));
            setFilteredProperties((prev) => prev.filter((p) => p.apartmentId !== id));
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete property.");
        }
    };

    // LOADING STATE
    if (isLoading) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-slate-200 rounded w-64"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="h-80 bg-slate-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // FORM VIEW
    if (showForm) {
        return (
            <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <PropertyForm
                        property={editingProperty}
                        onSave={handleSaveProperty}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProperty(null);
                        }}
                        isEditing={!!editingProperty}
                    />
                </div>
            </div>
        );
    }

    // PROPERTY LIST VIEW
    return (
        <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Properties</h1>
                        <p className="text-slate-600">Manage your real estate portfolio</p>
                    </div>
                    <Button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search properties by name, city, or address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>

                {filteredProperties.length === 0 && !isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No properties found</h3>
                        <p className="text-slate-600 mb-6">
                            {searchTerm ? "Try adjusting your search terms." : "Start by adding your first property to the system."}
                        </p>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Property
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
                            {filteredProperties.map((property) => (
                                <motion.div
                                    key={property.apartmentId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PropertyCard
                                        property={property}
                                        onView={handleViewProperty}
                                        onEdit={handleEditProperty}
                                        onDelete={() => handleDeleteProperty(property.apartmentId)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
