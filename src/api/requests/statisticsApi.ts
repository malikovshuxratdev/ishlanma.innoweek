import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { DashboardStatistics } from '../../types/statistics/dashboardStatistics';

const urls = {
    getAll: '/api/v1/dashboard/statistics',
};

export class StatisticsAPI {
    constructor(private api = baseApiClient) {}

    getStatisticsData = async () => {
        const result: AxiosResponse<DashboardStatistics> = await this.api.get(
            urls.getAll
        );

        return result.data;
    };
}

export default new StatisticsAPI();
