import React from 'react';
import { Button, Typography } from 'antd';
import { Star, Building2, ArrowRight, Eye } from 'lucide-react';
import { AllApplication } from '../../types/get-application/getAllApplicationsType';
import { useNavigate } from 'react-router-dom';

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
        <div className="group bg-white rounded-2xl transition-all overflow-hidden border border-gray-100 w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto hover:shadow-xl hover:-translate-y-2 transform will-change-transform duration-300">
            {/* Image Section - Responsive Height */}
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
                        <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-900">
                        {application.rate_avg
                            ? application.rate_avg.toFixed(1)
                            : '0.0'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title and Organization */}
                <div className="mb-4">
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

                {/* Action Buttons - Fixed Layout */}
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        className="flex-1 h-9 rounded-lg font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-md hover:shadow-lg transition-all duration-200 font-['Inter',sans-serif] text-sm"
                        onClick={handleClick}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Tafsilotlar
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AllApplicationCard;
