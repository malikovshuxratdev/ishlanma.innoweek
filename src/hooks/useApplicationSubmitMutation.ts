import { message } from 'antd';
import { applicationSubmitApi } from '../api/requests/applicationSubmit';
import {
    ApplicationSubmitRequest1Form,
    ApplicationSubmitRequest2Form,
} from '../types/applicationSubmit/applicationSubmitType';
import { useMutation, useQuery } from './useQuery';
import { TokenService } from '../utils/storage';

export const useApplicationSubmit1Mutate = () => {
    const mutate = useMutation({
        mutationFn: async (body: ApplicationSubmitRequest1Form) => {
            return await applicationSubmitApi.applicationSubmission1(body);
        },
        onSuccess: (data) => {
            message.success("Keyingi qadamga o'tildi");
            TokenService.setApplication(data.detail);
        },
        onError: () => {
            message.error('Ariza yuborishda xato');
        },
    });

    return mutate;
};

export const useApplicationSubmit2Mutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            application_id,
            body,
        }: {
            application_id: number;
            body: ApplicationSubmitRequest2Form;
        }) => {
            return await applicationSubmitApi.applicationSubmission2(
                application_id,
                body
            );
        },
        onSuccess: (data) => {
            message.success("Keyingi qadamga o'tildi");
            TokenService.setApplication(data.detail);
        },
        onError: () => {
            message.error('Ariza yuborishda xato');
        },
    });

    return mutate;
};

export const useGetApplication = () => {
    return useQuery({
        queryKey: ['getApplication'],
        queryFn: async () => {
            return await applicationSubmitApi.getApplication();
        },
    });
};
