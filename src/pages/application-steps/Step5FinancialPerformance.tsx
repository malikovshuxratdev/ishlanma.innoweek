import React from 'react';
import { Form, Card, Button, Row, Col, Typography, InputNumber, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Step5Props {
  onBack: () => void;
  initialValues?: any;
  allFormData?: any;
}

const Step5FinancialPerformance: React.FC<Step5Props> = ({ onBack, initialValues, allFormData }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const finalData = { ...allFormData, ...values };
      console.log('Complete application data:', finalData);
      message.success('Application submitted successfully!');
      navigate('/my-applications');
    });
  };

  const financialFields = [
    { name: 'netRevenue', label: 'Net Revenue from Sales' },
    { name: 'costOfGoodsSold', label: 'Cost of Goods Sold' },
    { name: 'grossProfit', label: 'Gross Profit (Loss)' },
    { name: 'sellingExpenses', label: 'Selling Expenses' },
    { name: 'administrativeExpenses', label: 'Administrative Expenses' },
    { name: 'otherOperationalExpenses', label: 'Other Operational Expenses' },
    { name: 'otherOperatingIncome', label: 'Other Operating Income' },
    { name: 'financialLeaseIncome', label: 'Financial Lease Income' },
    { name: 'currencyExchangeGain', label: 'Currency Exchange Gain' },
    { name: 'otherFinancialIncome', label: 'Other Financial Income' },
    { name: 'currencyExchangeLoss', label: 'Currency Exchange Loss' },
    { name: 'extraordinaryIncomeLosses', label: 'Extraordinary Income and Losses' },
    { name: 'incomeTax', label: 'Income Tax' }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Title level={2}>Step 5 of 5: Financial Performance</Title>
          <p className="text-gray-600">All amounts should be entered in UZS</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className="space-y-6"
        >
          <Row gutter={[16, 16]}>
            {financialFields.map((field, index) => (
              <Col key={field.name} span={12}>
                <Form.Item
                  name={field.name}
                  label={field.label}
                >
                  <InputNumber 
                    className="w-full"
                    placeholder={`Enter ${field.label.toLowerCase()} in UZS`}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                    controls={false}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <div className="bg-gray-50 p-4 rounded-lg mt-8">
            <Title level={4}>Application Summary</Title>
            <p className="text-gray-600 mb-4">
              Please review your application before submitting. You can go back to any previous step to make changes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Project Title:</strong> {allFormData?.projectTitle || 'Not provided'}
              </div>
              <div>
                <strong>Organization:</strong> {allFormData?.organizationName || 'Not provided'}
              </div>
              <div>
                <strong>Maturity Level:</strong> {allFormData?.maturityLevel || 'Not provided'}
              </div>
              <div>
                <strong>Innovation Photos:</strong> {allFormData?.innovationPhotos ? 'Uploaded' : 'Not uploaded'}
              </div>
            </div>
          </div>

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
              onClick={handleSubmit}
              icon={<CheckOutlined />}
              iconPosition="end"
              size="large"
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Application
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Step5FinancialPerformance;