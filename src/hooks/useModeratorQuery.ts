import { useMemo, useState } from 'react';
import { useInfiniteQuery } from './useQuery';
import { moderatorApi } from '../api/requests/moderatorApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useModeratorApplicationQuery = () => {
    const [params, setParams] = useState<{
        code: string;
        page: number;
        page_size: number;
        search: string;
    }>({
        code: '',
        page: 1,
        page_size: 10,
        search: '',
    });

    const query = useInfiniteQuery({
        queryKey: ['moderator-applications', params],
        queryFn: async () => {
            return await moderatorApi.getModeratorApplications(params);
        },
        initialPageParam: params,
        getNextPageParam: (lastPage) => {
            if (lastPage?.current_page < lastPage?.total_pages) {
                return { ...params, page: lastPage?.current_page + 1 };
            }
            return undefined;
        },
    });

    const resData = useMemo(
        () =>
            query.data?.pages
                .filter(Boolean)
                .flatMap((page) => page?.results || []) || [],
        [query.data]
    );

    const pagination = useMemo(
        () => ({
            pageIndex:
                query.data?.pages[query.data.pages.length - 1]?.current_page ||
                1,
            pageSize: params.page_size,
            total: query.data?.pages[0]?.total || 0,
            totalPages:
                query.data?.pages[query.data.pages.length - 1]?.total_pages ||
                1,
        }),
        [params, query.data]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (size: number) => {
        setParams((prev) => ({ ...prev, page_size: size }));
    };

    const setSearch = (search: string) => {
        setParams((prev) => ({ ...prev, search }));
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

export const useModeratorStatisticsQuery = () => {
    return useQuery({
        queryKey: ['moderator-statistics'],
        queryFn: async () => {
            return await moderatorApi.getStatistics();
        },
    });
};

export const useGetModeratorApplicationQuery = (id: number) => {
    return useQuery({
        queryKey: ['moderator-application', id],
        queryFn: async () => {
            return await moderatorApi.getModeratorApplication(id);
        },
    });
};

export const useModeratorApplicationCheckQuery = () => {
    const mutate = useMutation({
        mutationFn: async ({
            id,
            body,
        }: {
            id: number;
            body: { status: number; comment: string };
        }) => {
            return await moderatorApi.applicationCheck(id, body);
        },
    });

    return mutate;
};
