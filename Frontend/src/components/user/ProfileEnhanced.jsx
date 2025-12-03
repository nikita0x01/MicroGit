import React, { useState, useEffect } from "react";
import NavbarEnhanced from "../NavbarEnhanced";
import "./profile-enhanced.css";
import HeatMap from "./HeatMap";

const ProfileEnhanced = () => {
  const [user, setUser] = useState({
    username: "Nikita Satpute",
    bio: "Full-stack developer | Open source enthusiast | GitHub Clone creator",
    followers: 245,
    following: 89,
    repositories: 34,
    isFollowing: false,
  });

  // Sample activity data for heatmap (last 365 days)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
      });
    }
    return data;
  };

  const toggleFollow = () => {
    setUser({ ...user, isFollowing: !user.isFollowing });
  };

  const userInitial = user.username.charAt(0).toUpperCase();

  return (
    <div>
      <NavbarEnhanced />

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">{userInitial}</div>

          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="profile-bio">{user.bio}</p>

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-value">{user.repositories}</span>
                <span className="profile-stat-label">Repositories</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{user.followers}</span>
                <span className="profile-stat-label">Followers</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{user.following}</span>
                <span className="profile-stat-label">Following</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
              <button
                className={`btn ${user.isFollowing ? "" : "btn-primary"}`}
                onClick={toggleFollow}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
              <button className="btn">[STAR] Star</button>
              <button className="btn">[CONFIG] Settings</button>
            </div>
          </div>
        </div>

        {/* Activity Heatmap Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Contribution Activity</h2>
          <div className="profile-heatmap">
            <p className="profile-heatmap-desc">
              {user.repositories} contributions in the last year
            </p>
            <div className="profile-heatmap-container">
              <HeatMap />
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="profile-section">
          <h2 className="profile-section-title">Top Languages</h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { lang: "JavaScript", percent: 45 },
              { lang: "React", percent: 30 },
              { lang: "Node.js", percent: 15 },
              { lang: "CSS", percent: 10 },
            ].map((item, idx) => (
              <div key={idx} style={{ flex: "1", minWidth: "150px" }}>
                <div className="flex-between mb-1">
                  <span style={{ fontWeight: 600 }}>{item.lang}</span>
                  <span style={{ color: "var(--text-tertiary)" }}>
                    {item.percent}%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "var(--tertiary-bg)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${item.percent}%`,
                      height: "100%",
                      backgroundColor: "var(--accent-blue)",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
              </div>
            ))}
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

export default ProfileEnhanced;
