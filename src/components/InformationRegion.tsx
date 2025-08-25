import { useState, useEffect, useMemo } from 'react';
import MapContainer from './cards/MapContainer';
import RegionsGrid from './cards/RegionsGrid';
import { Card } from 'antd';

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
                    label: 'Kelib tushgan arizalar',
                    value: `${regionData.users_count}`,
                },
                {
                    label: 'Moderatsiyadagi arizalar',
                    value: `${regionData.male_count}`,
                },
                {
                    label: 'Qabul qilingan',
                    value: `${regionData.female_count}`,
                },
                {
                    label: 'Sohalar bo‘yicha ishlanmalar',
                    value: `${regionData.less40_count}`,
                },
            ]);
        } else {
            setRegionStats([
                {
                    label: 'Kelib tushgan arizalar',
                    value: '0',
                },
                { label: 'Moderatsiyadagi arizalar', value: '0' },
                {
                    label: 'Qabul qilingan',
                    value: '0',
                },
                {
                    label: 'Sohalar bo‘yicha ishlanmalar',
                    value: '0',
                },
            ]);
        }
    }, [selectedRegion, data]);

    return (
        <div className="py-12">
            <Card
                title={
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900">
                            Hududlar bo‘yicha maʼlumotlar
                        </div>
                    </div>
                }
                bodyStyle={{ padding: '24px' }}
            >
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
            </Card>
        </div>
    );
};

export default InformationRegion;
