import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import useCreateComment from '../hooks/comments/useCreateComment';
import CommentItem from './CommentItem';


const Comments = ({ postId, comments = [] }) => {
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const createCommentHook = useCreateComment(postId);
  const onSubmit = (data) => {
    createCommentHook.mutate({ content: data.content, post_id: postId }, {
      onSuccess: () => {
        reset();
      }
    });
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Comments</h3>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
          <textarea
            {...register('content', { required: 'Comment cannot be empty' })}
            placeholder="Write a comment..."
            style={{ width: '100%', padding: '10px', minHeight: '120px', backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
          />
          {errors.content && <p className="error-msg">{errors.content.message}</p>}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Add Comment
          </button>
        </form>
      ) : (
        <p>Please login to comment.</p>
      )}

      <div className="comments-list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
        {comments.length === 0 && <p>No comments yet.</p>}
      </div>
    </div>
  );
};

export default Comments;
