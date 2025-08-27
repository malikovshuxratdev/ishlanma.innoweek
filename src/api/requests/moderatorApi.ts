import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { GetModeratorApplicationsType } from '../../types/moderator/getAllApplicationType';
import { GetByIdMyApplicationType } from '../../types/get-application/getByIdApplicationType';

const urls = {
    getModeratorApplications: '/api/v1/moderator/my-applications',
    getStatistics: '/api/v1/moderator/my-applications/stats/',
    getModeratorApplication: (id: number) =>
        `/api/v1/moderator/my-applications/${id}/detail`,
    applicationCheck: (id: number) =>
        `/api/v1/moderator/applications/${id}/check`,
};

export class ModeratorApi {
    constructor(private api = baseApiClient) {}

    getModeratorApplications = async (params: {
        code: string;
        page: number;
        page_size: number;
        search: string;
    }) => {
        const result: AxiosResponse<GetModeratorApplicationsType> =
            await this.api.get(urls.getModeratorApplications, params);
        return result.data;
    };

    getStatistics = async () => {
        const result: AxiosResponse<{
            submitted: number;
            approved: number;
            rejected: number;
        }> = await this.api.get(urls.getStatistics);
        return result.data;
    };

    getModeratorApplication = async (id: number) => {
        const result: AxiosResponse<GetByIdMyApplicationType> =
            await this.api.get(urls.getModeratorApplication(id));
        return result.data;
    };

    applicationCheck = async (
        id: number,
        body: { status: number; comment: string }
    ) => {
        const result: AxiosResponse<any> = await this.api.patch(
            urls.applicationCheck(id),
            body
        );
        return result.data;
    };
}

export const moderatorApi = new ModeratorApi();
