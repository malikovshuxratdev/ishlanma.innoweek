import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { GetMyApplicationType } from '../../types/get-application/getApplicationType';
import { GetByIdMyApplicationType } from '../../types/get-application/getByIdApplicationType';
import { GetAllApplicationsType } from '../../types/get-application/getAllApplicationsType';

const urls = {
    getMyApplication: '/api/v1/application/mine',
    getApplicationById: (id: number) => `/api/v1/application/${id}/detail`,
    getAllApplications: '/api/v1/project/list',
};

export class ApplicationGetApi {
    constructor(private api = baseApiClient) {}

    getMyApplications = async () => {
        const result: AxiosResponse<GetMyApplicationType> = await this.api.get(
            urls.getMyApplication
        );
        return result.data;
    };

    getApplicationById = async (id: number) => {
        const result: AxiosResponse<GetByIdMyApplicationType> =
            await this.api.get(urls.getApplicationById(id));
        return result.data;
    };

    getAllApplications = async () => {
        const result: AxiosResponse<GetAllApplicationsType> =
            await this.api.get(urls.getAllApplications);
        return result.data;
    };
}

export const applicationGetApi = new ApplicationGetApi();
