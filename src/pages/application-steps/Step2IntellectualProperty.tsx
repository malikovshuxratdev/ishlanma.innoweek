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
    Space,
    Steps,
    Tooltip,
    Divider,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

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

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
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

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <div className="flex flex-col gap-2 text-center">
                        <Title level={2} className="!mb-0">
                            Intellectual Property Rights
                        </Title>
                        <span className="text-gray-500 text-sm">
                            Provide information about ownership and legal
                            protection of the innovation.
                        </span>
                    </div>
                    <Steps
                        responsive
                        size="small"
                        current={1}
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
                                    name="inventionName"
                                    label={
                                        <span>
                                            Invention Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter invention name',
                                        },
                                        {
                                            max: 200,
                                            message: 'Max 200 characters',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Use the official title as used in
                                            patent filings (if any).
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="e.g. Adaptive Photovoltaic Cooling Matrix"
                                        showCount
                                        maxLength={200}
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span className="flex items-center gap-1">
                                            Authors (F.I.O + Science ID){' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                            <Tooltip title="List all contributors recognized legally / academically.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    required
                                >
                                    <Form.List
                                        name="authors"
                                        rules={[
                                            {
                                                validator: async (
                                                    _,
                                                    authors
                                                ) => {
                                                    if (
                                                        !authors ||
                                                        authors.length === 0
                                                    ) {
                                                        return Promise.reject(
                                                            new Error(
                                                                'Add at least one author'
                                                            )
                                                        );
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(
                                            fields,
                                            { add, remove },
                                            { errors }
                                        ) => (
                                            <>
                                                {fields.map(
                                                    ({
                                                        key,
                                                        name,
                                                        ...restField
                                                    }) => (
                                                        <Space
                                                            key={key}
                                                            className="flex w-full mb-2"
                                                            align="start"
                                                        >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[
                                                                    name,
                                                                    'fullName',
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            'Full name required',
                                                                    },
                                                                ]}
                                                                className="!mb-0 flex-1"
                                                            >
                                                                <Input
                                                                    placeholder="Full Name"
                                                                    size="large"
                                                                    allowClear
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[
                                                                    name,
                                                                    'scienceId',
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            'Science ID required',
                                                                    },
                                                                ]}
                                                                className="!mb-0 flex-1"
                                                            >
                                                                <Input
                                                                    placeholder="Science ID"
                                                                    size="large"
                                                                    allowClear
                                                                />
                                                            </Form.Item>
                                                            <Button
                                                                type="text"
                                                                danger
                                                                onClick={() =>
                                                                    remove(name)
                                                                }
                                                                icon={
                                                                    <MinusCircleOutlined />
                                                                }
                                                            />
                                                        </Space>
                                                    )
                                                )}
                                                <Form.ErrorList
                                                    errors={errors}
                                                />
                                                <Form.Item className="!mb-2">
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Author
                                                    </Button>
                                                </Form.Item>
                                                <span className="text-xs text-gray-400">
                                                    Order should reflect
                                                    contribution priority if
                                                    applicable.
                                                </span>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="patentNumber"
                                    label={
                                        <span>
                                            Patent / Application Number{' '}
                                            <Tooltip title="Leave blank if not yet filed.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            pattern: /^[\w-]*$/i,
                                            message:
                                                'Only letters, numbers, dash',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            If multiple, provide the primary or
                                            most recent.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="e.g. UZ-123456-A"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="registrationDate"
                                    label={
                                        <span>
                                            Registration Date{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select registration date',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="validityPeriod"
                                    label={
                                        <span>
                                            Validity End Date{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select validity end date',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const reg =
                                                    getFieldValue(
                                                        'registrationDate'
                                                    );
                                                if (
                                                    !value ||
                                                    !reg ||
                                                    value.isAfter(reg, 'day')
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'End date must be after registration date'
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select end date"
                                        disabledDate={disabledValidityDates}
                                        size="large"
                                        format="YYYY-MM-DD"
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
                                Step 2 of 5
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

export default Step2IntellectualProperty;
