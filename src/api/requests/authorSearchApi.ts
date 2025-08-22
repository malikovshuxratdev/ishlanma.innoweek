import { AxiosResponse } from 'axios';
import { AuthorAssignType } from '../../types/admin-assign/adminAssiginTpe.ts';
import { baseApiClient } from '../baseClient.ts';

const urls = {
    getAuthor: (science_id: string) =>
        `/api/v1/user/by-scienceid/${science_id}/`,
    deleteAuthor: (author_id: number, intellectual_property_id: number) =>
        `/api/v1/application/${intellectual_property_id}/${author_id}/delete`,
};

export class SearchAuthorApi {
    constructor(private api = baseApiClient) {}

    getAuthor = async (science_id: string) => {
        const result: AxiosResponse<AuthorAssignType> = await this.api.post(
            urls.getAuthor(science_id)
        );
        return result.data;
    };

    deleteAuthor = async (
        author_id: number,
        intellectual_property_id: number
    ) => {
        const result: AxiosResponse<any> = await this.api.delete(
            urls.deleteAuthor(author_id, intellectual_property_id)
        );
        return result.data;
    };
}

export const searchAuthorApi = new SearchAuthorApi();
