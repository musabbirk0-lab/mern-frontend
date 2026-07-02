import React, { useState } from 'react';

export default function Dashboard({ API_URL, token }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    repoLink: '',
    imageUrl: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techStack = form.techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const res = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, techStack }),
    });
    if (res.ok) {
      alert('Project added!');
      setForm({
        title: '',
        description: '',
        techStack: '',
        liveLink: '',
        repoLink: '',
        imageUrl: '',
      });
      window.location.reload();
    } else alert('Failed to add project');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />
        <input
          placeholder="Tech stack (comma separated)"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />
        <br />
        <input
          placeholder="Live link"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        />
        <br />
        <input
          placeholder="Repository link"
          value={form.repoLink}
          onChange={(e) => setForm({ ...form, repoLink: e.target.value })}
        />
        <br />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
