import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postsApi } from "../../services/posts";

const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postsApi.delete,
        onSuccess: () => {
            toast.success('Post deleted');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post');
        }
    });
}
export default useDeletePost;
