import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { StudyFieldType } from '../../types/studyField/studyFieldType';

const urls = {
    getMyApplication: '/api/v1/application/mine',
};

export class ApplicationGetApi {
    constructor(private api = baseApiClient) {}

    getMyApplications = async () => {
        const result: AxiosResponse<StudyFieldType> = await this.api.get(
            urls.getMyApplication
        );
        return result.data;
    };
}

export const applicationGetApi = new ApplicationGetApi();
