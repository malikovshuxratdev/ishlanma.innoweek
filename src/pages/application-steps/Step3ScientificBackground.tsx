import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    Card,
    Button,
    Row,
    Col,
    Typography,
    Select,
    Steps,
    Tooltip,
    Divider,
    Space,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface Step3Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const Step3ScientificBackground: React.FC<Step3Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

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

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <div className="flex flex-col gap-2 text-center">
                        <Title level={2} className="!mb-0">
                            Scientific Research Background
                        </Title>
                        <span className="text-gray-500 text-sm">
                            Provide research context and administrative
                            information supporting the innovation.
                        </span>
                    </div>
                    <Steps
                        responsive
                        size="small"
                        current={2}
                        items={[
                            { title: 'Details' },
                            { title: 'Intellectual Property' },
                            { title: 'Background' },
                            { title: 'Additional Info' },
                            { title: 'Financials' },
                        ]}
                    />
                    <Divider className="!my-4" />

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
                                        <span>
                                            Project Code{' '}
                                            <Tooltip title="Internal or grant reference code.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            max: 50,
                                            message: 'Max 50 characters',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="e.g. GRANT-2025-ALPHA"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="researchProjectTitle"
                                    label={
                                        <span>
                                            Research Project Title{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Enter research project title',
                                        },
                                        {
                                            max: 200,
                                            message: 'Max 200 characters',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Official title used in proposals or
                                            funding documents.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="e.g. Hybrid Nano-Coatings for Thermal Regulation"
                                        showCount
                                        maxLength={200}
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="implementationPeriod"
                                    label={
                                        <span>
                                            Implementation Start Date{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select start date',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select start date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="regionOfImplementation"
                                    label={
                                        <span>
                                            Region of Implementation{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select region',
                                        },
                                    ]}
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

                            <Col span={24}>
                                <Form.Item
                                    name="projectLeader"
                                    label={
                                        <span>
                                            Project Leader (F.I.O + Science ID){' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Enter leader name and Science ID',
                                        },
                                        {
                                            max: 120,
                                            message: 'Max 120 characters',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Format: Full Name – Science ID (e.g.
                                            Azizov A.A. – SCI12345)
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="e.g. Azizov A.A. – SCI12345"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="scientificField"
                                    label={
                                        <span>
                                            Scientific Field{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select scientific field',
                                        },
                                    ]}
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
                                        <span>
                                            Executing Organization{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing organization',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Auto-filled based on registered TIN.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Auto-fetched by TIN"
                                        disabled
                                        size="large"
                                        value={
                                            initialValues?.executingOrganization
                                        }
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
                                Back
                            </Button>
                            <span className="text-xs text-gray-400">
                                Step 3 of 5
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                            >
                                Next
                            </Button>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Step3ScientificBackground;
