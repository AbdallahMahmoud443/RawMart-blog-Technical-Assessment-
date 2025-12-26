import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <section className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
                <div className="hero-card">
                    <div className="hero-badge">
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#040D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                            </svg>
                        </span>
                        <span style={{ color: '#040D12' }}>Rawmart Blogging</span>
                    </div>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        letterSpacing: '-0.03em'
                    }}>
                        Share Ideas, Tell Stories, Inspire Others
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        A modern blog platform with <span className="highlight">JWT authentication</span>, <span className="highlight">tags</span>, and <span className="highlight">rich comments</span>. Posts <span className="highlight">auto-expire</span> after 24 hours with a clear UI indicator.
                    </p>
                    <div className="hero-actions">
                        {isAuthenticated ? (
                            <>
                                <Link to="/posts" className="btn btn-primary">
                                    <span className="btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 12h18"></path>
                                            <path d="M9 18l-6-6 6-6"></path>
                                        </svg>
                                    </span>
                                    Go to Feed
                                </Link>
                                <Link to="/posts/create" className="btn btn-ghost">
                                    <span className="btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                                        </svg>
                                    </span>
                                    Create Post
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn-primary">
                                    <span className="btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                        </svg>
                                    </span>
                                    Get Started
                                </Link>
                                <Link to="/posts" className="btn btn-ghost">
                                    <span className="btn-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </span>
                                    Explore Posts
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <section className="container" style={{ paddingBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>Secure Auth</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Login and signup with JWT. Tokens are stored client-side and injected automatically for protected endpoints.
                        </p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.59 13.41L11 3H3v8l10.41 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83z"></path>
                                    <path d="M7 7h.01"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>Posts & Tags</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Create, edit, and tag your posts. Manage tags for better organization and discovery.
                        </p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>Comments</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Engage with readers using a clean comments UI with inline edit and delete for owners.
                        </p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 6v6l4 2"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>24h Expiration</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Posts expire after 24 hours with a clear UI indicator and countdown.
                        </p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>Protected Routes</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Create and edit actions are secured behind authentication for a safe experience.
                        </p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 13l3 3 5-5"></path>
                                </svg>
                            </div>
                            <h3 style={{ margin: 0 }}>Owner Controls</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Only post owners can edit or delete, ensuring content integrity and control.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Landing;
