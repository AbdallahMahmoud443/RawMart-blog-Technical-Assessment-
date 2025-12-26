import { useQueryClient, useMutation } from "@tanstack/react-query";
import { commentsApi } from "../../services/comments";
import toast from "react-hot-toast";

const useDeleteComment = (postId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: commentsApi.delete,
        onSuccess: () => {
            toast.success('Comment deleted');
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
        onError: (error) => {
            toast.error('Failed to delete comment');
        }
    });
}
export default useDeleteComment;
