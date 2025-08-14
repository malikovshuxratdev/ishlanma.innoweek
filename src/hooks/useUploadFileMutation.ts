import { uploadFileApi } from '../api/requests/uploadFile';
import { useMutation } from './useQuery';

export const useUploadFileMutation = () => {
    const mutate = useMutation({
        mutationFn: async (body: FormData) => {
            return await uploadFileApi.create(body);
        },
    });
    return mutate;
};
