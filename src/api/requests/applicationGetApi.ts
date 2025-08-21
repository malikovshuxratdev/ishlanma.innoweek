import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { GetMyApplicationType } from '../../types/get-application/getApplicationType';

const urls = {
    getMyApplication: '/api/v1/application/mine',
};

export class ApplicationGetApi {
    constructor(private api = baseApiClient) {}

    getMyApplications = async () => {
        const result: AxiosResponse<GetMyApplicationType> = await this.api.get(
            urls.getMyApplication
        );
        return result.data;
    };
}

export const applicationGetApi = new ApplicationGetApi();
