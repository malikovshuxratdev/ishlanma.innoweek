import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getExternalCode: (code: string) => `/api/v1/external/code/${code}/`,
};

export class ExternalCodeApi {
    constructor(private api = baseApiClient) {}

    getExternalCode = async (code: string) => {
        const result: AxiosResponse<any> = await this.api.post(
            urls.getExternalCode(code)
        );
        return result.data;
    };
}

export const externalCodeApi = new ExternalCodeApi();
