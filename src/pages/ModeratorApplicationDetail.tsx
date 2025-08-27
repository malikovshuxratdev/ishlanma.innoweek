import React from 'react';
import { Calendar } from 'lucide-react';
import DevelopmentSection from '../components/sections/DevelopmentSection';
import IntellectualPropertySection from '../components/sections/IntellectualPropertySection';
import ResearchProjectSection from '../components/sections/ResearchProjectSection';
import AdditionalInfoSection from '../components/sections/AdditionalInfoSection';
import FinanceSection from '../components/sections/FinanceSection';
import StatusBadge from '../components/shared/StatusBadge';
import ApplicationCheckModal from '../components/modals/ApplicationCheckModal';
import { useGetModeratorApplicationQuery } from '../hooks/useModeratorQuery';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const ModeratorApplicationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: application } = useGetModeratorApplicationQuery(Number(id));

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Ariza ma'lumotlari
                            </h1>
                            {application?.code && (
                                <p className="text-gray-600 font-mono mt-1">
                                    Loyiha kodi: {application?.code}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <StatusBadge
                                status={application?.status || 0}
                                size="sm"
                            />
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Yaratilgan sana:{' '}
                                    {moment(application?.created_at).format(
                                        'DD MMMM YYYY'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {application?.project && (
                        <>
                            <DevelopmentSection
                                development={application?.project?.development}
                            />

                            <IntellectualPropertySection
                                intellectualProperty={
                                    application?.project?.intellectual_property
                                }
                            />

                            <ResearchProjectSection
                                researchProject={
                                    application?.project?.research_project
                                }
                            />

                            <AdditionalInfoSection
                                additionalInfo={
                                    application?.project?.additional_info
                                }
                            />

                            <FinanceSection
                                finance={application?.project?.finance}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Application Check Modal - Shows 3 buttons for submitted applications */}
            <ApplicationCheckModal
                applicationId={Number(id)}
                applicationStatus={application?.status || 0}
            />
        </div>
    );
};

export default ModeratorApplicationDetail;
