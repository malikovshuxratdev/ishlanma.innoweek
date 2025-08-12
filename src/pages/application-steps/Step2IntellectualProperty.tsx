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
    Space,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    MinusCircleOutlined,
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

    const handleNext = () => {
        form.validateFields().then((values) => {
            onNext(values);
        });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <Title level={2}>
                        Step 2 of 5: Intellectual Property Rights
                    </Title>
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
                                name="inventionName"
                                label="Invention Name"
                            >
                                <Input placeholder="Enter invention name" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Authors (F.I.O + Science ID)">
                                <Form.List name="authors">
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
                                                                'fullName',
                                                            ]}
                                                            style={{ flex: 1 }}
                                                        >
                                                            <Input placeholder="Full Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'scienceId',
                                                            ]}
                                                            style={{ flex: 1 }}
                                                        >
                                                            <Input placeholder="Science ID" />
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
                                                    Add Author
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="patentNumber"
                                label="Patent Number"
                            >
                                <InputNumber
                                    className="w-full"
                                    placeholder="Enter patent number"
                                    controls={false}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="registrationDate"
                                label="Registration Date in the National Register"
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="Select registration date"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="validityPeriod"
                                label="Validity Period"
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="Select validity end date"
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

export default Step2IntellectualProperty;
