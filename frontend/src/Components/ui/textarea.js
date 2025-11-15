import React from "react";

export function Textarea({ id, value, onChange, placeholder, className = "" }) {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className}`}
        />
    );
}
