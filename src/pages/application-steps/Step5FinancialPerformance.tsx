import React, { useEffect, useMemo, useState } from 'react';
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
    const [autoGross, setAutoGross] = useState<boolean>(true);

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const numOrZero = (v: any) => (typeof v === 'number' && !isNaN(v) ? v : 0);
    const netRevenue = Form.useWatch('netRevenue', form);
    const costOfGoodsSold = Form.useWatch('costOfGoodsSold', form);
    const grossProfitField = Form.useWatch('grossProfit', form);

    // Derived gross profit if auto mode
    const derivedGrossProfit = useMemo(
        () => numOrZero(netRevenue) - numOrZero(costOfGoodsSold),
        [netRevenue, costOfGoodsSold]
    );

    useEffect(() => {
        if (autoGross) {
            form.setFieldsValue({ grossProfit: derivedGrossProfit });
        }
    }, [derivedGrossProfit, autoGross, form]);

    useEffect(() => {
        if (
            grossProfitField !== undefined &&
            grossProfitField !== derivedGrossProfit
        ) {
            // user modified manually
            if (
                grossProfitField !== null &&
                grossProfitField !== '' &&
                grossProfitField !== derivedGrossProfit
            ) {
                setAutoGross(false);
            }
        }
    }, [grossProfitField, derivedGrossProfit]);

    // Hammasi so'mda (UZS) kiritiladi, faqat butun son ko'rinishida.
    const currencyFormatter = (value?: string | number) => {
        if (value === undefined || value === null || value === '') return '';
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat(" so'm");
    };
    const currencyParser = (value?: string) => {
        if (!value) return '';
        return value
            .replace(/\s?so'm/gi, '')
            .replace(/,/g, '')
            .replace(/[^0-9-]/g, ''); // faqat raqam va ehtimoliy minus
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            const finalValues = { ...values };
            if (autoGross) finalValues.grossProfit = derivedGrossProfit;
            const finalData = { ...allFormData, ...finalValues };
            console.log('Complete application data:', finalData);
            message.success('Application submitted successfully!');
            navigate('/my-applications');
        } finally {
            setSubmitting(false);
        }
    };

    // Faqat raqam kiritish (harf va boshqa belgilarni bloklash)
    const allowDigitKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
        ];
        if (
            allowedKeys.includes(e.key) ||
            ((e.metaKey || e.ctrlKey) &&
                ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
        ) {
            return;
        }
        if (/^[0-9]$/.test(e.key)) return; // faqat raqam
        e.preventDefault();
    };

    const handlePasteDigits = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData('text');
        if (/^[0-9]+$/.test(text)) return; // to'liq raqam
        const cleaned = text.replace(/[^0-9]/g, '');
        e.preventDefault();
        if (cleaned) {
            const target = e.target as HTMLInputElement;
            const start = target.selectionStart || 0;
            const end = target.selectionEnd || 0;
            const value = target.value;
            const newValue = value.slice(0, start) + cleaned + value.slice(end);
            target.value = newValue;
            target.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
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
                                        <span className="flex items-center gap-1">
                                            Mahsulot (tovar, ish va xizmat)
                                            larni sotishdan sof tushum
                                        </span>
                                    }
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Sof tushumni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="costOfGoodsSold"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Sotilgan mahsulot (tovar, ish va
                                            xizmat) larning tannarxi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Tannarxni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="grossProfit"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Mahsulot (tovar, ish va xizmat)
                                            larni sotishning yalpi foydasi
                                            (zarari)
                                        </span>
                                    }
                                    rules={[
                                        {
                                            type: 'number',
                                            message: 'Must be a number',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Yalpi foyda / zarar"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="sellingExpenses"
                                    label="Sotish xarajatlari"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Sotish xarajatlarini kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="administrativeExpenses"
                                    label="Maʼmuriy xarajatlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Ma'muriy xarajatlarni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherOperationalExpenses"
                                    label="Boshqa operatsion xarajatlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Boshqa operatsion xarajatlarni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherOperatingIncome"
                                    label="Asosiy faoliyatning boshqa daromadlari"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Boshqa asosiy faoliyat daromadlarini kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="financialLeaseIncome"
                                    label="Moliyaviy ijaradan daromadlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Moliyaviy ijara daromadini kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="currencyExchangeGain"
                                    label="Valyuta kursi farqidan daromadlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Valyuta kursi farqidan daromadni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="otherFinancialIncome"
                                    label="Moliyaviy faoliyatning boshqa daromadlari"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Boshqa moliyaviy daromadlarni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="currencyExchangeLoss"
                                    label="Valyuta kursi farqidan zararlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Valyuta kursi farqidan zararni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="extraordinaryIncomeLosses"
                                    label="Favquloddagi foyda va zararlar"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Favquloddagi foyda va zararlarni kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} xl={8}>
                                <Form.Item
                                    name="incomeTax"
                                    label="Foyda soligʻi"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            message: 'Must be ≥ 0',
                                            transform: (v) =>
                                                v === '' ? undefined : v,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        placeholder="Foyda solig'ini kiriting"
                                        formatter={currencyFormatter}
                                        parser={currencyParser}
                                        controls={false}
                                        precision={0}
                                        step={1}
                                        min={0}
                                        onKeyDown={allowDigitKey}
                                        onPaste={handlePasteDigits}
                                        size="large"
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
