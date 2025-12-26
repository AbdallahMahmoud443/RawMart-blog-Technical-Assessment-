import { useQueryClient, useMutation } from "@tanstack/react-query";
import { commentsApi } from "../../services/comments";
import toast from "react-hot-toast";
import { handleValidationErrors } from "../../utils/formUtils";

const useCreateComment = (postId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: commentsApi.create,
        onSuccess: () => {
            toast.success('Comment added');
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
        onError: (error) => {
            const handled = handleValidationErrors(error, setError);
            if (!handled) {
                toast.error('Failed to add comment');
            }
        }
    });
}

export default useCreateComment;
