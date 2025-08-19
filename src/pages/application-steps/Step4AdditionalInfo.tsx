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
    Tooltip,
} from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import UploadForm from '../../components/shared/UploadForm';
import type { RcFile } from 'antd/es/upload/interface';
import OrganizationSearch from '../../components/shared/OrganizationSearch';

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
    const [designSchematic, setDesignSchematic] = useState<RcFile[]>([]);

    const [orgInnInput, setOrgInnInput] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number | string;
        name: string;
        inn: string;
    } | null>(null);

    useEffect(() => {
        // Keep form in sync with selectedOrganization so validation/submission works
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

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

    const beforeUploadLarge = () => false;
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

    // Limit commercializationProject input to MAX_COMMERCIALIZATION_WORDS words
    const handleCommercializationChange = (value: string) => {
        const words = value.trim().split(/\s+/).filter(Boolean);
        if (words.length > MAX_COMMERCIALIZATION_WORDS) {
            const limited = words
                .slice(0, MAX_COMMERCIALIZATION_WORDS)
                .join(' ');
            form.setFieldsValue({ commercializationProject: limited });
        } else {
            form.setFieldsValue({ commercializationProject: value });
        }
    };

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
            const submitValues = {
                ...values,
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
                                        <span className="font-medium text-lg">
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
                                    <TextArea
                                        rows={3}
                                        placeholder="Yangi ishlanmani tijoratlashtirishga tayyorlash bo'yicha ..."
                                        size="large"
                                        allowClear
                                        value={commercializationText}
                                        onChange={(e) =>
                                            handleCommercializationChange(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <div className="text-right mt-1">
                                        <span
                                            className={`text-sm ${
                                                commercializationWordCount >=
                                                MAX_COMMERCIALIZATION_WORDS
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {commercializationWordCount}/
                                            {MAX_COMMERCIALIZATION_WORDS} so'z
                                        </span>
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="innovationPhotos"
                                    label={
                                        <span className="font-medium text-lg">
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
                                        label="Rasmlarni yuklang (birinchi rasim asosiy bo'lishi kerak)"
                                        multiple
                                        maxFile={10}
                                        maxFiles={10}
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
                                        <span className="font-medium text-lg">
                                            Ishlanmaning sanoat namunasini
                                            yaratish rasimlari
                                            <Tooltip
                                                title={
                                                    'OAV, ijtimoiy tarmoqlarda eʼlon qilingan materiallar, gazeta va jurnallarda chop etilgan maqolalar'
                                                }
                                            >
                                                <QuestionCircleOutlined className="ml-2 text-gray-400" />
                                            </Tooltip>
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
                                        maxFile={5}
                                        maxFiles={5}
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
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="industryBelonging"
                                    label={
                                        <span className="font-medium text-lg">
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
                                        <span className="font-medium text-lg">
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
                                        <span className="font-medium text-lg">
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
                                        <span className="font-medium text-lg flex items-center">
                                            Sotib olgan isteʼmolchi tashkilotlar
                                            nomi
                                            <Tooltip
                                                title={
                                                    'Ishlab chiqarilgan ishlanma (mahsulot) yoki koʻrsatilgan xizmatlarni sotib olgan isteʼmolchi tashkilotlar nomi. (Yirik yoki kichik korxonalar, muassasalar v.b.)'
                                                }
                                            >
                                                <QuestionCircleOutlined className="ml-2 text-gray-400" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    <div>
                                        <OrganizationSearch
                                            value={selectedOrganization}
                                            onChange={(v) => {
                                                setSelectedOrganization(v);
                                                setOrgInnInput(v?.inn || '');
                                            }}
                                            inputValue={orgInnInput}
                                            onInputChange={(v) =>
                                                setOrgInnInput(v)
                                            }
                                        />
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
                                            Sotilgan ishlanma (mahsulot)ning
                                            eksport koʻrsatkichlari (Yillar
                                            kesimida eksport miqdori)
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
                                                        size="large"
                                                    >
                                                        Yil qo'shish
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
                                    label={
                                        <span className="font-medium text-lg flex items-center">
                                            Bojxona xizmatlaridan
                                            foydalanganligi boʻyicha hujjatlar
                                            <Tooltip
                                                title={
                                                    'Bojxona toʻlovlari, bojxonadan oʻtkazilganligi boʻyicha xujjatlar agar mavjud boʻlsa.'
                                                }
                                            >
                                                <QuestionCircleOutlined className="ml-2 text-gray-400" />
                                            </Tooltip>
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
                                        <span className="font-medium text-lg flex items-center">
                                            Ishlanmani ishlab chiqarish joyi
                                            <Tooltip
                                                title={
                                                    'Ishlanmani ishlab chiqarish joyi (ishlab chiqarish maydoni) kadastr pasportini shakllantirilganligi toʻgʻrisida xujjatlar (kadastr pasporti va nusxasi) yoki bino va inshootlarni ijara shartnomasini davlat roʻyxatidan oʻtkazilganligi toʻgʻrisida hujjatlar'
                                                }
                                            >
                                                <QuestionCircleOutlined className="ml-2 text-gray-400" />
                                            </Tooltip>
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
                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
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
                                        <span className="font-medium text-lg">
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
                                        <span className="font-medium text-lg flex items-center">
                                            Ishlanmaning ijtimoiy ahamiyati
                                            <Tooltip title="Hududdagi va tarmoqdagi muammolarini hal qilishda ishlanmaning oʻrni va roli aniq  raqamlari bilan koʻrsatilishi lozim">
                                                <QuestionCircleOutlined className="ml-1" />
                                            </Tooltip>
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
