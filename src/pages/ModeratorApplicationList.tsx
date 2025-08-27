import React from 'react';
import { Pagination, Typography } from 'antd';
import ModeratorApplicationCard from '../components/admin-cards/ModeratorApplicationCard';
import { useModeratorApplicationQuery } from '../hooks/useModeratorQuery';

const { Title } = Typography;

const ModeratorApplicationList: React.FC = () => {
    const { resData, pagination, setPage } = useModeratorApplicationQuery();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center mb-6">
                <Title level={2} className="mb-0 text-text">
                    Arizalar ro'yxati
                </Title>
            </div>

            <div className="space-y-6">
                {resData.map((application) => (
                    <ModeratorApplicationCard
                        key={application.id}
                        application={application}
                    />
                ))}
                <Pagination
                    current={pagination.pageIndex}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    onChange={setPage}
                />
            </div>
        </div>
    );
};

export default ModeratorApplicationList;
