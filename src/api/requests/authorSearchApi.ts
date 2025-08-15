import { AxiosResponse } from 'axios';
import { AuthorAssignType } from '../../types/admin-assign/adminAssiginTpe.ts';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getAuthor: (science_id: string) =>
        `/api/v1/user/by-scienceid/${science_id}/`,
};

export class SearchAuthorApi {
    constructor(private api = baseApiClient) {}

    getAuthor = async (science_id: string) => {
        const result: AxiosResponse<AuthorAssignType> = await this.api.post(
            urls.getAuthor(science_id)
        );
        return result.data;
    };
}

export const searchAuthorApi = new SearchAuthorApi();
