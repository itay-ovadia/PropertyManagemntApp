import React from "react";

export function Badge({ children, color = "gray", className = "" }) {
    const colors = {
        gray: "bg-gray-200 text-gray-800",
        blue: "bg-blue-200 text-blue-800",
        green: "bg-green-200 text-green-800",
        red: "bg-red-200 text-red-800",
        yellow: "bg-yellow-200 text-yellow-800",
        purple: "bg-purple-200 text-purple-800",
    };

    const colorClass = colors[color] || colors.gray;

    return (
        <span
            className={
                `inline-block px-2 py-1 text-xs font-semibold rounded-full ${colorClass} ` +
                className
            }
        >
      {children}
    </span>
    );
}
