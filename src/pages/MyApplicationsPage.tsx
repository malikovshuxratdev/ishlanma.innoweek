import React from 'react';
import { Button, Typography, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ApplicationCard from '../components/cards/ApplicationCard';
import { useGetMyApplicationQuery } from '../hooks/useGetApplicationQuery';

const { Title } = Typography;

const MyApplicationsPage: React.FC = () => {
    const { data } = useGetMyApplicationQuery();

    const handleEdit = () => {};

    const hasDraft = (data?.results ?? []).some(
        (app) => app.status_display === 'Draft'
    );

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center mb-6">
                <Title level={2} className="mb-0 text-text">
                    Mening arizalarim
                </Title>
                {hasDraft ? (
                    <Tooltip title="Sizda tugallanmagan ariza bor">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                                (window.location.href = '/submit-application')
                            }
                            className="w-full sm:w-auto"
                            disabled
                        >
                            Yangi ariza
                        </Button>
                    </Tooltip>
                ) : (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() =>
                            (window.location.href = '/submit-application')
                        }
                        className="w-full sm:w-auto"
                    >
                        Yangi ariza
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {data?.results.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                        showEdit={true}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyApplicationsPage;
