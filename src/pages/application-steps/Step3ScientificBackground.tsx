import React from 'react';
import { Form, Input, DatePicker, Card, Button, Row, Col, Typography, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface Step3Props {
  onNext: (values: any) => void;
  onBack: () => void;
  initialValues?: any;
}

const Step3ScientificBackground: React.FC<Step3Props> = ({ onNext, onBack, initialValues }) => {
  const [form] = Form.useForm();

  const regions = [
    'Tashkent', 'Samarkand', 'Bukhara', 'Fergana', 'Andijan', 'Namangan',
    'Kashkadarya', 'Surkhandarya', 'Jizzakh', 'Syrdarya', 'Navoi', 'Khorezm',
    'Karakalpakstan', 'Tashkent Region'
  ];

  const scientificFields = [
    'Artificial Intelligence', 'Biotechnology', 'Energy Systems', 'Environmental Science',
    'Materials Science', 'Medical Technology', 'Agricultural Science', 'Information Technology',
    'Nanotechnology', 'Renewable Energy', 'Robotics', 'Space Technology',
    'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering',
    'Computer Science'
  ];

  const handleNext = () => {
    form.validateFields().then(values => {
      onNext(values);
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Title level={2}>Step 3 of 5: Scientific Research Background</Title>
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
                name="projectCode"
                label="Project Code"
              >
                <Input placeholder="Enter project code" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="researchProjectTitle"
                label="Research Project Title"
              >
                <Input placeholder="Enter research project title" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="implementationPeriod"
                label="Implementation Period"
              >
                <DatePicker className="w-full" placeholder="Select implementation date" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="regionOfImplementation"
                label="Region of Implementation"
              >
                <Select placeholder="Select region">
                  {regions.map(region => (
                    <Option key={region} value={region}>{region}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="projectLeader"
                label="Project Leader (F.I.O + Science ID)"
              >
                <Input placeholder="Enter project leader name and Science ID" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="scientificField"
                label="Scientific Field"
              >
                <Select placeholder="Select scientific field">
                  {scientificFields.map(field => (
                    <Option key={field} value={field}>{field}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="executingOrganization"
                label="Executing Organization"
              >
                <Input placeholder="Auto-fetched by TIN" disabled />
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

export default Step3ScientificBackground;