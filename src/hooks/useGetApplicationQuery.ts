import { applicationGetApi } from '../api/requests/applicationGetApi';
import { useQuery } from './useQuery';

export const useGetMyApplicationQuery = () => {
    return useQuery({
        queryKey: ['getMyApplication'],
        queryFn: async () => {
            return await applicationGetApi.getMyApplications();
        },
    });
};
