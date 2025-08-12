import { useState, useEffect, useMemo } from 'react';
import MapContainer from './cards/MapContainer';
import RegionsGrid from './cards/RegionsGrid';

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-center justify-between">
            <h3 className="text-gray-600 text-[14px] sm:text-[16px]">
                {title}
            </h3>
            <p className="text-gray-900 text-[18px] sm:text-[20px] font-medium">
                {value}
            </p>
        </div>
    );
}

const InformationRegion = () => {
    // Adjusted data shape to match later access pattern (data.regions).
    // Wrapped in useMemo so reference stays stable (avoids unnecessary effect reruns).
    const data = useMemo(
        () => ({
            regions: [
                {
                    code: 'TN',
                    name: { uz: 'Toshkent' },
                    users_count: 1200,
                    male_count: 600,
                    female_count: 600,
                    less40_count: 800,
                    scientific_degree_count: 300,
                    scientific_title_count: 150,
                },
                {
                    code: 'AN',
                    name: { uz: 'Andijon' },
                    users_count: 950,
                    male_count: 500,
                    female_count: 450,
                    less40_count: 620,
                    scientific_degree_count: 210,
                    scientific_title_count: 90,
                },
                {
                    code: 'BU',
                    name: { uz: 'Buxoro' },
                    users_count: 760,
                    male_count: 400,
                    female_count: 360,
                    less40_count: 500,
                    scientific_degree_count: 180,
                    scientific_title_count: 70,
                },
            ],
        }),
        []
    );
    const [selectedRegion, setSelectedRegion] = useState('TN');
    const isPending = false;
    const RegionStatisticsLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {Array.from({ length: 6 }).map((_, idx) => (
                <div
                    key={idx}
                    className="h-20 animate-pulse rounded-lg bg-gray-100 border border-gray-200"
                />
            ))}
        </div>
    );
    const [regionStats, setRegionStats] = useState<
        { label: string; value: string }[]
    >([]);

    const getRegionName = (regionCode: string) => {
        const region = data.regions?.find((r) => r.code === regionCode);
        return region ? String(region.name.uz) : 'Maʼlumot yoʻq';
    };

    useEffect(() => {
        const regionData = data.regions?.find((r) => r.code === selectedRegion);
        if (regionData) {
            setRegionStats([
                {
                    label: 'Foydalanuvchilar soni',
                    value: `${regionData.users_count}`,
                },
                {
                    label: 'Erkaklar',
                    value: `${regionData.male_count}`,
                },
                {
                    label: 'Ayollar',
                    value: `${regionData.female_count}`,
                },
                {
                    label: '40 yoshgacha',
                    value: `${regionData.less40_count}`,
                },
                {
                    label: 'Ilmiy darajaga ega',
                    value: `${regionData.scientific_degree_count}`,
                },
                {
                    label: 'Ilmiy unvonga ega',
                    value: `${
                        regionData.scientific_title_count ??
                        regionData.scientific_degree_count
                    }`,
                },
            ]);
        } else {
            setRegionStats([
                {
                    label: 'Foydalanuvchilar soni',
                    value: '0',
                },
                { label: 'Erkaklar', value: '0' },
                {
                    label: 'Ayollar',
                    value: '0',
                },
                {
                    label: '40 yoshgacha',
                    value: '0',
                },
                {
                    label: 'Ilmiy darajaga ega',
                    value: '0',
                },
                {
                    label: 'Ilmiy unvonga ega',
                    value: '0',
                },
            ]);
        }
    }, [selectedRegion, data]);

    return (
        <div className="mx-auto px-3 sm:px-4 lg:px-6 mt-[80px]">
            <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Hududlar statistikasi
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="w-full lg:w-2/3 order-2 lg:order-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                    <div className="px-6 py-4">
                        <h2 className="text-xl sm:text-xl font-500 text-gray-900">
                            {getRegionName(selectedRegion)}
                        </h2>
                    </div>
                    <MapContainer
                        mapId="uzbekistan-map"
                        onSelectedRegion={setSelectedRegion}
                        selectedRegion={selectedRegion}
                    />
                    {isPending ? (
                        <RegionStatisticsLoader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                            {regionStats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    title={stat.label}
                                    value={stat.value}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/3 order-1 lg:order-2 mb-4 lg:mb-0">
                    <RegionsGrid />
                </div>
            </div>
        </div>
    );
};

export default InformationRegion;
