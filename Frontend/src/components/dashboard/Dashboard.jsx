import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        // Fetch all repositories for all users
        const response = await fetch(`http://localhost:3000/repo/all`);
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepositories(data || []);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError("Unable to fetch repositories.");
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        if (!response.ok) throw new Error("Failed to fetch suggested repositories");
        const data = await response.json();
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error fetching suggested repositories:", err);
        setError("Unable to fetch suggested repositories.");
        setSuggestedRepositories([]);
      }
    };

    // Fetch everything in parallel
    Promise.all([fetchRepositories(), fetchSuggestedRepositories()]).finally(() => setLoading(false));
  }, []);

  // Filter repositories based on search query
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  if (loading) return <p>Loading Dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.length ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id || repo.id}>
                <h4>{repo.name || "No Name"}</h4>
                <h4>{repo.description || "No Description"}</h4>
              </div>
            ))
          ) : (
            <p>No suggested repositories available.</p>
          )}
        </aside>
        <main>
          <h2>All Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.length ? (
            searchResults.map((repo) => (
              <div key={repo._id || repo.id}>
                <h4>{repo.name || "No Name"}</h4>
                <h4>{repo.description || "No Description"}</h4>
                <p><strong>Owner:</strong> {repo.owner?.username || "Unknown"}</p>
              </div>
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li><p>Tech Conference - Dec 15</p></li>
            <li><p>Developer Meetup - Dec 25</p></li>
            <li><p>React Summit - Jan 5</p></li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
