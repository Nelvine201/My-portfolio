import { TechPill } from "./TechPill";

type Project = {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  outcome: string;
  tech: readonly string[];
  demo: string;
  source: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-index">01 / FEATURED WORK</div>
      <div className="project-topline">
        <span className="mono-label">CASE STUDY</span>
        {project.outcome && <span className="metric">{project.outcome}</span>}
      </div>

      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>

      <div className="project-detail-grid">
        <div>
          <p className="detail-label">The Problem</p>
          <p>{project.problem}</p>
        </div>
        <div>
          <p className="detail-label">The Solution</p>
          <p>{project.solution}</p>
        </div>
      </div>

      <div className="project-footer">
        <div className="tech-list">
          {project.tech.map((tech) => <TechPill key={tech}>{tech}</TechPill>)}
        </div>

        <div className="project-links">
          {project.demo && project.demo.startsWith("http") && (
            <a href={project.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>
          )}
          {project.source && project.source.startsWith("http") && (
            <a href={project.source} target="_blank" rel="noreferrer">Source ↗</a>
          )}
        </div>
      </div>
    </article>
  );
}
