import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { handleValidationErrors } from '../utils/formUtils';

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/posts');
        } catch (error) {
            const handled = handleValidationErrors(error, setError);
            if (!handled) {
                setError('root', {
                    type: 'manual',
                    message: error.response?.data?.message || 'Login failed. Please check your credentials.'
                });
            }
        }
    };
    return (
        <div className="auth-container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>Welcome Back</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card" method='POST'>
                {errors.root && (
                    <div className="alert alert-danger">
                        {errors.root.message}
                    </div>
                )}
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="error-msg">{errors.password.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem' }}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                Don't have an account? <Link to="/register" style={{ fontWeight: '600' }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
