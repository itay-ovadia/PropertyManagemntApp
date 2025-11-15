import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Building2, MapPin, Bed, Bath, Square, Car, Eye, Edit } from "lucide-react";

export default function PropertyCard({ property, onView, onEdit }) {
    return (
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative">
                {property.images && property.images.length > 0 ? (
                    <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-slate-400" />
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge className={`${
                        property.is_rental ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                        {property.is_rental ? 'For Rent' : 'Owner Occupied'}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-5">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-slate-800 text-lg mb-2">{property.name}</h3>
                        <div className="flex items-center text-slate-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.address?.street}, {property.address?.city}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-100">
                        <div className="flex items-center text-slate-600 text-sm">
                            <Square className="w-4 h-4 mr-2" />
                            {property.sq_meter}m²
                        </div>
                        <div className="flex items-center text-slate-600 text-sm">
                            <Bed className="w-4 h-4 mr-2" />
                            {property.bedrooms} beds
                        </div>
                        <div className="flex items-center text-slate-600 text-sm">
                            <Bath className="w-4 h-4 mr-2" />
                            {property.bathrooms} baths
                        </div>
                        <div className="flex items-center text-slate-600 text-sm">
                            <Car className="w-4 h-4 mr-2" />
                            {property.parking_spaces || 0} parking
                        </div>
                    </div>

                    {property.monthly_rent && (
                        <div className="py-3 border-t border-slate-100">
                            <p className="text-2xl font-bold text-slate-800">₪{property.monthly_rent.toLocaleString()}</p>
                            <p className="text-slate-600 text-sm">per month</p>
                        </div>
                    )}

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => onView(property)}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => onEdit(property)}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}