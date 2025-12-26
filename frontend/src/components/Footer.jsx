export const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-meta">
                    <span className="footer-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                    </span>
                    <span>Author: Abdallah Mahmoud</span>
                    <span className="footer-divider"></span>
                    <span className="footer-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 6v6l4 2"></path>
                        </svg>
                    </span>
                    <span>2025</span>
                    <span className="footer-divider"></span>
                    <span className="footer-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21V8l9-5 9 5v13"></path>
                            <path d="M9 21V12h6v9"></path>
                        </svg>
                    </span>
                    <span>Rawmart</span>
                </div>
            </div>
        </footer>
    )
}
