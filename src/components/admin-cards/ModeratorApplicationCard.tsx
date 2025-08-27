import React from 'react';
import { Card, Button, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../../assets/images/hero-bg.svg';
import StatusBadge from '../shared/StatusBadge';
import { MyApplication } from '../../types/get-application/getApplicationType';
import moment from 'moment';

const { Title } = Typography;
const URL = import.meta.env.VITE_BASE_URI;

interface ApplicationCardProps {
    application: MyApplication;
}

const ModeratorApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
}) => {
    const navigate = useNavigate();
    const handleViewDetails = () =>
        navigate(`/moderator-application/${application.id}`);

    return (
        <Card
            className="application-card animate-slide-up"
            onClick={handleViewDetails}
        >
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                    <div className="relative w-full lg:w-64 h-48 lg:h-40">
                        <img
                            alt={application.project.name}
                            src={
                                `${URL + application.project.image}` ||
                                fallbackImage
                            }
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
                                {application.project.name}
                            </Title>
                            <StatusBadge
                                status={application.status}
                                size="sm"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Muallif:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.project?.created_by?.full_name ||
                                    '—'}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Tashkilot:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.project?.organization
                                    ?.short_name || '—'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                        <div className="mt-2 text-xs text-text-secondary">
                            Yuborilgan sana:{' '}
                            {moment(application.created_at).format(
                                'DD MMMM YYYY'
                            )}
                        </div>
                        <div>
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

export default ModeratorApplicationCard;
