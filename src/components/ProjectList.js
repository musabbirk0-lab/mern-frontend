import React, { useEffect, useState } from 'react';

export default function ProjectList({ API_URL }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
  }, [API_URL]);

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 && <p>No projects yet.</p>}
      {projects.map(proj => (
        <div key={proj._id} style={{ border: '1px solid #ddd', margin: 10, padding: 10 }}>
          <h3>{proj.title}</h3>
          <p>{proj.description}</p>
          <p><strong>Tech:</strong> {proj.techStack?.join(', ')}</p>
          {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer">Live Demo</a>}
          {proj.repoLink && <a href={proj.repoLink} target="_blank" rel="noreferrer" style={{ marginLeft: 10 }}>Repository</a>}
        </div>
      ))}
    </div>
  );
}
