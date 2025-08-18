import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient.ts';
import {
    ApplicationResponse1Form,
    ApplicationSubmitRequest1Form,
    ApplicationSubmitRequest2Form,
} from '../../types/applicationSubmit/applicationSubmitType.ts';
import { TokenService } from '../../utils/storage.ts';
import { GetApplication1 } from '../../types/applicationSubmit/applicationSubmitOne.ts';

const urls = {
    applicationSubmission1: '/api/v1/application/submit/',
    applicationSubmission2: (application_id: number) =>
        `/api/v1/application/${application_id}/property/`,
};

export class ApplicationSubmitApi {
    constructor(private api = baseApiClient) {}

    applicationSubmission1 = async (body: ApplicationSubmitRequest1Form) => {
        const result: AxiosResponse<ApplicationResponse1Form> =
            await this.api.post(urls.applicationSubmission1, body);
        return result.data;
    };

    applicationSubmission2 = async (
        application_id: number,
        body: ApplicationSubmitRequest2Form
    ) => {
        const result: AxiosResponse<ApplicationResponse1Form> =
            await this.api.post(
                urls.applicationSubmission2(application_id),
                body
            );
        return result.data;
    };

    getApplication1 = async () => {
        const url = TokenService.getApplication1();
        if (!url) {
            throw new Error('Application URL not found in TokenService');
        }

        const result: AxiosResponse<GetApplication1> = await this.api.get<
            GetApplication1,
            any,
            any
        >(url);
        return result.data;
    };
}

export const applicationSubmitApi = new ApplicationSubmitApi();
