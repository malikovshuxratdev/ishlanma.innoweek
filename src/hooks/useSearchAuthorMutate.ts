import { message } from 'antd';
import { useMutation } from './useQuery';
import { searchAuthorApi } from '../api/requests/authorSearchApi';
import { searchOrganizationApi } from '../api/requests/organisationSearchApi';
import { externalCodeApi } from '../api/requests/externalCodeApi';

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

export const useDeleteAuthorMutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            author_id,
            intellectual_property_id,
        }: {
            author_id: number;
            intellectual_property_id: number;
        }) => {
            return await searchAuthorApi.deleteAuthor(
                author_id,
                intellectual_property_id
            );
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

export const useDeleteOrganizationMutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            additional_info_id,
            organization_id,
        }: {
            additional_info_id: number;
            organization_id: number;
        }) => {
            return await searchOrganizationApi.deleteOrganization(
                additional_info_id,
                organization_id
            );
        },
    });
    return mutate;
};

export const useSearchExternalCodeMutate = () => {
    const mutate = useMutation({
        mutationFn: async (code: string) => {
            return await externalCodeApi.getExternalCode(code);
        },
        onSuccess: () => {},
        onError: () => {},
    });

    return mutate;
};
