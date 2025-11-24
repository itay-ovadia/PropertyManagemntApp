import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Building2, Users, FileText, User, PlusCircle } from "lucide-react";

// Sidebar container
function Sidebar({ children }) {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col p-6 shadow-lg">
            {children}
        </aside>
    );
}

// Individual navigation link
function SidebarItem({ to, icon: Icon, children }) {
    const location = useLocation();
    const active = location.pathname === to;
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
            ${active ? "bg-blue-200 text-blue-800" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
        >
            <Icon className="w-5 h-5" />
            {children}
        </Link>
    );
}

// Layout component with header + sidebar
export default function Layout({ children }) {
    const navigationItems = [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Properties", url: "/properties", icon: Building2 },
        { title: "Tenants", url: "/tenants", icon: Users },
        { title: "Users", url: "/users", icon: User },   // Added Users page
        { title: "Rentals", url: "/rentals", icon: FileText },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar>
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-slate-800">PropManager</h1>
                        <p className="text-xs text-gray-500">Real Estate Management</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2">
                    {navigationItems.map((item) => (
                        <SidebarItem key={item.title} to={item.url} icon={item.icon}>
                            {item.title}
                        </SidebarItem>
                    ))}
                </nav>

                {/* Quick Action Buttons */}
                <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-4">
                    <SidebarItem to="/properties?action=add" icon={PlusCircle}>
                        Add Property
                    </SidebarItem>
                    <SidebarItem to="/tenants?action=add" icon={Users}>
                        Add Tenant
                    </SidebarItem>
                    <SidebarItem to="/users?action=add" icon={User}>
                        Add User
                    </SidebarItem>
                </div>
            </Sidebar>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
