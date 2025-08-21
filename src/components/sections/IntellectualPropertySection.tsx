import React from 'react';
import { User } from 'lucide-react';
import { IntellectualProperty } from '../../types/get-application/getByIdApplicationType';
import moment from 'moment';

interface IntellectualPropertySectionProps {
    intellectualProperty: IntellectualProperty;
}

const IntellectualPropertySection: React.FC<
    IntellectualPropertySectionProps
> = ({ intellectualProperty }) => {
    return (
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <header className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                            Oʻzbekiston Respublikasining “Ixtirolar, foydali
                            modellar va sanoat namunalari toʻgʻrisida”gi
                            Qonuniga muvofiq ishlanma uchun berilgan
                            intellektual mulk huquqi
                        </h2>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {intellectualProperty.name}
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                <div>
                                    <p className="text-gray-600">
                                        Patent raqami
                                    </p>
                                    <p className="font-mono text-gray-900">
                                        {intellectualProperty.patent_number}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-600">
                                        Roʻyxatdan oʻtkazilgan sana
                                    </p>
                                    <p className="text-gray-900">
                                        {moment(
                                            intellectualProperty.registration_date
                                        ).format('DD MMMM YYYY')}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-600">
                                        Amal qilish muddati
                                    </p>
                                    <p className="text-gray-900">
                                        {moment(
                                            intellectualProperty.expired_at
                                        ).format('DD MMMM YYYY')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-green-600" />
                        Mualliflari ({intellectualProperty.authors.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {intellectualProperty.authors.map((author) => (
                            <article
                                key={author.id}
                                className="bg-gray-50 rounded-lg p-4 shadow-sm"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center text-sm font-semibold text-emerald-600">
                                        {author.full_name
                                            ?.slice(0, 2)
                                            .toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 text-sm leading-tight">
                                            {author.full_name}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            ID: {author.science_id}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntellectualPropertySection;
