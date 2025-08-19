import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { Search as IconSearch } from 'lucide-react';
import { useSearchAuthorMutate } from '../../hooks/useSearchAuthorMutate';

interface Author {
    id: number | string;
    fullName: string;
    science_id: string;
}

interface Props {
    onAdd?: (author: Author) => void;
    loading?: boolean;
}

const AuthorSearch: React.FC<Props> = ({ onAdd }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { mutate: searchAuthor, isPending } = useSearchAuthorMutate();

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

    useEffect(() => {
        // noop
    }, []);

    const handleAdd = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        setError(null);
        searchAuthor(trimmed, {
            onSuccess: (author: any) => {
                if (author && (author.id || author.data?.id)) {
                    const normalized = {
                        id: author.id ?? author.data?.id,
                        fullName: author.sur_name
                            ? author.sur_name + ' ' + author.first_name
                            : author.fullName || author.name || '',
                        science_id:
                            author.science_id ?? author.data?.science_id ?? '',
                    } as Author;
                    onAdd?.(normalized);
                    setInput('');
                } else {
                    setError('Muallif topilmadi');
                }
            },
            onError: () => setError('Muallif topilmadi'),
        });
    };

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div>
            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(formatScienceId(e.target.value))}
                    onKeyPress={handleKey}
                    placeholder="Muallif ID sini kiriting (masalan: ABC-1234-5678)"
                    size="large"
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={handleAdd}
                    loading={isPending}
                    icon={<IconSearch size={18} />}
                />
            </div>
            {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}
        </div>
    );
};

export default AuthorSearch;
