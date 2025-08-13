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
    Steps,
    Space,
    Divider,
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

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

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
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
                                    label={<span>Loyiha nomi </span>}
                                    tooltip="Qisqa, tavsiflovchi nom (maks 200 belgidan iborat)."
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
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Ishlanma tavsifi"
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
                                    <Input
                                        placeholder="Tashkilot nomi"
                                        value={initialValues?.organizationName}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="tinNumber"
                                    label={<span>STIR raqami</span>}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                ' Iltimos TIN raqamini kiriting',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Enter TIN number"
                                        controls={false}
                                        size="large"
                                        type="number"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="dateOfCreation"
                                    label={
                                        <span>Ishlanma yaratilgan sana</span>
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
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="certificateNumber"
                                    label="Sertifikat raqami (ixtiyoriy)"
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Sertifikat raqamini kiriting"
                                        controls={false}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="certificateDate"
                                    label="Sertifikat sanasi (ixtiyoriy)"
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

                        <Divider className="!my-6" />
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
                                    descriptionWordCount > MAX_DESCRIPTION_WORDS
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
