import React from 'react';
import DefaultLayout from '../templates/DefaultLayout';
import BlogCard from '../molecules/BlogCard';
import blogPosts from '../../data/blogPosts';

export default function Blog() {
  return (
    <DefaultLayout>
      <section className="hero-container" style={{ height: '28vh', marginTop: 20 }}>
        <div className="hero-slide active">
          <img src="/imagenes/Hero/Hero2.png" alt="Blog Hero" />
        </div>
        <div className="hero-content">
          <h1>Blog</h1>
          <p>Historias, recetas y tendencias desde nuestra pastelería.</p>
        </div>
      </section>

      <main style={{ padding: '20px 0' }}>
        <div className="grid blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </DefaultLayout>
  );
}
