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

      <div className="project-case-study">
        <div className="project-heading-row">
          <h3>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="project-title-link"
              >
                {project.title} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              project.title
            )}
          </h3>
        </div>

        <p className="project-subtitle">{project.subtitle}</p>

        <div className="project-detail-grid">
          <div>
            <p className="detail-label">Problem</p>
            <p>{project.problem}</p>
          </div>
          <div>
            <p className="detail-label">Solution</p>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="project-footer">
          <div className="tech-list">
            {project.tech.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>

          {project.source && project.source.startsWith("http") && (
            <div className="project-links">
              <a href={project.source} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
