import React, { useState, useEffect } from "react";
import { Building2, Users, FileText, TrendingUp, Home } from "lucide-react";

// Stat Card Component
function StatCard({ title, value, icon: Icon, trend, color = "blue" }) {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500"
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                    {trend && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {trend}
                        </p>
                    )}
                </div>
                <div className={`${colorClasses[color]} w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {

    // ⬅️ Changed: we store COUNTS, not arrays
    const [apartmentsCount, setApartmentsCount] = useState(0);
    const [tenantsCount, setTenantsCount] = useState(0);
    const [rentalsCount, setRentalsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8081/api/dashboard")
            .then(res => res.json())
            .then(data => {
                setApartmentsCount(data.apartmentsCount || 0);
                setTenantsCount(data.tenantsCount || 0);
                setRentalsCount(data.rentalsCount || 0);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's an overview of your property management.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Properties"
                    value={apartmentsCount}
                    icon={Building2}
                    color="blue"
                    trend="+12% from last month"
                />
                <StatCard
                    title="Active Tenants"
                    value={tenantsCount}
                    icon={Users}
                    color="green"
                    trend="+8% from last month"
                />
                <StatCard
                    title="Active Rentals"
                    value={rentalsCount}
                    icon={FileText}
                    color="purple"
                    trend="+5% from last month"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200">
                        <Home className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Add New Property</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 border border-green-200">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Add New Tenant</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 border border-purple-200">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Create Rental Agreement</span>
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {rentalsCount === 0 ? (
                        <p className="text-gray-500 text-center py-8">No recent activity to display</p>
                    ) : (
                        <p className="text-gray-500">Activity feed will be populated from backend data</p>
                    )}
                </div>
            </div>
        </div>
    );
}
