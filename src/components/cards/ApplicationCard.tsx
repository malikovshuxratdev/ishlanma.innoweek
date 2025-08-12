import React from 'react';
import { Card, Rate, Button, Tag, Typography } from 'antd';
import { EyeOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export interface ApplicationCardData {
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
    status?: 'approved' | 'rejected' | 'revision';
    submissionDate?: string;
    budget?: string;
    attachments?: number;
}

interface ApplicationCardProps {
    application: ApplicationCardData;
    showRating?: boolean;
    showEdit?: boolean;
    onRate?: (application: ApplicationCardData) => void;
    onEdit?: (application: ApplicationCardData) => void;
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'green';
            case 'rejected':
                return 'red';
            case 'revision':
                return 'orange';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved':
                return 'Approved';
            case 'rejected':
                return 'Rejected';
            case 'revision':
                return 'Sent for Revisions';
            default:
                return status;
        }
    };

    return (
        <Card className="application-card animate-slide-up">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                    <div className="relative w-full lg:w-64 h-48 lg:h-40">
                        <img
                            alt={application.title}
                            src={application.image}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={handleViewDetails}
                        />
                        <div className="absolute top-2 right-2">
                            {application.status ? (
                                <Tag
                                    color={getStatusColor(application.status)}
                                    className="shadow-sm"
                                >
                                    {getStatusText(application.status)}
                                </Tag>
                            ) : (
                                <Tag color="blue" className="shadow-sm">
                                    {application.maturityLevel}
                                </Tag>
                            )}
                        </div>
                        <div className="absolute top-2 left-2">
                            {application.budget ? (
                                <Tag color="purple" className="shadow-sm">
                                    {application.budget}
                                </Tag>
                            ) : (
                                <Tag color="green" className="shadow-sm">
                                    {application.region}
                                </Tag>
                            )}
                        </div>
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
                                {application.title}
                            </Title>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Rate
                                    disabled
                                    defaultValue={application.rating}
                                    allowHalf
                                    className="text-sm"
                                />
                                <span className="text-sm text-text-secondary">
                                    ({application.ratingCount})
                                </span>
                            </div>
                        </div>
                        <Paragraph
                            className="text-text-secondary mb-3 line-clamp-2 cursor-pointer"
                            onClick={handleViewDetails}
                        >
                            {application.description}
                        </Paragraph>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Authors:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.authors.join(', ')}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="text-xs text-text-tertiary mb-1">
                                Organization:
                            </div>
                            <div className="text-sm font-medium text-text">
                                {application.organization}
                            </div>
                        </div>
                        {application.attachments && (
                            <div className="mb-3">
                                <div className="text-xs text-text-tertiary">
                                    {application.attachments} attachment
                                    {application.attachments !== 1 ? 's' : ''}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                        <div className="flex flex-wrap gap-1">
                            {application.sectors.map((sector) => (
                                <Tag
                                    key={sector}
                                    color="geekblue"
                                    className="text-xs"
                                >
                                    {sector}
                                </Tag>
                            ))}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
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
                            {showEdit && (
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={handleEdit}
                                    size="small"
                                >
                                    Edit
                                </Button>
                            )}
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                onClick={handleViewDetails}
                                size="small"
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                    {application.submissionDate && (
                        <div className="mt-2 text-xs text-text-secondary">
                            Submitted:{' '}
                            {new Date(
                                application.submissionDate
                            ).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ApplicationCard;
