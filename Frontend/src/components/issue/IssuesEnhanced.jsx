import React, { useState } from "react";
import NavbarEnhanced from "../NavbarEnhanced";
import "./issues-enhanced.css";

const IssuesEnhanced = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Fix login form validation",
      status: "open",
      labels: ["bug", "urgent"],
      comments: 3,
      author: "John Doe",
      created: "2 days ago",
    },
    {
      id: 2,
      title: "Add dark mode support",
      status: "open",
      labels: ["feature", "enhancement"],
      comments: 5,
      author: "Jane Smith",
      created: "1 week ago",
    },
    {
      id: 3,
      title: "Optimize database queries",
      status: "closed",
      labels: ["performance"],
      comments: 8,
      author: "Dev Team",
      created: "2 weeks ago",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    labels: "",
  });

  const filteredIssues = issues.filter((issue) => {
    if (filterStatus === "all") return true;
    return issue.status === filterStatus;
  });

  const handleCreateIssue = () => {
    if (newIssue.title.trim()) {
      setIssues([
        ...issues,
        {
          id: issues.length + 1,
          title: newIssue.title,
          status: "open",
          labels: newIssue.labels ? newIssue.labels.split(",").map((l) => l.trim()) : [],
          comments: 0,
          author: "You",
          created: "just now",
        },
      ]);
      setNewIssue({ title: "", description: "", labels: "" });
      setShowCreateModal(false);
    }
  };

  const handleCloseIssue = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: "closed" } : issue
      )
    );
  };

  const handleDeleteIssue = (id) => {
    if (confirm("Are you sure you want to delete this issue?")) {
      setIssues(issues.filter((issue) => issue.id !== id));
    }
  };

  const openCount = issues.filter((i) => i.status === "open").length;
  const closedCount = issues.filter((i) => i.status === "closed").length;

  return (
    <div>
      <NavbarEnhanced />

      <div className="issues-container">
        {/* Header */}
        <div className="issues-header">
          <div>
            <h1>Issues</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {openCount} open · {closedCount} closed
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            [NEW] New Issue
          </button>
        </div>

        {/* Toolbar */}
        <div className="issues-toolbar">
          <button
            className={`issues-toolbar-item ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`issues-toolbar-item ${filterStatus === "open" ? "active" : ""}`}
            onClick={() => setFilterStatus("open")}
          >
            [OPEN] Open ({openCount})
          </button>
          <button
            className={`issues-toolbar-item ${filterStatus === "closed" ? "active" : ""}`}
            onClick={() => setFilterStatus("closed")}
          >
            [CLOSE] Closed ({closedCount})
          </button>
        </div>

        {/* Issues List */}
        {filteredIssues.length > 0 ? (
          <div className="issues-list">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="issue-card">
                <div className="issue-card-left">
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span
                      className={`issue-card-status-icon ${
                        issue.status === "closed" ? "closed" : ""
                      }`}
                    >
                      {issue.status === "open" ? "[O]" : "[X]"}
                    </span>
                    <div className="issue-card-title">{issue.title}</div>
                  </div>

                  <div className="issue-card-meta">
                    <span>#{issue.id}</span>
                    <span>opened {issue.created}</span>
                    <span>by {issue.author}</span>
                  </div>

                  {issue.labels.length > 0 && (
                    <div className="issue-card-labels">
                      {issue.labels.map((label) => (
                        <span key={label} className="issue-label">
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="issue-card-right">
                  <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                    [CHAT] {issue.comments}
                  </span>

                  <div className="issue-actions">
                    {issue.status === "open" && (
                      <button
                        className="btn btn-sm"
                        onClick={() => handleCloseIssue(issue.id)}
                      >
                        Close
                      </button>
                    )}
                    {issue.status === "closed" && (
                      <button
                        className="btn btn-sm"
                        onClick={() => handleCloseIssue(issue.id)}
                      >
                        Reopen
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteIssue(issue.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="issues-empty">
            <div className="issues-empty-icon">[DONE]</div>
            <p>Congratulations! No open issues.</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setShowCreateModal(true)}
            >
              Create an Issue
            </button>
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="issue-modal" onClick={() => setShowCreateModal(false)}>
          <div
            className="issue-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="issue-modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              [X]
            </button>

            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
              Create a new issue
            </h2>

            <form
              className="issue-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateIssue();
              }}
            >
              <div className="issue-form-group">
                <label>Issue Title *</label>
                <input
                  type="text"
                  placeholder="Short description of the issue"
                  value={newIssue.title}
                  onChange={(e) =>
                    setNewIssue({ ...newIssue, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="issue-form-group">
                <label>Description</label>
                <textarea
                  placeholder="Detailed description of the issue..."
                  value={newIssue.description}
                  onChange={(e) =>
                    setNewIssue({ ...newIssue, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="issue-form-group">
                <label>Labels (comma-separated)</label>
                <input
                  type="text"
                  placeholder="bug, enhancement, documentation"
                  value={newIssue.labels}
                  onChange={(e) =>
                    setNewIssue({ ...newIssue, labels: e.target.value })
                  }
                />
              </div>

              <div className="issue-form-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default IssuesEnhanced;
