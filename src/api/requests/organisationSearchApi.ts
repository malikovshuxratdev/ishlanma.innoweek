import { AxiosResponse } from 'axios';
import { OrganizationType } from '../../types/admin-assign/adminAssiginTpe.ts';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getOrganization: `/api/v1/organization/legal-entity/`,
    deleteOrganization: (additional_info_id: number, organization_id: number) =>
        `/api/v1/application/${additional_info_id}/${organization_id}/delete`,
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

    deleteOrganization = async (
        additional_info_id: number,
        organization_id: number
    ) => {
        const result: AxiosResponse<any> = await this.api.delete(
            urls.deleteOrganization(additional_info_id, organization_id)
        );
        return result.data;
    };
}

export const searchOrganizationApi = new SearchOrganizationApi();
