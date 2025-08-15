import { message } from 'antd';
import { useMutation } from './useQuery';
import { searchAuthorApi } from '../api/requests/authorSearchApi';
import { searchOrganizationApi } from '../api/requests/organisationSearchApi';

export const useSearchAuthorMutate = () => {
    const mutate = useMutation({
        mutationFn: async (science_id: string) => {
            return await searchAuthorApi.getAuthor(science_id);
        },
        onSuccess: () => {
            message.success('Muallif topildi');
        },
        onError: () => {
            message.error('Muallif topilmadi');
        },
    });

    return mutate;
};

export const useSearchOrganizationMutate = () => {
    const mutate = useMutation({
        mutationFn: async (tin: number) => {
            return await searchOrganizationApi.getOrganization({ tin });
        },
        onSuccess: () => {
            message.success('Tashkilot topildi');
        },
        onError: () => {
            message.error('Tashkilot topilmadi');
        },
    });

    return mutate;
};
