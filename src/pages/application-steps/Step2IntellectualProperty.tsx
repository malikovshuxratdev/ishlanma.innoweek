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
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';

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
                                    label={<span>Ixtiro nomi</span>}
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
                                        <span className="flex items-center gap-1">
                                            Mualliflari (F.I.O + Science ID)
                                        </span>
                                    }
                                >
                                    <Form.List name="authors">
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
                                    label={<span>Patent raqami</span>}
                                >
                                    <Input
                                        placeholder="Patent raqami"
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

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="validityPeriod"
                                    label={<span>Amal qilish muddati</span>}
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
