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
import ProjectManagerSearch from '../../components/shared/ProjectManagerSearch';
import {
    useAllRegionsQuery,
    useStudyFieldsQuery,
} from '../../hooks/useAllRegionsQuery';
import {
    useApplicationSubmit3Mutate,
    useGetApplication,
} from '../../hooks/useApplicationSubmitMutation';
import { ApplicationSubmitRequest3Form } from '../../types/applicationSubmit/applicationSubmitType';

const { Option } = Select;

interface Step3Props {
    onNext: (values: any) => void;
    onBack: () => void;
    initialValues?: any;
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
    const [selectedOrganization, setSelectedOrganization] = useState<{
        id: number | string;
        name: string;
        inn: string;
    } | null>(null);
    const [selectedProjectManager, setSelectedProjectManager] = useState<{
        id: number | string;
        fullName: string;
        science_id: string;
    } | null>(null);

    const treeData = regionsData?.map((region) => ({
        title: String(region.name.uz),
        value: region.id,
        key: region.id,
        checkable: false,
        children: region.children?.map((child) => ({
            title: String(child.name.uz),
            value: child.id,
            key: child.id,
            checkable: true,
        })),
    }));

    const disabledFutureDates = (current: any) =>
        current && current > Date.now();

    useEffect(() => {
        form.setFieldsValue({
            executingOrganization: selectedOrganization ?? undefined,
        });
    }, [selectedOrganization, form]);

    useEffect(() => {
        form.setFieldsValue({
            projectManager: selectedProjectManager?.id ?? undefined,
        });
    }, [selectedProjectManager, form]);

    // When applicationData is available, populate form and related local state
    useEffect(() => {
        if (!applicationData) return;

        const rp = applicationData.project?.research_project;
        if (!rp) return;

        // project title / name
        form.setFieldsValue({
            researchProjectTitle: rp.name ?? undefined,
            implementationPeriod: rp.implemented_deadline
                ? moment(
                      rp.implemented_deadline,
                      moment.ISO_8601,
                      true
                  ).isValid()
                    ? moment(rp.implemented_deadline)
                    : undefined
                : undefined,
            regionOfImplementation: rp.region ?? undefined,
            scientificField: rp.science_field ?? undefined,
            projectManager: rp.project_manager ?? undefined,
        });

        // selected organization (tin) may not include full org details in applicationData
        const tinVal = (rp as any).tin ?? (rp as any).tin;
        if (tinVal) {
            const normalized = {
                id: tinVal,
                name: '',
                inn: String(tinVal),
            } as { id: number | string; name: string; inn: string };
            setSelectedOrganization(normalized);
            setOrgInnInput(String(tinVal));
        }

        // project manager - API returns id only, set local selectedProjectManager with id placeholder
        if (rp.project_manager) {
            setSelectedProjectManager({
                id: rp.project_manager,
                fullName: '',
                science_id: '',
            });
        }
    }, [applicationData, form]);

    const handleNext = async () => {
        try {
            const values = await form.validateFields();

            const research_project: ApplicationSubmitRequest3Form = {
                research_project: {
                    name: '',
                    implemented_deadline: '',
                    region: 0,
                    project_manager: 0,
                    tin: '',
                    science_field: 0,
                },
            };
            if (values.researchProjectTitle)
                research_project.research_project.name =
                    values.researchProjectTitle;
            if (values.implementationPeriod)
                research_project.research_project.implemented_deadline =
                    values.implementationPeriod.format('YYYY-MM-DD');
            if (values.regionOfImplementation)
                research_project.research_project.region = Number(
                    values.regionOfImplementation
                );
            if (selectedProjectManager?.id)
                research_project.research_project.project_manager = Number(
                    selectedProjectManager.id
                );
            if (selectedOrganization?.id)
                research_project.research_project.tin = String(
                    selectedOrganization.id
                );
            if (values.scientificField)
                research_project.research_project.science_field = Number(
                    values.scientificField
                );

            const payload = research_project;

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
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="projectManager"
                                    label={
                                        <span className="font-medium text-lg">
                                            Loyiha rahbari
                                        </span>
                                    }
                                >
                                    <ProjectManagerSearch
                                        value={selectedProjectManager}
                                        onChange={(v) =>
                                            setSelectedProjectManager(v)
                                        }
                                    />
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
                                                key={field.id}
                                                value={field.id}
                                            >
                                                {field.name}
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
