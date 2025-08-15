import { AxiosResponse } from 'axios';
import { OrganizationType } from '../../types/admin-assign/adminAssiginTpe.ts';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getOrganization: `/api/v1/organization/legal-entity/`,
};

interface OrganizationRequest {
    tin: number;
}

export class SearchOrganizationApi {
    constructor(private api = baseApiClient) {}

    getOrganization = async (body: OrganizationRequest) => {
        const result: AxiosResponse<OrganizationType> = await this.api.post(
            urls.getOrganization,
            body
        );
        return result.data;
    };
}

export const searchOrganizationApi = new SearchOrganizationApi();
