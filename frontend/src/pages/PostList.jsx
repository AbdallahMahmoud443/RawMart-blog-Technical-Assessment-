import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useGetPosts from '../hooks/posts/useGetPosts';
import PostItem from '../components/PostItem';

const PostList = () => {
  const { data, isLoading, error } = useGetPosts()
  const { user } = useAuth();
  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div className="error-msg">Error loading posts: {error.message}</div>;
  const posts = data?.data?.data || []; // API returns { data: [...] } in resource collection
  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h2>Recent Posts</h2>
        {user && (
          <Link to="/posts/create" className="btn btn-primary">Create Post</Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          {posts.map(post => (
            <PostItem key={post.id} post={post} currentUserId={user?.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
