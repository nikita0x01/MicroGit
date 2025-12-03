import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './Overview.css';

const Overview = () => {
  const [activeTab, setActiveTab] = useState('repositories');
  
  // Mock data - replace with actual data from your application
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    avatar: null,
  };

  const repositories = [
    {
      id: 1,
      name: 'awesome-project',
      description: 'An awesome project with great features and documentation.',
      language: 'JavaScript',
      stars: 42,
      updated: '2 days ago',
      isPrivate: false,
    },
    {
      id: 2,
      name: 'data-analysis',
      description: 'Data analysis scripts and notebooks for research project.',
      language: 'Python',
      stars: 18,
      updated: '1 week ago',
      isPrivate: true,
    },
    {
      id: 3,
      name: 'portfolio-website',
      description: 'My personal portfolio website built with React and Tailwind CSS.',
      language: 'TypeScript',
      stars: 7,
      updated: '3 weeks ago',
      isPrivate: false,
    },
  ];

  const activities = [
    {
      id: 1,
      type: 'push',
      repo: 'awesome-project',
      branch: 'main',
      time: '2 hours ago',
      commits: [
        { id: 'a1b2c3d', message: 'Update README with new features', url: '#' },
      ],
    },
    {
      id: 2,
      type: 'pull_request',
      repo: 'data-analysis',
      action: 'opened',
      prNumber: 42,
      title: 'Add data visualization module',
      time: '1 day ago',
      url: '#',
    },
    {
      id: 3,
      type: 'issue',
      repo: 'portfolio-website',
      action: 'opened',
      issueNumber: 5,
      title: 'Fix mobile responsiveness on about page',
      time: '3 days ago',
      url: '#',
    },
  ];

  return (
    <Layout>
      <div className="overview-container">
        <div className="overview-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <button className="btn btn-outline">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>New repository</span>
            </button>
            <button className="btn btn-primary">
              <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h7z"></path>
              </svg>
              <span>New project</span>
            </button>
          </div>
        </div>

        <div className="overview-tabs">
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

        <div className="overview-content">
          <div className="main-content">
            {activeTab === 'repositories' && (
              <div className="repositories-section">
                <div className="section-header">
                  <h2>Your repositories</h2>
                  <div className="search-box">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Find a repository..."
                    />
                  </div>
                </div>

                <div className="repository-list">
                  {repositories.map((repo) => (
                    <div key={repo.id} className="repository-item">
                      <div className="repository-info">
                        <h3>
                          <Link to={`/${user.username}/${repo.name}`} className="repo-name">
                            {repo.name}
                          </Link>
                          {repo.isPrivate && (
                            <span className="repo-visibility">Private</span>
                          )}
                        </h3>
                        <p className="repo-description">{repo.description}</p>
                        <div className="repo-meta">
                          {repo.language && (
                            <span className="repo-language">
                              <span className="language-color" style={{
                                backgroundColor: repo.language === 'JavaScript' ? '#f1e05a' : 
                                              repo.language === 'Python' ? '#3572A5' : 
                                              repo.language === 'TypeScript' ? '#3178c6' : '#ccc'
                              }}></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="repo-stars">
                            <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>
                            {repo.stars}
                          </span>
                          <span className="repo-updated">Updated {repo.updated}</span>
                        </div>
                      </div>
                      <div className="repository-actions">
                        <button className="btn btn-sm btn-outline">
                          <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                          </svg>
                          <span>Star</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="see-more">
                  <Link to={`/${user.username}?tab=repositories`} className="btn btn-outline">
                    View all repositories
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="empty-state">
                <h3>Welcome to your projects dashboard!</h3>
                <p>Projects are a great way to organize your work. You can create projects for features, bug fixes, or any other purpose.</p>
                <button className="btn btn-primary">Create a project</button>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="empty-state">
                <h3>No packages published yet</h3>
                <p>Publish your first package to get started.</p>
                <button className="btn btn-primary">Publish your first package</button>
              </div>
            )}
          </div>

          <div className="sidebar">
            <div className="activity-feed">
              <h3>Recent activity</h3>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'push' && (
                        <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                          <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572A.5.5 0 018.5 13.5V4.75zM6.75 4a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 016.75 4zm-3 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 013.75 7z"></path>
                        </svg>
                      )}
                      {activity.type === 'pull_request' && (
                        <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
                        </svg>
                      )}
                      {activity.type === 'issue' && (
                        <svg className="icon" viewBox="0 0 16 16" width="16" height="16">
                          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.636 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.24 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.72-.619a2 2 0 00-2.55-3.003z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="activity-content">
                      <p>
                        {activity.type === 'push' && (
                          <>
                            <strong>{user.username}</strong> pushed to <strong>{activity.branch}</strong> in <a href="#">{activity.repo}</a>
                            <div className="commit-list">
                              {activity.commits.map((commit) => (
                                <a key={commit.id} href={commit.url} className="commit">
                                  <code>{commit.id.substring(0, 7)}</code> {commit.message}
                                </a>
                              ))}
                            </div>
                          </>
                        )}
                        {activity.type === 'pull_request' && (
                          <>
                            <strong>{user.username}</strong> {activity.action} pull request <a href={activity.url}><strong>{activity.repo}#{activity.prNumber}</strong> {activity.title}</a>
                          </>
                        )}
                        {activity.type === 'issue' && (
                          <>
                            <strong>{user.username}</strong> {activity.action} issue <a href={activity.url}><strong>{activity.repo}##{activity.issueNumber}</strong> {activity.title}</a>
                          </>
                        )}
                      </p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="see-all">
                <Link to={`/${user.username}?tab=activity`} className="btn btn-sm btn-outline">
                  View all activity
                </Link>
              </div>
            </div>

            <div className="help-section">
              <h3>Help and resources</h3>
              <ul className="help-links">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">GitHub Community</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
