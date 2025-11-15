import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, bgColor = "bg-blue-500" }) {
    return (
        <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-6 -translate-y-6 ${bgColor} rounded-full opacity-10`} />
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">{title}</p>
                        <p className="text-3xl font-bold text-slate-800">{value}</p>
                        {subtitle && (
                            <p className="text-sm text-slate-500">{subtitle}</p>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${bgColor} bg-opacity-10 border border-opacity-20`}>
                        <Icon className={`w-6 h-6 ${bgColor.replace('bg-', 'text-')}`} />
                    </div>
                </div>
                {trend && (
                    <div className="mt-4 text-sm">
            <span className={`font-medium ${trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
                        <span className="text-slate-500"> from last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}