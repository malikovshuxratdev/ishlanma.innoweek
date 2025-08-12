import React from 'react';
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
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

interface Step1Props {
    onNext: (values: any) => void;
    initialValues?: any;
}

const Step1InnovationDetails: React.FC<Step1Props> = ({
    onNext,
    initialValues,
}) => {
    const [form] = Form.useForm();

    const handleNext = () => {
        form.validateFields().then((values) => {
            onNext(values);
        });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <Title level={2}>Step 1 of 5: Innovation Details</Title>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    className="space-y-6"
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="projectTitle"
                                label="Project Title *"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter project title',
                                    },
                                    {
                                        max: 200,
                                        message:
                                            'Project title must be ≤ 200 characters',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your project title"
                                    maxLength={200}
                                    showCount
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="innovationDescription"
                                label="Innovation Description *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please enter innovation description',
                                    },
                                    {
                                        max: 350,
                                        message:
                                            'Description must be ≤ 50 words (approximately 350 characters)',
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Describe your innovation (≤ 50 words)"
                                    maxLength={350}
                                    showCount
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="organizationName"
                                label="Organization Name *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Organization name is required',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Fetched from registry"
                                    disabled
                                    value="Tashkent Medical Institute"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="tinNumber"
                                label="TIN (Taxpayer ID) *"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter TIN number',
                                    },
                                    {
                                        pattern: /^\d+$/,
                                        message: 'TIN must contain digits only',
                                    },
                                ]}
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="Enter TIN number"
                                    controls={false}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="dateOfCreation"
                                label="Date of Creation *"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select creation date',
                                    },
                                ]}
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="Select creation date"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="certificateNumber"
                                label="Certificate Number (if available)"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="Enter certificate number"
                                    controls={false}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="certificateDate"
                                label="Certificate Date (if available)"
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="Select certificate date"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end pt-6">
                        <Button
                            type="primary"
                            onClick={handleNext}
                            icon={<ArrowRightOutlined />}
                            iconPosition="end"
                            size="large"
                        >
                            Next
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Step1InnovationDetails;
