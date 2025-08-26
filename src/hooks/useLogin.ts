import { useCallback } from 'react';
import { useOauthScienceId } from './useOauthScienceIdMutate';

export const useLogin = () => {
    const { mutate } = useOauthScienceId();

    const handleLogin = useCallback(() => {
        mutate();
        console.log('Login initiated');
    }, [mutate]);

    return { handleLogin };
};
