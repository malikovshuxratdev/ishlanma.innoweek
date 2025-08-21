import React from 'react';
import { User, Building } from 'lucide-react';
import { ResearchProject } from '../../types/get-application/getByIdApplicationType';
import moment from 'moment';

interface ResearchProjectSectionProps {
    researchProject: ResearchProject;
}

const ResearchProjectSection: React.FC<ResearchProjectSectionProps> = ({
    researchProject,
}) => {
    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <header className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                            Ishlanma yaratilishi uchun avval bajarilgan
                            ilmiy-tadqiqot loyihasi (tajriba-konstruktorlik
                            ishlanmalari)
                        </h2>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {researchProject.name}
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                <div>
                                    <p className="text-gray-600">
                                        Amalga oshirilgan muddati
                                    </p>
                                    <p className="text-gray-900">
                                        {moment(
                                            researchProject.implemented_deadline
                                        ).format('DD MMMM YYYY')}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-600">
                                        Bajarilgan hudud
                                    </p>
                                    <p className="text-gray-900">
                                        {researchProject.region.name.uz}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-600">
                                        Fan yoʻnalishi
                                    </p>
                                    <p className="text-gray-900">
                                        {researchProject.science_field.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <div className="bg-white border rounded-lg p-4 shadow-sm text-sm">
                            <p className="text-gray-600">Loyiha nomi (qisqa)</p>
                            <p className="text-gray-900 font-semibold">
                                {researchProject.name}
                            </p>
                        </div>
                    </aside>
                </div>

                <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-green-600" />
                        Loyiha rahbari
                    </h4>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {researchProject.project_manager.full_name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Science ID:{' '}
                                    {researchProject.project_manager.science_id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-indigo-600" />
                        Loyihaning ijrochi tashkiloti
                    </h4>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">
                            {researchProject.executor_organization.short_name}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">TIN</p>
                                <p className="font-mono text-gray-900">
                                    {researchProject.executor_organization.tin}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    Registration
                                </p>
                                <p className="text-gray-900">
                                    {moment(
                                        researchProject.executor_organization
                                            .registration_date
                                    ).format('DD MMMM YYYY')}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600">Director</p>
                                <p className="text-gray-900">
                                    {
                                        researchProject.executor_organization
                                            .director.last_name
                                    }{' '}
                                    {
                                        researchProject.executor_organization
                                            .director.first_name
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchProjectSection;
