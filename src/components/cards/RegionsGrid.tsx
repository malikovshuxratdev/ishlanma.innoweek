import { useStatisticsQuery } from '../../hooks/useStatisticsQuery';

interface Region {
    code: number;
    name: { uz: string; ru: string };
    draft: number;
    submitted: number;
    approved: number;
    rejected: number;
}

const RegionsGrid = () => {
    const { data: statisticsData, isLoading } = useStatisticsQuery();

    // Calculate totals
    const totals = statisticsData?.regions?.reduce(
        (acc, region) => ({
            draft: acc.draft + region.draft,
            submitted: acc.submitted + region.submitted,
            approved: acc.approved + region.approved,
            rejected: acc.rejected + region.rejected,
        }),
        { draft: 0, submitted: 0, approved: 0, rejected: 0 }
    ) || { draft: 0, submitted: 0, approved: 0, rejected: 0 };

    const totalApplications =
        totals.draft + totals.submitted + totals.approved + totals.rejected;

    return (
        <div className="p-4 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold mb-3 px-1">
                Hududlar statistikasi
            </h2>

            <div className="flex flex-col space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {statisticsData?.regions?.map((region) => (
                    <div
                        key={region.code}
                        className="flex justify-between items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {region.name.uz}
                        </span>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                                {region.draft +
                                    region.submitted +
                                    region.approved +
                                    region.rejected}{' '}
                                ta
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionsGrid;
