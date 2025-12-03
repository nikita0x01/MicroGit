import React, { useState, useEffect } from "react";
import NavbarEnhanced from "../NavbarEnhanced";
import "./dashboard-enhanced.css";

const DashboardEnhanced = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's repositories
    const userId = localStorage.getItem("userId");
    setTimeout(() => {
      setRepositories([
        {
          id: 1,
          name: "github-clone",
          description: "Full-featured GitHub clone",
          language: "JavaScript",
          stars: 156,
          forks: 42,
          visibility: "Public",
          updatedAt: "2 days ago",
        },
        {
          id: 2,
          name: "react-components",
          description: "Reusable React components",
          language: "TypeScript",
          stars: 89,
          forks: 23,
          visibility: "Public",
          updatedAt: "1 week ago",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const recentActivity = [
    { type: "push", repo: "github-clone", time: "2 hours ago" },
    { type: "commit", repo: "react-components", time: "1 day ago" },
    { type: "create", repo: "node-api", time: "3 days ago" },
  ];

  return (
    <div>
      <NavbarEnhanced />

      <div className="dashboard-container">
        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-main">
            {/* Activity Feed */}
            <div className="dashboard-section">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-feed">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <span className="activity-icon">
                      {activity.type === "push" && "[UP]"}
                      {activity.type === "commit" && "[SAVE]"}
                      {activity.type === "create" && "[NEW]"}
                    </span>
                    <div className="activity-content">
                      <span className="activity-text">
                        {activity.type === "push" && "Pushed to"}
                        {activity.type === "commit" && "Committed to"}
                        {activity.type === "create" && "Created"}
                      </span>
                      <span className="activity-repo">{activity.repo}</span>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Repositories */}
            <div className="dashboard-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 className="section-title">Your Repositories</h2>
                <a href="/repositories" style={{ color: "var(--accent-blue)", fontSize: "14px" }}>
                  View all →
                </a>
              </div>

              {loading ? (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading...</p>
              ) : repositories.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {repositories.slice(0, 3).map((repo) => (
                    <div key={repo.id} className="dashboard-repo-card">
                      <div>
                        <h3 style={{ color: "var(--accent-blue)", marginBottom: "4px" }}>{repo.name}</h3>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                          {repo.description}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--text-tertiary)" }}>
                        <span>[STARS] {repo.stars}</span>
                        <span>[FORKS] {repo.forks}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                  You do not make any repo
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="dashboard-sidebar">
            {/* Quick Stats */}
            <div className="dashboard-section">
              <h2 className="section-title">Quick Stats</h2>
              <div className="stats-box">
                <div className="stat">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Repositories</span>
                </div>
                <div className="stat">
                  <span className="stat-value">245</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">89</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="dashboard-section">
              <h2 className="section-title">Quick Links</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="/repositories" className="quick-link">
                   Repositories
                </a>
                <a href="/issues" className="quick-link">
                   Issues
                </a>
                <a href="/profile" className="quick-link">
                   Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--secondary-bg)",
          borderTop: "1px solid var(--border-color)",
          padding: "24px",
          textAlign: "center",
          marginTop: "48px",
          color: "var(--text-secondary)",
          fontSize: "14px",
        }}
      >
        <p>© 2025 MicroGit. All rights reserved by Nikita Satpute.</p>
      </footer>
    </div>
  );
};

export default DashboardEnhanced;
