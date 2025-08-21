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

    // Data will be loaded from an API later. For now keep an empty list so the
    // page renders as "no data yet" per design request.
    const [applications, setApplications] = useState<Application[]>([]);

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

    const filteredApplications = applications.filter((app) => {
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
    // Reset to first page when filters or data change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchText, selectedSector, selectedRegion, applications]);

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
                {/* {currentApplications.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                        showRating={true}
                        onRate={handleRateApplication}
                    />
                ))} */}
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
