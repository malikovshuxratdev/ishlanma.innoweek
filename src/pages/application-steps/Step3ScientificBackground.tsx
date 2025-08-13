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
    Steps,
    Divider,
    Space,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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
                                    label={<span>Loyiha shifri</span>}
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
                                        <span>
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
                                        <span>Amalga oshirilgan muddati</span>
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
                                    label={<span>Bajarilgan hudud</span>}
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
                                    label={<span>Loyiha rahbari</span>}
                                >
                                    <Input
                                        placeholder="Loyiha rahbari"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="scientificField"
                                    label={<span>Fan yoʻnalishi</span>}
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
                                            Loyihaning ijrochi tashkiloti
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Loyihaning ijrochi tashkiloti"
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
