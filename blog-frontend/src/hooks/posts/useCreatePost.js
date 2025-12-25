import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../../services/posts';
import { useNavigate } from 'react-router-dom';
import { handleValidationErrors } from '../../utils/formUtils';
import toast from 'react-hot-toast';



const useCreatePost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: postsApi.create,
        onSuccess: () => {
            toast.success('Post created successfully');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate('/posts');
        },
        onError: (error) => {
            const handled = handleValidationErrors(error, setError);
            if (!handled) {
                toast.error(error.response?.data?.message || 'Failed to create post');
            }
        }
    });
}

export default useCreatePost
