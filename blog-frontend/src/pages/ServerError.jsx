import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="hero-badge">500 • Server error</div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Something went wrong</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          We’re experiencing issues on our end. Please try again shortly.
        </p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/posts" className="btn btn-ghost">Back to Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
