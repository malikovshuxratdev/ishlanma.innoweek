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
import type { UploadFile } from 'antd';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import OrganizationSearch from '../../components/shared/OrganizationSearch';
import MultiOrganizationSearch from '../../components/shared/MultiOrganizationSearch';
import {
    useApplicationSubmit4Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';
import {
    useIndustryAffiliationsQuery,
    useQualityLevelsQuery,
} from '../../hooks/useAllRegionsQuery';
import { ApplicationSubmitRequest4Form } from '../../types/application-submit/applicationSubmitType';
import FileUpload from '../../components/uploads/FileUpload';
import {
    GetApplication1,
    AdditionalInfo,
} from '../../types/application-submit/applicationSubmitOne';

const { TextArea } = Input;
const { Option } = Select;

interface Step4Props {
    onNext: () => void;
    onBack: () => void;
    initialValues?: any;
}

const MAX_COMMERCIALIZATION_WORDS = 50;
const MAX_SOCIAL_IMPACT_WORDS = 120;

const Step4AdditionalInfo: React.FC<Step4Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const [fileMap, setFileMap] = useState<
        Record<string, { id: number; file: string }[]>
    >({});
    const { data: industryAffiliations } = useIndustryAffiliationsQuery();
    const { data: qualityLevels } = useQualityLevelsQuery();
    const { data: applicationData, refetch } = useGetApplication();
    const { mutate: submitApplication, isPending } =
        useApplicationSubmit4Mutate();
    const [orgInnInput, setOrgInnInput] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number;
        name: string;
        inn: string;
    } | null>(null);
    const [selectedOrganizations, setSelectedOrganizations] = useState<
        { id: number; name: string; inn: string }[]
    >([]);

    const handleFilesChange = (field: string, files: UploadFile[]) => {
        // Update form field value for UI consistency
        form.setFieldsValue({ [field]: files });

        // Map UploadFile[] to server-side entries { id, file }
        const mapped = files
            .map((f) => {
                const serverId = (f as any).serverId ?? (f as any).id ?? null;
                const fileName = f.name || (f as any).file || f.url || '';
                if (typeof serverId === 'number' && !Number.isNaN(serverId)) {
                    return { id: Number(serverId), file: fileName };
                }
                // If serverId not present yet, skip — handleNext filters by numeric ids
                return null;
            })
            .filter(Boolean) as { id: number; file: string }[];

        setFileMap((prev) => ({ ...prev, [field]: mapped }));
    };

    useEffect(() => {
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    // Populate form and local state from applicationData.additional_info when available
    useEffect(() => {
        if (!applicationData) return;
        const ai = (applicationData as GetApplication1)?.project
            ?.additional_info as AdditionalInfo | null;
        if (!ai) return;

        // map server file records to UploadFile[] for FileUpload component
        const API_URL = (import.meta as any).env?.VITE_BASE_URI || '';

        const mapServerFilesToUploadFiles = (
            items?: Array<
                | number
                | string
                | { file?: number | string; file_name?: string; id?: number }
            > | null
        ): UploadFile[] => {
            if (!items) return [];
            return items
                .map((it) => {
                    // it can be number (id), string (file path/URL) or object {id, file, file_name}
                    let id: number | null = null;
                    let filePath: string | null = null;
                    if (typeof it === 'number') {
                        id = it;
                    } else if (typeof it === 'string') {
                        filePath = it;
                    } else if (typeof it === 'object' && it !== null) {
                        id = typeof it.id === 'number' ? it.id : null;
                        const fp = it.file ?? it.file_name ?? null;
                        filePath = fp != null ? String(fp) : null;
                    }

                    // If we don't have any identifying info, skip
                    if (!id && !filePath) return null;

                    const uid = `server-${
                        id ?? Math.random().toString(36).slice(2, 9)
                    }`;

                    const name = filePath
                        ? String(filePath).split('/').pop() || String(filePath)
                        : String(id);

                    // Resolve URL: if filePath is absolute (http) use it, else prepend API_URL
                    let url = '';
                    if (filePath) {
                        if (/^https?:\/\//i.test(filePath)) url = filePath;
                        else
                            url = `${API_URL.replace(/\/$/, '')}${
                                filePath.startsWith('/') ? '' : '/'
                            }${filePath}`;
                    }

                    const f: UploadFile & { serverId?: number } = {
                        uid,
                        name,
                        status: 'done',
                        url,
                    } as UploadFile & { serverId?: number };
                    if (id) (f as any).serverId = Number(id);
                    return f;
                })
                .filter(Boolean) as UploadFile[];
        };

        // Scalars
        form.setFieldsValue({
            name: ai.name ?? undefined,
            industry_affiliation: ai?.industry_affiliation?.id ?? undefined,
            quality_level: ai?.quality_level?.id ?? undefined,
            bank_information: ai?.bank_information ?? undefined,
            development_challenge: ai?.development_challenge ?? undefined,
            social_impact: ai?.social_impact ?? undefined,
            contract_count:
                typeof ai?.contract_count !== 'undefined'
                    ? ai?.contract_count
                    : undefined,
            contract_amount:
                typeof ai?.contract_amount !== 'undefined'
                    ? ai?.contract_amount
                    : undefined,
        });

        // export_indicator: take first entry if present
        if (ai?.export_indicator && typeof ai?.export_indicator === 'object') {
            const years = Object.keys(ai?.export_indicator || {});
            if (years.length) {
                const y = years[0];
                const v = ai?.export_indicator[y];
                form.setFieldsValue({
                    export_indicator: { year: Number(y), amount: v },
                });
            }
        }

        const co = (ai as any).consumer_organizations;
        if (Array.isArray(co) && co.length) {
            const orgs = co
                .map((item: any) => {
                    if (!item) return null;
                    if (typeof item === 'number' || typeof item === 'string') {
                        return { id: item, name: '', inn: String(item) };
                    }
                    // assume object shape
                    return {
                        id: item.id ?? item.file ?? item.tin ?? '',
                        name: item.short_name || item.name || '',
                        inn: item.tin
                            ? String(item.tin)
                            : String(item.id ?? ''),
                    };
                })
                .filter(Boolean) as {
                id: number;
                name: string;
                inn: string;
            }[];
            if (orgs.length) {
                setSelectedOrganizations(orgs);
                setOrgInnInput(String(orgs[0]?.inn || ''));
            }
        } else if (co) {
            const single = co as any;
            if (typeof single === 'number' || typeof single === 'string') {
                setSelectedOrganization({
                    id: single as number,
                    name: '',
                    inn: String(single),
                });
                setOrgInnInput(String(single || ''));
            } else if (typeof single === 'object') {
                setSelectedOrganization({
                    id: single.id ?? null,
                    name: single.short_name || single.name || '',
                    inn: String(single.tin ?? single.id ?? ''),
                });
                setOrgInnInput(String(single.tin ?? single.id ?? ''));
            }
        }

        // Files
        const files = mapServerFilesToUploadFiles(
            (ai.files || []).map((f: any) => (typeof f === 'object' ? f : f))
        );
        if (files.length) {
            form.setFieldsValue({ files });
            setFileMap((prev) => ({
                ...prev,
                files: (ai.files || [])
                    .map((f: any) => ({
                        id: Number(f.id ?? f.file ?? f),
                        file: String(f.file_name ?? f.file ?? f ?? ''),
                    }))
                    .filter((it) => Number.isFinite(it.id) && it.id > 0),
            }));
        }

        const contractFiles = mapServerFilesToUploadFiles(
            (ai.contract_files || []).map((f: any) =>
                typeof f === 'object' ? f : f
            )
        );
        if (contractFiles.length) {
            form.setFieldsValue({ contract_files: contractFiles });
            setFileMap((prev) => ({
                ...prev,
                contract_files: (ai.contract_files || [])
                    .map((f: any) => ({
                        id: Number(f.id ?? f.file ?? f),
                        file: String(f.file_name ?? f.file ?? f ?? ''),
                    }))
                    .filter((it) => Number.isFinite(it.id) && it.id > 0),
            }));
        }

        const customs = mapServerFilesToUploadFiles(
            (ai.customs_documents || []).map((f: any) =>
                typeof f === 'object' ? f : f
            )
        );
        if (customs.length) {
            form.setFieldsValue({ customs_documents: customs });
            setFileMap((prev) => ({
                ...prev,
                customs_documents: (ai.customs_documents || [])
                    .map((f: any) => ({
                        id: Number(f.id ?? f.file ?? f),
                        file: String(f.file_name ?? f.file ?? f ?? ''),
                    }))
                    .filter((it) => Number.isFinite(it.id) && it.id > 0),
            }));
        }

        const photos = mapServerFilesToUploadFiles(
            (ai.photo_evidences || []).map((f: any) =>
                typeof f === 'object' ? f : f
            )
        );
        if (photos.length) {
            form.setFieldsValue({ photo_evidences: photos });
            setFileMap((prev) => ({
                ...prev,
                photo_evidences: (ai.photo_evidences || [])
                    .map((f: any) => ({
                        id: Number(f.id ?? f.file ?? f),
                        file: String(f.file_name ?? f.file ?? f ?? ''),
                    }))
                    .filter((it) => Number.isFinite(it.id) && it.id > 0),
            }));
        }

        // production_facility_document may be single value or array
        const pf = ai.production_facility_document;
        if (pf) {
            const pfArr = Array.isArray(pf) ? pf : [pf];
            const mapped = mapServerFilesToUploadFiles(
                pfArr.map((f: any) => (typeof f === 'object' ? f : f))
            );
            form.setFieldsValue({ production_facility_document: mapped });
            setFileMap((prev) => ({
                ...prev,
                production_facility_document: pfArr
                    .map((f: any) => ({
                        id: Number(f.id ?? f.file ?? f),
                        file: String(f.file_name ?? f.file ?? f ?? ''),
                    }))
                    .filter((it) => Number.isFinite(it.id) && it.id > 0),
            }));
        }
    }, [applicationData, form]);

    const commercializationText: string = Form.useWatch('name', form) || '';

    const commercializationWordCount = useMemo(
        () => commercializationText.trim().split(/\s+/).filter(Boolean).length,
        [commercializationText]
    );

    const handleCommercializationChange = (value: string) => {
        const words = value.trim().split(/\s+/).filter(Boolean);
        if (words.length > MAX_COMMERCIALIZATION_WORDS) {
            const limited = words
                .slice(0, MAX_COMMERCIALIZATION_WORDS)
                .join(' ');
            form.setFieldsValue({ name: limited });
        } else {
            form.setFieldsValue({ name: value });
        }
    };

    const handleNext = async () => {
        try {
            const values = await form.validateFields();

            const additional_info: Partial<
                ApplicationSubmitRequest4Form['additional_info']
            > = {};

            if (values.name) additional_info.name = values.name;

            if (values.industry_affiliation)
                additional_info.industry_affiliation = Number(
                    values.industry_affiliation
                );

            if (values.quality_level)
                additional_info.quality_level = Number(values.quality_level);

            if (values.bank_information)
                additional_info.bank_information = values.bank_information;

            // export_indicator: send as object mapping year -> amount, e.g. { "2020": 12 }
            if (values.export_indicator) {
                const ei = values.export_indicator;
                const year =
                    ei.year !== undefined &&
                    ei.year !== null &&
                    String(ei.year).trim() !== ''
                        ? String(ei.year)
                        : null;
                const amount =
                    ei.amount !== undefined &&
                    ei.amount !== null &&
                    String(ei.amount).trim() !== ''
                        ? Number(ei.amount)
                        : null;

                // Only include if we have a year. If amount missing, default to 0.
                if (year) {
                    additional_info.export_indicator = {
                        [year]: amount ?? 0,
                    } as any;
                }
            }

            if (
                typeof values.contract_count !== 'undefined' &&
                values.contract_count !== null
            )
                additional_info.contract_count = Number(values.contract_count);

            if (
                typeof values.contract_amount !== 'undefined' &&
                values.contract_amount !== null
            )
                additional_info.contract_amount = String(
                    values.contract_amount
                );

            const prodDocs = (
                fileMap['production_facility_document'] || []
            ).filter((f) => typeof f.id === 'number' && f.id > 0);
            if (prodDocs.length)
                additional_info.production_facility_document = Number(
                    prodDocs[0].id
                );

            if (values.development_challenge)
                additional_info.development_challenge =
                    values.development_challenge;

            if (values.social_impact)
                additional_info.social_impact = values.social_impact;

            // Build consumer_organizations_tin using inn/tin when possible.
            const buildValidTins = (
                list: { id: number | string; name: string; inn: string }[]
            ) =>
                list
                    .map((o) => String(o.inn || o.id || ''))
                    .map((s) => s.trim())
                    .filter((s) => s.length >= 9);

            if (selectedOrganizations && selectedOrganizations.length) {
                const validTins = buildValidTins(selectedOrganizations);
                if (validTins.length)
                    additional_info.consumer_organizations_tin = validTins;
                else {
                    // If no valid TINs, set a form error so user can fix input
                    form.setFields([
                        {
                            name: 'consumer_organizations_tin',
                            errors: [
                                'Iltimos, har bir tashkilot uchun kamida 9 ta belgidan iborat INN kiriting',
                            ],
                        },
                    ]);
                    return;
                }
            } else if (selectedOrganization?.id) {
                const tin = String(
                    selectedOrganization.inn || selectedOrganization.id || ''
                ).trim();
                if (tin.length >= 9) {
                    additional_info.consumer_organizations_tin = [tin];
                } else {
                    form.setFields([
                        {
                            name: 'consumer_organizations_tin',
                            errors: [
                                'Iltimos, tanlangan tashkilot uchun kamida 9 ta belgidan iborat INN kiriting',
                            ],
                        },
                    ]);
                    return;
                }
            }

            // Use 'files' field (form key) mapped in fileMap as 'files'
            const innovationFiles = (fileMap['files'] || []).filter(
                (f) => typeof f.id === 'number' && f.id > 0
            );
            if (innovationFiles.length)
                additional_info.files = innovationFiles.map((f, idx) => ({
                    file: Number(f.id),
                    is_main: idx === 0,
                }));

            // contract_files -> map to additional_info.contract_files
            const contractFiles = (fileMap['contract_files'] || []).filter(
                (f) => typeof f.id === 'number' && f.id > 0
            );
            if (contractFiles.length)
                additional_info.contract_files = contractFiles.map((f) => ({
                    file: Number(f.id),
                }));

            const customs = (fileMap['customs_documents'] || []).filter(
                (f) => typeof f.id === 'number' && f.id > 0
            );
            if (customs.length) {
                additional_info.customs_documents = customs.map((f) => ({
                    file: Number(f.id),
                }));
            }

            const photos = (fileMap['photo_evidences'] || []).filter(
                (f) => typeof f.id === 'number' && f.id > 0
            );
            if (photos.length)
                additional_info.photo_evidences = photos.map((f) => ({
                    file: Number(f.id),
                }));

            const payload = { additional_info } as any;

            const application_id = applicationData?.id ?? 0;

            submitApplication(
                { application_id, body: payload },
                {
                    onSuccess: () => {
                        onNext();
                    },
                }
            );
        } catch (error) {
            console.error('Error submitting form:', error);
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
                                    name="name"
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
                                    name="files"
                                    label={
                                        <span className="font-medium text-lg">
                                            Yangi ishlanmani tijoratlashtirishga
                                            tayyorlash yoki tijoratlashtirish
                                            istagini bildirgan ishlanma rasmi
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
                                    <FileUpload
                                        accept=".jpg,.jpeg,.png"
                                        maxSize={5}
                                        maxCount={10}
                                        title="Rasm yuklash (bir nechta)"
                                        vertical={true}
                                        value={
                                            form.getFieldValue('files') || []
                                        }
                                        onChange={(files) =>
                                            handleFilesChange('files', files)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="photo_evidences"
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
                                    <FileUpload
                                        accept=".jpg,.jpeg,.png"
                                        maxSize={5}
                                        maxCount={5}
                                        title="Rasm yuklash (bir nechta)"
                                        vertical={true}
                                        value={
                                            form.getFieldValue(
                                                'photo_evidences'
                                            ) || []
                                        }
                                        onChange={(files) =>
                                            handleFilesChange(
                                                'photo_evidences',
                                                files
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="industry_affiliation"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ishlanmaning sanoat mansubligi
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Sanoat mansubligini tanlang',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Sanoat tarmoqlarini tanlang"
                                        allowClear
                                        showSearch
                                        optionFilterProp="children"
                                        maxTagCount="responsive"
                                        size="large"
                                    >
                                        {industryAffiliations?.map(
                                            (industry) => (
                                                <Option
                                                    key={industry.id}
                                                    value={industry.id}
                                                >
                                                    {industry.name}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="quality_level"
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
                                        {qualityLevels?.map((level) => (
                                            <Option
                                                key={level.id}
                                                value={level.id}
                                            >
                                                {level.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="bank_information"
                                    label={
                                        <span className="font-medium text-lg">
                                            Xizmat ko'rsatuvchi bankdan
                                            ma'lumotlar
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Bank maʼlumotini kiriting',
                                        },
                                    ]}
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
                                    name="consumer_organizations_tin"
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
                                        <MultiOrganizationSearch
                                            value={selectedOrganizations}
                                            onChange={(list) => {
                                                setSelectedOrganizations(
                                                    list || []
                                                );
                                            }}
                                            inputValue={orgInnInput}
                                            onInputChange={(v) =>
                                                setOrgInnInput(v)
                                            }
                                            additional_info_id={
                                                applicationData?.project
                                                    ?.additional_info?.id
                                            }
                                            refetch={() => {
                                                refetch();
                                            }}
                                        />
                                        {/* keep single selection in sync for compatibility */}
                                        <div className="sr-only">
                                            <OrganizationSearch
                                                value={selectedOrganization}
                                                onChange={(v) => {
                                                    if (v) {
                                                        setSelectedOrganization(
                                                            {
                                                                id: Number(
                                                                    v.id
                                                                ),
                                                                name:
                                                                    v.name ||
                                                                    '',
                                                                inn:
                                                                    v.inn ||
                                                                    String(
                                                                        v.id
                                                                    ),
                                                            }
                                                        );
                                                        setOrgInnInput(
                                                            v.inn ||
                                                                String(v.id)
                                                        );
                                                    } else {
                                                        setSelectedOrganization(
                                                            null
                                                        );
                                                        setOrgInnInput('');
                                                    }
                                                }}
                                                inputValue={orgInnInput}
                                                onInputChange={(v) =>
                                                    setOrgInnInput(v)
                                                }
                                            />
                                        </div>
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
                                    <div>
                                        <Row gutter={[8, 8]}>
                                            <Col xs={24} md={6}>
                                                <Form.Item
                                                    name={[
                                                        'export_indicator',
                                                        'year',
                                                    ]}
                                                    className="!mb-0"
                                                >
                                                    <InputNumber
                                                        placeholder="Yil"
                                                        min={0}
                                                        max={2050}
                                                        className="!w-28"
                                                        size="large"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={18}>
                                                <Form.Item
                                                    name={[
                                                        'export_indicator',
                                                        'amount',
                                                    ]}
                                                    className="!mb-0 flex-1"
                                                >
                                                    <InputNumber
                                                        placeholder="So'mda miqdor"
                                                        className="w-full"
                                                        min={0}
                                                        formatter={(value) =>
                                                            `${value}`.replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                ','
                                                            )
                                                        }
                                                        size="large"
                                                        parser={(value): 0 =>
                                                            (value
                                                                ? Number(
                                                                      value.replace(
                                                                          /,/g,
                                                                          ''
                                                                      )
                                                                  )
                                                                : 0) as 0
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="customs_documents"
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
                                    <FileUpload
                                        accept=".pdf"
                                        maxSize={10}
                                        maxCount={1}
                                        title="PDF yuklash (bitta)"
                                        vertical={true}
                                        value={
                                            form.getFieldValue(
                                                'customs_documents'
                                            ) || []
                                        }
                                        onChange={(files) =>
                                            handleFilesChange(
                                                'customs_documents',
                                                files
                                            )
                                        }
                                        disabled={
                                            // disable when there is at least one uploaded file
                                            (fileMap['customs_documents'] || [])
                                                .length > 0 ||
                                            (
                                                form.getFieldValue(
                                                    'customs_documents'
                                                ) || []
                                            ).length > 0
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="production_facility_document"
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
                                    <FileUpload
                                        accept=".pdf"
                                        maxSize={10}
                                        maxCount={1}
                                        title="PDF yuklash (bitta)"
                                        vertical={true}
                                        value={
                                            form.getFieldValue(
                                                'production_facility_document'
                                            ) || []
                                        }
                                        onChange={(files) =>
                                            handleFilesChange(
                                                'production_facility_document',
                                                files
                                            )
                                        }
                                        disabled={
                                            (
                                                fileMap[
                                                    'production_facility_document'
                                                ] || []
                                            ).length > 0 ||
                                            (
                                                form.getFieldValue(
                                                    'production_facility_document'
                                                ) || []
                                            ).length > 0
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={24}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
                                            Sotuv shartnomalari soni va summasi,
                                            asoslovchi hujjatlar biriktirilsin
                                        </span>
                                    }
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name={'contract_files'}
                                                label="Asoslovchi hujjatlar"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Asoslovchi hujjatlarni yuklang',
                                                    },
                                                ]}
                                                valuePropName="value"
                                            >
                                                <FileUpload
                                                    accept=".pdf"
                                                    maxSize={10}
                                                    maxCount={5}
                                                    title="PDF yuklash (bir nechta)"
                                                    vertical={true}
                                                    value={
                                                        form.getFieldValue(
                                                            'contract_files'
                                                        ) || []
                                                    }
                                                    onChange={(files) =>
                                                        handleFilesChange(
                                                            'contract_files',
                                                            files
                                                        )
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        {/* Right: Numeric inputs stacked */}
                                        <Col xs={24} md={12}>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name={'contract_count'}
                                                        label="Shartnomalar soni"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Shartnomalar soni kiritilishi shart',
                                                            },
                                                        ]}
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
                                                        name={'contract_amount'}
                                                        label="Shartnoma summasi (so'm)"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Shartnoma summasi kiritilishi shart',
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            className="w-full"
                                                            placeholder="0"
                                                            min={0}
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
                                                            ): 0 =>
                                                                (value
                                                                    ? Number(
                                                                          value.replace(
                                                                              /,/g,
                                                                              ''
                                                                          )
                                                                      )
                                                                    : 0) as 0
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
                                    name="development_challenge"
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
                                    name="social_impact"
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
                                loading={isPending}
                                size="large"
                                disabled={isPending}
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
