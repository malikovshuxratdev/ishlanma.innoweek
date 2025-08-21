import { message } from 'antd';
import { applicationSubmitApi } from '../api/requests/applicationSubmit';
import {
    ApplicationSubmitRequest1Form,
    ApplicationSubmitRequest2Form,
    ApplicationSubmitRequest3Form,
    ApplicationSubmitRequest4Form,
    ApplicationSubmitRequest5Form,
} from '../types/application-submit/applicationSubmitType';
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

export const useApplicationSubmit3Mutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            application_id,
            body,
        }: {
            application_id: number;
            body: ApplicationSubmitRequest3Form;
        }) => {
            return await applicationSubmitApi.applicationSubmission3(
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

export const useApplicationSubmit4Mutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            application_id,
            body,
        }: {
            application_id: number;
            body: ApplicationSubmitRequest4Form;
        }) => {
            return await applicationSubmitApi.applicationSubmission4(
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

export const useApplicationSubmit5Mutate = () => {
    const mutate = useMutation({
        mutationFn: async ({
            application_id,
            body,
        }: {
            application_id: number;
            body: ApplicationSubmitRequest5Form;
        }) => {
            return await applicationSubmitApi.applicationSubmission5(
                application_id,
                body
            );
        },
        onSuccess: () => {
            message.success('Ariza muvaffaqiyatli yuborildi');
            TokenService.clearApplication();
            TokenService.clearApplicationStep();
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
