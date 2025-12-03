import React, { useState } from "react";
import NavbarEnhanced from "../NavbarEnhanced";
import "./repositories-enhanced.css";

const RepositoriesEnhanced = () => {
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: "github-clone",
      description: "A full-featured GitHub clone built with React and Node.js",
      language: "JavaScript",
      stars: 156,
      forks: 42,
      visibility: "Public",
      updatedAt: "2 days ago",
    },
    {
      id: 2,
      name: "react-components",
      description: "Reusable React components library with TypeScript support",
      language: "TypeScript",
      stars: 89,
      forks: 23,
      visibility: "Public",
      updatedAt: "1 week ago",
    },
    {
      id: 3,
      name: "node-api",
      description: "RESTful API server with Express and MongoDB",
      language: "Node.js",
      stars: 67,
      forks: 15,
      visibility: "Private",
      updatedAt: "3 days ago",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    visibility: "Public",
  });

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRepo = () => {
    if (newRepo.name.trim()) {
      setRepositories([
        ...repositories,
        {
          id: repositories.length + 1,
          ...newRepo,
          stars: 0,
          forks: 0,
          language: "JavaScript",
          updatedAt: "just now",
        },
      ]);
      setNewRepo({ name: "", description: "", visibility: "Public" });
      setShowCreateModal(false);
    }
  };

  const handleDeleteRepo = (id) => {
    if (confirm("Are you sure you want to delete this repository?")) {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      "Node.js": "#68a063",
      Python: "#3572a5",
      CSS: "#563d7c",
    };
    return colors[language] || "#858585";
  };

  return (
    <div>
      <NavbarEnhanced />

      <div className="repos-container">
        {/* Header with Actions */}
        <div className="repos-header">
          <div>
            <h1>Repositories</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {repositories.length} repositories
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            [NEW] New Repository
          </button>
        </div>

        {/* Search and Filters */}
        <div className="repos-filters">
          <input
            type="text"
            className="repos-filter-input"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="repos-filter-input" style={{ minWidth: "150px" }}>
            <option>All</option>
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        {/* Repositories List */}
        {filteredRepos.length > 0 ? (
          <div className="repos-list">
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <div className="repo-card-header">
                  <div>
                    <div className="repo-card-title">{repo.name}</div>
                    <p className="repo-card-description">{repo.description}</p>
                  </div>
                  <span className="badge badge-primary">{repo.visibility}</span>
                </div>

                <div className="repo-card-meta">
                  {repo.language && (
                    <div className="repo-language-badge">
                      <span
                        className="language-dot"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="repo-meta-item">
                    <span>[STAR]</span>
                    <span>{repo.stars}</span>
                  </div>
                  <div className="repo-meta-item">
                    <span>[FORK]</span>
                    <span>{repo.forks}</span>
                  </div>
                  <div className="repo-meta-item">
                    <span>Updated {repo.updatedAt}</span>
                  </div>
                </div>

                <div className="repo-card-actions">
                  <button className="btn btn-sm">[VIEW] View</button>
                  <button className="btn btn-sm">[EDIT] Edit</button>
                  <button className="btn btn-sm">[SAVE] Commit</button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteRepo(repo.id)}
                  >
                    [DEL] Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="repos-empty">
            <div className="repos-empty-icon">[REPO]</div>
            <p>You do not make any repo</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => setShowCreateModal(true)}
            >
              Create Repository
            </button>
          </div>
        )}
      </div>

      {/* Create Repository Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              [X]
            </button>
            <div className="modal-header">Create a new repository</div>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateRepo();
              }}
            >
              <div className="form-group">
                <label>Repository Name *</label>
                <input
                  type="text"
                  placeholder="my-awesome-repo"
                  value={newRepo.name}
                  onChange={(e) =>
                    setNewRepo({ ...newRepo, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="A short description of your repository"
                  value={newRepo.description}
                  onChange={(e) =>
                    setNewRepo({ ...newRepo, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group">
                <label>Visibility</label>
                <select
                  value={newRepo.visibility}
                  onChange={(e) =>
                    setNewRepo({ ...newRepo, visibility: e.target.value })
                  }
                >
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Repository
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

export default RepositoriesEnhanced;
