import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { Search as IconSearch, X as IconX } from 'lucide-react';
import { useSearchOrganizationMutate } from '../../hooks/useSearchAuthorMutate';

interface Organization {
    id: number | string;
    name: string;
    inn: string;
}

interface Props {
    value?: Organization | null;
    onChange?: (org: Organization | null) => void;
    disabled?: boolean;
    inputValue?: string;
    onInputChange?: (v: string) => void;
}

const OrganizationSearch: React.FC<Props> = ({
    value,
    onChange,
    disabled,
    inputValue,
    onInputChange,
}) => {
    const [localInput, setLocalInput] = useState(inputValue ?? '');
    const [error, setError] = useState<string | null>(null);
    const { mutate: searchOrganization, isPending } =
        useSearchOrganizationMutate();

    useEffect(() => {
        if (typeof inputValue !== 'undefined') setLocalInput(inputValue || '');
    }, [inputValue]);

    const formatInn = (value: string) =>
        value.replace(/[^0-9]/g, '').slice(0, 9);

    const handleFind = () => {
        const trimmed = formatInn(localInput).trim();
        if (!trimmed) return;
        setError(null);

        searchOrganization(Number(trimmed), {
            onSuccess: (org: any) => {
                const normalized = {
                    id: org.data.tin || trimmed,
                    name: org.data.name || 'Tashkilot',
                    inn: String(org.data.tin || trimmed),
                } as Organization;
                onChange?.(normalized);
            },
            onError: () => {
                onChange?.(null);
                setError('Tashkilot topilmadi');
            },
        });
    };

    const inputDisabled = disabled || !!value;

    return (
        <div>
            <div className="flex gap-2">
                <Input
                    value={localInput}
                    onChange={(e) => {
                        const v = formatInn(e.target.value);
                        setLocalInput(v);
                        onInputChange?.(v);
                    }}
                    placeholder="INN kiriting (faqat raqam)"
                    size="large"
                    disabled={inputDisabled}
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={handleFind}
                    loading={isPending}
                    disabled={inputDisabled}
                    icon={<IconSearch size={18} />}
                />
            </div>

            {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {value && (
                <div className="mt-4">
                    <div className="flex items-center justify-between px-4 py-3 rounded-md border-2">
                        <div className="flex-1">
                            <p className="font-medium text-sm">{value.name}</p>
                            <p className="text-sm text-gray-500">
                                INN:{' '}
                                <span className="text-blue-600 font-mono">
                                    {value.inn}
                                </span>
                            </p>
                        </div>
                        <Button
                            type="text"
                            onClick={() => {
                                onChange?.(null);
                                setLocalInput('');
                                onInputChange?.('');
                            }}
                            icon={<IconX size={16} />}
                            size="small"
                            className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizationSearch;
