import React from 'react';
import { Development } from '../../types/get-application/getByIdApplicationType';
import moment from 'moment';

interface DevelopmentSectionProps {
    development: Development;
}

const DevelopmentSection: React.FC<DevelopmentSectionProps> = ({
    development,
}) => {
    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <header className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                            Ishlanma to'g'risida ma'lumot
                        </h2>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <h3
                            className="text-2xl font-bold text-gray-900 mb-2"
                            aria-label="Loyiha nomi"
                        >
                            {development?.name ?? '—'}
                        </h3>

                        <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                            <span className="font-medium text-gray-800">
                                Ishlanma tavsifi
                            </span>
                            <br />
                            <span className="block mt-2 text-gray-700">
                                {development?.description ??
                                    'Tavsif mavjud emas.'}
                            </span>
                        </p>
                    </div>

                    <aside className="space-y-4">
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                            <dl className="grid grid-cols-1 gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">
                                        Yaratilgan sana
                                    </dt>
                                    <dd className="text-gray-900 font-medium">
                                        {moment(
                                            development.creation_date
                                        ).format('DD MMMM YYYY')}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">
                                        Sertifikat sanasi
                                    </dt>
                                    <dd className="text-gray-900 font-medium">
                                        {moment(
                                            development.certificate_date
                                        ).format('DD MMMM YYYY')}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-gradient-to-r from-white to-gray-50 border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Sertifikat turi
                                    </p>
                                    <p className="text-gray-900 font-semibold capitalize">
                                        {development.certificate_type}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                        Raqam
                                    </p>
                                    <p className="font-mono text-gray-900">
                                        {development.certificate_number}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Ishlanma yaratilgan tashkilot
                    </h4>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1 w-full">
                            <h5 className="text-md font-semibold text-gray-900">
                                {development.organization.short_name}
                            </h5>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                                <div>
                                    <p className="text-gray-600">TIN</p>
                                    <p className="font-mono text-gray-900">
                                        {development.organization.tin}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-600">
                                        Ro'yxatga olingan sana
                                    </p>
                                    <p className="text-gray-900">
                                        {moment(
                                            development.organization
                                                .registration_date
                                        ).format('DD MMMM YYYY')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="self-stretch sm:self-auto">
                            <p className="text-gray-600 text-sm">Direktor</p>
                            <p className="text-gray-900 font-medium mt-1">
                                {development.organization.director.last_name}{' '}
                                {development.organization.director.first_name}{' '}
                                {development.organization.director.middle_name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevelopmentSection;
