import useUpdateComment from '../hooks/comments/useUpdateComment';
import useDeleteComment from '../hooks/comments/useDeleteComment';
import { useState } from 'react';
import getImageUrl from '../utils/imageUrl';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';


const CommentItem = ({ comment, postId }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { content: comment.content }
    });

    const isOwner = user && comment.author?.id === user.id;
    const UpdateCommentHook = useUpdateComment(postId, comment.id);
    const DeleteCommentHook = useDeleteComment(postId);


    const onUpdate = (data) => {
        UpdateCommentHook.mutate({ data: data.content }, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };
    const handleDelete = () => {
        if (window.confirm('Delete this comment?')) {
            DeleteCommentHook.mutate(comment.id);
        }
    };

    return (
        <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {comment.author?.image ? <img src={getImageUrl(comment.author?.image)} alt={comment.author?.name || 'Author'} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : comment.author?.name?.charAt(0)}

                    </div>
                    <div>
                        <div style={{ fontWeight: '600' }}>{comment.author?.name || 'Unknown'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Create At: {new Date(comment.created_at).toLocaleDateString()}
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit(onUpdate)} style={{ marginTop: '1rem' }}>
                    <div className="input-group" style={{ marginBottom: '0.5rem' }}>
                        <textarea
                            {...register('content', { required: 'Comment cannot be empty' })}
                            style={{ minHeight: '80px' }}
                            name='content'
                        />
                        {errors.content && <p className="error-msg">{errors.content.message}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div style={{ paddingLeft: '40px' }}>
                    <p style={{ marginTop: '0.25rem', marginBottom: '0.5rem', lineHeight: '1.5' }}>{comment.content}</p>

                    {isOwner && (
                        <div className="flex gap-2" style={{ fontSize: '0.85rem' }}>
                            <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: 0, fontWeight: '500' }}>Edit</button>
                            <button onClick={handleDelete} style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: 0, fontWeight: '500' }}>Delete</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default CommentItem;
