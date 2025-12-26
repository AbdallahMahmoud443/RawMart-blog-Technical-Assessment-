import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../../services/posts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { handleValidationErrors } from '../../utils/formUtils';



const useUpdatePost = (id) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data) => postsApi.update(id, data),
        onSuccess: () => {
            toast.success('Post updated successfully');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post', id] });
            navigate(`/posts/${id}`);
        },
        onError: (error) => {
            const handled = handleValidationErrors(error, setError);
            if (!handled) {
                toast.error(error.response?.data?.message || 'Failed to update post');
            }
        }
    });
}

export default useUpdatePost