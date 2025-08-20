import { qualityLevelsApi } from '../api/requests/allGetApi';
import { allRegionsApi } from '../api/requests/classificationSatoApi';
import { studyFieldApi } from '../api/requests/studyFieldApi';
import { useQuery } from './useQuery';

export const useAllRegionsQuery = () => {
    return useQuery({
        queryKey: ['getAllRegions'],
        queryFn: async () => {
            return await allRegionsApi.getRegions();
        },
    });
};

export const useStudyFieldsQuery = () => {
    return useQuery({
        queryKey: ['getStudyFields'],
        queryFn: async () => {
            return await studyFieldApi.getStudyFields();
        },
    });
};

export const useQualityLevelsQuery = () => {
    return useQuery({
        queryKey: ['getQualityLevels'],
        queryFn: async () => {
            return await qualityLevelsApi.getQualityLevels();
        },
    });
};

export const useIndustryAffiliationsQuery = () => {
    return useQuery({
        queryKey: ['getIndustryAffiliations'],
        queryFn: async () => {
            return await qualityLevelsApi.getIndustryAffiliations();
        },
    });
};
