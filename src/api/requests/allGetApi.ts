import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import {
    IndustryAffiliationsType,
    QualityLevelType,
} from '../../types/quality-levels/qualityLevelType';

const urls = {
    qualityLevels: '/api/v1/classification/quality-levels/',
    industryAffiliations: '/api/v1/classification/industry-affiliations/',
};

export class QualityLevelsAPI {
    constructor(private api = baseApiClient) {}

    getQualityLevels = async () => {
        const result: AxiosResponse<QualityLevelType> = await this.api.get(
            urls.qualityLevels
        );
        return result.data;
    };

    getIndustryAffiliations = async () => {
        const result: AxiosResponse<IndustryAffiliationsType> =
            await this.api.get(urls.industryAffiliations);
        return result.data;
    };
}

export const qualityLevelsApi = new QualityLevelsAPI();
