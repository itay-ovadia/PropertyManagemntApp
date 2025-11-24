import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { User, Mail, Phone } from "lucide-react";

export default function UserCard({ user, onEdit, onDelete }) {
    return (
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800">{user.name}</h3>
                            <p className="text-slate-600 text-sm">{user.role || 'Role not specified'}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center text-slate-600 text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{user.phoneNumber}</span>
                </div>

                <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
