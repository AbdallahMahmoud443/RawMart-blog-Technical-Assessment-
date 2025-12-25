import { useQueryClient, useMutation } from "@tanstack/react-query";
import { commentsApi } from "../../services/comments";
import toast from "react-hot-toast";
import { handleValidationErrors } from "../../utils/formUtils";

const useUpdateComment = (postId, commentId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return commentsApi.update(commentId, { "content": data.data });
        },
        onSuccess: () => {
            toast.success('Comment updated');
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
        onError: (error) => {
            const handled = handleValidationErrors(error, setError);
            if (!handled) {
                toast.error('Failed to update comment');
            }
        }
    });
}

export default useUpdateComment;