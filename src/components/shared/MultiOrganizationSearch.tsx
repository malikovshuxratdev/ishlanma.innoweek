import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { Search as IconSearch, X as IconX } from 'lucide-react';
import {
    useDeleteOrganizationMutate,
    useSearchOrganizationMutate,
} from '../../hooks/useSearchAuthorMutate';

interface Organization {
    id: number;
    name: string;
    inn: string;
}

interface Props {
    value?: Organization[] | null;
    onChange?: (orgs: Organization[]) => void;
    disabled?: boolean;
    inputValue?: string;
    onInputChange?: (v: string) => void;
    additional_info_id?: number;
    refetch?: () => void;
}

const MultiOrganizationSearch: React.FC<Props> = ({
    value,
    onChange,
    disabled,
    inputValue,
    onInputChange,
    additional_info_id,
    refetch,
}) => {
    const [localInput, setLocalInput] = useState(inputValue ?? '');
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<Organization[]>(value ?? []);
    const { mutate: searchOrganization, isPending } =
        useSearchOrganizationMutate();
    const { mutate: deleteOrganization, isPending: isDeleting } =
        useDeleteOrganizationMutate();

    useEffect(() => {
        if (typeof inputValue !== 'undefined') setLocalInput(inputValue || '');
    }, [inputValue]);

    useEffect(() => {
        setItems(value ?? []);
    }, [value]);

    const formatInn = (value: string) =>
        value.replace(/[^0-9]/g, '').slice(0, 9);

    const handleAdd = () => {
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

                // avoid duplicates by inn/id
                setItems((prev) => {
                    const exists = prev.some(
                        (p) => String(p.inn) === String(normalized.inn)
                    );
                    if (exists) return prev;
                    const next = [...prev, normalized];
                    onChange?.(next);
                    return next;
                });

                setLocalInput('');
                onInputChange?.('');
            },
            onError: () => {
                setError('Tashkilot topilmadi');
            },
        });
    };

    const handleRemove = (id: number) => {
        if (additional_info_id) {
            deleteOrganization(
                {
                    additional_info_id,
                    organization_id: id,
                },
                {
                    onSuccess: () => {
                        refetch?.();
                    },
                }
            );
        }
        setItems((prev) => {
            const next = prev.filter((p) => String(p.id) !== String(id));
            onChange?.(next);
            return next;
        });
    };

    const inputDisabled = disabled;

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
                    onClick={handleAdd}
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

            {items && items.length > 0 && (
                <div className="mt-4 space-y-2">
                    {items.map((it) => (
                        <div
                            key={String(it.id)}
                            className="flex items-center justify-between px-4 py-3 rounded-md border-2"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-sm">{it.name}</p>
                                <p className="text-sm text-gray-500">
                                    INN:{' '}
                                    <span className="text-blue-600 font-mono">
                                        {it.inn}
                                    </span>
                                </p>
                            </div>
                            <Button
                                type="text"
                                onClick={() => handleRemove(it.id)}
                                icon={<IconX size={16} />}
                                loading={isDeleting}
                                size="small"
                                className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiOrganizationSearch;
