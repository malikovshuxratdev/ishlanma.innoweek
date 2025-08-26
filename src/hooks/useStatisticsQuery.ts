import statisticsApi from '../api/requests/statisticsApi';
import { useQuery } from './useQuery';

export const useStatisticsQuery = () => {
    return useQuery({
        queryKey: ['statisticsData'],
        queryFn: async () => {
            return await statisticsApi.getStatisticsData();
        },
    });
};
