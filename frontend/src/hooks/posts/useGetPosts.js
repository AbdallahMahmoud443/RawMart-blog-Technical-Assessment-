import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../../services/posts';

const useGetPosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: postsApi.getAll
    });
}
export default useGetPosts
