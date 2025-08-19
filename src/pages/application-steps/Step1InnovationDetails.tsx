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
import OrganizationSearch from '../../components/shared/OrganizationSearch';
import ExternalCodeSearch from '../../components/shared/ExternalCodeSearch';
import moment from 'moment';
import { useSearchExternalCodeMutate } from '../../hooks/useSearchAuthorMutate';
import {
    useApplicationSubmit1Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';
import { ExternalCodeResponse } from '../../api/requests/externalCodeApi';

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

    const { isPending: isExtPending } = useSearchExternalCodeMutate();
    const { mutate: submitApplication, isPending: isSubmitting } =
        useApplicationSubmit1Mutate();
    const { data: applicationData } = useGetApplication();
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

    const handleFindExternalCode = (res: ExternalCodeResponse | null) => {
        if (!res) return;
        setExtSearchResult({
            code: res.cipher || String(extSearchInput || ''),
            projectName: res.tour_name || '',
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            organizationName: selectedOrganization?.name ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        if (initialValues) {
            // Ensure any date-like fields are converted to moment objects
            const initVals: any = { ...initialValues };
            if (initVals.dateOfCreation) {
                const m = moment(
                    initVals.dateOfCreation,
                    moment.ISO_8601,
                    true
                );
                initVals.dateOfCreation = m.isValid() ? m : undefined;
            }
            if (initVals.certificateDate) {
                const m = moment(
                    initVals.certificateDate,
                    moment.ISO_8601,
                    true
                );
                initVals.certificateDate = m.isValid() ? m : undefined;
            }
            form.setFieldsValue(initVals);
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
            dateOfCreation: dev?.creation_date
                ? moment(dev.creation_date, moment.ISO_8601, true).isValid()
                    ? moment(dev.creation_date)
                    : undefined
                : undefined,
            innovationDescription: dev?.description || undefined,
            certificateType: dev?.certificate_type || undefined,
            certificateNumber: dev?.certificate_number || undefined,
            certificateDate: dev?.certificate_date
                ? moment(dev.certificate_date, moment.ISO_8601, true).isValid()
                    ? moment(dev.certificate_date)
                    : undefined
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

            // Build development object conditionally so empty optional fields are omitted
            const development: any = {};

            // required/primary fields
            development.name = values.projectTitle;
            development.description = values.innovationDescription;
            development.creation_date = values.dateOfCreation
                ? values.dateOfCreation.format('YYYY-MM-DD')
                : undefined;

            // optional certificate fields - only add when present
            if (values.certificateDate) {
                development.certificate_date = values.certificateDate.format
                    ? values.certificateDate.format('YYYY-MM-DD')
                    : String(values.certificateDate);
            }
            if (values.certificateType) {
                development.certificate_type = values.certificateType;
            }
            if (values.certificateNumber) {
                development.certificate_number = String(
                    values.certificateNumber
                );
            }

            // organization tin - include only if present
            const tinVal = selectedOrganization?.inn || orgInnInput;
            if (tinVal) {
                development.tin = String(tinVal);
            }

            // code - prefer explicit value/result/input; include only if non-empty
            const codeVal =
                values.code || extSearchResult?.code || extSearchInput;

            const payload: any = {
                development,
            };
            if (codeVal) payload.code = String(codeVal);

            // Submit without sending empty strings for optional fields
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
                                        <ExternalCodeSearch
                                            value={extSearchInput}
                                            onChange={setExtSearchInput}
                                            onResult={handleFindExternalCode}
                                            loading={isExtPending}
                                            placeholder="Kod yoki INN kiriting"
                                            size="large"
                                            width={240}
                                        />
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
                                            <OrganizationSearch
                                                value={selectedOrganization}
                                                onChange={(v) => {
                                                    setSelectedOrganization(v);
                                                    setOrgInnInput(
                                                        v?.inn || ''
                                                    );
                                                }}
                                                inputValue={orgInnInput}
                                                onInputChange={(v) =>
                                                    setOrgInnInput(v)
                                                }
                                            />
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
