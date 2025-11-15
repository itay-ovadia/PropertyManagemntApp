import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Save, X } from "lucide-react";

export default function PropertyForm({ property, onSave, onCancel, isEditing = false }) {
    const [formData, setFormData] = useState(property || {
        name: '',
        address: {
            street: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'Israel'
        },
        sq_meter: '',
        bedrooms: '',
        bathrooms: '',
        has_elevator: false,
        has_bunker: false,
        is_rental: true,
        monthly_rent: '',
        property_type: '',
        floor: '',
        parking_spaces: 0,
        furnished: false,
        pet_friendly: false,
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateAddress = (field, value) => {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    return (
        <Card className="shadow-lg border-0">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">
                    {isEditing ? 'Edit Property' : 'Add New Property'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Property Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                placeholder="e.g., Sunrise Apartments 3B"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property_type">Property Type</Label>
                            <Select
                                value={formData.property_type}
                                onValueChange={(value) => updateField('property_type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="house">House</SelectItem>
                                    <SelectItem value="studio">Studio</SelectItem>
                                    <SelectItem value="penthouse">Penthouse</SelectItem>
                                    <SelectItem value="duplex">Duplex</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Address</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="street">Street Address</Label>
                                <Input
                                    id="street"
                                    value={formData.address?.street || ''}
                                    onChange={(e) => updateAddress('street', e.target.value)}
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.address?.city || ''}
                                    onChange={(e) => updateAddress('city', e.target.value)}
                                    placeholder="Tel Aviv"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State/Region</Label>
                                <Input
                                    id="state"
                                    value={formData.address?.state || ''}
                                    onChange={(e) => updateAddress('state', e.target.value)}
                                    placeholder="Central District"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postal_code">Postal Code</Label>
                                <Input
                                    id="postal_code"
                                    value={formData.address?.postal_code || ''}
                                    onChange={(e) => updateAddress('postal_code', e.target.value)}
                                    placeholder="12345"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sq_meter">Size (m²)</Label>
                            <Input
                                id="sq_meter"
                                type="number"
                                value={formData.sq_meter}
                                onChange={(e) => updateField('sq_meter', parseFloat(e.target.value))}
                                placeholder="80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input
                                id="bedrooms"
                                type="number"
                                step="0.5"
                                value={formData.bedrooms}
                                onChange={(e) => updateField('bedrooms', parseFloat(e.target.value))}
                                placeholder="2"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Input
                                id="bathrooms"
                                type="number"
                                step="0.5"
                                value={formData.bathrooms}
                                onChange={(e) => updateField('bathrooms', parseFloat(e.target.value))}
                                placeholder="1.5"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="floor">Floor</Label>
                            <Input
                                id="floor"
                                type="number"
                                value={formData.floor}
                                onChange={(e) => updateField('floor', parseInt(e.target.value))}
                                placeholder="3"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="monthly_rent">Monthly Rent (₪)</Label>
                            <Input
                                id="monthly_rent"
                                type="number"
                                value={formData.monthly_rent}
                                onChange={(e) => updateField('monthly_rent', parseFloat(e.target.value))}
                                placeholder="8500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parking_spaces">Parking Spaces</Label>
                            <Input
                                id="parking_spaces"
                                type="number"
                                value={formData.parking_spaces}
                                onChange={(e) => updateField('parking_spaces', parseInt(e.target.value))}
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800">Features</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="has_elevator"
                                    checked={formData.has_elevator}
                                    onCheckedChange={(checked) => updateField('has_elevator', checked)}
                                />
                                <Label htmlFor="has_elevator">Has Elevator</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="has_bunker"
                                    checked={formData.has_bunker}
                                    onCheckedChange={(checked) => updateField('has_bunker', checked)}
                                />
                                <Label htmlFor="has_bunker">Has Bunker/Safe Room</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="furnished"
                                    checked={formData.furnished}
                                    onCheckedChange={(checked) => updateField('furnished', checked)}
                                />
                                <Label htmlFor="furnished">Furnished</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="pet_friendly"
                                    checked={formData.pet_friendly}
                                    onCheckedChange={(checked) => updateField('pet_friendly', checked)}
                                />
                                <Label htmlFor="pet_friendly">Pet Friendly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_rental"
                                    checked={formData.is_rental}
                                    onCheckedChange={(checked) => updateField('is_rental', checked)}
                                />
                                <Label htmlFor="is_rental">Available for Rent</Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            placeholder="Beautiful apartment in the heart of the city..."
                            rows={4}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="w-4 h-4 mr-2" />
                            {isEditing ? 'Update Property' : 'Save Property'}
                        </Button>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}