import React from 'react';
import { Button, Typography } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Star, Building2, ArrowRight, Eye } from 'lucide-react';
import { AllApplication } from '../../types/get-application/getAllApplicationsType';

const { Title } = Typography;
const URL = import.meta.env.VITE_BASE_URI;

interface ApplicationCardProps {
    application: AllApplication;
    showRating?: boolean;
    showEdit?: boolean;
    onRate?: (application: AllApplication) => void;
    onEdit?: (application: AllApplication) => void;
}

const AllApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
    onRate,
}) => {
    const navigate = useNavigate();
    const viewPath = application.id
        ? `/applications/${application.id}`
        : '/applications';
    const handleViewDetails = () => navigate(viewPath);
    const handleRate = () => onRate?.(application);

    return (
        <div className="group bg-white rounded-3xl transition-all overflow-hidden border border-gray-100 w-full sm:w-80 md:w-[400px] hover:shadow-lg hover:-translate-y-1 transform will-change-transform">
            <div className="relative h-[200px] md:h-48 lg:h-72">
                {application.image ? (
                    <img
                        src={`${URL}${application.image}`}
                        alt={application.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                        {application.rate_avg
                            ? application.rate_avg.toFixed(1)
                            : '0.0'}
                    </span>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <div className="mb-4">
                    <Title
                        level={4}
                        className="!text-xl !font-bold !text-gray-900 !mb-2 group-hover:!text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer"
                        onClick={handleViewDetails}
                    >
                        {application.name}
                    </Title>
                    <div className="text-sm text-gray-600 line-clamp-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span>
                            {application.organization?.short_name ||
                                "Tashkilot nomi ko'rsatilmagan"}
                        </span>
                    </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Building2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                            {application.created_by?.full_name ||
                                "Muallif nomi ko'rsatilmagan"}
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                            {application.created_by?.science_id ||
                                "ID ko'rsatilmagan"}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        type="text"
                        icon={<StarOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRate();
                        }}
                        className="flex-1 h-10 rounded-xl font-medium text-yellow-600 hover:bg-yellow-50"
                    >
                        Baholash
                    </Button>
                    <Button
                        type="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails();
                        }}
                        className="flex-1 h-10 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" />
                            Batafsil
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AllApplicationCard;
