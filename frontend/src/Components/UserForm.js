import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UserForm({ user, onSave, onCancel, isEditing }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhoneNumber(user.phoneNumber || "");
            setRole(user.role || "");
            setPassword(""); // do not pre-fill password
            setAge(user.age || "");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic frontend validation
        if (!name || !email || !role || !password || !age) {
            alert("Please fill in all required fields");
            return;
        }

        if (!/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            alert("Invalid email format");
            return;
        }

        if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
            alert("Phone number must be 10 digits");
            return;
        }

        onSave({
            name,
            email,
            phoneNumber,
            role,
            passwordHash: password,
            age: Number(age)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold text-slate-800">{isEditing ? "Edit User" : "Add User"}</h2>

            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!isEditing} />
            <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

            <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {isEditing ? "Update User" : "Add User"}
                </Button>
            </div>
        </form>
    );
}
