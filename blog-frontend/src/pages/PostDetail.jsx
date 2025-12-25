import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Comments from '../components/Comments';
import getImageUrl from '../utils/imageUrl';
import useGetPost from '../hooks/posts/useGetPost';
import useDeletePost from '../hooks/posts/useDeletePost';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPost(id, true);
  const post = data?.data?.data;
  const useDeleteHook = useDeletePost();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  const isOwner = user && post.author?.id === user.id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      useDeleteHook.mutate(id, {
        onSuccess: () => {
          navigate('/posts');
        }
      });
    }
  };
  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link to="/posts" className="btn" style={{ marginBottom: '1.5rem' }}>&larr; Back to Feed</Link>
      <div className="card">

        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{post.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
            <div>
              <span className={`badge ${post?.expire_date ? 'badge-danger' : 'badge-success'}`}>
                {`Expire At: ${new Date(post.expire_date).toLocaleString()}`}
              </span>
            </div>
            <div >
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Create At:{new Date(post.created_at || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            <img src={getImageUrl(post.author?.image)} alt={post.author?.name || 'Author'} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>{post.author?.name || 'Unknown'}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Author</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          {post.tags && post.tags.map(tag => (
            <span key={tag.id || tag} className="tag">
              #{tag.name || tag}
            </span>
          ))}
        </div>

        <div style={{ lineHeight: '1.8', fontSize: '1.125rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
          {post.body}
        </div>

        {isOwner && (
          <div className="flex gap-2" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <Link to={`/posts/${id}/edit`} className="btn">Edit Post</Link>
            <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Comments postId={id} comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetail;
