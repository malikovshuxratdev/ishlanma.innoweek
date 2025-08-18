import React, { useEffect, useMemo, useState } from 'react';
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
import { ArrowRightOutlined } from '@ant-design/icons';
import { Plus as IconPlus, X as IconX, Search } from 'lucide-react';
import {
    useSearchExternalCodeMutate,
    useSearchOrganizationMutate,
} from '../../hooks/useSearchAuthorMutate';
import { OrganizationType } from '../../types/admin-assign/adminAssiginTpe';

const { TextArea } = Input;

interface Step1Props {
    onNext: (values: any) => void;
    initialValues?: any;
}

const MAX_COMMERCIALIZATION_WORDS = 50;

const Step1InnovationDetails: React.FC<Step1Props> = ({
    onNext,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const { mutate: searchOrganization, isPending: isOrgPending } =
        useSearchOrganizationMutate();
    const { mutate: searchExternalCode, isPending: isExtPending } =
        useSearchExternalCodeMutate();
    // external code qidirish uchun state
    const [extSearchInput, setExtSearchInput] = useState('');
    const [extSearchResult, setExtSearchResult] = useState<{
        code: string;
        projectName: string;
    } | null>(null);
    const [orgInnInput, setOrgInnInput] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number | string;
        name: string;
        inn: string;
    } | null>(null);
    const [orgSearchError, setOrgSearchError] = useState<string | null>(null);

    const formatInn = (value: string) => value.replace(/\D/g, '').slice(0, 9);

    // ...existing code...

    const handleFindOrganization = async () => {
        const trimmed = formatInn(orgInnInput).trim();
        if (!trimmed) return;
        setOrgSearchError(null);

        // Call API via hook
        searchOrganization(Number(trimmed), {
            onSuccess: (org: OrganizationType) => {
                const normalized = {
                    id: org.data.tin || trimmed,
                    name: org.data.name || 'Tashkilot',
                    inn: String(org.data.tin || trimmed),
                } as { id: number | string; name: string; inn: string };
                setSelectedOrganization(normalized);
            },
            onError: () => {
                setSelectedOrganization(null);
                setOrgSearchError('Tashkilot topilmadi');
            },
        });
    };

    const handleFindExternalCode = () => {
        const trimmed = extSearchInput.trim();
        if (!trimmed) return;
        setExtSearchResult(null);

        searchExternalCode(trimmed, {
            onSuccess: (res: any) => {
                setExtSearchResult({
                    code: res.data?.code || trimmed,
                    projectName: res.data?.projectName || res.data?.name || '',
                });
            },
            onError: () => {},
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const descriptionValue: string =
        Form.useWatch('innovationDescription', form) || '';

    const descriptionWordCount = useMemo(
        () => descriptionValue.trim().split(/\s+/).filter(Boolean).length,
        [descriptionValue]
    );

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            onNext(values);
        } catch (e) {
        } finally {
            setSubmitting(false);
        }
    };

    // Limit innovation description input to MAX_COMMERCIALIZATION_WORDS words
    const handleDescriptionChange = (value: string) => {
        const words = value.trim().split(/\s+/).filter(Boolean);
        if (words.length > MAX_COMMERCIALIZATION_WORDS) {
            const limited = words
                .slice(0, MAX_COMMERCIALIZATION_WORDS)
                .join(' ');
            form.setFieldsValue({ innovationDescription: limited });
        } else {
            form.setFieldsValue({ innovationDescription: value });
        }
    };

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    return (
        <div className="mx-auto max-w-6xl animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleNext}
                        scrollToFirstError
                        className="mt-2"
                    >
                        <Row gutter={[24, 2]}>
                            <Col span={24}>
                                <div className="mb-6">
                                    <Form.Item
                                        name="externalCode"
                                        label={
                                            <span className="font-medium text-lg">
                                                Loyiha raqami
                                            </span>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Loyiha raqamini kiriting',
                                            },
                                        ]}
                                    >
                                        <div>
                                            <Input
                                                value={extSearchInput}
                                                onChange={(e) =>
                                                    setExtSearchInput(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Kod yoki INN kiriting"
                                                size="large"
                                                style={{ width: 240 }}
                                            />
                                            <Button
                                                type="primary"
                                                onClick={handleFindExternalCode}
                                                loading={isExtPending}
                                                size="large"
                                                className="bg-primary rounded-md ml-2"
                                                icon={<Search size={18} />}
                                            ></Button>
                                        </div>
                                    </Form.Item>

                                    {extSearchResult && (
                                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <div className="font-medium text-base">
                                                Loyiha nomi:{' '}
                                                <span className="text-blue-700">
                                                    {
                                                        extSearchResult.projectName
                                                    }
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                Code:{' '}
                                                <span className="font-mono">
                                                    {extSearchResult.code}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="projectTitle"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyiha nomi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Loyiha nomi kiritilishi shart',
                                        },
                                        {
                                            max: 200,
                                            message: 'Max 200 belgidan iborat',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Loyiha nomi"
                                        maxLength={200}
                                        showCount
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="innovationDescription"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanma tavsifi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Ishlanma tavsifi kiritilishi shart',
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (!value)
                                                    return Promise.resolve();
                                                const words = value
                                                    .trim()
                                                    .split(/\s+/)
                                                    .filter(Boolean);
                                                if (
                                                    words.length >
                                                    MAX_COMMERCIALIZATION_WORDS
                                                ) {
                                                    return Promise.reject(
                                                        new Error(
                                                            `Limit: ${words.length}/${MAX_COMMERCIALIZATION_WORDS} so'z`
                                                        )
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Yangi ishlanmani tijoratlashtirishga tayyorlash bo'yicha ..."
                                        size="large"
                                        allowClear
                                        value={descriptionValue}
                                        onChange={(e) =>
                                            handleDescriptionChange(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <div className="text-right mt-1">
                                        <span
                                            className={`text-sm ${
                                                descriptionWordCount >=
                                                MAX_COMMERCIALIZATION_WORDS
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {descriptionWordCount}/
                                            {MAX_COMMERCIALIZATION_WORDS} so'z
                                        </span>
                                    </div>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="organizationName"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanma yaratilgan tashkilot nomi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Ishlanma yaratilgan tashkilot nomi kiritilishi shart',
                                        },
                                    ]}
                                >
                                    <div>
                                        <div className="flex gap-2">
                                            <Input
                                                value={orgInnInput}
                                                onChange={(e) =>
                                                    setOrgInnInput(
                                                        formatInn(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                placeholder="INN kiriting (faqat raqam)"
                                                size="large"
                                                disabled={
                                                    !!selectedOrganization
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                size="large"
                                                onClick={handleFindOrganization}
                                                loading={isOrgPending}
                                                disabled={
                                                    !!selectedOrganization
                                                }
                                                className="bg-primary rounded-md transition-colors"
                                                icon={<IconPlus size={20} />}
                                            />
                                        </div>
                                        {orgSearchError && (
                                            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                                                <p className="text-red-600 text-sm">
                                                    {orgSearchError}
                                                </p>
                                            </div>
                                        )}
                                        {selectedOrganization && (
                                            <div className="mt-4">
                                                <div className="flex items-center justify-between px-4 py-3 rounded-md border-2">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">
                                                            {
                                                                selectedOrganization.name
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            INN:{' '}
                                                            <span className="text-blue-600 font-mono">
                                                                {
                                                                    selectedOrganization.inn
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <Button
                                                        type="text"
                                                        onClick={() => {
                                                            setSelectedOrganization(
                                                                null
                                                            );
                                                            setOrgInnInput('');
                                                        }}
                                                        icon={
                                                            <IconX size={16} />
                                                        }
                                                        size="small"
                                                        className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="dateOfCreation"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanma yaratilgan sana
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Ishlanma yaratilgan sanani tanlang',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Ishlanma yaratilgan sanani tanlang"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="certificateNumber"
                                    label={
                                        <span className="font-medium text-lg">
                                            Sertifikat raqami
                                        </span>
                                    }
                                >
                                    <Input
                                        className="w-full"
                                        placeholder="Sertifikat raqamini kiriting"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="certificateDate"
                                    label={
                                        <span className="font-medium text-lg">
                                            Sertifikat sanasi
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Sertifikat sanasini tanlang"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider className="!my-2" />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <span className="text-xs text-gray-400">
                                1-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                                disabled={
                                    descriptionWordCount >
                                    MAX_COMMERCIALIZATION_WORDS
                                }
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

export default Step1InnovationDetails;
