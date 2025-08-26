import { useState, useEffect, useMemo } from 'react';
import MapContainer from './cards/MapContainer';
import RegionsGrid from './cards/RegionsGrid';
import { Card } from 'antd';
import { useStatisticsQuery } from '../hooks/useStatisticsQuery';

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
    const { data: statisticsData, isLoading } = useStatisticsQuery();
    const [selectedRegion, setSelectedRegion] = useState<string>('TN'); // Default to Andijon
    const [regionStats, setRegionStats] = useState<
        { label: string; value: string }[]
    >([]);

    // Mapping between map region codes and data region codes
    const regionCodeMapping = useMemo(
        () => ({
            AN: 1703, // Andijon viloyati
            BX: 1706, // Buxoro viloyati
            JZ: 1708, // Jizzax viloyati
            QD: 1710, // Qashqadaryo viloyati
            NV: 1712, // Navoiy viloyati
            NM: 1714, // Namangan viloyati
            SN: 1718, // Samarqand viloyati
            SD: 1722, // Surxondaryo viloyati
            SR: 1724, // Sirdaryo viloyati
            TN: 1726, // Toshkent shahri
            TV: 1727, // Toshkent viloyati
            FR: 1730, // Farg'ona viloyati
            XR: 1733, // Xorazm viloyati
            QR: 1735, // Qoraqalpog'iston Respublikasi
        }),
        []
    );

    const RegionStatisticsLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div
                    key={idx}
                    className="h-20 animate-pulse rounded-lg bg-gray-100 border border-gray-200"
                />
            ))}
        </div>
    );

    const getRegionName = (regionCode: string) => {
        const numericCode =
            regionCodeMapping[regionCode as keyof typeof regionCodeMapping];
        if (!numericCode) return 'Maʼlumot yoʻq';

        const region = statisticsData?.regions?.find(
            (r) => r.code === numericCode
        );
        return region ? String(region.name.uz) : 'Maʼlumot yoʻq';
    };

    useEffect(() => {
        const numericCode =
            regionCodeMapping[selectedRegion as keyof typeof regionCodeMapping];
        if (!numericCode) return;

        const regionData = statisticsData?.regions?.find(
            (r) => r.code === numericCode
        );

        if (regionData) {
            setRegionStats([
                {
                    label: 'Kelib tushgan arizalar',
                    value: `${regionData.draft}`,
                },
                {
                    label: 'Moderatsiyadagi arizalar',
                    value: `${regionData.submitted}`,
                },
                {
                    label: 'Qabul qilingan',
                    value: `${regionData.approved}`,
                },
                {
                    label: 'Bekor qilingan',
                    value: `${regionData.rejected}`,
                },
            ]);
        } else {
            setRegionStats([
                {
                    label: 'Kelib tushgan arizalar',
                    value: '0',
                },
                {
                    label: 'Moderatsiyadagi arizalar',
                    value: '0',
                },
                {
                    label: 'Qabul qilingan',
                    value: '0',
                },
                {
                    label: 'Bekor qilingan',
                    value: '0',
                },
            ]);
        }
    }, [selectedRegion, statisticsData, regionCodeMapping]);

    return (
        <div className="py-12">
            <Card
                title={
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900">
                            Hududlar boʻyicha maʼlumotlar
                        </div>
                    </div>
                }
                style={{ padding: '24px' }}
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
                        {isLoading ? (
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
