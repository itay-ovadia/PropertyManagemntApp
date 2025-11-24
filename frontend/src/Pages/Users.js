import React, { useState, useEffect, useCallback } from "react";
import UserCard from "../Components/UserCard";
import UserForm from "../Components/UserForm";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Plus, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch users from backend
    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8081/api/users");
            const data = await res.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error("Failed to load users:", error);
            alert("Error loading users. Check console for details.");
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Filter search
    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber?.includes(searchTerm)
        );

        setFilteredUsers(filtered);
    }, [users, searchTerm]);

    // Save user (POST or PUT)
    const handleSaveUser = async (userData) => {
        try {
            let url = "http://localhost:8081/api/users";
            let method = "POST";

            if (editingUser) {
                url = `http://localhost:8081/api/users/${editingUser.id}`;
                method = "PUT";
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save user");
            }

            setShowForm(false);
            setEditingUser(null);
            loadUsers();
        } catch (error) {
            console.error("Failed to save user:", error);
            alert("Error: " + error.message);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {
            const response = await fetch(`http://localhost:8081/api/users/${id}`, { method: "DELETE" });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete user");
            }

            setUsers(prev => prev.filter(u => u.id !== id));
            setFilteredUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Error: " + error.message);
        }
    };

    // Loading state
    if (isLoading) {
        return <div className="p-8">Loading users...</div>;
    }

    // Show form view
    if (showForm) {
        return (
            <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <UserForm
                        user={editingUser}
                        onSave={handleSaveUser}
                        onCancel={() => { setShowForm(false); setEditingUser(null); }}
                        isEditing={!!editingUser}
                    />
                </div>
            </div>
        );
    }

    // User list view
    return (
        <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Users</h1>
                        <p className="text-slate-600">Manage your system users</p>
                    </div>
                    <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>

                <div className="relative mb-8">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search users by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600 mb-6">
                            {searchTerm ? "No users match your search." : "No users found. Add your first user."}
                        </p>
                        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </div>
                ) : (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredUsers.map(user => (
                                <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                    <UserCard
                                        user={user}
                                        onEdit={() => handleEditUser(user)}
                                        onDelete={() => handleDeleteUser(user.id)}
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
