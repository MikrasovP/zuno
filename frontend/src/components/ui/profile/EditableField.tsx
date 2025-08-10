import { useState } from "react";
import SpinnerButtonComponent from "../SpinnerButtonComponent";

interface EditableFieldProps {
    label: string;
    value: string;
    onSave: (value: string) => Promise<void>;
    placeholder?: string;
    type?: "text" | "url";
    className?: string;
}

export default function EditableField({ 
    label, 
    value, 
    onSave, 
    placeholder = "", 
    type = "text",
    className = ""
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = () => {
        setEditValue(value);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (editValue.trim() === value.trim()) {
            setIsEditing(false);
            return;
        }

        setIsLoading(true);
        try {
            await onSave(editValue.trim());
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving field:', error);
            // Keep editing mode on error so user can retry
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className={`flex flex-col space-y-2 ${className}`}>
                <label className="text-sm font-medium text-foreground">{label}</label>
                <div className="flex space-x-2">
                    <input
                        type={type}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={placeholder}
                        className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        autoFocus
                    />
                    <SpinnerButtonComponent
                        onClick={handleSave}
                        isLoading={isLoading}
                        className="px-4 py-2 w-auto"
                    >
                        Save
                    </SpinnerButtonComponent>
                    <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="px-4 py-2 border border-border rounded-md bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-between group ${className}`}>
            <div className="flex-1">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <div className="text-foreground mt-1">
                    {value || <span className="text-muted-foreground italic">Not set</span>}
                </div>
            </div>
            <button
                onClick={handleEdit}
                className="ml-4 p-2 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                title={`Edit ${label.toLowerCase()}`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
        </div>
    );
} 