import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    Card,
    Button,
    Row,
    Col,
    Space,
    Divider,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSearchAuthorMutate } from '../../hooks/useSearchAuthorMutate';
import { Plus as IconPlus, X as IconX } from 'lucide-react';
import { AuthorAssignType } from '../../types/admin-assign/adminAssiginTpe';

interface CoAuthor {
    id: number | string;
    fullName: string;
    science_id: string;
}

interface Step2Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const Step2IntellectualProperty: React.FC<Step2Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const { mutate: searchAuthor, isPending } = useSearchAuthorMutate();
    const [coAuthorInput, setCoAuthorInput] = useState('');
    const [authors, setAuthors] = useState<CoAuthor[]>([]);
    const [searchError, setSearchError] = useState<string | null>(null);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            if (Array.isArray(initialValues.authors)) {
                // Normalize any incoming authors into our local shape
                const normalized: CoAuthor[] = initialValues.authors.map(
                    (a: any) => ({
                        id:
                            a.id ??
                            a.data?.id ??
                            a.science_id ??
                            a.scienceId ??
                            Math.random().toString(36).slice(2),
                        fullName: a.fullName ?? a.full_name ?? a.name ?? '',
                        science_id: a.science_id ?? a.scienceId ?? '',
                    })
                );
                setAuthors(normalized);
            }
        }
    }, [initialValues, form]);

    // Keep form value in sync so submit returns authors
    useEffect(() => {
        form.setFieldsValue({ authors });
    }, [authors, form]);

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const fields = await form.validateFields();
            const values = { ...fields, authors };
            onNext(values);
        } finally {
            setSubmitting(false);
        }
    };

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();
    const disabledValidityDates = (current: any) => {
        const reg = form.getFieldValue('registrationDate');
        if (!reg) return false;
        return current && current < reg.startOf('day');
    };

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

    const handleAddCoAuthor = async () => {
        const trimmed = coAuthorInput.trim();
        if (!trimmed) return;
        setSearchError(null);
        searchAuthor(trimmed, {
            onSuccess: (author: AuthorAssignType) => {
                if (author && author.id && author.first_name) {
                    setAuthors((prev) => {
                        const exists = prev.some(
                            (a) => String(a.id) === String(author.id)
                        );
                        if (exists) return prev;
                        const next: CoAuthor = {
                            id: author.id,
                            fullName: author.sur_name + ' ' + author.first_name,
                            science_id: author.science_id,
                        };
                        return [...prev, next];
                    });
                    setCoAuthorInput('');
                } else {
                    setSearchError('Muallif topilmadi');
                }
            },
            onError: () => {
                setSearchError('Muallif topilmadi');
            },
        });
    };

    const handleCoAuthorKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCoAuthor();
        }
    };

    const handleRemoveCoAuthor = (id: number | string) => {
        setAuthors((prev) => prev.filter((a) => String(a.id) !== String(id)));
    };

    return (
        <div className="mx-auto max-w-6xl animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleNext}
                        scrollToFirstError
                    >
                        <Row gutter={[24, 4]}>
                            <Col span={24}>
                                <Form.Item
                                    name="inventionName"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ixtiro nomi
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Ixtiro nomi"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
                                            Mualliflari
                                        </span>
                                    }
                                >
                                    <div className="flex gap-2">
                                        <Input
                                            value={coAuthorInput}
                                            onChange={(e) => {
                                                setCoAuthorInput(
                                                    formatScienceId(
                                                        e.target.value
                                                    )
                                                );
                                            }}
                                            onKeyPress={handleCoAuthorKeyPress}
                                            placeholder="Muallif ID sini kiriting (masalan: ABC-1234-5678)"
                                            size="large"
                                        />
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={handleAddCoAuthor}
                                            loading={isPending}
                                            className="bg-primary rounded-md transition-colors"
                                            icon={<IconPlus size={20} />}
                                        />
                                    </div>
                                    {searchError && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                                            <p className="text-red-600 text-sm">
                                                {searchError}
                                            </p>
                                        </div>
                                    )}
                                    {authors.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Qo'shilgan hammuallif (
                                                {authors.length}):
                                            </p>
                                            <div className="grid gap-3 lg:grid-cols-3">
                                                {authors.map((author) => (
                                                    <div
                                                        key={author.id}
                                                        className="flex items-center justify-between px-4 py-3 rounded-md border-2"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    author.fullName
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Science ID:{' '}
                                                                <span className="text-blue-600 dark:text-blue-400 font-mono">
                                                                    {formatScienceId(
                                                                        author.science_id
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <Button
                                                            type="text"
                                                            onClick={() =>
                                                                handleRemoveCoAuthor(
                                                                    author.id
                                                                )
                                                            }
                                                            icon={
                                                                <IconX
                                                                    size={16}
                                                                />
                                                            }
                                                            size="small"
                                                            className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="patentNumber"
                                    label={
                                        <span className="font-medium text-lg">
                                            Patent raqami
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Patent raqami"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="registrationDate"
                                    label={
                                        <span className="font-medium text-lg">
                                            Roʻyyxatdan oʻtkazilgan sana
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="validityPeriod"
                                    label={
                                        <span className="font-medium text-lg">
                                            Amal qilish muddati
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select end date"
                                        disabledDate={disabledValidityDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider className="!my-6" />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <Button
                                onClick={onBack}
                                icon={<ArrowLeftOutlined />}
                                size="large"
                            >
                                Orqaga
                            </Button>
                            <span className="text-xs text-gray-400">
                                2-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                            >
                                Keyingi
                            </Button>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Step2IntellectualProperty;
