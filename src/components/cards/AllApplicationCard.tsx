import React from 'react';
import { Button, Typography, Tag } from 'antd';
import { ArrowUpRight, Award, Building2 } from 'lucide-react';
import { AllApplication } from '../../types/get-application/getAllApplicationsType';
import { useNavigate } from 'react-router-dom';
import { BuildOutlined } from '@ant-design/icons';
import { BiBuildingHouse } from 'react-icons/bi';

const { Title } = Typography;
const URL = import.meta.env.VITE_BASE_URI;

interface ApplicationCardProps {
    application: AllApplication;
}

const AllApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`application-view/${application.id}`);
    };

    return (
        <div className="group bg-white rounded-2xl transition-all overflow-hidden border border-blue-200 w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto transform will-change-transform">
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
                {application.image ? (
                    <img
                        src={`${URL}${application.image}`}
                        alt={application.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        style={{
                            minHeight: '200px',
                            maxHeight: '300px',
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="w-12 h-12 text-gray-400">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* ID Tag - Top Left */}
                <div className="absolute top-3 left-3">
                    <Tag className="bg-orange-100 text-orange-700 border-0 flex items-center gap-2 rounded-full px-3 py-1 font-medium text-sm">
                        <svg
                            className="w-3 h-3 mr-1 inline"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {application.rate_avg
                            ? application.rate_avg.toFixed(1)
                            : '0.0'}
                    </Tag>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title and Organization on same line */}
                <div className="mb-4">
                    <div className=" gap-2">
                        <Title
                            level={4}
                            className="!text-lg !font-bold !text-gray-900 !mb-2 group-hover:!text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer font-['Inter',sans-serif]"
                            onClick={handleClick}
                        >
                            {application.name}
                        </Title>
                        <div className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2 font-['Inter',sans-serif]">
                            <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="truncate">
                                {application.organization?.short_name ||
                                    "Tashkilot nomi ko'rsatilmagan"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Circular Action Button */}
                <div className="flex justify-end mt-4">
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        className="w-12 h-12 bg-blue-400 border-0 shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                        onClick={handleClick}
                    >
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AllApplicationCard;
