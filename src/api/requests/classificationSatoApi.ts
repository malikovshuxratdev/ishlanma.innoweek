import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { GetAllRegionsType } from '../../types/regions/regionsType';

const urls = {
    getAllRegions: '/api/v1/classification/soato/',
};

export class AllRegionsAPI {
    constructor(private api = baseApiClient) {}

    getRegions = async () => {
        const result: AxiosResponse<GetAllRegionsType> = await this.api.get(
            urls.getAllRegions
        );
        return result.data;
    };
}

export const allRegionsApi = new AllRegionsAPI();
