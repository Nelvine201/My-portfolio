"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../data/site";
import { Article, ArticleCard } from "../components/ArticleCard";
import { ProjectCard } from "../components/ProjectCard";
import { Section } from "../components/Section";
import { TimelineItem } from "../components/TimelineItem";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articleError, setArticleError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadArticles() {
      if (!siteConfig.devtoUsername || siteConfig.devtoUsername.startsWith("[")) {
        setArticles([...siteConfig.mockArticles]);
        setLoadingArticles(false);
        return;
      }

      try {
        const response = await fetch(
          `https://dev.to/api/articles?username=${encodeURIComponent(siteConfig.devtoUsername)}&per_page=4`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Unable to load articles.");

        const data = await response.json();
        setArticles(data);
      } catch {
        if (!controller.signal.aborted) {
          setArticleError(true);
          setArticles([...siteConfig.mockArticles]);
        }
      } finally {
        if (!controller.signal.aborted) setLoadingArticles(false);
      }
    }

    loadArticles();
    return () => controller.abort();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width">
          <div className="header-inner">
            <div className="brand-wrap">
              <a className="brand" href="#home" aria-label="Go to homepage">{siteConfig.initials}</a>
            </div>

            <nav className="header-nav" aria-label="Primary navigation">
              {siteConfig.navigation.map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </nav>

            <a className="cv-button desktop-cv" href="/cv.pdf">Download CV ↓</a>

            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a href="/cv.pdf" onClick={closeMenu}>Download CV ↓</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">NELVIN OCHIENG</p>
              <h1>{siteConfig.role}</h1>
              <p className="hero-lead">{siteConfig.hero.headline}</p>
              <p className="hero-bio">{siteConfig.hero.bio}</p>

              <div className="social-grid" aria-label="Social links">
                <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href={siteConfig.socials.devto} target="_blank" rel="noreferrer">Dev.to ↗</a>
                <a href={`mailto:${siteConfig.email}`}>Email ↗</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-photo-frame">
                <img
                  src="/images/profile.jpg"
                  alt="Professional portrait of Nelvin Ochieng"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="page-width">
          <Section id="projects" number="01" title="Featured Projects">
            <div className="project-grid">
              {siteConfig.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Section>

          <Section id="articles" number="02" title="Articles">
            <div className="article-intro">
              <p>Notes from the work: what I’m learning, building, and trying to understand.</p>
              <a href={siteConfig.socials.devto} target="_blank" rel="noreferrer">Read on Dev.to ↗</a>
            </div>

            {loadingArticles ? (
              <div className="article-grid" aria-label="Loading articles">
                {[1, 2].map((item) => <div key={item} className="article-skeleton" />)}
              </div>
            ) : (
              <>
                {articleError && (
                  <p className="mono-label" role="status">Live feed unavailable — showing saved articles.</p>
                )}
                <div className="article-grid">
                  {articles.slice(0, 4).map((article) => (
                    <ArticleCard key={article.url} article={article} />
                  ))}
                </div>
              </>
            )}
          </Section>

          <Section id="experience" number="03" title="Experience / CV">
            <div className="experience-grid">
              <div>
                {siteConfig.experience.map((item) => (
                  <TimelineItem key={item.title} {...item} />
                ))}

                <h3 className="education-heading">Education</h3>
                {siteConfig.education.map((item) => (
                  <TimelineItem key={item.title} {...item} />
                ))}
              </div>

              <aside>
                <h3 className="competency-heading">Core Competencies</h3>
                {Object.entries(siteConfig.competencies).map(([category, skills]) => (
                  <div className="competency-group" key={category}>
                    <h4>{category}</h4>
                    <p>{skills.join(" · ")}</p>
                  </div>
                ))}
                <a className="resume-button" href="/cv.pdf">View / Download Resume ↗</a>
              </aside>
            </div>
          </Section>

          <Section id="about" number="04" title="Beyond the Code">
            <div className="beyond-card">
              <div className="beyond-part">
                <h3>📚 Currently Reading</h3>
                <p>{siteConfig.hobbies.reading}</p>
              </div>
              <div className="beyond-part">
                <h3>⚡ Experiments & Interests</h3>
                <p>{siteConfig.hobbies.experiments}</p>
              </div>
              <div className="beyond-part">
                <h3>🎧 Focus Workflow</h3>
                <p>{siteConfig.hobbies.workflow}</p>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-row">
          <div>
            <a className="footer-cta" href={`mailto:${siteConfig.email}`}>Let’s build something useful ↗</a>
            <p className="footer-meta">{siteConfig.footer.tagline}</p>
          </div>
          <p className="footer-meta">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </footer>
    </div>
  );
}
