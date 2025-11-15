import React from "react";

export function Button({
                           children,
                           onClick,
                           type = "button",
                           className = "",
                           variant = "default",
                           disabled = false,
                       }) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm";

    let variantClasses = "";

    switch (variant) {
        case "outline":
            variantClasses =
                "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
            break;
        case "primary":
            variantClasses =
                "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";
            break;
        case "danger":
            variantClasses =
                "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";
            break;
        default:
            variantClasses =
                "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
