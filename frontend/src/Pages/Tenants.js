
import React, { useState, useEffect } from "react";
import { Tenant } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone, User, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Tenants() {
    const [tenants, setTenants] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTenants();
    }, []);

    useEffect(() => {
        // Filter tenants directly in useEffect
        if (!searchTerm) {
            setFilteredTenants(tenants);
            return;
        }

        const filtered = tenants.filter(tenant =>
            tenant.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.phone?.includes(searchTerm)
        );
        setFilteredTenants(filtered);
    }, [tenants, searchTerm]);

    const loadTenants = async () => {
        setIsLoading(true);
        const data = await Tenant.list('-created_date');
        setTenants(data);
        setIsLoading(false);
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
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Tenants</h1>
                        <p className="text-slate-600">Manage your tenant relationships</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tenant
                    </Button>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search tenants by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {filteredTenants.length === 0 && !isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No tenants found</h3>
                        <p className="text-slate-600 mb-6">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding tenant information to the system.'}
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Tenant
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
                            {filteredTenants.map((tenant) => (
                                <motion.div
                                    key={tenant.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-slate-800">{tenant.full_name}</h3>
                                                        <p className="text-slate-600 text-sm">{tenant.occupation || 'Occupation not specified'}</p>
                                                    </div>
                                                </div>
                                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                                    Active
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center text-slate-600 text-sm">
                                                <Mail className="w-4 h-4 mr-2" />
                                                <span className="truncate">{tenant.email}</span>
                                            </div>
                                            <div className="flex items-center text-slate-600 text-sm">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <span>{tenant.phone}</span>
                                            </div>
                                            {tenant.monthly_income && (
                                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                    <span className="text-slate-600 text-sm">Monthly Income:</span>
                                                    <span className="font-semibold text-slate-800">₪{tenant.monthly_income.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <div className="flex gap-2 pt-3">
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
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
