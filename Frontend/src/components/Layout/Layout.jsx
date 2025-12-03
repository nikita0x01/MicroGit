import { Link } from 'react-router-dom';
import githubLogo from '../../assets/github-mark-white.svg';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img 
                src={githubLogo} 
                alt="GitHub Logo" 
                style={{ height: '32px', width: '32px' }}
              />
            </Link>
            <nav className="nav">
              <Link to="/login" className="nav-link">Sign in</Link>
              <Link to="/signup" className="btn btn-outline">Sign up</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Privacy</a>
              <a href="#" className="footer-link">Security</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Your Company, Inc.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
