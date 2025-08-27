import { useMemo, useState } from 'react';
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
    const [params, setParams] = useState<{
        page: number;
        size: number;
        search: string;
    }>({
        page: 1,
        size: 10,
        search: '',
    });

    const query = useQuery({
        queryKey: ['all-applications', params],
        queryFn: async () => {
            return await applicationGetApi.getAllApplications(params);
        },
        enabled: true,
    });

    const resData = useMemo(() => query.data?.results || [], [query.data]);

    const pagination = useMemo(
        () => ({
            pageIndex: query.data?.current_page || 1,
            pageSize: query.data?.page_size || params.size,
            total: query.data?.total || 0,
            totalPages: query.data?.total_pages || 1,
        }),
        [query.data, params.size]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (size: number) => {
        setParams((prev) => ({ ...prev, size, page: 1 })); // Reset to first page when changing page size
    };

    const setSearch = (search: string) => {
        setParams((prev) => ({ ...prev, search, page: 1 })); // Reset to first page when searching
    };

    return {
        ...query,
        params,
        resData,
        pagination,
        setPage,
        setPageSize,
        setSearch,
    };
};

export const useGetAllApplicationsByIdQuery = (id: number) => {
    return useQuery({
        queryKey: ['getAllApplicationsById', id],
        queryFn: async () => {
            return await applicationGetApi.getAllApplicationsById(id);
        },
    });
};
