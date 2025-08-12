import React, { useState } from 'react';
import { Row, Col, Input, Select, Typography, Card, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
import RatingModal from '../components/modals/RatingModal';
import ApplicationCard from '../components/cards/ApplicationCard';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Application {
    id: string;
    title: string;
    authors: string[];
    sectors: string[];
    rating: number;
    ratingCount: number;
    image: string;
    description: string;
    organization: string;
    maturityLevel: string;
    region: string;
}

const ApplicationsPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [selectedApplication, setSelectedApplication] =
        useState<Application | null>(null);

    const mockApplications: Application[] = [
        {
            id: '1',
            title: 'AI-Powered Medical Diagnosis System',
            authors: ['Dr. Akmal Saidov', 'Dr. Nigora Karimova'],
            sectors: ['Healthcare', 'Artificial Intelligence'],
            rating: 4.8,
            ratingCount: 24,
            image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
            description:
                'Advanced AI system for early disease detection and medical diagnosis assistance.',
            organization: 'Tashkent Medical Institute',
            maturityLevel: 'Prototype Testing',
            region: 'Tashkent',
        },
        {
            id: '2',
            title: 'Smart Agricultural Monitoring IoT System',
            authors: ['Prof. Jamshid Rasulov', 'Dr. Malika Abdullayeva'],
            sectors: ['Agriculture', 'IoT', 'Sustainability'],
            rating: 4.6,
            ratingCount: 18,
            image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
            description:
                'IoT-based system for monitoring crop health, soil conditions, and irrigation optimization.',
            organization: 'Samarkand Agricultural Research Institute',
            maturityLevel: 'Commercial Ready',
            region: 'Samarkand',
        },
        {
            id: '3',
            title: 'Renewable Energy Storage Solution',
            authors: ['Dr. Bobur Karimov', 'Eng. Nilufar Tosheva'],
            sectors: ['Energy', 'Sustainability'],
            rating: 4.7,
            ratingCount: 31,
            image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
            description:
                'Innovative battery technology for efficient renewable energy storage and distribution.',
            organization: 'Energy Research Center',
            maturityLevel: 'Market Testing',
            region: 'Bukhara',
        },
        {
            id: '4',
            title: 'Blockchain-Based Supply Chain Tracking',
            authors: ['Dr. Sardor Abdullayev', 'Ms. Durdona Nazarova'],
            sectors: ['Technology', 'Logistics'],
            rating: 4.4,
            ratingCount: 15,
            image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
            description:
                'Transparent and secure supply chain management using blockchain technology.',
            organization: 'IT Innovation Hub',
            maturityLevel: 'Prototype Testing',
            region: 'Fergana',
        },
        {
            id: '5',
            title: 'Water Purification Nanotechnology',
            authors: ['Prof. Gulnora Rakhimova', 'Dr. Aziz Normatov'],
            sectors: ['Environment', 'Nanotechnology'],
            rating: 4.9,
            ratingCount: 42,
            image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
            description:
                'Advanced nanotechnology solution for efficient water purification and treatment.',
            organization: 'Environmental Sciences Institute',
            maturityLevel: 'Commercial Ready',
            region: 'Andijan',
        },
        {
            id: '6',
            title: 'Smart Manufacturing Automation',
            authors: ['Dr. Rustam Yusupov', 'Eng. Feruza Saidova'],
            sectors: ['Manufacturing', 'Automation'],
            rating: 4.5,
            ratingCount: 28,
            image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
            description:
                'Intelligent automation system for optimizing manufacturing processes and quality control.',
            organization: 'Manufacturing Technology Center',
            maturityLevel: 'Market Testing',
            region: 'Namangan',
        },
        {
            id: '7',
            title: 'Advanced Solar Panel Technology',
            authors: ['Dr. Oybek Karimov', 'Prof. Zarina Yusupova'],
            sectors: ['Energy', 'Sustainability'],
            rating: 4.7,
            ratingCount: 35,
            image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
            description:
                'Next-generation solar panel technology with improved efficiency and durability.',
            organization: 'Renewable Energy Institute',
            maturityLevel: 'Commercial Ready',
            region: 'Tashkent',
        },
        {
            id: '8',
            title: 'AI-Powered Traffic Management',
            authors: ['Dr. Sherzod Abdullayev', 'Ms. Gulnoza Rakhimova'],
            sectors: ['Technology', 'Transportation'],
            rating: 4.6,
            ratingCount: 22,
            image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
            description:
                'Intelligent traffic management system using AI to optimize urban traffic flow.',
            organization: 'Smart City Research Center',
            maturityLevel: 'Prototype Testing',
            region: 'Samarkand',
        },
        {
            id: '9',
            title: 'Biodegradable Packaging Solution',
            authors: ['Prof. Nodira Tosheva', 'Dr. Bekzod Normatov'],
            sectors: ['Environment', 'Manufacturing'],
            rating: 4.8,
            ratingCount: 41,
            image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
            description:
                'Eco-friendly biodegradable packaging materials for sustainable commerce.',
            organization: 'Environmental Technology Lab',
            maturityLevel: 'Market Testing',
            region: 'Bukhara',
        },
        {
            id: '10',
            title: 'Smart Home Security System',
            authors: ['Dr. Jasur Saidov', 'Eng. Malika Karimova'],
            sectors: ['Technology', 'Security'],
            rating: 4.4,
            ratingCount: 19,
            image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
            description:
                'Advanced home security system with AI-powered threat detection and prevention.',
            organization: 'Security Technology Institute',
            maturityLevel: 'Commercial Ready',
            region: 'Fergana',
        },
        {
            id: '11',
            title: 'Precision Agriculture Drones',
            authors: ['Dr. Aziza Yusupova', 'Prof. Bobur Abdullayev'],
            sectors: ['Agriculture', 'Technology'],
            rating: 4.9,
            ratingCount: 33,
            image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
            description:
                'Autonomous drones for precision agriculture monitoring and crop management.',
            organization: 'Agricultural Innovation Center',
            maturityLevel: 'Market Testing',
            region: 'Andijan',
        },
        {
            id: '12',
            title: 'Medical Imaging AI Assistant',
            authors: ['Dr. Dilshod Karimov', 'Dr. Sevara Rakhimova'],
            sectors: ['Healthcare', 'Artificial Intelligence'],
            rating: 4.7,
            ratingCount: 27,
            image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
            description:
                'AI-powered medical imaging analysis for improved diagnostic accuracy.',
            organization: 'Medical AI Research Lab',
            maturityLevel: 'Prototype Testing',
            region: 'Namangan',
        },
    ];

    const sectors = [
        'Healthcare',
        'Agriculture',
        'Energy',
        'Technology',
        'Environment',
        'Manufacturing',
    ];
    const regions = [
        'Tashkent',
        'Samarkand',
        'Bukhara',
        'Fergana',
        'Andijan',
        'Namangan',
    ];

    const filteredApplications = mockApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchText.toLowerCase()) ||
            app.authors.some((author) =>
                author.toLowerCase().includes(searchText.toLowerCase())
            );
        const matchesSector =
            !selectedSector || app.sectors.includes(selectedSector);
        const matchesRegion = !selectedRegion || app.region === selectedRegion;

        return matchesSearch && matchesSector && matchesRegion;
    });

    // Pagination logic
    const totalItems = filteredApplications.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentApplications = filteredApplications.slice(
        startIndex,
        endIndex
    );

    const handlePageChange = (page: number, size?: number) => {
        setCurrentPage(page);
        if (size) {
            setPageSize(size);
        }
    };

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchText, selectedSector, selectedRegion]);

    const handleRateApplication = (application: Application) => {
        setSelectedApplication(application);
        setRatingModalVisible(true);
    };

    const handleRatingSubmit = (_rating: number, _comment: string) => {
        message.success(
            `Thank you for rating "${selectedApplication?.title}"!`
        );
        setRatingModalVisible(false);
        setSelectedApplication(null);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <div className="mb-8">
                <Title level={2} className="mb-2">
                    Loyihalar
                </Title>
            </div>

            <Card className="mb-6">
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Search
                            placeholder="Search applications or authors..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={6} md={4}>
                        <Select
                            placeholder="Select Sector"
                            value={selectedSector}
                            onChange={setSelectedSector}
                            allowClear
                            className="w-full"
                        >
                            {sectors.map((sector) => (
                                <Option key={sector} value={sector}>
                                    {sector}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={4}>
                        <Select
                            placeholder="Select Region"
                            value={selectedRegion}
                            onChange={setSelectedRegion}
                            allowClear
                            className="w-full"
                        >
                            {regions.map((region) => (
                                <Option key={region} value={region}>
                                    {region}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </Card>

            {/* Applications Grid */}
            <div className="space-y-6">
                {currentApplications.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                        showRating={true}
                        onRate={handleRateApplication}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalItems > 0 && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={pageSize}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} applications`
                        }
                        onChange={handlePageChange}
                        pageSizeOptions={['6', '12', '18', '24']}
                        className="bg-surface p-4 rounded-lg shadow-sm"
                    />
                </div>
            )}

            <RatingModal
                visible={ratingModalVisible}
                onCancel={() => setRatingModalVisible(false)}
                onSubmit={handleRatingSubmit}
                application={selectedApplication}
            />
        </div>
    );
};

export default ApplicationsPage;
