import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Home, FileText } from "lucide-react";
import { format } from "date-fns";

const activityIcons = {
    rental: FileText,
    tenant: User,
    property: Home,
};

const activityColors = {
    rental: "bg-blue-100 text-blue-700",
    tenant: "bg-green-100 text-green-700",
    property: "bg-purple-100 text-purple-700",
};

export default function RecentActivity({ activities = [] }) {
    if (activities.length === 0) {
        activities = [
            {
                id: 1,
                type: "rental",
                title: "New rental agreement signed",
                description: "Apartment 3B - John Doe",
                time: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
            {
                id: 2,
                type: "tenant",
                title: "Tenant added to system",
                description: "Sarah Johnson - Unit 2A",
                time: new Date(Date.now() - 5 * 60 * 60 * 1000),
            },
            {
                id: 3,
                type: "property",
                title: "Property details updated",
                description: "Renovations completed - Building C",
                time: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        ];
    }

    return (
        <Card className="shadow-md border-0">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities.map((activity) => {
                    const Icon = activityIcons[activity.type];
                    return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                            <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 text-sm">{activity.title}</p>
                                <p className="text-slate-600 text-xs mt-1">{activity.description}</p>
                                <div className="flex items-center mt-2 text-xs text-slate-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {format(activity.time, "MMM d, h:mm a")}
                                </div>
                            </div>
                            <Badge variant="secondary" className="capitalize text-xs">
                                {activity.type}
                            </Badge>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}