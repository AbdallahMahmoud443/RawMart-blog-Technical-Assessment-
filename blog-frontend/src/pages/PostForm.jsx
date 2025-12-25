import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useCreatePost from '../hooks/posts/useCreatePost';
import useUpdatePost from '../hooks/posts/useUpdatePost';
import useGetPost from '../hooks/posts/useGetPost';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

  const CreatePostHook = useCreatePost();
  const { data: postData, isLoading } = useGetPost(id, isEditMode);
  const UpdatePostHook = useUpdatePost(id);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const onSubmit = (data) => {
    if (tags.length === 0) {
      toast.error('At least one tag is required');
      return;
    }
    const payload = { ...data, tags };
    if (isEditMode) {
      UpdatePostHook.mutate(payload);
    } else {
      CreatePostHook.mutate(payload);
    }
  };

  useEffect(() => {
    if (postData?.data?.data) {
      const post = postData.data.data;
      setValue('title', post.title);
      setValue('body', post.body);
      const loadedTags = post.tags ? post.tags.map(t => t.name || t) : [];
      setTags(loadedTags);
    }
  }, [postData, setValue]);

  if (isEditMode && isLoading) return <div>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        {isEditMode ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter a catchy title..."
          />
          {errors.title && <p className="error-msg">{errors.title.message}</p>}
        </div>

        <div className="input-group">
          <label>Content</label>
          <textarea
            {...register('body', { required: 'Content is required' })}
            style={{ minHeight: '200px' }}
            placeholder="Write your story here..."
          />
          {errors.body && <p className="error-msg">{errors.body.message}</p>}
        </div>

        <div className="input-group">
          <label>Tags</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(e);
                }
              }}
            />
            <button type="button" onClick={handleAddTag} className="btn">Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {tags.map(tag => (
              <span key={tag} className="tag" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', paddingRight: '0.25rem' }}>
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0 4px', fontSize: '1.2em', lineHeight: 1 }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {tags.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Add at least one tag (e.g. #tech, #life)</p>}
        </div>

        <div className="flex gap-2" style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting || CreatePostHook.isPending || UpdatePostHook.isPending}>
            {isEditMode ? 'Update Post' : 'Publish Post'}
          </button>
          <button type="button" onClick={() => navigate('/posts')} className="btn">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostForm;
