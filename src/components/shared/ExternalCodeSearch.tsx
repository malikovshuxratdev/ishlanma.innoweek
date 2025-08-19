import React from 'react';
import { Input, Button } from 'antd';
import { useSearchExternalCodeMutate } from '../../hooks/useSearchAuthorMutate';
import { Search } from 'lucide-react';
import { ExternalCodeResponse } from '../../api/requests/externalCodeApi';

interface ExternalCodeSearchProps {
    value: string;
    onChange: (v: string) => void;
    onResult?: (res: ExternalCodeResponse | null) => void;
    loading?: boolean;
    width?: number | string;
    placeholder?: string;
    size?: 'small' | 'middle' | 'large';
}

const ExternalCodeSearch: React.FC<ExternalCodeSearchProps> = ({
    value,
    onChange,
    onResult,
    loading,
    width = 240,
    placeholder = 'Search',
    size = 'large',
}) => {
    const { mutate: searchExternalCode, isPending: isExtPending } =
        useSearchExternalCodeMutate();

    const handleSearch = () => {
        const trimmed = String(value || '').trim();
        if (!trimmed) return;
        searchExternalCode(trimmed, {
            onSuccess: (res: ExternalCodeResponse) => onResult?.(res),
            onError: () => onResult?.(null),
        });
    };

    return (
        <div className="flex gap-2">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                size={size}
                style={{ width }}
            />
            <Button
                type="primary"
                onClick={handleSearch}
                loading={typeof loading === 'boolean' ? loading : isExtPending}
                size={size}
                icon={<Search size={18} />}
            />
        </div>
    );
};

export default ExternalCodeSearch;
