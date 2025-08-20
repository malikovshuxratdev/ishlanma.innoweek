import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient.ts';
import {
    ApplicationResponse,
    ApplicationSubmitRequest1Form,
    ApplicationSubmitRequest2Form,
    ApplicationSubmitRequest3Form,
    ApplicationSubmitRequest4Form,
    ApplicationSubmitRequest5Form,
} from '../../types/applicationSubmit/applicationSubmitType.ts';
import { TokenService } from '../../utils/storage.ts';
import { GetApplication1 } from '../../types/applicationSubmit/applicationSubmitOne.ts';

const urls = {
    applicationSubmission1: '/api/v1/application/submit/',
    applicationSubmission2: (application_id: number) =>
        `/api/v1/application/${application_id}/property/`,
    applicationSubmission3: (application_id: number) =>
        `/api/v1/application/${application_id}/research/`,
    applicationSubmission4: (application_id: number) =>
        `/api/v1/application/${application_id}/additional/`,
    applicationSubmission5: (application_id: number) =>
        `/api/v1/application/${application_id}/finance/`,
};

export class ApplicationSubmitApi {
    constructor(private api = baseApiClient) {}

    applicationSubmission1 = async (body: ApplicationSubmitRequest1Form) => {
        const result: AxiosResponse<ApplicationResponse> = await this.api.post(
            urls.applicationSubmission1,
            body
        );
        return result.data;
    };

    applicationSubmission2 = async (
        application_id: number,
        body: ApplicationSubmitRequest2Form
    ) => {
        const result: AxiosResponse<ApplicationResponse> = await this.api.post(
            urls.applicationSubmission2(application_id),
            body
        );
        return result.data;
    };

    applicationSubmission3 = async (
        application_id: number,
        body: ApplicationSubmitRequest3Form
    ) => {
        const result: AxiosResponse<ApplicationResponse> = await this.api.post(
            urls.applicationSubmission3(application_id),
            body
        );
        return result.data;
    };

    applicationSubmission4 = async (
        application_id: number,
        body: ApplicationSubmitRequest4Form
    ) => {
        const result: AxiosResponse<ApplicationResponse> = await this.api.post(
            urls.applicationSubmission4(application_id),
            body
        );
        return result.data;
    };

    applicationSubmission5 = async (
        application_id: number,
        body: ApplicationSubmitRequest5Form
    ) => {
        const result: AxiosResponse<ApplicationResponse> = await this.api.post(
            urls.applicationSubmission5(application_id),
            body
        );
        return result.data;
    };

    getApplication = async () => {
        const url = TokenService.getApplication();
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
