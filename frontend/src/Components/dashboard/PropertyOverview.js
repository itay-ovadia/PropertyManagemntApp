import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users } from "lucide-react";

export default function PropertyOverview({ properties = [] }) {
    // Sample data if no properties
    const sampleProperties = [
        {
            id: 1,
            name: "Sunrise Apartments 3B",
            address: { street: "123 Rothschild Blvd", city: "Tel Aviv" },
            status: "occupied",
            tenant: "John Doe",
            rent: 8500,
        },
        {
            id: 2,
            name: "Garden View 2A",
            address: { street: "45 Ben Yehuda St", city: "Jerusalem" },
            status: "vacant",
            rent: 7200,
        },
        {
            id: 3,
            name: "Modern Studio 1C",
            address: { street: "78 Dizengoff St", city: "Tel Aviv" },
            status: "occupied",
            tenant: "Sarah Cohen",
            rent: 6800,
        },
    ];

    const displayProperties = properties.length > 0 ? properties : sampleProperties;

    return (
        <Card className="shadow-md border-0">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-800">Property Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {displayProperties.slice(0, 4).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-slate-800 text-sm truncate">{property.name}</p>
                                <div className="flex items-center text-xs text-slate-500 mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {property.address?.street}, {property.address?.city}
                                </div>
                                {property.tenant && (
                                    <div className="flex items-center text-xs text-slate-600 mt-1">
                                        <Users className="w-3 h-3 mr-1" />
                                        {property.tenant}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge
                                variant={property.status === 'occupied' ? 'default' : 'secondary'}
                                className={`mb-2 text-xs ${
                                    property.status === 'occupied'
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-orange-100 text-orange-700 border-orange-200'
                                }`}
                            >
                                {property.status}
                            </Badge>
                            <p className="text-sm font-semibold text-slate-800">₪{property.rent?.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}