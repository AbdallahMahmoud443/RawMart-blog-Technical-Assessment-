import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../../services/posts";


const useGetPost = (id, isEditMode) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => postsApi.getOne(id),
        enabled: isEditMode,
    })
}
// Fetch post data if in edit mode
export default useGetPost;