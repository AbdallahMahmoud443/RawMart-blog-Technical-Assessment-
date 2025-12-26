import { Link } from 'react-router-dom';
import useDeletePost from '../hooks/posts/useDeletePost';

const PostItem = ({ post, currentUserId }) => {
    const useDeleteHook = useDeletePost();
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            useDeleteHook.mutate(post.id);
        }
    };
    const isOwner = currentUserId && post.author?.id === currentUserId;
    return (
        <div className="card">
            <div className="flex justify-between items-start">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    <Link to={`/posts/${post.id}`} style={{ color: 'var(--text-primary)' }}>
                        {post.title}
                    </Link>
                </h3>
                <span className={`badge ${post.expire_date ? 'badge-danger' : 'badge-success'}`}>
                    {`Expire At: ${new Date(post.expire_date).toLocaleString()}`}
                </span>
            </div>
            <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                By <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{post.author?.name || 'Unknown'}</span>
            </div>
            <div style={{ margin: '1rem 0' }}>
                {post.tags && post.tags.map(tag => (
                    <span key={tag.id || tag} className="tag">
                        #{tag.name || tag}
                    </span>
                ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {post.body.substring(0, 150)}...
            </p>
            <div className="flex gap-2">
                <Link to={`/posts/${post.id}`} className="btn">Read More</Link>
                {isOwner && (
                    <>
                        <Link to={`/posts/${post.id}/edit`} className="btn">Edit</Link>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </>
                )}
            </div>

        </div>
    );
};
export default PostItem;