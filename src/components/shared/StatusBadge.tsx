import React from 'react';
import {
    ApplicationStatus,
    ApplicationStatusLabels,
    ApplicationStatusColors,
    ApplicationStatusIcons,
} from '../../types/application-status';

interface StatusBadgeProps {
    status: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    className = '',
    size = 'md',
}) => {
    const statusEnum = status as ApplicationStatus;
    const label = ApplicationStatusLabels[statusEnum] || "Noma'lum";
    const colors =
        ApplicationStatusColors[statusEnum] ||
        'bg-gray-100 text-gray-800 border-gray-300';
    const icon = ApplicationStatusIcons[statusEnum] || '❓';

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span
            className={`
                inline-flex items-center justify-center gap-2
                font-medium rounded-full border
                ${colors}
                ${sizeClasses[size]}
                ${className}
            `}
        >
            <span className="text-sm">{icon}</span>
            {label}
        </span>
    );
};

export default StatusBadge;
