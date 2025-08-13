import React, { useEffect, useMemo, useState } from 'react';
import {
    Form,
    Input,
    Card,
    Button,
    Row,
    Col,
    Select,
    Upload,
    InputNumber,
    Space,
    Steps,
    Tooltip,
    Divider,
    Progress,
    message,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    UploadOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import ImageCropUpload from '../../components/ImageCropUpload';

const { TextArea } = Input;
const { Option } = Select;
// Removed Dragger usage after switching to ImageCropUpload

interface Step4Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const MAX_COMMERCIALIZATION_WORDS = 50;
const MAX_SOCIAL_IMPACT_WORDS = 120; // allow longer narrative

const Step4AdditionalInfo: React.FC<Step4Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

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

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const commercializationText: string =
        Form.useWatch('commercializationProject', form) || '';
    const socialImpactText: string = Form.useWatch('socialImpact', form) || '';

    const commercializationWordCount = useMemo(
        () => commercializationText.trim().split(/\s+/).filter(Boolean).length,
        [commercializationText]
    );
    const socialImpactWordCount = useMemo(
        () => socialImpactText.trim().split(/\s+/).filter(Boolean).length,
        [socialImpactText]
    );

    const socialImpactPercent = Math.min(
        100,
        Math.round((socialImpactWordCount / MAX_SOCIAL_IMPACT_WORDS) * 100)
    );

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList?.slice(0, 8); // cap at 8 files for images
    };

    const beforeImageUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) message.error(`${file.name} is not an image`);
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) message.error(`${file.name} > 5MB`);
        return false; // prevent auto upload
    };

    const beforePdfUpload = (file: File) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) message.error('Only PDF files allowed');
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) message.error(`${file.name} > 10MB`);
        return false;
    };

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <Steps
                        responsive
                        size="small"
                        current={3}
                        items={[
                            { title: "Ma'lumotlar" },
                            { title: 'Intellektual mulk' },
                            { title: 'Ilmiy asos' },
                            { title: "Qo'shimcha ma'lumot" },
                            { title: 'Moliyaviy' },
                        ]}
                    />
                    <Divider className="!my-4" />

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleNext}
                        scrollToFirstError
                    >
                        <Row gutter={[24, 8]}>
                            <Col span={24}>
                                <Form.Item
                                    name="commercializationProject"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Yangi ishlanmani tijoratlashtirishga
                                            tayyorlash bo'yicha amalga
                                            oshirilgan loyiha nomi
                                        </span>
                                    }
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder="Yangi ishlanma tijoratlashtirishga tayyorlash bo'yicha amalga oshirilgan loyiha nomi"
                                        allowClear
                                        showCount
                                        maxLength={50}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <Form.Item
                                    name="innovationPhotos"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Yangi ishlanma rasmlari (PNG/JPEG,
                                            kesish)
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Iltimos, kamida bitta rasm yuklang',
                                        },
                                    ]}
                                    valuePropName="value"
                                >
                                    <ImageCropUpload maxCount={8} />
                                </Form.Item>
                                <span className="text-xs text-gray-500">
                                    Faqat PNG yoki JPEG (har biri 5MB dan
                                    kichik)
                                </span>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="industryBelonging"
                                    label={
                                        <span>
                                            Sanoat yo'nalishlari{' '}
                                            <Tooltip title="Mos keluvchi barcha tarmoqlarni tanlang.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Asosiy va qo'shimcha tarmoqlarni
                                            tanlang.
                                        </span>
                                    }
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Tarmoqlarni tanlang"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                        maxTagCount="responsive"
                                    >
                                        {industries.map((industry) => (
                                            <Option
                                                key={industry}
                                                value={industry}
                                            >
                                                {industry}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="maturityLevel"
                                    label={
                                        <span>
                                            Ishlanma yetuklik darajasi{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Yetuklik darajasini tanlang',
                                        },
                                    ]}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Hozirgi texnik / bozor
                                            tayyorgarligini aks ettiring.
                                        </span>
                                    }
                                >
                                    <Select
                                        placeholder="Darajani tanlang"
                                        showSearch
                                        optionFilterProp="children"
                                    >
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
                                    label={
                                        <span>
                                            Bank ma'lumotlari{' '}
                                            <Tooltip title="Asosiy xizmat ko'rsatuvchi bank va filiali.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            max: 120,
                                            message: 'Maksimum 120 ta belgi',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Masalan: Agrobank – Toshkent filiali"
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span>
                                            Eksport ko'rsatkichlari{' '}
                                            <Tooltip title="Har yillik eksport tushumlarini qo'shing (ixtiyoriy).">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
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
                                                            className="flex w-full mb-2"
                                                            align="start"
                                                        >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[
                                                                    name,
                                                                    'year',
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            'Yil',
                                                                    },
                                                                ]}
                                                                className="!mb-0"
                                                            >
                                                                <InputNumber
                                                                    placeholder="Yil"
                                                                    min={2000}
                                                                    max={2035}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[
                                                                    name,
                                                                    'amount',
                                                                ]}
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            'Miqdor',
                                                                    },
                                                                ]}
                                                                className="!mb-0 flex-1"
                                                            >
                                                                <InputNumber
                                                                    placeholder="So'mda miqdor"
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
                                                            <Button
                                                                type="text"
                                                                danger
                                                                onClick={() =>
                                                                    remove(name)
                                                                }
                                                                icon={
                                                                    <MinusCircleOutlined />
                                                                }
                                                            />
                                                        </Space>
                                                    )
                                                )}
                                                <Form.Item className="!mb-2">
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Yil qo'shish
                                                    </Button>
                                                </Form.Item>
                                                <span className="text-xs text-gray-400">
                                                    Hozircha eksport bo'lmasa
                                                    bo'sh qoldiring.
                                                </span>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="customsDocumentation"
                                    label={
                                        <span>
                                            Bojxona hujjatlari (mavjud bo'lsa){' '}
                                            <Tooltip title="Eksportga oid bojxona shakllarini biriktiring.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Har biri PDF (&lt;10MB).
                                        </span>
                                    }
                                >
                                    <Upload
                                        name="customsDocuments"
                                        accept="application/pdf"
                                        multiple
                                        beforeUpload={beforePdfUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            PDF hujjatlarni yuklash
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="buyerOrganizations"
                                    label={
                                        <span>
                                            Xaridor tashkilotlar{' '}
                                            <Tooltip title="Avtomatik olinadi (tez orada tahrirlanadi).">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Tranzaksiya reyestridan olinadi.
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="STIR orqali avtomatik olinadi"
                                        disabled
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span>
                                            Savdo shartnomalari{' '}
                                            <Tooltip title="Mavjud tijoriy kelishuvlar bo'yicha umumiy ma'lumot (ixtiyoriy).">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="productionLocationDocument"
                                                label={
                                                    <span>
                                                        Ishlab chiqarish joyi
                                                        hujjati{' '}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </span>
                                                }
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Ishlab chiqarish joyi hujjatini yuklang',
                                                    },
                                                ]}
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                                extra={
                                                    <span className="text-xs text-gray-500">
                                                        Kadastr / ijara
                                                        shartnomasi (PDF
                                                        &lt;10MB).
                                                    </span>
                                                }
                                            >
                                                {' '}
                                                <InputNumber
                                                    className="w-full"
                                                    placeholder="Jami so'mda"
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
                                                />{' '}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item
                                                name={[
                                                    'salesContracts',
                                                    'documents',
                                                ]}
                                                label="Tasdiqlovchi hujjatlar"
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                                extra={
                                                    <span className="text-[10px] text-gray-400">
                                                        PDF dalillar (ixtiyoriy)
                                                    </span>
                                                }
                                            >
                                                <Upload
                                                    name="contractDocuments"
                                                    accept="application/pdf"
                                                    multiple
                                                    beforeUpload={
                                                        beforePdfUpload
                                                    }
                                                >
                                                    <Button
                                                        icon={
                                                            <UploadOutlined />
                                                        }
                                                    >
                                                        PDF yuklash
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
                                    label={
                                        <span>
                                            Production Location Document{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Upload production location document',
                                        },
                                    ]}
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Kadastr / lease agreement (PDF
                                            &lt;10MB).
                                        </span>
                                    }
                                >
                                    <Upload
                                        name="locationDocument"
                                        accept="application/pdf"
                                        beforeUpload={beforePdfUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Kadastr / ijara shartnomasini
                                            yuklash
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="manufacturingProcessPhotos"
                                    label={
                                        <span>
                                            Ishlab chiqarish jarayonlari
                                            fotosuratlari{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Ishlab chiqarish jarayonining fotosuratlarini yuklang',
                                        },
                                    ]}
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    extra={
                                        <span className="text-xs text-gray-500">
                                            Asosiy ishlab chiqarish
                                            bosqichlarini ko'rsating (maks 8 ta,
                                            har biri &lt;5MB).
                                        </span>
                                    }
                                >
                                    <Upload
                                        name="processPhotos"
                                        accept="image/*"
                                        multiple
                                        beforeUpload={beforeImageUpload}
                                        maxCount={8}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Rasmlarni yuklash
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="developmentChallenges"
                                    label={
                                        <span>
                                            Development Challenges{' '}
                                            <Tooltip title="Optional obstacles: funding, regulation, tech hurdles.">
                                                <InfoCircleOutlined className="text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            max: 800,
                                            message: 'Max 800 characters',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder="Key obstacles and how you addressed them (optional)."
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="socialImpact"
                                    label={
                                        <span>
                                            Social Impact{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Describe social impact with measurable metrics',
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (!value)
                                                    return Promise.resolve();
                                                const words = value
                                                    .trim()
                                                    .split(/\s+/)
                                                    .filter(Boolean);
                                                if (
                                                    words.length >
                                                    MAX_SOCIAL_IMPACT_WORDS
                                                )
                                                    return Promise.reject(
                                                        new Error(
                                                            `Limit exceeded: ${words.length}/${MAX_SOCIAL_IMPACT_WORDS} words`
                                                        )
                                                    );
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                    extra={
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                Include metrics: beneficiaries
                                                reached, CO₂ reduced, jobs
                                                created, etc.
                                            </span>
                                            <div className="w-44">
                                                <Progress
                                                    size="small"
                                                    percent={
                                                        socialImpactPercent
                                                    }
                                                    showInfo={false}
                                                    status={
                                                        socialImpactWordCount >
                                                        MAX_SOCIAL_IMPACT_WORDS
                                                            ? 'exception'
                                                            : 'active'
                                                    }
                                                />
                                                <span
                                                    className={`block text-right text-[10px] ${
                                                        socialImpactWordCount >
                                                        MAX_SOCIAL_IMPACT_WORDS
                                                            ? 'text-red-500'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    {socialImpactWordCount}/
                                                    {MAX_SOCIAL_IMPACT_WORDS}{' '}
                                                    words
                                                </span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <TextArea
                                        rows={5}
                                        placeholder="Explain measurable social/environmental outcomes and evidence (max 120 words)."
                                        allowClear
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
                                4-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={submitting}
                                disabled={
                                    commercializationWordCount >
                                        MAX_COMMERCIALIZATION_WORDS ||
                                    socialImpactWordCount >
                                        MAX_SOCIAL_IMPACT_WORDS
                                }
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

export default Step4AdditionalInfo;
