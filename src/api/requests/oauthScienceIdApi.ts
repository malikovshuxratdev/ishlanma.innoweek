import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import {
    ConfirmOneIdBody,
    ConfirmOneIdResponse,
    OauthScienceIdBody,
    OauthScienceIdResponse,
    UserProfileResponse,
} from '../../types/oauthScienceIdType';

const OAUTH_URL = import.meta.env.VITE_OAUTH_URI;

const urls = {
    oauthScienceId: '/api/v1/auth/scienceid/oauth/url/',
    confirmCode: '/api/v1/auth/scienceid/oauth/login/',
    userProfile: '/api/v1/user/profile/',
};

export class OauthScienceIdAPI {
    constructor(private api = baseApiClient) {}

    async oauthScienceId(): Promise<OauthScienceIdResponse> {
        const body: OauthScienceIdBody = {
            redirect_url: OAUTH_URL,
        };
        const result: AxiosResponse<OauthScienceIdResponse> =
            await this.api.post(urls.oauthScienceId, body);
        return result.data;
    }

    async confirmCode(body: ConfirmOneIdBody): Promise<ConfirmOneIdResponse> {
        const result: AxiosResponse<ConfirmOneIdResponse> = await this.api.post(
            urls.confirmCode,
            body
        );
        return result.data;
    }

    async getUserProfile(): Promise<UserProfileResponse> {
        const result: AxiosResponse<UserProfileResponse> = await this.api.get(
            urls.userProfile
        );
        return result.data;
    }
}

export default new OauthScienceIdAPI();
