import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { handleValidationErrors } from '../utils/formUtils';

const Register = () => {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirm_password', data.password_confirmation); // Backend expects confirm_password
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await registerUser(formData);
      navigate('/posts'); // Auto-login handles the token, so we go straight to posts
    } catch (error) {
      const handled = handleValidationErrors(error, setError);
      if (!handled) {
        setError('root', {
          type: 'manual',
          message: error.response?.data?.message || 'Registration failed. Please try again.'
        });
      }
    }
  };
  const password = watch('password');

  return (
    <div className="auth-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card" encType="multipart/form-data">
        {errors.root && (
          <div className="alert alert-danger">
            {errors.root.message}
          </div>
        )}

        <div className="input-group">
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: 'Profile image is required' })}
            style={{ padding: '0.5rem' }}
          />
          {errors.image && <p className="error-msg">{errors.image.message}</p>}
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            placeholder="John Doe"
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="you@example.com"
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            placeholder="••••••••"
          />
          {errors.password && <p className="error-msg">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('password_confirmation', {
              validate: value => value === password || "The passwords do not match"
            })}
            placeholder="••••••••"
          />
          {errors.password_confirmation && <p className="error-msg">{errors.password_confirmation.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem' }}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
