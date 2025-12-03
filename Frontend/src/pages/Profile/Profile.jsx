import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - replace with actual data from your application
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    joinDate: 'Joined on January 2023',
    bio: 'Full-stack developer passionate about building great user experiences.',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    twitter: '@johndoe',
    followers: 42,
    following: 24,
    stars: 128,
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar">
              <span className="avatar-text">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-username">{user.username}</p>
            <p className="profile-bio">{user.bio}</p>
            
            <div className="profile-meta">
              {user.location && (
                <span className="profile-meta-item">
                  <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 1 0 2 6c0 4.314 6 10 6 10z"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                  {user.location}
                </span>
              )}
              
              {user.website && (
                <a href={`https://${user.website}`} className="profile-meta-item" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"></path>
                  </svg>
                  {user.website}
                </a>
              )}
              
              {user.twitter && (
                <a href={`https://twitter.com/${user.twitter}`} className="profile-meta-item" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  {user.twitter}
                </a>
              )}
            </div>
            
            <div className="profile-stats">
              <Link to={`/${user.username}/followers`} className="stat-item">
                <span className="stat-count">{user.followers}</span>
                <span className="stat-label">followers</span>
              </Link>
              <Link to={`/${user.username}/following`} className="stat-item">
                <span className="stat-count">{user.following}</span>
                <span className="stat-label">following</span>
              </Link>
              <Link to={`/${user.username}/stars`} className="stat-item">
                <span className="stat-count">{user.stars}</span>
                <span className="stat-label">stars</span>
              </Link>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="btn btn-outline">Edit profile</button>
          </div>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'repositories' ? 'active' : ''}`}
            onClick={() => setActiveTab('repositories')}
          >
            Repositories
          </button>
          <button 
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            Packages
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="pinned-repos">
                <h3>Pinned Repositories</h3>
                <div className="repo-grid">
                  {[1, 2, 3, 4, 5, 6].map((repo) => (
                    <div key={repo} className="repo-card">
                      <div className="repo-header">
                        <h4>project-{repo}</h4>
                        <span className="repo-visibility">Public</span>
                      </div>
                      <p className="repo-description">
                        A sample project description that explains what this project is about.
                      </p>
                      <div className="repo-meta">
                        <span className="repo-language">
                          <span className="language-color"></span>
                          JavaScript
                        </span>
                        <span className="repo-stars">
                          <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                          </svg>
                          {Math.floor(Math.random() * 100)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="activity-feed">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="activity-item">
                      <div className="activity-avatar">
                        <div className="avatar small">
                          <span className="avatar-text">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                      </div>
                      <div className="activity-content">
                        <p>
                          <strong>{user.username}</strong> pushed to <strong>main</strong> in <a href="#">project-{item}</a>
                        </p>
                        <p className="activity-time">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'repositories' && (
            <div className="repositories-content">
              <div className="repositories-header">
                <div className="search-box">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Find a repository..."
                  />
                </div>
                <div className="filter-buttons">
                  <button className="btn btn-outline">
                    Type
                    <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                      <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
                    </svg>
                  </button>
                  <button className="btn btn-primary">
                    New
                  </button>
                </div>
              </div>
              
              <div className="repository-list">
                {[1, 2, 3, 4, 5].map((repo) => (
                  <div key={repo} className="repository-item">
                    <div className="repository-info">
                      <h4>
                        <a href="#" className="repo-name">project-{repo}</a>
                        <span className="repo-visibility">Public</span>
                      </h4>
                      <p className="repo-description">
                        A sample project description that explains what this project is about.
                      </p>
                      <div className="repo-meta">
                        <span className="repo-language">
                          <span className="language-color"></span>
                          JavaScript
                        </span>
                        <span className="repo-updated">
                          Updated 2 days ago
                        </span>
                      </div>
                    </div>
                    <div className="repository-actions">
                      <button className="btn btn-sm btn-outline">
                        <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        Star
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div className="projects-content">
              <div className="empty-state">
                <h3>Welcome to your projects dashboard!</h3>
                <p>Projects are a great way to organize your work. You can create projects for features, bug fixes, or any other purpose.</p>
                <button className="btn btn-primary">Create a project</button>
              </div>
            </div>
          )}
          
          {activeTab === 'packages' && (
            <div className="packages-content">
              <div className="empty-state">
                <h3>No packages published yet</h3>
                <p>Publish your first package to get started.</p>
                <button className="btn btn-primary">Publish your first package</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
