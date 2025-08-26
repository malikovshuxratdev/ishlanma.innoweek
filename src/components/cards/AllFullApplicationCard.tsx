import React from 'react';
import { Card, Rate, Button, Typography } from 'antd';
import { EyeOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../../assets/images/hero-bg.svg';
import { AllApplication } from '../../types/get-application/getAllApplicationsType';

const { Title } = Typography;
const URL = import.meta.env.VITE_BASE_URI;

interface ApplicationCardProps {
    application: AllApplication;
    onRate?: (application: AllApplication) => void;
}

const AllFullApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
    onRate,
}) => {
    const navigate = useNavigate();
    const handleViewDetails = () => navigate(``);
    const handleRate = () => onRate?.(application);

    return (
        <Card
            className="application-card animate-slide-up"
            onClick={handleViewDetails}
        >
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                    <div className="relative w-full lg:w-64 h-48 lg:h-40">
                        <img
                            alt={application.name}
                            src={`${URL + application.image}` || fallbackImage}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-between min-h-0">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                            <Title
                                level={4}
                                className="mb-0 text-text line-clamp-2 flex-1 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={handleViewDetails}
                            >
                                {application.name}
                            </Title>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Rate
                                    disabled
                                    value={application.rate_avg}
                                    allowHalf
                                    className="text-sm"
                                />
                                <span className="text-sm text-text-secondary">
                                    ({application.comment_count})
                                </span>
                            </div>
                        </div>
                        <div></div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Muallif:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.created_by?.full_name || '—'}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Tashkilot:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application?.organization?.short_name || '—'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                        <div>
                            <Button
                                type="text"
                                icon={<StarOutlined />}
                                onClick={handleRate}
                                className="text-yellow-500"
                                size="small"
                            >
                                Rate
                            </Button>
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                onClick={handleViewDetails}
                                size="middle"
                            >
                                Tafsilotlar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AllFullApplicationCard;
