import React, { useEffect, useMemo, useState } from 'react';
import {
    Form,
    Input,
    Card,
    Button,
    Row,
    Col,
    Select,
    InputNumber,
    Space,
    Divider,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import UploadForm from '../../components/shared/UploadForm';
import type { RcFile } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Option } = Select;
// Removed Dragger usage after switching to ImageCropUpload

interface Step4Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
}

const MAX_COMMERCIALIZATION_WORDS = 50;
const MAX_SOCIAL_IMPACT_WORDS = 120;
const INDUSTRIES = [
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

const MATURITY_LEVELS = [
    { value: 'undefined', label: 'Undefined' },
    { value: 'idea', label: 'Idea' },
    { value: 'experimental_research', label: 'Experimental Research' },
    { value: 'industrial_sample', label: 'Industrial Sample' },
    { value: 'new_product_creation', label: 'New Product Creation' },
    { value: 'production_expansion', label: 'Production Expansion' },
];

const Step4AdditionalInfo: React.FC<Step4Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    // Local state for standalone upload blocks
    // Multiple PDFs: keep as an array to render multiple previews
    const [designSchematic, setDesignSchematic] = useState<RcFile[]>([]);

    const industries = INDUSTRIES;
    const maturityLevels = MATURITY_LEVELS;

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

    // Helpers for UploadForm
    const beforeUploadLarge = () => false; // prevent auto upload; validation is handled by accept attribute/UI
    // Helper to set array file fields from UploadForm (multiple images)
    const handleFilesChange = (files: RcFile[], fieldName: string) => {
        form.setFieldsValue({ [fieldName]: files });
    };
    const handleFileChange = (
        files: RcFile[],
        setState?: (v: string | RcFile | null) => void,
        fieldName?: string
    ) => {
        const first = files?.[0] || null;
        if (setState) setState(first);
        if (fieldName) form.setFieldsValue({ [fieldName]: first });
    };

    // Watchers for form-controlled upload fields
    const customsDoc = Form.useWatch('customsDocumentation', form) as
        | RcFile
        | string
        | null;
    const productionDoc = Form.useWatch('productionLocationDocument', form) as
        | RcFile
        | string
        | null;

    const handleNext = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            // Ensure we include standalone upload values as part of submission
            const submitValues = {
                ...values,
                // Submit all selected files (array)
                designSchematic,
            };
            onNext(submitValues);
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
                        onFinish={handleNext}
                        scrollToFirstError
                    >
                        <Row gutter={[24, 8]}>
                            <Col xs={24} md={24}>
                                <Form.Item
                                    name="commercializationProject"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Yangi ishlanmani tijoratlashtirishga
                                            tayyorlash bo'yicha amalga
                                            oshirilgan loyiha nomi
                                        </span>
                                    }
                                    rules={[
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
                                                    MAX_COMMERCIALIZATION_WORDS
                                                ) {
                                                    return Promise.reject(
                                                        new Error(
                                                            `Limit: ${words.length}/${MAX_COMMERCIALIZATION_WORDS} so'z`
                                                        )
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Yangi ishlanmani tijoratlashtirishga tayyorlash bo'yicha ..."
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="industryBelonging"
                                    label={
                                        <span>
                                            Ishlanmaning sanoat mansubligi
                                        </span>
                                    }
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Sanoat tarmoqlarini tanlang"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                        maxTagCount="responsive"
                                        size="large"
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
                                            Ishlanmaning mukammallik (yetuklik)
                                            darajasi (bosqichi)
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Yetuklik darajasini tanlang',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Bosqichni tanlang"
                                        showSearch
                                        optionFilterProp="children"
                                        size="large"
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
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="bankInformation"
                                    label={
                                        <span>
                                            Xizmat ko'rsatuvchi bankdan
                                            ma'lumotlar
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Masalan: Agrobank – Toshkent filiali"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="buyerOrganizations"
                                    label={
                                        <span>
                                            Sotib olgan isteʼmolchi tashkilotlar
                                            nomi
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Avtomatik olinadi"
                                        disabled
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span>
                                            Sotilgan ishlanma (mahsulot)ning
                                            eksport koʻrsatkichlari
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
                                                                    className="!w-28"
                                                                    size="large"
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
                                                                    size="large"
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
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span>
                                            Sotuv shartnomalari soni va summasi,
                                            asoslovchi hujjatlar biriktirilsin
                                        </span>
                                    }
                                >
                                    <Row gutter={[16, 16]}>
                                        {/* Left: File upload */}
                                        <Col xs={24} md={12}>
                                            <UploadForm
                                                label="Asoslovchi Hujjat (pdf bir nechta )"
                                                multiple
                                                value={designSchematic}
                                                maxFiles={5}
                                                maxFile={5}
                                                onchange={(files: RcFile[]) =>
                                                    setDesignSchematic(files)
                                                }
                                                accept=".pdf"
                                                required={false}
                                                beforeUpload={beforeUploadLarge}
                                            />
                                        </Col>
                                        {/* Right: Numeric inputs stacked */}
                                        <Col xs={24} md={12}>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name={[
                                                            'salesContracts',
                                                            'contractCount',
                                                        ]}
                                                        label="Shartnomalar soni"
                                                    >
                                                        <InputNumber
                                                            min={0}
                                                            className="w-full"
                                                            placeholder="0"
                                                            size="large"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name={[
                                                            'salesContracts',
                                                            'contractValue',
                                                        ]}
                                                        label="Shartnoma summasi (so'm)"
                                                    >
                                                        <InputNumber
                                                            className="w-full"
                                                            placeholder="0"
                                                            formatter={(
                                                                value
                                                            ) =>
                                                                `${value}`.replace(
                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                    ','
                                                                )
                                                            }
                                                            size="large"
                                                            parser={(value) =>
                                                                value!.replace(
                                                                    /\$\s?|(,*)/g,
                                                                    ''
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={24}>
                                <Form.Item
                                    name="developmentChallenges"
                                    label={
                                        <span>
                                            Ishlanmani yaratishda yuzaga kelgan
                                            muammolar nimalardan iborat
                                        </span>
                                    }
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Muammolar va ularni hal etish choralarini qisqacha yozing."
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={24}>
                                <Form.Item
                                    name="socialImpact"
                                    label={
                                        <span>
                                            Ishlanmaning ijtimoiy ahamiyati
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Ijtimoiy ahamiyatni raqamlar bilan izohlang',
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
                                                            `Limit: ${words.length}/${MAX_SOCIAL_IMPACT_WORDS} words`
                                                        )
                                                    );
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Ijtimoiy/iqtisodiy natijalar va faktlar"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="customsDocumentation"
                                    label={
                                        <span>
                                            Bojxona xizmatlaridan foydalanganlik
                                            bo'yicha hujjatlar (mavjud bo'lsa)
                                        </span>
                                    }
                                    valuePropName="value"
                                >
                                    <UploadForm
                                        label="Fayl yuklang"
                                        multiple={!customsDoc}
                                        value={customsDoc}
                                        onchange={(files: RcFile[]) =>
                                            handleFileChange(
                                                files,
                                                undefined,
                                                'customsDocumentation'
                                            )
                                        }
                                        accept=".pdf"
                                        beforeUpload={beforeUploadLarge}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="productionLocationDocument"
                                    label={
                                        <span>
                                            Ishlab chiqarish joyi (maydoni)
                                            hujjatlari (kadastr pasporti yoki
                                            ijara shartnomasi)
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Kadastr yoki ijara hujjatini yuklang',
                                        },
                                    ]}
                                    valuePropName="value"
                                >
                                    <UploadForm
                                        label="Fayl yuklang"
                                        multiple={!productionDoc}
                                        value={productionDoc}
                                        onchange={(files: RcFile[]) =>
                                            handleFileChange(
                                                files,
                                                undefined,
                                                'productionLocationDocument'
                                            )
                                        }
                                        accept=".pdf"
                                        beforeUpload={beforeUploadLarge}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="innovationPhotos"
                                    label={
                                        <span className="flex items-center gap-1">
                                            Yangi ishlanmani tijoratlashtirishga
                                            tayyorlash rasmi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Kamida bitta foto yuklang',
                                        },
                                    ]}
                                    valuePropName="value"
                                    extra={
                                        <span className="text-[10px] text-gray-400">
                                            PNG / JPEG (har biri &lt;5MB)
                                        </span>
                                    }
                                >
                                    <UploadForm
                                        label="Rasmlarni yuklang"
                                        multiple
                                        value={
                                            Form.useWatch(
                                                'innovationPhotos',
                                                form
                                            ) as any
                                        }
                                        accept=".jpg,.jpeg,.png"
                                        beforeUpload={beforeUploadLarge}
                                        onchange={(files) =>
                                            handleFilesChange(
                                                files,
                                                'innovationPhotos'
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="manufacturingProcessPhotos"
                                    label={
                                        <span>
                                            Ishlanmaning sanoat namunasini
                                            yaratish jarayonidan foto lavhalar
                                            ilova qilish.
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Jarayon fotosuratlarini yuklang',
                                        },
                                    ]}
                                    valuePropName="value"
                                    extra={
                                        <span className="text-[10px] text-gray-400">
                                            PNG / JPEG (har biri &lt;5MB)
                                        </span>
                                    }
                                >
                                    <UploadForm
                                        label="Rasmlarni yuklang"
                                        multiple
                                        value={
                                            Form.useWatch(
                                                'manufacturingProcessPhotos',
                                                form
                                            ) as any
                                        }
                                        accept=".jpg,.jpeg,.png"
                                        beforeUpload={beforeUploadLarge}
                                        onchange={(files) =>
                                            handleFilesChange(
                                                files,
                                                'manufacturingProcessPhotos'
                                            )
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
