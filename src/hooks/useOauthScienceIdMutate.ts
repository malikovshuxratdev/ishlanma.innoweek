import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import oauthScienceIdApi from '../api/requests/oauthScienceIdApi';
import {
    ConfirmOneIdBody,
    UserProfileResponse,
} from '../types/oauthScienceIdType';
import { TokenService } from '../utils/storage';
import { useQuery } from './useQuery';

export const useOauthScienceId = () => {
    const mutate = useMutation({
        mutationFn: async () => {
            return await oauthScienceIdApi.oauthScienceId();
        },
        onSuccess: (data) => {
            if (data.status) {
                window.location.href = data.data.login_url;
            }
        },
        onError: (error) => {
            console.error('Error signing up with One ID:', error);
        },
    });

    return mutate;
};

export const useLoginScienceId = () => {
    const navigate = useNavigate();

    const mutate = useMutation({
        mutationFn: async ({ code }: ConfirmOneIdBody) => {
            return await oauthScienceIdApi.confirmCode({ code });
        },
        onSuccess: (data) => {
            TokenService.setToken(data.data.access, data.data.refresh);
            if (data.data.access) {
                navigate('/');
            }
        },
        onError: (error) => {
            console.error('Error confirming code:', error);
        },
    });

    return mutate;
};

export const useUserProfileQuery = () => {
    const token = TokenService.getToken();
    return useQuery<UserProfileResponse>({
        queryKey: ['userProfile'],
        queryFn: () => oauthScienceIdApi.getUserProfile(),
        enabled: !!token,
    });
};

export const useLogOut = () => {
    const navigate = useNavigate();
    const mutate = useMutation({
        mutationFn: async () => {
            return await oauthScienceIdApi.userLogOut();
        },
        onSuccess: () => {
            TokenService.clearTokens();
        },
    });

    const logOut = () => {
        navigate('/');
        mutate.mutate();
    };

    return logOut;
};
