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
    Select,
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { X as IconX, Search } from 'lucide-react';
import moment from 'moment';
import {
    useSearchExternalCodeMutate,
    useSearchOrganizationMutate,
} from '../../hooks/useSearchAuthorMutate';
import { OrganizationType } from '../../types/admin-assign/adminAssiginTpe';
import {
    useApplicationSubmit1Mutate,
    useGetApplication1,
} from '../../hooks/useApplicationSubmitMutation';

const { TextArea } = Input;

interface Step1Props {
    onNext: () => void;
    initialValues?: any;
}

const MAX_COMMERCIALIZATION_WORDS = 50;

const Step1InnovationDetails: React.FC<Step1Props> = ({
    onNext,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const { mutate: searchOrganization, isPending: isOrgPending } =
        useSearchOrganizationMutate();
    const { mutate: searchExternalCode, isPending: isExtPending } =
        useSearchExternalCodeMutate();
    const { mutate: submitApplication, isPending: isSubmitting } =
        useApplicationSubmit1Mutate();
    const { data: applicationData } = useGetApplication1();
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
        // set the organization name into the form when an organization is selected
        form.setFieldsValue({
            organizationName: selectedOrganization?.name ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    useEffect(() => {
        // When applicationData is available, populate form and related local state
        if (!applicationData) return;

        const dev = applicationData.project?.development;

        // code / external search input/result
        const appCode = applicationData.code || dev?.id || '';
        setExtSearchInput(String(appCode || ''));
        setExtSearchResult({
            code: String(applicationData.code || ''),
            projectName: dev?.name || '',
        });

        // organization
        const org = dev?.organization;
        if (org) {
            const normalized = {
                id: org.id || org.tin || '',
                name: org.short_name || 'Tashkilot',
                inn: String(org.tin || ''),
            } as { id: number | string; name: string; inn: string };
            setSelectedOrganization(normalized);
            setOrgInnInput(String(org.tin || ''));
        }

        // set form fields
        form.setFieldsValue({
            code: applicationData.code || undefined,
            projectTitle: dev?.name || undefined,
            innovationDescription: dev?.description || undefined,
            certificateType: dev?.certificate_type || undefined,
            certificateNumber: dev?.certificate_number || undefined,
            certificateDate: dev?.certificate_date
                ? moment(dev.certificate_date)
                : undefined,
            organizationName: org?.short_name || undefined,
        });
    }, [applicationData, form]);

    const descriptionValue: string =
        Form.useWatch('innovationDescription', form) || '';

    const descriptionWordCount = useMemo(
        () => descriptionValue.trim().split(/\s+/).filter(Boolean).length,
        [descriptionValue]
    );

    const handleNext = async () => {
        try {
            const values = await form.validateFields();

            // Build payload matching ApplicationSubmitRequest1Form
            const payload = {
                code:
                    values.code ||
                    extSearchResult?.code ||
                    extSearchInput ||
                    '',
                development: {
                    name: values.projectTitle || '',
                    description: values.innovationDescription || '',
                    certificate_date: values.certificateDate
                        ? values.certificateDate.format
                            ? values.certificateDate.format('YYYY-MM-DD')
                            : String(values.certificateDate)
                        : '',
                    certificate_type: values.certificateType || '',
                    certificate_number: values.certificateNumber
                        ? Number(values.certificateNumber)
                        : 0,
                    tin: selectedOrganization?.inn || orgInnInput || '',
                },
            };

            submitApplication(payload, {
                onSuccess: () => {
                    onNext();
                },
            });
        } catch (e) {}
    };

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
                                        label={
                                            <span className="font-medium text-lg">
                                                Loyiha raqami
                                            </span>
                                        }
                                        required
                                    >
                                        <div className="flex gap-2">
                                            <Form.Item
                                                name="code"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Loyiha raqamini kiriting',
                                                    },
                                                ]}
                                                noStyle
                                            >
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
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                onClick={handleFindExternalCode}
                                                loading={isExtPending}
                                                size="large"
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
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanma tavsifi
                                        </span>
                                    }
                                    required
                                >
                                    <div>
                                        <Form.Item
                                            name="innovationDescription"
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
                                            noStyle
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
                                        </Form.Item>
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
                                                {MAX_COMMERCIALIZATION_WORDS}{' '}
                                                so'z
                                            </span>
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>

                            <Col span={24} md={12}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanma yaratilgan tashkilot nomi
                                        </span>
                                    }
                                    required
                                >
                                    <div>
                                        <Form.Item
                                            name="organizationName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Ishlanma yaratilgan tashkilot nomi kiritilishi shart',
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input hidden />
                                        </Form.Item>

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
                                                    onClick={
                                                        handleFindOrganization
                                                    }
                                                    loading={isOrgPending}
                                                    disabled={
                                                        !!selectedOrganization
                                                    }
                                                    icon={<Search size={18} />}
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
                                                                setOrgInnInput(
                                                                    ''
                                                                );
                                                            }}
                                                            icon={
                                                                <IconX
                                                                    size={16}
                                                                />
                                                            }
                                                            size="small"
                                                            className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
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
                                    name="certificateType"
                                    label={
                                        <span className="font-medium text-lg">
                                            Sertifikat turi
                                        </span>
                                    }
                                >
                                    <Select
                                        className="w-full"
                                        placeholder="Sertifikat turini tanlang"
                                        size="large"
                                        allowClear
                                    >
                                        <Select.Option value="compliance">
                                            Compliance
                                        </Select.Option>
                                        <Select.Option value="hygiene">
                                            Hygiene
                                        </Select.Option>
                                        <Select.Option value="fire">
                                            Fire
                                        </Select.Option>
                                        <Select.Option value="other">
                                            Other
                                        </Select.Option>
                                    </Select>
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
                                        type="number"
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
                                loading={isSubmitting}
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
