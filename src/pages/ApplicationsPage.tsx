import React, { useState } from 'react';
import {
    Row,
    Col,
    Input,
    Select,
    Typography,
    Card,
    Pagination,
    Button,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
import RatingModal from '../components/modals/RatingModal';
import AllFullApplicationCard from '../components/cards/AllFullApplicationCard';
import { useGetAllApplicationsQuery } from '../hooks/useGetApplicationQuery';

const { Title, Paragraph } = Typography;
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
    const [pageSize, setPageSize] = useState(10);
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

    const filteredApplications =
        allApplications?.results?.filter((app) => {
            const matchesSearch =
                !searchText ||
                app.name.toLowerCase().includes(searchText.toLowerCase()) ||
                app.created_by.full_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                app.organization.short_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            // Note: sectors and region filtering removed as they don't exist in the current type
            return matchesSearch;
        }) || [];

    const totalFiltered = filteredApplications.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentApplications = filteredApplications.slice(
        startIndex,
        endIndex
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-12 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-800/80 to-slate-900/90"></div>

                    {/* Animated background elements */}
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>

                    {/* Floating particles */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-float-${
                                i % 3
                            }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up animation-delay-800">
                        <Title
                            level={1}
                            className="!text-white !mb-6 !font-black !text-2xl sm:!text-3xl lg:!text-4xl !leading-tight font-['Inter',sans-serif]"
                        >
                            Ishlanmalar
                        </Title>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 -mt-14 relative">
                {/* Search and Filter Section */}
                <Card className="mb-8 shadow-2xl border-0 rounded-xl overflow-hidden">
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={12} lg={8}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-['Inter',sans-serif]">
                                    Qidirish
                                </label>
                                <Search
                                    placeholder="Ishlanma yoki muallif nomi..."
                                    prefix={
                                        <SearchOutlined className="text-gray-400" />
                                    }
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                    allowClear
                                    size="large"
                                    className="rounded-xl"
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-['Inter',sans-serif]">
                                    Sohalar
                                </label>
                                <Select
                                    placeholder="Sohani tanlang"
                                    value={selectedSector}
                                    onChange={setSelectedSector}
                                    allowClear
                                    size="large"
                                    className="w-full rounded-xl"
                                    disabled
                                >
                                    <Option value="coming-soon">
                                        Tez orada qo'shiladi
                                    </Option>
                                </Select>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 font-['Inter',sans-serif]">
                                    Hududlar
                                </label>
                                <Select
                                    placeholder="Hududni tanlang"
                                    value={selectedRegion}
                                    onChange={setSelectedRegion}
                                    allowClear
                                    size="large"
                                    className="w-full rounded-xl"
                                    disabled
                                >
                                    <Option value="coming-soon">
                                        Tez orada qo'shiladi
                                    </Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>

                    {/* Results Summary */}
                    <div className="border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {searchText && (
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => {
                                            setSearchText('');
                                        }}
                                        className="text-red-500 hover:text-red-600 font-['Inter',sans-serif]"
                                    >
                                        Qidiruvni tozalash
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Applications Grid */}
                <div className="space-y-6 mb-8">
                    {currentApplications.length > 0 ? (
                        currentApplications.map((application, index) => (
                            <div
                                key={application.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <AllFullApplicationCard
                                    application={application}
                                />
                            </div>
                        ))
                    ) : (
                        <Card className="text-center py-16 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-3xl">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-12 h-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <Title
                                level={4}
                                className="!mb-2 font-['Inter',sans-serif]"
                            >
                                Hech qanday natija topilmadi
                            </Title>
                            <Paragraph className="!mb-0 text-gray-600 font-['Inter',sans-serif]">
                                {searchText
                                    ? "Qidiruv shartlarini o'zgartiring yoki qidiruvni tozalang"
                                    : 'Hali ishlanmalar mavjud emas'}
                            </Paragraph>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {totalFiltered > 0 && (
                    <div className="flex justify-center mb-8">
                        <Card className="shadow-lg border-0 rounded-2xl bg-white/95 backdrop-blur-sm">
                            <Pagination
                                current={currentPage}
                                total={totalFiltered}
                                pageSize={pageSize}
                                showSizeChanger
                                showQuickJumper
                                showTotal={(total, range) => (
                                    <span className="text-sm text-gray-600 font-['Inter',sans-serif]">
                                        {range[0]}-{range[1]} / {total} ishlanma
                                    </span>
                                )}
                                onChange={handlePageChange}
                                pageSizeOptions={['10', '20', '50', '100']}
                                className="font-['Inter',sans-serif]"
                            />
                        </Card>
                    </div>
                )}
            </div>

            {/* Rating Modal */}
            <RatingModal
                visible={ratingModalVisible}
                onCancel={() => setRatingModalVisible(false)}
                onSubmit={handleRatingSubmit}
                application={selectedApplication}
            />

            {/* Custom Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 30px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% { 
                        opacity: 0.4;
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.8;
                        transform: scale(1.1);
                    }
                }

                @keyframes float-0 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-15px) translateX(3px); }
                }

                @keyframes float-1 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-15px) translateX(-8px); }
                    66% { transform: translateY(-8px) translateX(8px); }
                }

                @keyframes float-2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(-10px); }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-float-0 {
                    animation: float-0 6s ease-in-out infinite;
                }

                .animate-float-1 {
                    animation: float-1 8s ease-in-out infinite;
                }

                .animate-float-2 {
                    animation: float-2 7s ease-in-out infinite;
                }

                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-2000 { animation-delay: 2.0s; }
                .animation-delay-4000 { animation-delay: 4.0s; }

                .animate-fade-in-up {
                    opacity: 0;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default ApplicationsPage;
