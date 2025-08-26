import React, { useState } from 'react';
import { Row, Col, Input, Select, Typography, Card, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
import RatingModal from '../components/modals/RatingModal';
import AllFullApplicationCard from '../components/cards/AllFullApplicationCard';
import { useGetAllApplicationsQuery } from '../hooks/useGetApplicationQuery';

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
    const { data: allApplications } = useGetAllApplicationsQuery();

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

    const handlePageChange = (page: number, size?: number) => {
        setCurrentPage(page);
        if (size) {
            setPageSize(size);
        }
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
                    Ishlanmalar
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

            <div className="space-y-6">
                {allApplications?.results.map((application) => (
                    <AllFullApplicationCard
                        key={application.id}
                        application={application}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <Pagination
                    current={currentPage}
                    total={allApplications?.count || 0}
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
