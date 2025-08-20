import React from 'react';
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
import {
    useApplicationSubmit5Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';

interface Step5Props {
    onBack: () => void;
    initialValues?: any;
}

const Step5FinancialPerformance: React.FC<Step5Props> = ({
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { data: applicationData } = useGetApplication();
    const { mutate: submitApplication, isPending } =
        useApplicationSubmit5Mutate();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const rawFinance = values.finance || {};

            const financePayload: any = Object.entries(rawFinance).reduce(
                (acc: any, [key, val]) => {
                    if (val !== undefined && val !== null && val !== '') {
                        acc[key] = String(val);
                    }
                    return acc;
                },
                {}
            );

            if (typeof applicationData?.id !== 'number') {
                message.error('Application ID is missing or invalid.');
                return;
            }

            const finalData = {};
            console.log('Complete application data:', finalData);
            submitApplication(
                {
                    application_id: applicationData.id,
                    body: {
                        finance: financePayload as any,
                    },
                },
                {
                    onSuccess: () => {
                        navigate('/my-applications');
                    },
                    onError: (err: any) => {
                        console.error('Error submitting application:', err);
                    },
                }
            );
        } catch (error) {
            console.error('Error validating form:', error);
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
                                    name={['finance', 'net_income']}
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
                                    name={['finance', 'cost_of_goods_sold']}
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
                                    name={['finance', 'gross_profit_or_loss']}
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
                                    name={['finance', 'selling_expenses']}
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
                                    name={[
                                        'finance',
                                        'administrative_expenses',
                                    ]}
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
                                    name={[
                                        'finance',
                                        'other_operating_expenses',
                                    ]}
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
                                    name={['finance', 'other_income']}
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
                                    name={['finance', 'rental_income']}
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
                                    name={['finance', 'foreign_exchange_gain']}
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
                                    name={['finance', 'other_financial_income']}
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
                                    name={['finance', 'foreign_exchange_loss']}
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
                                    name={[
                                        'finance',
                                        'extraordinary_profit_or_loss',
                                    ]}
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
                                    name={['finance', 'income_tax']}
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
                                loading={isPending}
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
