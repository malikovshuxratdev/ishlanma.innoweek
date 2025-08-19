import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getExternalCode: (code: string) => `/api/v1/external/code/${code}/`,
};

export interface ExternalCodeResponse {
    id: number;
    cipher: string;
    competition_name: string;
    tour_status: boolean;
    tour_deadline: number;
    tour_name: string;
    tour_type: string;
    price: string;
    phd: string;
    dsc: string;
    science: string;
    sub_science: string;
    ministry: string;
    organization: string;
    fio: string;
    phone: string;
    status: string;
}

export class ExternalCodeApi {
    constructor(private api = baseApiClient) {}

    getExternalCode = async (code: string) => {
        const result: AxiosResponse<ExternalCodeResponse> = await this.api.post(
            urls.getExternalCode(code)
        );
        return result.data;
    };
}

export const externalCodeApi = new ExternalCodeApi();
