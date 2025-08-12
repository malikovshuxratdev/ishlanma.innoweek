import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    Tag,
    Rate,
    Descriptions,
    Image,
    Divider,
    Button,
} from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
    BankOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Paragraph } = Typography;

const ApplicationDetailPage: React.FC = () => {
    // Mock data for demonstration
    const applicationData = {
        id: '1',
        projectName: 'AI-Powered Medical Diagnosis System',
        description:
            'Advanced artificial intelligence system designed to assist medical professionals in early disease detection and accurate diagnosis. The system uses machine learning algorithms to analyze medical imaging, patient symptoms, and historical data to provide diagnostic recommendations.',
        organizationName: 'Tashkent Medical Institute',
        tinNumber: '123456789',
        creationDate: '2024-01-15',
        certificateNumber: 'CERT-2024-001',
        certificateDate: '2024-02-01',
        image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
        maturityLevel: 'Prototype Testing',
        inventionName: 'AI Medical Diagnostic Assistant',
        authors: [
            'Dr. Akmal Saidov',
            'Dr. Nigora Karimova',
            'Prof. Jasur Abdullayev',
        ],
        patentNumber: 'UZ-PAT-2024-001',
        registryDate: '2024-01-20',
        validityPeriod: '20 years',
        projectManager: 'Dr. Akmal Saidov',
        scientificDirection: 'Artificial Intelligence in Healthcare',
        implementingOrg: 'Medical AI Research Lab',
        region: 'Tashkent',
        industrialRelevance: 'High',
        socialSignificance:
            'Potential to improve diagnosis accuracy by 35% and reduce medical errors by 40%',
        grossProfit: '$150,000',
        netRevenue: '$180,000',
        problems:
            'Initial data collection and training dataset preparation challenges',
        rating: 4.8,
        ratingCount: 24,
    };

    const requiredFields = [
        {
            label: 'Project Name',
            value: applicationData.projectName,
            icon: <UserOutlined />,
        },
        {
            label: 'Organization Name',
            value: applicationData.organizationName,
            icon: <BankOutlined />,
        },
        { label: 'TIN Number', value: applicationData.tinNumber },
        {
            label: 'Creation Date',
            value: moment(applicationData.creationDate).format('MMMM DD, YYYY'),
            icon: <CalendarOutlined />,
        },
        {
            label: 'Certificate Number',
            value: applicationData.certificateNumber,
        },
        {
            label: 'Certificate Date',
            value: moment(applicationData.certificateDate).format(
                'MMMM DD, YYYY'
            ),
        },
        {
            label: 'Technological Maturity Level',
            value: applicationData.maturityLevel,
        },
        {
            label: 'Social Significance',
            value: applicationData.socialSignificance,
        },
        { label: 'Gross Profit', value: applicationData.grossProfit },
    ];

    const optionalFields = [
        { label: 'Invention Name', value: applicationData.inventionName },
        { label: 'Authors', value: applicationData.authors.join(', ') },
        { label: 'Patent Number', value: applicationData.patentNumber },
        {
            label: 'State Registry Date',
            value: moment(applicationData.registryDate).format('MMMM DD, YYYY'),
        },
        { label: 'Validity Period', value: applicationData.validityPeriod },
        { label: 'Project Manager', value: applicationData.projectManager },
        {
            label: 'Scientific Direction',
            value: applicationData.scientificDirection,
        },
        {
            label: 'Implementing Organization',
            value: applicationData.implementingOrg,
        },
        {
            label: 'Region',
            value: applicationData.region,
            icon: <EnvironmentOutlined />,
        },
        {
            label: 'Industrial Relevance',
            value: applicationData.industrialRelevance,
        },
        { label: 'Net Revenue', value: applicationData.netRevenue },
        { label: 'Development Problems', value: applicationData.problems },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            {/* Back Button */}
            <div className="mb-4 lg:mb-6">
                <Link to="/applications">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        className="shadow-sm hover:shadow transition-all"
                    >
                        Ortga qaytish
                    </Button>
                </Link>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-10 items-start">
                {/* Main Content */}
                <div className="space-y-8">
                    <Card className="overflow-hidden shadow-sm">
                        <div className="relative mb-6 rounded-lg overflow-hidden group">
                            <Image
                                width="100%"
                                height={380}
                                src={applicationData.image}
                                alt={applicationData.projectName}
                                className="object-cover w-full h-[240px] sm:h-[300px] lg:h-[340px] xl:h-[380px] transition-transform duration-700 group-hover:scale-[1.03]"
                                preview={false}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                                <Tag color="blue" className="m-0">
                                    {applicationData.maturityLevel}
                                </Tag>
                                <Tag color="green" className="m-0">
                                    {applicationData.region}
                                </Tag>
                                <div className="ml-auto flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-3 py-1 text-white text-xs">
                                    <Rate
                                        disabled
                                        value={applicationData.rating}
                                        allowHalf
                                        className="text-[10px] flex items-center"
                                    />
                                    <span>({applicationData.ratingCount})</span>
                                </div>
                            </div>
                        </div>
                        <Title level={2} className="mb-4 leading-tight">
                            {applicationData.projectName}
                        </Title>
                        <Paragraph className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-0">
                            {applicationData.description}
                        </Paragraph>
                    </Card>

                    <Card
                        title={
                            <span className="font-semibold">
                                Required Information
                            </span>
                        }
                        className="shadow-sm"
                    >
                        <Descriptions
                            column={1}
                            bordered
                            className="[&_.ant-descriptions-row]:!align-top"
                        >
                            {requiredFields.map((field, index) => (
                                <Descriptions.Item
                                    key={index}
                                    label={
                                        <span className="flex items-center">
                                            {field.icon && (
                                                <span className="mr-2 text-accent">
                                                    {field.icon}
                                                </span>
                                            )}
                                            {field.label}
                                        </span>
                                    }
                                >
                                    {field.value}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Card>

                    <Card
                        title={
                            <span className="font-semibold">
                                Additional Information
                            </span>
                        }
                        className="shadow-sm"
                    >
                        <Descriptions
                            column={1}
                            bordered
                            className="[&_.ant-descriptions-row]:!align-top"
                        >
                            {optionalFields.map((field, index) => (
                                <Descriptions.Item
                                    key={index}
                                    label={
                                        <span className="flex items-center">
                                            {field.icon && (
                                                <span className="mr-2 text-accent">
                                                    {field.icon}
                                                </span>
                                            )}
                                            {field.label}
                                        </span>
                                    }
                                >
                                    {field.value || 'Not provided'}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Card>

                    {/* Mobile Summary */}
                    <div className="lg:hidden space-y-4">
                        <Card
                            size="small"
                            title="Summary"
                            className="shadow-sm"
                        >
                            <div className="text-sm grid grid-cols-2 gap-y-2">
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    Org:
                                </div>
                                <div>{applicationData.organizationName}</div>
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    Region:
                                </div>
                                <div>{applicationData.region}</div>
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    Maturity:
                                </div>
                                <div>{applicationData.maturityLevel}</div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 hidden lg:block">
                    <div className="sticky top-28 flex flex-col gap-6">
                        <Card
                            title="Project Summary"
                            className="shadow-sm border border-border/60"
                        >
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Organization
                                    </div>
                                    <div className="font-medium">
                                        {applicationData.organizationName}
                                    </div>
                                </div>
                                <Divider className="my-3" />
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Authors
                                    </div>
                                    <div className="space-y-1">
                                        {applicationData.authors.map(
                                            (author, index) => (
                                                <div
                                                    key={index}
                                                    className="font-medium text-sm"
                                                >
                                                    {author}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <Divider className="my-3" />
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Scientific Direction
                                    </div>
                                    <div className="font-medium text-sm">
                                        {applicationData.scientificDirection}
                                    </div>
                                </div>
                                <Divider className="my-3" />
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Patent Info
                                    </div>
                                    <div className="font-medium text-sm">
                                        {applicationData.patentNumber}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Valid {applicationData.validityPeriod}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card
                            title="Financial Overview"
                            className="shadow-sm border border-border/60"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Gross Profit:
                                    </span>
                                    <span className="font-medium text-green-600">
                                        {applicationData.grossProfit}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Net Revenue:
                                    </span>
                                    <span className="font-medium text-blue-600">
                                        {applicationData.netRevenue}
                                    </span>
                                </div>
                                <Divider className="my-2" />
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Industrial Relevance:
                                    </span>
                                    <Tag
                                        color={
                                            applicationData.industrialRelevance ===
                                            'High'
                                                ? 'green'
                                                : 'orange'
                                        }
                                        className="m-0"
                                    >
                                        {applicationData.industrialRelevance}
                                    </Tag>
                                </div>
                            </div>
                        </Card>

                        <Card
                            title="Contact Information"
                            className="shadow-sm border border-border/60"
                        >
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Project Manager
                                    </div>
                                    <div className="font-medium">
                                        {applicationData.projectManager}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Organization
                                    </div>
                                    <div className="font-medium">
                                        {applicationData.organizationName}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Location
                                    </div>
                                    <div className="font-medium flex items-center">
                                        <EnvironmentOutlined className="mr-1" />
                                        {applicationData.region}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailPage;
