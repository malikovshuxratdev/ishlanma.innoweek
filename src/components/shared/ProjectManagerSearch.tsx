import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { Search as IconSearch, X as IconX } from 'lucide-react';
import { useSearchAuthorMutate } from '../../hooks/useSearchAuthorMutate';
import { AuthorAssignType } from '../../types/admin-assign/adminAssiginTpe';

interface ProjectManager {
    id: number | string;
    fullName: string;
    science_id: string;
}

interface Props {
    value?: ProjectManager | null;
    onChange: (pm: ProjectManager | null) => void;
    inputValue?: string;
    onInputChange?: (v: string) => void;
}

const ProjectManagerSearch: React.FC<Props> = ({
    value,
    onChange,
    inputValue,
    onInputChange,
}) => {
    const [localInput, setLocalInput] = useState(inputValue ?? '');
    const [error, setError] = useState<string | null>(null);
    const {
        mutate: searchAuthor,
        reset: resetSearchAuthor,
        isPending,
        data: authorData,
    } = useSearchAuthorMutate();

    useEffect(() => {
        if (typeof inputValue !== 'undefined') setLocalInput(inputValue || '');
    }, [inputValue]);

    const formatScienceId = (value: string) => {
        value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        let letters = value.slice(0, 3).replace(/[^A-Z]/g, '');
        let numbers = value.slice(3).replace(/[^0-9]/g, '');
        if (numbers.length > 8) numbers = numbers.slice(0, 8);
        let formatted = letters;
        if (numbers.length > 0) {
            formatted += '-' + numbers.slice(0, 4);
        }
        if (numbers.length > 4) {
            formatted += '-' + numbers.slice(4, 8);
        }
        return formatted;
    };

    const handleFind = () => {
        const trimmed = localInput.trim();
        if (!trimmed) return;
        setError(null);

        searchAuthor(trimmed, {
            onSuccess: (data: AuthorAssignType) => {
                const payload = data?.id ? data : null;
                if (payload?.id) {
                    const normalized = {
                        id: payload?.id,
                        fullName: payload.sur_name + ' ' + payload.first_name,
                        science_id: payload?.science_id,
                    } as ProjectManager;

                    onChange?.(normalized);
                    setLocalInput('');
                    onInputChange?.('');
                } else {
                    setError('Rahbar topilmadi');
                }
            },
            onError: () => {
                onChange?.(null);
                setError('Rahbar topilmadi');
            },
        });
    };

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // use onKeyDown semantics: trigger search on Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFind();
        }
    };

    return (
        <div>
            <div className="flex gap-2">
                <Input
                    value={localInput}
                    onChange={(e) => {
                        const v = formatScienceId(e.target.value);
                        setLocalInput(v);
                        onInputChange?.(v);
                    }}
                    onKeyDown={handleKey}
                    placeholder="Muallif ID sini kiriting (masalan: ABC-1234-5678)"
                    size="large"
                    aria-label="Project manager science id input"
                    disabled={
                        // prefer controlled `value` from parent; fallback to latest authorData
                        value?.id ? true : authorData?.id ? true : false
                    }
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={handleFind}
                    loading={isPending}
                    disabled={value?.id ? true : authorData?.id ? true : false}
                    icon={<IconSearch size={18} />}
                />
            </div>

            {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* show selected manager from prop `value` first, otherwise fall back to latest API authorData */}
            {(value?.id || authorData?.id) && (
                <div className="mt-4">
                    <div className="flex items-center justify-between px-4 py-3 rounded-md border-2">
                        <div className="flex-1">
                            <p className="font-medium text-sm">
                                {value?.fullName
                                    ? value.fullName
                                    : authorData?.sur_name &&
                                      authorData?.first_name
                                    ? authorData.sur_name +
                                      ' ' +
                                      authorData.first_name
                                    : ''}
                            </p>
                            <p className="text-sm text-gray-500">
                                Science ID:{' '}
                                <span className="text-blue-600 font-mono">
                                    {value?.science_id ??
                                        authorData?.science_id}
                                </span>
                            </p>
                        </div>
                        <Button
                            type="text"
                            onClick={() => {
                                // clear parent-controlled value
                                onChange?.(null);
                                // clear local input and notify parent
                                setLocalInput('');
                                onInputChange?.('');
                                // reset mutation state so authorData is cleared
                                resetSearchAuthor?.();
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

export default ProjectManagerSearch;
