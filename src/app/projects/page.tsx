import React from 'react';
import projects from './projects.json';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../nav';

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <div className="content-container">
        <Nav />
        <h1 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '2rem' }}>Projects</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                height: '100%',
              }}>
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.id === 'project-1'}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                    {project.title}
                  </h2>
                  <p style={{ margin: '0', color: '#666' }}>{project.shortDescription}</p>
                  <p style={{ margin: '1rem 0 0 0', color: '#888', fontSize: '0.9rem' }}>
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
