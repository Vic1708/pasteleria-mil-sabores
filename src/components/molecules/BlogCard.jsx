import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <div style={{ overflow: 'hidden', borderRadius: 12 }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
      </div>

      <div style={{ paddingTop: 12 }}>
        <h3 style={{ marginBottom: 6 }}>{post.title}</h3>
        <small style={{ color: 'var(--text2)' }}>{new Date(post.date).toLocaleDateString()}</small>
        <p style={{ marginTop: 8, color: 'var(--text)' }}>{post.excerpt}</p>
        <div style={{ marginTop: 10 }}>
          <Link to={`/blog/${post.slug}`} className="btn">Leer más</Link>
        </div>
      </div>
    </article>
  );
}
