import { baseApiClient } from '../baseClient';

const urls = {
    create: '/api/v1/upload/file/',
};

interface UploadFileResponse {
    id: number;
    file: string;
}

export class UploadFileAPI {
    constructor(private api = baseApiClient) {}

    create = async (body: FormData): Promise<UploadFileResponse> => {
        const result = await this.api.post(urls.create, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return result.data as UploadFileResponse;
    };
}

export const uploadFileApi = new UploadFileAPI();
