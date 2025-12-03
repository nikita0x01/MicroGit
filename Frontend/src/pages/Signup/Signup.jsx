import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import githubLogo from '../../assets/github-mark-white.svg';
import '../Login/auth.css';

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img src={githubLogo} alt="GitHub Logo" className="logo-login" />
      </div>
      
      <div className="login-box-wrapper">
        <div className="login-box">
          <h2>Create your account</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="label">
                Username
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
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input"
                autoComplete="email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input"
                autoComplete="new-password"
                required
              />
              <p style={{ fontSize: '0.8rem', color: '#8b949e', width: '250px', marginTop: '8px', lineHeight: '1.4' }}>
                Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password" className="label">
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="input"
                autoComplete="new-password"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Create account
            </button>
          </form>
          
          <div className="pass-box">
            <p>Already have an account? <Link to="/login" className="signup">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
