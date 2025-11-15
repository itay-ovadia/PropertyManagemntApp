import React from "react";

export function Card({ children, className = "" }) {
    return (
        <div
            className={
                "bg-white rounded-xl border border-gray-200 shadow-sm p-4 " +
                className
            }
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return (
        <div className={"mb-3 " + className}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "" }) {
    return (
        <h2 className={"text-lg font-semibold text-gray-800 " + className}>
            {children}
        </h2>
    );
}

export function CardDescription({ children, className = "" }) {
    return (
        <p className={"text-sm text-gray-500 " + className}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = "" }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "" }) {
    return (
        <div className={"mt-4 flex justify-end gap-2 " + className}>
            {children}
        </div>
    );
}
