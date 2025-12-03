import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import githubLogo from '../../assets/github-mark-white.svg';
import './auth.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <Layout>
      <div className="login-wrapper">
        <div className="login-logo-container">
          <img src={githubLogo} alt="GitHub Logo" className="logo-login" />
        </div>
        
        <div className="login-box-wrapper">
          <div className="login-box">
            <h2>Sign in to GitHub</h2>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="label">
                  Username or email address
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  autoComplete="username"
                  required
                />
              </div>
              
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="forgot-password" style={{ color: '#2b7df7', fontSize: '0.8rem' }}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  className="input"
                  autoComplete="current-password"
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Sign in
              </button>
            </form>
          </div>
          
          <div className="pass-box">
            <p>New to GitHub? <Link to="/signup" className="signup">Create an account</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
