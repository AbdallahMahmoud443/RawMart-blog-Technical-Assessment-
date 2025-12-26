import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import getImageUrl from '../utils/imageUrl';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';
  return (
    <header>
      <nav className="nav container">
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>
          Rawmart Blog
        </Link>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Link to="/posts" className={'btn btn-primary'}>Posts</Link>
              <Link to="/posts/create" className={isActive('/posts/create')}>Create Post</Link>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }}></div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
                {user?.image && (
                  <img
                    src={getImageUrl(user.image)}
                    alt={user?.name || 'User'}
                    style={{ width: '28px', height: '28px', borderRadius: '9999px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                  />
                )}
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {user?.name?.charAt(0).toUpperCase() + user?.name.slice(1).toLowerCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')}>Login</Link>
              <Link to="/register" className={isActive('/register')}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
