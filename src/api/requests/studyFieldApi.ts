import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { StudyFieldType } from '../../types/studyField/studyFieldType';

const urls = {
    getStudyFields: '/api/v1/classification/science-fields/',
};

export class StudyFieldAPI {
    constructor(private api = baseApiClient) {}

    getStudyFields = async () => {
        const result: AxiosResponse<StudyFieldType> = await this.api.get(
            urls.getStudyFields
        );
        return result.data;
    };
}

export const studyFieldApi = new StudyFieldAPI();
