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
    Select,
    Divider,
    Space,
    TreeSelect,
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import OrganizationSearch from '../../components/shared/OrganizationSearch';
import {
    useAllRegionsQuery,
    useStudyFieldsQuery,
} from '../../hooks/useAllRegionsQuery';
import {
    useApplicationSubmit3Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';
import { ApplicationSubmitRequest3Form } from '../../types/application-submit/applicationSubmitType';
import type { DatePickerProps } from 'antd';
import { X } from 'lucide-react';
import { useUserProfileQuery } from '../../hooks/useOauthScienceIdMutate';

const { Option } = Select;

type Step3FormValues = {
    researchProjectTitle?: string;
    implementationPeriod?: moment.Moment;
    regionOfImplementation?: number;
    scientificField?: number;
    projectManager?: number;
    executingOrganization?: {
        id: number | string;
        name: string;
        inn: string;
    };
};

interface Step3Props {
    onNext: (values: Step3FormValues) => void;
    onBack: () => void;
}

const Step3ScientificBackground: React.FC<Step3Props> = ({
    onNext,
    onBack,
}) => {
    const [form] = Form.useForm();
    const { data: regionsData } = useAllRegionsQuery();
    const { data: studyFieldsData } = useStudyFieldsQuery();
    const { data: applicationData } = useGetApplication();

    const { mutate: submitApplication, isPending } =
        useApplicationSubmit3Mutate();
    const [orgInnInput, setOrgInnInput] = useState('');
    const { data: userData } = useUserProfileQuery();
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number | string;
        name: string;
        inn: string;
    } | null>(null);

    const treeData = regionsData?.map((region) => ({
        // guard against unexpected shapes (some items may lack name.uz)
        title: String(region?.name?.uz ?? region?.name ?? ''),
        value: region.id,
        key: region.id,
        checkable: false,
        children: region.children?.map((child) => ({
            title: String(child?.name?.uz ?? child?.name ?? ''),
            value: child.id,
            key: child.id,
            checkable: true,
        })),
    }));

    // Disable future dates in DatePicker (antd uses dayjs under the hood)
    const disabledFutureDates: DatePickerProps['disabledDate'] = (current) => {
        if (!current) return false;
        return current.valueOf() > Date.now();
    };

    // keep executingOrganization form field in sync with selection
    useEffect(() => {
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        if (!applicationData) return;

        // research_project comes from applicationData.project.research_project
        const rp = applicationData.project?.research_project;

        if (!rp) return; // Early return if research_project doesn't exist

        const code = rp.code;

        if (code) {
            form.setFieldsValue({
                projectCode: code,
            });
        }

        // Prefill form with normalized primitives (ids/strings)
        form.setFieldsValue({
            researchProjectTitle: rp?.name ?? undefined,
            implementationPeriod: rp?.implemented_deadline
                ? moment(
                      rp.implemented_deadline,
                      moment.ISO_8601,
                      true
                  ).isValid()
                    ? moment(rp.implemented_deadline)
                    : undefined
                : undefined,
            regionOfImplementation: rp?.region?.id ?? undefined,
            scientificField: rp?.science_field?.id ?? undefined,
            projectManager: rp?.project_manager?.id ?? undefined,
        });

        // Executor organization comes as object; extract TIN for our OrganizationSearch value
        const execOrgTin = rp?.executor_organization?.tin;
        if (execOrgTin) {
            const normalized = {
                id: execOrgTin, // we use tin as identifier when submitting
                name: rp?.executor_organization?.short_name ?? '',
                inn: String(execOrgTin),
            } as { id: number | string; name: string; inn: string };
            setSelectedOrganization(normalized);
            setOrgInnInput(String(execOrgTin));
        }
    }, [applicationData, form]);

    const handleNext = async () => {
        try {
            const values = (await form.validateFields()) as Step3FormValues;

            // Build payload incrementally — include only provided fields using proper types
            const researchProject: Partial<
                ApplicationSubmitRequest3Form['research_project']
            > = {};

            if (values.researchProjectTitle)
                researchProject.name = values.researchProjectTitle;

            if (values.implementationPeriod)
                researchProject.implemented_deadline =
                    values.implementationPeriod.format('YYYY-MM-DD');

            if (values.regionOfImplementation)
                researchProject.region = Number(values.regionOfImplementation);

            if (selectedOrganization?.id) {
                const tinStr = String(selectedOrganization.id).trim();
                if (tinStr) researchProject.tin = tinStr;
            }

            if (values.scientificField)
                researchProject.science_field = Number(values.scientificField);

            const payload: ApplicationSubmitRequest3Form = {
                research_project:
                    researchProject as ApplicationSubmitRequest3Form['research_project'],
            };

            const application_id = applicationData?.id ?? 0;

            submitApplication(
                { application_id, body: payload },
                {
                    onSuccess: () => {
                        onNext(values);
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
                            {applicationData?.project?.research_project
                                ?.code && (
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="projectCode"
                                        label={
                                            <span className="font-medium text-lg">
                                                Loyiha shifri
                                            </span>
                                        }
                                    >
                                        <Input
                                            placeholder="Loyiha shifri"
                                            maxLength={200}
                                            size="large"
                                            disabled
                                            value={
                                                applicationData?.project
                                                    ?.research_project?.code
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            )}

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="projectManager"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyiha rahbari
                                        </span>
                                    }
                                >
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between px-4 py-3 rounded-md border-2">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">
                                                        {userData?.full_name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Science ID:{' '}
                                                        <span className="text-blue-600 font-mono">
                                                            {
                                                                userData?.science_id
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="researchProjectTitle"
                                    label={
                                        <span className="font-medium text-lg">
                                            Ilmiy-tadqiqot loyihasi nomi
                                        </span>
                                    }
                                >
                                    <Input
                                        placeholder="Ilmiy-tadqiqot loyihasi nomi"
                                        maxLength={200}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="implementationPeriod"
                                    label={
                                        <span className="font-medium text-lg">
                                            Amalga oshirilgan muddati
                                        </span>
                                    }
                                >
                                    <DatePicker
                                        className="w-full"
                                        placeholder="Select start date"
                                        disabledDate={disabledFutureDates}
                                        size="large"
                                        inputReadOnly
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="regionOfImplementation"
                                    label={
                                        <span className="font-medium text-lg">
                                            Bajarilgan hudud
                                        </span>
                                    }
                                >
                                    <TreeSelect
                                        treeData={treeData ?? []}
                                        // treeCheckable
                                        // showCheckedStrategy={
                                        //     TreeSelect.SHOW_PARENT
                                        // }
                                        className="w-full"
                                        size="large"
                                        placeholder="Hududni tanlang"
                                        treeNodeFilterProp="title"
                                        showSearch
                                        allowClear
                                        treeDefaultExpandAll
                                        filterTreeNode={(input, node) =>
                                            String(node.title ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="scientificField"
                                    label={
                                        <span className="font-medium text-lg">
                                            Fan yoʻnalishi
                                        </span>
                                    }
                                >
                                    <Select
                                        placeholder="Select field"
                                        size="large"
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        {studyFieldsData?.map((field) => (
                                            <Option
                                                key={field?.id}
                                                value={field?.id}
                                            >
                                                {field?.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="executingOrganization"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyihaning ijrochi tashkiloti
                                        </span>
                                    }
                                >
                                    <OrganizationSearch
                                        value={selectedOrganization}
                                        onChange={(v) => {
                                            setSelectedOrganization(v);
                                            setOrgInnInput(v?.inn || '');
                                        }}
                                        inputValue={orgInnInput}
                                        onInputChange={(v) => setOrgInnInput(v)}
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
                                3-qadam 5-dan
                            </span>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<ArrowRightOutlined />}
                                iconPosition="end"
                                size="large"
                                loading={isPending}
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

export default Step3ScientificBackground;
