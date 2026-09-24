import { TechPill } from "./TechPill";

export type Article = {
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: readonly string[];
  url: string;
  source?: string;
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="article-meta">
        <span>{article.source ?? "Dev.to"}</span>
        <span>{new Date(article.published_at).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <div className="article-bottom">
        <div className="tech-list">
          {article.tag_list.slice(0, 3).map((tag) => <TechPill key={tag}>{tag}</TechPill>)}
        </div>
        <span className="mono-label">{article.reading_time_minutes} min read</span>
      </div>
      <a className="article-link" href={article.url} target="_blank" rel="noreferrer">
        Read article ↗
      </a>
    </article>
  );
}
