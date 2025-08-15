import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    Card,
    Button,
    Row,
    Col,
    Select,
    Divider,
    Space,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSearchOrganizationMutate } from '../../hooks/useSearchAuthorMutate';
import { Plus as IconPlus, X as IconX } from 'lucide-react';
import { OrganizationType } from '../../types/admin-assign/adminAssiginTpe';

const { Option } = Select;

interface Step3Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const Step3ScientificBackground: React.FC<Step3Props> = ({
    onNext,
    onBack,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const { mutate: searchOrganization, isPending: isOrgPending } =
        useSearchOrganizationMutate();

    // INN-based organization selection (mocked)
    const [orgInnInput, setOrgInnInput] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number | string;
        name: string;
        inn: string;
    } | null>(null);
    const [orgSearchError, setOrgSearchError] = useState<string | null>(null);

    const regions = [
        'Tashkent',
        'Samarkand',
        'Bukhara',
        'Fergana',
        'Andijan',
        'Namangan',
        'Kashkadarya',
        'Surkhandarya',
        'Jizzakh',
        'Syrdarya',
        'Navoi',
        'Khorezm',
        'Karakalpakstan',
        'Tashkent Region',
    ];

    const scientificFields = [
        'Artificial Intelligence',
        'Biotechnology',
        'Energy Systems',
        'Environmental Science',
        'Materials Science',
        'Medical Technology',
        'Agricultural Science',
        'Information Technology',
        'Nanotechnology',
        'Renewable Energy',
        'Robotics',
        'Space Technology',
        'Chemical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Computer Science',
    ];

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    // Format INN: digits only, max 9 (common org INN length); adjust if needed
    const formatInn = (value: string) => value.replace(/\D/g, '').slice(0, 9);

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

    useEffect(() => {
        // Keep form in sync with selectedOrganization so validation/submission works
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            onNext(values);
        } finally {
            setSubmitting(false);
        }
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
                                    name="projectCode"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyiha shifri
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Loyiha shifri"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="researchProjectTitle"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ilmiy-tadqiqot loyihasi nomi
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Ilmiy-tadqiqot loyihasi nomi"
                                        maxLength={200}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="implementationPeriod"
                                    label={
                                        <span className="font-medium text-lg">
                                            Amalga oshirilgan muddati
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select start date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        inputReadOnly
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="regionOfImplementation"
                                    label={
                                        <span className="font-medium text-lg">
                                            Bajarilgan hudud
                                        </span>
                                    }
                                >
                                    <Select
                                        placeholder="Select region"
                                        size="large"
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {regions.map((region) => (
                                            <Option key={region} value={region}>
                                                {region}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="scientificField"
                                    label={
                                        <span className="font-medium text-lg">
                                            Fan yoʻnalishi
                                        </span>
                                    }
                                >
                                    <Select
                                        placeholder="Select field"
                                        size="large"
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {scientificFields.map((field) => (
                                            <Option key={field} value={field}>
                                                {field}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="executingOrganization"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyihaning ijrochi tashkiloti
                                        </span>
                                    }
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
                                3-qadam 5-dan
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

export default Step3ScientificBackground;
