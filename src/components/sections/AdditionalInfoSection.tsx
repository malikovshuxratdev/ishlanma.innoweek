import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { AdditionalInfo } from '../../types/get-application/getByIdApplicationType';
import moment from 'moment';
import FilePreview from '../shared/FilePreviewModal';

const URL = import.meta.env.VITE_BASE_URI;

interface AdditionalInfoSectionProps {
    additionalInfo: AdditionalInfo;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
    additionalInfo,
}) => {
    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: 'UZS',
        }).format(parseFloat(amount));
    };

    return (
        <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <header className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                Qo'shimcha ma'lumotlar
                            </h2>
                        </div>
                    </div>
                </header>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Yangi ishlanmani tijoratlashtirishga tayyorlash
                            bo'yicha amalga oshirilgan loyiha:{' '}
                            <span className="font-medium text-gray-900">
                                {additionalInfo.name}
                            </span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Ishlanmaning mukammallik (yetuklik) darajasi
                                </h4>
                                <p className="text-gray-900">
                                    {additionalInfo.quality_level.name}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                                    Shartnoma ma'lumotlari
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        Shartnomalar soni:{' '}
                                        <span className="font-semibold text-gray-900">
                                            {additionalInfo.contract_count.toLocaleString()}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Shartnoma summasi:{' '}
                                        <span className="font-semibold text-gray-900">
                                            {formatCurrency(
                                                additionalInfo.contract_amount
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Sotilgan ishlanma (mahsulot)ning eksport
                                    ko'rsatkichlari
                                </h4>
                                <div className="space-y-1">
                                    {/* Individual year values */}
                                    {Object.entries(
                                        additionalInfo.export_indicator
                                    ).map(([year, value]) => (
                                        <p
                                            key={year}
                                            className="text-sm text-gray-600"
                                        >
                                            {year}-yilda{' '}
                                            <span className="font-semibold text-gray-900">
                                                {value.toLocaleString()} so'm
                                            </span>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Ishlanmaning sanoat mansubligi
                                </h4>
                                <p className="text-gray-900">
                                    {additionalInfo?.industry_affiliation
                                        ?.name ?? '-'}{' '}
                                    <span className="font-semibold text-gray-900">
                                        {' '}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">
                                Ishlanmani yaratishda yuzaga kelgan muammolar
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                                {additionalInfo.development_challenge}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">
                                Ishlanmaning ijtimoiy ahamiyati
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                                {additionalInfo.social_impact}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Ishlab chiqarilgan ishlanma (mahsulot) yoki ko'rsatilgan
                    xizmatlarni sotib olgan iste'molchi tashkilotlar
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {additionalInfo.consumer_organizations.map((org) => (
                        <div key={org.id} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                                {org.short_name}
                            </h4>
                            <div className="text-sm space-y-1">
                                <p className="text-gray-600">
                                    TIN:{' '}
                                    <span className="font-mono text-gray-900">
                                        {org.tin}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Ro'yxatga olingan sana:{' '}
                                    <span className="text-gray-900">
                                        {moment(org.registration_date).format(
                                            'DD MMMM YYYY'
                                        )}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Direktor:{' '}
                                    <span className="text-gray-900">
                                        {org.director.last_name}{' '}
                                        {org.director.first_name}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {additionalInfo.files.length > 0 && (
                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Yangi ishlanmani tijoratlashtirishga tayyorlash yoki
                        tijoratlashtirish istagini bildirgan ishlanma rasmi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {additionalInfo.files.map((file, idx) => (
                            <FilePreview
                                key={file.id ?? idx}
                                file={`${URL}${file.file}`}
                                fileName="Ishlanma rasmi"
                            />
                        ))}
                    </div>
                </section>
            )}

            {additionalInfo.photo_evidences.length > 0 && (
                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Ishlanmaning sanoat namunasini yaratish jarayonidan foto
                        lavhalar
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {additionalInfo.photo_evidences.map((file, idx) => (
                            <FilePreview
                                key={file.id ?? idx}
                                file={`${URL}${file.file}`}
                                fileName="Ishlanma rasmi"
                            />
                        ))}
                    </div>
                </section>
            )}

            {additionalInfo.customs_documents.length > 0 && (
                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Bojxona xizmatlaridan foydalanganligi bo'yicha hujjatlar
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {additionalInfo.customs_documents.map((doc, index) => (
                            <FilePreview
                                key={index}
                                isDownload
                                file={`${URL}${doc.file}`}
                                fileName="Bojxona xizmatlaridan foydalanganligi boʻyicha hujjatlar"
                            />
                        ))}
                    </div>
                </section>
            )}

            {additionalInfo.contract_files.length > 0 && (
                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Sotuv shartnomalari soni va summasi, asoslovchi
                        hujjatlar
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {additionalInfo.contract_files.map((doc, index) => (
                            <FilePreview
                                key={index}
                                isDownload
                                file={`${URL}${doc.file}`}
                                fileName="Asoslovchi hujjat"
                            />
                        ))}
                    </div>
                </section>
            )}

            {additionalInfo.production_facility_document.length > 0 && (
                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Ishlanmani ishlab chiqarish joyi (kadastr pasporti va
                        hujjatlar)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FilePreview
                            isDownload
                            file={`${URL}${additionalInfo.production_facility_document}`}
                            fileName="Kadastr pasporti"
                        />
                    </div>
                </section>
            )}
        </div>
    );
};

export default AdditionalInfoSection;
