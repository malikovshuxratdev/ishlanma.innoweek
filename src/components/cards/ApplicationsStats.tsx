import React from 'react';

interface ApplicationStatsData {
    totalApplications: number; // Kelib tushgan arizalar soni
    moderationApplications: number; // Moderatsiya arizalar soni
    acceptedApplications: number; // Qabul qilingan arizalar soni
    sectorDevelopments: number; // Sohalar kesimida ishlanmalar soni
    regionDevelopments: number; // Hududlar kesimida ishlanmalar soni
}

// Vaqtinchalik mock ma'lumot (keyinchalik API dan olinadi)
const mockStats: ApplicationStatsData = {
    totalApplications: 345,
    moderationApplications: 58,
    acceptedApplications: 210,
    sectorDevelopments: 85,
    regionDevelopments: 120,
};

const statItems: { key: keyof ApplicationStatsData; label: string }[] = [
    { key: 'totalApplications', label: 'Kelib tushgan arizalar soni' },
    { key: 'moderationApplications', label: 'Moderatsiya arizalar soni' },
    { key: 'acceptedApplications', label: 'Qabul qilingan arizalar soni' },
    { key: 'sectorDevelopments', label: 'Sohalar kesimida ishlanmalar soni' },
    { key: 'regionDevelopments', label: 'Hududlar kesimida ishlanmalar soni' },
];

const StatCard = ({ label, value }: { label: string; value: number }) => (
    <div className="border border-gray-200 bg-white rounded-xl p-4 flex flex-col gap-1 hover:shadow-sm transition-shadow">
        <span className="text-gray-600 text-sm leading-snug">{label}</span>
        <span className="text-gray-900 text-xl font-semibold">{value}</span>
    </div>
);

const ApplicationsStats: React.FC<{
    data?: ApplicationStatsData;
    isLoading?: boolean;
}> = ({ data = mockStats, isLoading = false }) => {
    return (
        <div className="p-4 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 px-1">
                Arizalar statistikasi
            </h2>

            {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: statItems.length }).map((_, i) => (
                        <div
                            key={i}
                            className="h-20 animate-pulse rounded-xl bg-gray-100 border border-gray-200"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                    {statItems.map((item) => (
                        <StatCard
                            key={item.key}
                            label={item.label}
                            value={data[item.key]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsStats;
