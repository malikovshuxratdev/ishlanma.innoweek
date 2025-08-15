import React, { useState } from 'react';
import {
    Form,
    Card,
    Button,
    Row,
    Col,
    InputNumber,
    message,
    Divider,
    Space,
} from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface Step5Props {
    onBack: () => void;
    initialValues?: any;
    allFormData?: any;
}

const Step5FinancialPerformance: React.FC<Step5Props> = ({
    onBack,
    initialValues,
    allFormData,
}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            const finalValues = { ...values };
            const finalData = { ...allFormData, ...finalValues };
            console.log('Complete application data:', finalData);
            message.success('Application submitted successfully!');
            navigate('/my-applications');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        scrollToFirstError
                        initialValues={initialValues}
                    >
                        <Row gutter={[24, 12]}>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="netRevenue"
                                    label={
                                        <span className="font-medium text-lg">
                                            Mahsulot (tovar, ish va xizmat)
                                            larni sotishdan sof tushum
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="costOfGoodsSold"
                                    label={
                                        <span className="font-medium text-lg">
                                            Sotilgan mahsulot (tovar, ish va
                                            xizmat) larning tannarxi
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="grossProfit"
                                    label={
                                        <span className="font-medium text-lg">
                                            Mahsulot (tovar, ish va xizmat)
                                            larni sotishning yalpi foydasi
                                            (zarari)
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="sellingExpenses"
                                    label={
                                        <span className="font-medium text-lg">
                                            Sotish xarajatlari
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="administrativeExpenses"
                                    label={
                                        <span className="font-medium text-lg">
                                            Maʼmuriy xarajatlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherOperationalExpenses"
                                    label={
                                        <span className="font-medium text-lg">
                                            Boshqa operatsion xarajatlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherOperatingIncome"
                                    label={
                                        <span className="font-medium text-lg">
                                            Boshqa asosiy faoliyat daromadlari
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="financialLeaseIncome"
                                    label={
                                        <span className="font-medium text-lg">
                                            Moliyaviy ijaradan daromadlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="currencyExchangeGain"
                                    label={
                                        <span className="font-medium text-lg">
                                            Valyuta kursi farqidan daromadlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherFinancialIncome"
                                    label={
                                        <span className="font-medium text-lg">
                                            Moliyaviy faoliyatning boshqa
                                            daromadlari
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="currencyExchangeLoss"
                                    label={
                                        <span className="font-medium text-lg">
                                            Valyuta kursi farqidan zararlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="extraordinaryIncomeLosses"
                                    label={
                                        <span className="font-medium text-lg">
                                            Favquloddagi foyda va zararlar
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="incomeTax"
                                    label={
                                        <span className="font-medium text-lg">
                                            Foyda soligʻi
                                        </span>
                                    }
                                >
                                    <InputNumber
                                        placeholder="So'mda miqdor"
                                        className="w-full"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        size="large"
                                        parser={(value) =>
                                            value!.replace(/\$\s?|(,*)/g, '')
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
                                5-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SendOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Yuborish
                            </Button>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Step5FinancialPerformance;
