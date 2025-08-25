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

export const useGetApplicationByIdQuery = (id: number) => {
    return useQuery({
        queryKey: ['getApplicationById', id],
        queryFn: async () => {
            return await applicationGetApi.getApplicationById(id);
        },
    });
};

export const useGetAllApplicationsQuery = () => {
    return useQuery({
        queryKey: ['getAllApplications'],
        queryFn: async () => {
            return await applicationGetApi.getAllApplications();
        },
    });
};
