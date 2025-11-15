import React from "react";

export function Checkbox({ id, checked, onChange, label, className = "" }) {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            {label && (
                <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
}
