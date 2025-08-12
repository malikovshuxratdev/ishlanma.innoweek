import React, { useEffect, useMemo, useState } from 'react';
import {
    Form,
    Card,
    Button,
    Row,
    Col,
    Typography,
    InputNumber,
    message,
    Steps,
    Divider,
    Tooltip,
    Space,
    Alert,
    Statistic,
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

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

    const financialFields: {
        name: string;
        label: string;
        tooltip?: string;
        derived?: boolean;
    }[] = [
        {
            name: 'netRevenue',
            label: 'Net Revenue from Sales',
            tooltip: 'Total sales after returns/discounts.',
        },
        {
            name: 'costOfGoodsSold',
            label: 'Cost of Goods Sold',
            tooltip: 'Direct production or acquisition costs.',
        },
        {
            name: 'grossProfit',
            label: 'Gross Profit (Loss)',
            tooltip: 'Auto-calculated = Net Revenue - COGS (overrideable).',
            derived: true,
        },
        { name: 'sellingExpenses', label: 'Selling Expenses' },
        { name: 'administrativeExpenses', label: 'Administrative Expenses' },
        {
            name: 'otherOperationalExpenses',
            label: 'Other Operational Expenses',
        },
        { name: 'otherOperatingIncome', label: 'Other Operating Income' },
        { name: 'financialLeaseIncome', label: 'Financial Lease Income' },
        { name: 'currencyExchangeGain', label: 'Currency Exchange Gain' },
        { name: 'otherFinancialIncome', label: 'Other Financial Income' },
        { name: 'currencyExchangeLoss', label: 'Currency Exchange Loss' },
        {
            name: 'extraordinaryIncomeLosses',
            label: 'Extraordinary Income & Losses',
        },
        { name: 'incomeTax', label: 'Income Tax' },
    ];

    const currencyFormatter = (value?: string | number) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const currencyParser = (value?: string) =>
        value ? value.replace(/\$\s?|(,*)/g, '') : '';

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

    const totalExpenses = useMemo(() => {
        const keys = [
            'sellingExpenses',
            'administrativeExpenses',
            'otherOperationalExpenses',
            'currencyExchangeLoss',
            'incomeTax',
        ];
        return keys.reduce(
            (acc, k) => acc + numOrZero(form.getFieldValue(k)),
            0
        );
    }, [form, netRevenue, costOfGoodsSold, grossProfitField]);

    const ebitdaEstimate = useMemo(() => {
        const operatingIncome =
            numOrZero(form.getFieldValue('otherOperatingIncome')) +
            numOrZero(form.getFieldValue('otherFinancialIncome')) +
            numOrZero(form.getFieldValue('financialLeaseIncome')) +
            numOrZero(form.getFieldValue('currencyExchangeGain')) -
            numOrZero(form.getFieldValue('currencyExchangeLoss'));
        return (
            (autoGross ? derivedGrossProfit : numOrZero(grossProfitField)) -
            totalExpenses +
            operatingIncome
        ); // simplistic approximation
    }, [autoGross, derivedGrossProfit, grossProfitField, totalExpenses, form]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <div className="flex flex-col gap-2 text-center">
                        <Title level={2} className="!mb-0">
                            Financial Performance
                        </Title>
                        <span className="text-gray-500 text-sm">
                            Enter the latest annual financial metrics (in UZS).
                            Leave blank if not applicable.
                        </span>
                    </div>
                    <Steps
                        responsive
                        size="small"
                        current={4}
                        items={[
                            { title: 'Details' },
                            { title: 'Intellectual Property' },
                            { title: 'Background' },
                            { title: 'Additional Info' },
                            { title: 'Financials' },
                        ]}
                    />
                    <Divider className="!my-4" />

                    <Alert
                        type="info"
                        showIcon
                        message="Currency"
                        description="All monetary values are in Uzbekistani so'm (UZS). Use whole numbers (no decimals)."
                    />

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        scrollToFirstError
                        initialValues={initialValues}
                    >
                        <Row gutter={[24, 12]}>
                            {financialFields.map((field) => (
                                <Col key={field.name} xs={24} md={12} xl={8}>
                                    <Form.Item
                                        name={field.name}
                                        label={
                                            <span className="flex items-center gap-1">
                                                {field.label}
                                                {field.tooltip && (
                                                    <Tooltip
                                                        title={field.tooltip}
                                                    >
                                                        <InfoCircleOutlined className="text-gray-400" />
                                                    </Tooltip>
                                                )}
                                                {field.derived && autoGross && (
                                                    <span className="text-[10px] text-green-600 font-medium">
                                                        auto
                                                    </span>
                                                )}
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
                                        extra={
                                            field.name === 'grossProfit' ? (
                                                <span className="text-[10px] text-gray-500">
                                                    {autoGross
                                                        ? 'Auto-updated from Net Revenue & COGS. Enter a value to override.'
                                                        : 'Manual override active. Clear to re-enable auto.'}
                                                </span>
                                            ) : undefined
                                        }
                                    >
                                        <InputNumber
                                            className="w-full"
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            formatter={currencyFormatter}
                                            parser={currencyParser}
                                            controls={false}
                                            onChange={(val) => {
                                                if (
                                                    field.name === 'grossProfit'
                                                ) {
                                                    if (
                                                        val === undefined ||
                                                        val === null ||
                                                        val === ''
                                                    ) {
                                                        setAutoGross(true);
                                                    } else {
                                                        setAutoGross(false);
                                                    }
                                                }
                                            }}
                                            disabled={
                                                field.name === 'grossProfit' &&
                                                autoGross
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            ))}
                        </Row>

                        <Divider className="!my-6" />
                        <Title level={4}>Derived Metrics</Title>
                        <Row gutter={[24, 12]}>
                            <Col xs={24} md={8}>
                                <Statistic
                                    title="Gross Profit (Derived)"
                                    value={currencyFormatter(
                                        derivedGrossProfit
                                    )}
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <Statistic
                                    title="Total Key Expenses"
                                    value={currencyFormatter(totalExpenses)}
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <Statistic
                                    title="EBITDA Estimate"
                                    value={currencyFormatter(ebitdaEstimate)}
                                />
                            </Col>
                        </Row>

                        <Divider className="!my-6" />
                        <Title level={4}>Application Summary</Title>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                                <strong>Project Title:</strong>{' '}
                                {allFormData?.projectTitle || '—'}
                            </div>
                            <div>
                                <strong>Organization:</strong>{' '}
                                {allFormData?.organizationName || '—'}
                            </div>
                            <div>
                                <strong>Maturity Level:</strong>{' '}
                                {allFormData?.maturityLevel || '—'}
                            </div>
                            <div>
                                <strong>Region:</strong>{' '}
                                {allFormData?.regionOfImplementation || '—'}
                            </div>
                            <div>
                                <strong>Scientific Field:</strong>{' '}
                                {allFormData?.scientificField || '—'}
                            </div>
                            <div>
                                <strong>Innovation Photos:</strong>{' '}
                                {allFormData?.innovationPhotos ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            Submitting will lock the application for review. You
                            can still contact support for critical corrections.
                        </p>

                        <Divider className="!my-6" />
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <Button
                                onClick={onBack}
                                icon={<ArrowLeftOutlined />}
                                size="large"
                            >
                                Back
                            </Button>
                            <span className="text-xs text-gray-400">
                                Step 5 of 5
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<CheckOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Submit Application
                            </Button>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Step5FinancialPerformance;
