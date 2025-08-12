import React from 'react';
import {
    Form,
    Input,
    Card,
    Button,
    Row,
    Col,
    Typography,
    Select,
    Upload,
    InputNumber,
    Space,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    InboxOutlined,
    UploadOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

interface Step4Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const Step4AdditionalInfo: React.FC<Step4Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();

    const industries = [
        'Agriculture',
        'Energy',
        'Healthcare',
        'Information Technology',
        'Manufacturing',
        'Environment',
        'Transportation',
        'Education',
        'Finance',
        'Construction',
        'Food Processing',
        'Textiles',
        'Mining',
        'Tourism',
        'Telecommunications',
        'Biotechnology',
        'Aerospace',
        'Automotive',
        'Chemical',
        'Defense',
        'Entertainment',
        'Fashion',
        'Forestry',
        'Gaming',
        'Insurance',
        'Legal Services',
        'Logistics',
        'Media',
        'Pharmaceuticals',
        'Real Estate',
        'Retail',
        'Security',
        'Sports',
        'Utilities',
        'Waste Management',
    ];

    const maturityLevels = [
        { value: 'undefined', label: 'Undefined' },
        { value: 'idea', label: 'Idea' },
        { value: 'experimental_research', label: 'Experimental Research' },
        { value: 'industrial_sample', label: 'Industrial Sample' },
        { value: 'new_product_creation', label: 'New Product Creation' },
        { value: 'production_expansion', label: 'Production Expansion' },
    ];

    const handleNext = () => {
        form.validateFields().then((values) => {
            onNext(values);
        });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
                <div className="text-center mb-8">
                    <Title level={2}>Step 4 of 5: Additional Information</Title>
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
                                name="commercializationProject"
                                label="Project for Commercialization Preparation"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Describe commercialization project (max 50 words)"
                                    maxLength={350}
                                    showCount
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                name="innovationPhotos"
                                label="Innovation Photo(s) *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload at least one innovation photo',
                                    },
                                ]}
                            >
                                <Dragger
                                    name="files"
                                    multiple={true}
                                    accept="image/*"
                                    beforeUpload={() => false}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag images to upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Upload multiple photos. You can mark one
                                        as main image.
                                    </p>
                                </Dragger>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="industryBelonging"
                                label="Industry Belonging"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select industries"
                                    allowClear
                                >
                                    {industries.map((industry) => (
                                        <Option key={industry} value={industry}>
                                            {industry}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="maturityLevel"
                                label="Innovation Maturity Level *"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select maturity level',
                                    },
                                ]}
                            >
                                <Select placeholder="Select maturity level">
                                    {maturityLevels.map((level) => (
                                        <Option
                                            key={level.value}
                                            value={level.value}
                                        >
                                            {level.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="bankInformation"
                                label="Bank Information"
                            >
                                <Input placeholder="Enter bank information" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Export Figures">
                                <Form.List name="exportFigures">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                        }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'year',
                                                            ]}
                                                            style={{
                                                                width: 100,
                                                            }}
                                                        >
                                                            <InputNumber
                                                                placeholder="Year"
                                                                min={2000}
                                                                max={2030}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'amount',
                                                            ]}
                                                            style={{ flex: 1 }}
                                                        >
                                                            <InputNumber
                                                                placeholder="Amount in UZS"
                                                                className="w-full"
                                                                formatter={(
                                                                    value
                                                                ) =>
                                                                    `${value}`.replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        ','
                                                                    )
                                                                }
                                                                parser={(
                                                                    value
                                                                ) =>
                                                                    value!.replace(
                                                                        /\$\s?|(,*)/g,
                                                                        ''
                                                                    )
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() =>
                                                                remove(name)
                                                            }
                                                        />
                                                    </Space>
                                                )
                                            )}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add Export Figure
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="customsDocumentation"
                                label="Customs Documentation (if available)"
                            >
                                <Upload
                                    name="customsDocuments"
                                    accept=".pdf"
                                    multiple
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload PDF Documents
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="buyerOrganizations"
                                label="Buyer Organizations"
                            >
                                <Input
                                    placeholder="Auto-fetched via TIN"
                                    disabled
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Sales Contracts">
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12} md={8}>
                                        <Form.Item
                                            name={['salesContracts', 'count']}
                                            label="Contract Count"
                                        >
                                            <InputNumber
                                                className="w-full"
                                                placeholder="Number of contracts"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8}>
                                        <Form.Item
                                            name={['salesContracts', 'sum']}
                                            label="Contract Sum"
                                        >
                                            <InputNumber
                                                className="w-full"
                                                placeholder="Total sum in UZS"
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ','
                                                    )
                                                }
                                                parser={(value) =>
                                                    value!.replace(
                                                        /\$\s?|(,*)/g,
                                                        ''
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            name={[
                                                'salesContracts',
                                                'documents',
                                            ]}
                                            label="Supporting Documents"
                                        >
                                            <Upload
                                                name="contractDocuments"
                                                accept=".pdf"
                                                multiple
                                                beforeUpload={() => false}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Upload PDFs
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="productionLocationDocument"
                                label="Production Location Document *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload production location document',
                                    },
                                ]}
                            >
                                <Upload
                                    name="locationDocument"
                                    accept=".pdf"
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload Kadastr/Lease Agreement
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="manufacturingProcessPhotos"
                                label="Manufacturing Process Photos *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload manufacturing process photos',
                                    },
                                ]}
                            >
                                <Upload
                                    name="processPhotos"
                                    accept="image/*"
                                    multiple
                                    beforeUpload={() => false}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload Images
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="developmentChallenges"
                                label="Challenges Faced During Development"
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Describe any challenges faced during development"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="socialImpact"
                                label="Social Impact *"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please describe the social impact with measurable metrics',
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Describe social impact with measurable metrics - why it matters and what numbers back it up"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-between pt-6">
                        <Button
                            onClick={onBack}
                            icon={<ArrowLeftOutlined />}
                            size="large"
                        >
                            Back
                        </Button>
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

export default Step4AdditionalInfo;
