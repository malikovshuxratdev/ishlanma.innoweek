import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    DatePicker,
    Card,
    Button,
    Row,
    Col,
    Space,
    Divider,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { X as IconX } from 'lucide-react';
import AuthorSearch from '../../components/shared/AuthorSearch';
import { AuthorAssignType } from '../../types/admin-assign/adminAssiginTpe';
import {
    useApplicationSubmit2Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';
import { ApplicationSubmitRequest2Form } from '../../types/applicationSubmit/applicationSubmitType';

interface CoAuthor {
    id: number | string;
    fullName: string;
    science_id: string;
}

interface Step2Props {
    onNext: () => void;
    onBack: () => void;
    initialValues?: any;
}

const Step2IntellectualProperty: React.FC<Step2Props> = ({
    onNext,
    onBack,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const { mutate: submitApplication, isPending: isSubmitting } =
        useApplicationSubmit2Mutate();
    const { data: applicationData } = useGetApplication();
    const [authors, setAuthors] = useState<CoAuthor[]>([]);

    useEffect(() => {
        if (initialValues) {
            const initVals: any = { ...initialValues };
            if (initVals.registrationDate) {
                initVals.registrationDate = moment(initVals.registrationDate);
            }
            if (initVals.validityPeriod) {
                initVals.validityPeriod = moment(initVals.validityPeriod);
            }
            form.setFieldsValue(initVals);
            if (Array.isArray(initialValues.authors)) {
                const normalized: CoAuthor[] = initialValues.authors.map(
                    (a: any) => ({
                        id:
                            a.id ??
                            a.data?.id ??
                            a.science_id ??
                            a.scienceId ??
                            Math.random().toString(36).slice(2),
                        fullName: a.fullName ?? a.full_name ?? a.name ?? '',
                        science_id: a.science_id ?? a.scienceId ?? '',
                    })
                );
                setAuthors(normalized);
            }
        }
    }, [initialValues, form]);

    useEffect(() => {
        const ip =
            applicationData?.project?.intellectual_property ||
            (applicationData as any)?.intellectual_property;
        if (!ip) return;

        const current = form.getFieldsValue([
            'inventionName',
            'patentNumber',
            'registrationDate',
            'validityPeriod',
        ]);
        const hasAnyValue = Object.values(current || {}).some(
            (v) => v !== undefined && v !== null && v !== ''
        );

        if (!hasAnyValue) {
            const vals: any = {};
            if (ip.name) vals.inventionName = ip.name;
            if (
                typeof ip.patent_number !== 'undefined' &&
                ip.patent_number !== null
            )
                vals.patentNumber = String(ip.patent_number);
            if (ip.registration_date)
                vals.registrationDate = moment(ip.registration_date);
            if (ip.expired_at) vals.validityPeriod = moment(ip.expired_at);

            form.setFieldsValue(vals);
        }

        const ipAny: any = ip as any;
        const ipAuthors = Array.isArray(ipAny.authors)
            ? ipAny.authors
            : ip.author
            ? [ip.author]
            : [];

        if (ipAuthors.length > 0) {
            setAuthors((prev) => {
                if (prev && prev.length > 0) return prev;
                const normalized = ipAuthors.map((a: any) => ({
                    id:
                        a.id ??
                        a.data?.id ??
                        a.science_id ??
                        a.scienceId ??
                        Math.random().toString(36).slice(2),
                    fullName: a.full_name ?? a.fullName ?? a.name ?? '',
                    science_id:
                        a.science_id ?? a.scienceId ?? a.data?.science_id ?? '',
                }));
                return normalized;
            });
        }
    }, [applicationData, form]);

    useEffect(() => {
        form.setFieldsValue({ authors });
    }, [authors, form]);

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    const disabledValidityDates = (current: any) => {
        const reg = form.getFieldValue('registrationDate');
        if (!reg) return false;
        return current && current < reg.startOf('day');
    };

    const handleAddCoAuthor = (author: AuthorAssignType | any) => {
        if (!author) return;
        setAuthors((prev) => {
            const exists = prev.some((a) => String(a.id) === String(author.id));
            if (exists) return prev;
            const next: CoAuthor = {
                id:
                    author.id ??
                    author.data?.id ??
                    Math.random().toString(36).slice(2),
                fullName: author.sur_name
                    ? author.sur_name + ' ' + author.first_name
                    : author.fullName || author.name || '',
                science_id: author.science_id ?? author.data?.science_id ?? '',
            };
            return [...prev, next];
        });
    };

    const handleRemoveCoAuthor = (id: number | string) => {
        setAuthors((prev) => prev.filter((a) => String(a.id) !== String(id)));
    };

    const handleNext = async () => {
        try {
            await form.validateFields();
            // authors are managed in state and form is synced; build payload
            const values = form.getFieldsValue();

            // Build intellectual_property object conditionally so empty optional fields are omitted
            const ip: any = {};
            if (values.inventionName) ip.name = values.inventionName;
            if (values.patentNumber)
                ip.patent_number = String(values.patentNumber);
            if (values.registrationDate)
                ip.registration_date =
                    values.registrationDate.format('YYYY-MM-DD');
            if (values.validityPeriod)
                ip.expired_at = values.validityPeriod.format('YYYY-MM-DD');

            // include authors only if we have at least one with a science_id
            const mappedAuthors = authors
                .map((a) => ({ science_id: a.science_id || '' }))
                .filter((a) => a.science_id && a.science_id.trim() !== '');
            if (mappedAuthors.length > 0) ip.authors = mappedAuthors;

            const payload: ApplicationSubmitRequest2Form = {
                intellectual_property: ip,
            };

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
            console.error(error);
        }
    };

    return (
        <div className="mx-auto max-w-6xl animate-fade-in">
            <Card className="w-full shadow-sm border border-gray-100/60 backdrop-blur-sm bg-white/70">
                <Space direction="vertical" className="w-full">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleNext}
                        scrollToFirstError
                    >
                        <Row gutter={[24, 4]}>
                            <Col span={24}>
                                <Form.Item
                                    name="inventionName"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ixtiro nomi
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Ixtiro nomi"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    label={
                                        <span className="font-medium text-lg">
                                            Mualliflari
                                        </span>
                                    }
                                >
                                    <div className="flex gap-2">
                                        <AuthorSearch
                                            onAdd={(a) => handleAddCoAuthor(a)}
                                        />
                                    </div>
                                    {/* search errors are reported inside AuthorSearch */}
                                    {authors.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Qo'shilgan hammuallif (
                                                {authors.length}):
                                            </p>
                                            <div className="grid gap-3 lg:grid-cols-3">
                                                {authors.map((author) => (
                                                    <div
                                                        key={author.id}
                                                        className="flex items-center justify-between px-4 py-3 rounded-md border-2"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    author.fullName
                                                                }
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Science ID:{' '}
                                                                <span className="text-blue-600 dark:text-blue-400 font-mono">
                                                                    {
                                                                        author.science_id
                                                                    }
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <Button
                                                            type="text"
                                                            onClick={() =>
                                                                handleRemoveCoAuthor(
                                                                    author.id
                                                                )
                                                            }
                                                            icon={
                                                                <IconX
                                                                    size={16}
                                                                />
                                                            }
                                                            size="small"
                                                            className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 border-0 rounded-full ml-3 transition-colors"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="patentNumber"
                                    label={
                                        <span className="font-medium text-lg">
                                            Patent raqami
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Patent raqami"
                                        allowClear
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="registrationDate"
                                    label={
                                        <span className="font-medium text-lg">
                                            Roʻyyxatdan oʻtkazilgan sana
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="validityPeriod"
                                    label={
                                        <span className="font-medium text-lg">
                                            Amal qilish muddati
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select end date"
                                        disabledDate={disabledValidityDates}
                                        size="large"
                                        format="YYYY-MM-DD"
                                        inputReadOnly
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
                                2-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={isSubmitting}
                                disabled={isSubmitting}
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

export default Step2IntellectualProperty;
