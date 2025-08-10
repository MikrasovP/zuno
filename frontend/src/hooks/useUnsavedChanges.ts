import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseUnsavedChangesProps {
    hasUnsavedChanges: boolean;
    onConfirmNavigation: () => void;
}

export function useUnsavedChanges({ hasUnsavedChanges, onConfirmNavigation }: UseUnsavedChangesProps) {
    const navigate = useNavigate();

    const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
        if (hasUnsavedChanges) {
            event.preventDefault();
            event.returnValue = '';
        }
    }, [hasUnsavedChanges]);

    const handleNavigation = useCallback((to: string) => {
        if (hasUnsavedChanges) {
            onConfirmNavigation();
        } else {
            navigate(to);
        }
    }, [hasUnsavedChanges, onConfirmNavigation, navigate]);

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [handleBeforeUnload]);

    return { handleNavigation };
}
