import React from 'react';
import { Card, Rate, Button, Tag, Typography } from 'antd';
import { EyeOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../../assets/images/hero-bg.svg';
import { MyApplication } from '../../types/get-application/getApplicationType';
import { TokenService } from '../../utils/storage';

const { Title, Paragraph } = Typography;
const URL = import.meta.env.VITE_BASE_URI;

interface ApplicationCardProps {
    application: MyApplication;
    showRating?: boolean;
    showEdit?: boolean;
    onRate?: (application: MyApplication) => void;
    onEdit?: (application: MyApplication) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
    showRating = false,
    showEdit = false,
    onRate,
    onEdit,
}) => {
    const navigate = useNavigate();
    const handleViewDetails = () => navigate(`/applications/${application.id}`);
    const handleRate = () => onRate?.(application);
    const handleEdit = () => onEdit?.(application);

    const getStatusColor = (statusDisplay?: string) => {
        if (!statusDisplay) return undefined;
        const s = statusDisplay.toLowerCase();
        if (s.includes('approved') || s.includes('submitted')) return 'green';
        if (s.includes('rejected')) return 'red';
        if (s.includes('revision') || s.includes('revisions')) return 'orange';
        return undefined;
    };

    const getStatusText = (statusDisplay?: string) => {
        if (!statusDisplay) return '';
        const s = statusDisplay.toLowerCase();
        if (s.includes('submitted')) return 'Yuborilgan';
        if (s.includes('draft')) return 'Tugallanmagan';
        // Keep other common statuses localized where sensible
        if (s.includes('approved')) return 'Tasdiqlangan';
        if (s.includes('rejected')) return 'Rad etilgan';
        if (s.includes('revision') || s.includes('revisions'))
            return 'Tahrir talab etiladi';
        return statusDisplay;
    };

    const statusLower = application.status_display?.toLowerCase() || '';
    const isSubmitted = statusLower.includes('submitted');
    const isRejected = statusLower.includes('rejected');
    const isDraft = statusLower.includes('draft');
    const shouldShowEdit = isRejected ? true : isSubmitted ? false : showEdit;

    const handleContinue = () => {
        navigate(`/submit-application`);
        TokenService.setApplication(application.detail);
    };

    return (
        <Card className="application-card animate-slide-up">
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
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {application.status_display && (
                                    <Tag
                                        color={getStatusColor(
                                            application.status_display
                                        )}
                                    >
                                        {getStatusText(
                                            application.status_display
                                        )}
                                    </Tag>
                                )}
                                <Rate
                                    disabled
                                    value={application.project.rate_avg}
                                    allowHalf
                                    className="text-sm"
                                />
                                <span className="text-sm text-text-secondary">
                                    ({application.project.comment_count})
                                </span>
                            </div>
                        </div>
                        <Paragraph className="text-text-secondary mb-3 line-clamp-2 cursor-pointer">
                            {application.detail || application.project?.name}
                        </Paragraph>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Submitted by:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.project?.created_by?.full_name ||
                                    '—'}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Organization:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.project?.organization
                                    ?.short_name || '—'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                        <div className="mt-2 text-xs text-text-secondary">
                            Submitted:{' '}
                            {application.created_at
                                ? new Date(
                                      application.created_at
                                  ).toLocaleDateString()
                                : 'N/A'}
                        </div>
                        <div>
                            {showRating && (
                                <Button
                                    type="text"
                                    icon={<StarOutlined />}
                                    onClick={handleRate}
                                    className="text-yellow-500"
                                    size="small"
                                >
                                    Rate
                                </Button>
                            )}
                            {isDraft && (
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={handleContinue}
                                    size="middle"
                                >
                                    Davom etish
                                </Button>
                            )}
                            {shouldShowEdit && !isDraft && (
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={handleEdit}
                                    size="middle"
                                >
                                    Tahrirlash
                                </Button>
                            )}
                            {!isDraft && (
                                <Button
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    onClick={handleViewDetails}
                                    size="middle"
                                >
                                    Tafsilotlar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ApplicationCard;
