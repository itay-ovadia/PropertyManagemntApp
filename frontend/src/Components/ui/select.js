import React, { useState, createContext, useContext } from 'react';

const SelectContext = createContext();

export function Select({ children, value, onValueChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
            <div className="relative inline-block w-full">{children}</div>
        </SelectContext.Provider>
    );
}

export function SelectTrigger({ children }) {
    const { value, setIsOpen } = useContext(SelectContext);
    return (
        <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="w-full border rounded px-3 py-2 text-left bg-white shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
            {children}
        </button>
    );
}

export function SelectValue({ placeholder }) {
    const { value } = useContext(SelectContext);
    return <span>{value || placeholder}</span>;
}

export function SelectContent({ children }) {
    const { isOpen } = useContext(SelectContext);
    if (!isOpen) return null;
    return (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
            {children}
        </ul>
    );
}

export function SelectItem({ value: itemValue, children }) {
    const { onValueChange, setIsOpen } = useContext(SelectContext);
    const handleClick = () => {
        onValueChange(itemValue);
        setIsOpen(false);
    };
    return (
        <li
            onClick={handleClick}
            className="px-3 py-2 cursor-pointer hover:bg-blue-100"
        >
            {children}
        </li>
    );
}
