import React, { useEffect, useMemo, useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Card,
    Button,
    Row,
    Col,
    Typography,
    Steps,
    Tooltip,
    Space,
    Divider,
    Progress,
} from 'antd';
import { ArrowRightOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

interface Step1Props {
    onNext: (values: any) => void;
    initialValues?: any;
}

const MAX_DESCRIPTION_WORDS = 50;

const Step1InnovationDetails: React.FC<Step1Props> = ({
    onNext,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    // Ensure initial values re-populate when navigating back
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

    const percent = Math.min(
        100,
        Math.round((descriptionWordCount / MAX_DESCRIPTION_WORDS) * 100)
    );

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            onNext(values);
        } catch (e) {
            // validation errors automatically displayed
        } finally {
            setSubmitting(false);
        }
    };

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <div className="flex flex-col gap-2 text-center">
                        <Title level={2} className="!mb-0">
                            Innovation Details
                        </Title>
                        <span className="text-gray-500 text-sm">
                            Provide core information about your innovation to
                            start the application process.
                        </span>
                    </div>
                    <Steps
                        responsive
                        size="small"
                        current={0}
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
                        className="mt-2"
                    >
                        <Row gutter={[24, 4]}>
                            <Col span={24}>
                                <Form.Item
                                    name="projectTitle"
                                    label={
                                        <span>
                                            Project Title{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    tooltip="A concise, descriptive title (max 200 characters)."
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter project title',
                                        },
                                        {
                                            max: 200,
                                            message: 'Max 200 characters',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Make it specific and impactful.
                                            Avoid generic words like 'System' or
                                            'Platform' alone.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="e.g. AI-Assisted Early Diagnosis Platform for Cardiac Anomalies"
                                        maxLength={200}
                                        showCount
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="innovationDescription"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Innovation Description{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                            <Tooltip
                                                title={`Max ${MAX_DESCRIPTION_WORDS} words. Focus on the problem, solution, and uniqueness.`}
                                            >
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter innovation description',
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
                                                    MAX_DESCRIPTION_WORDS
                                                ) {
                                                    return Promise.reject(
                                                        new Error(
                                                            `Limit exceeded: ${words.length}/${MAX_DESCRIPTION_WORDS} words`
                                                        )
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                    extra={
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                Briefly explain the innovation,
                                                target users, and core benefit.
                                            </span>
                                            <div className="w-40">
                                                <Progress
                                                    size="small"
                                                    percent={percent}
                                                    status={
                                                        percent >= 100
                                                            ? 'exception'
                                                            : 'active'
                                                    }
                                                    showInfo={false}
                                                />
                                                <span
                                                    className={`block text-right text-[10px] ${
                                                        descriptionWordCount >
                                                        MAX_DESCRIPTION_WORDS
                                                            ? 'text-red-500'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    {descriptionWordCount}/
                                                    {MAX_DESCRIPTION_WORDS}{' '}
                                                    words
                                                </span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <TextArea
                                        rows={5}
                                        placeholder="Describe the innovation, the problem it solves, and its unique advantage (max 50 words)."
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="organizationName"
                                    label={
                                        <span>
                                            Organization Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Organization name is required',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Auto-filled from the registry.
                                            Contact support if incorrect.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Fetched from registry"
                                        disabled
                                        value={
                                            initialValues?.organizationName ||
                                            'Tashkent Medical Institute'
                                        }
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="tinNumber"
                                    label={
                                        <span>
                                            TIN (Taxpayer ID){' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    tooltip="Digits only"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter TIN number',
                                        },
                                        {
                                            pattern: /^\d+$/,
                                            message: 'Digits only',
                                        },
                                        {
                                            min: 9,
                                            message: 'At least 9 digits',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Enter TIN number"
                                        controls={false}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="dateOfCreation"
                                    label={
                                        <span>
                                            Date of Creation{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please select creation date',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select creation date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="certificateNumber"
                                    label="Certificate Number (optional)"
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Enter certificate number"
                                        controls={false}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="certificateDate"
                                    label="Certificate Date (optional)"
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select certificate date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider className="!my-6" />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <span className="text-xs text-gray-400">
                                Step 1 of 5
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                                disabled={
                                    descriptionWordCount > MAX_DESCRIPTION_WORDS
                                }
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

export default Step1InnovationDetails;
