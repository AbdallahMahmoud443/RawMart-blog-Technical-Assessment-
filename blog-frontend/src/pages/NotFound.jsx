import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <div  style={{ textAlign: 'center' }}>
        <div className="hero-badge">404 • Page not found</div>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>This page doesn’t exist</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          The link may be broken or the page may have been removed.
        </p>
        <div className="hero-actions">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/posts" className="btn btn-ghost">Browse Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
