"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../data/site";
import { Article, ArticleCard } from "../components/ArticleCard";
import { ProjectCard } from "../components/ProjectCard";
import { Section } from "../components/Section";
import { TimelineItem } from "../components/TimelineItem";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    const sectionIds = siteConfig.navigation
      .map((item) => item.href.replace("#", ""))
      .filter((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
          window.history.replaceState(null, "", `#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width">
          <div className="header-inner">
            <div className="brand-wrap">
              <a className="brand" href="#home" aria-label="Go to homepage">{siteConfig.name}</a>
            </div>

            <nav className="header-nav" aria-label="Primary navigation">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  className={activeSection === item.href.slice(1) ? "active" : ""}
                  href={item.href}
                >
                  {item.label}
                </a>
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
              <a
                key={item.href}
                className={activeSection === item.href.slice(1) ? "active" : ""}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a href="/cv.pdf" onClick={closeMenu}>Download CV ↓</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="page-width hero-grid">
            <div className="hero-visual">
              <div className="hero-photo-frame">
                <img
                  src="/images/profile.jpg"
                  alt="Professional portrait of Nelvin Ochieng"
                />
              </div>
            </div>

            <div className="hero-copy">
              <p className="eyebrow">NELVIN OCHIENG</p>
              <h1>Full-stack developer</h1>
              <p className="hero-lead">
                Building things, solving problems, and learning along the way.
              </p>
              <p className="hero-bio">
                I’m a developer and Zone01 LakeHub apprentice focused on building practical web applications and backend systems. I work mainly with Go, JavaScript, and databases, and I enjoy turning ideas into things people can actually use.
              </p>
              <p className="hero-note">Currently learning. Constantly building. Always curious.</p>

              <div className="hero-actions">
                <a className="hero-button hero-button-primary" href="#projects">View my work</a>
                <a className="hero-button hero-button-secondary" href="#contact">Let’s connect</a>
              </div>
            </div>
          </div>
        </section>

        <div className="page-width">
          <Section id="projects" title="Featured Projects" className="featured-projects-section">
            <div className="featured-project">
              {siteConfig.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Section>

          <Section id="articles" title="Articles">
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

          <Section id="experience" title="Experience / CV">
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

          <Section id="about" title="About">
            <div className="about-layout">
              <div className="about-copy">
                <p className="section-kicker">A little about me</p>
                <p>I’m a developer and Zone01 LakeHub apprentice focused on building practical web applications and backend systems.</p>
                <p>I work mainly with Go, JavaScript, and databases, and I enjoy turning ideas into things people can actually use.</p>
              </div>
              <div className="about-side">
                <span className="mono-label">Currently</span>
                <strong>Learning by building.</strong>
                <span className="mono-label">Focus</span>
                <strong>Full-stack development with a backend focus.</strong>
              </div>
            </div>
          </Section>

          <Section id="hobbies" title="Hobbies">
            <div className="hobbies-layout">
              <div className="hobby-feature">
                <span className="mono-label">01 / READING</span>
                <h3>Currently Reading</h3>
                <p>{siteConfig.hobbies.reading}</p>
              </div>
              <div className="hobby-list">
                <div>
                  <span className="mono-label">02 / EXPERIMENTS</span>
                  <h3>Experiments & Interests</h3>
                  <p>{siteConfig.hobbies.experiments}</p>
                </div>
                <div>
                  <span className="mono-label">03 / WORKFLOW</span>
                  <h3>Focus Workflow</h3>
                  <p>{siteConfig.hobbies.workflow}</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="contact" title="Let's connect">
            <div className="contact-intro">
              <p>I’m always open to connecting with other developers, learning from people, and discussing interesting ideas.</p>
            </div>
            <div className="social-grid">
              {[
                ["X", siteConfig.socials.x],
                ["LinkedIn", siteConfig.socials.linkedin],
                ["GitHub", siteConfig.socials.github],
                ["dev.to", siteConfig.socials.devto],
                ["Instagram", siteConfig.socials.instagram],
                ["WhatsApp", siteConfig.socials.whatsapp],
              ]
                .filter(([, href]) => href && !href.includes("["))
                .map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
                ))}
              <a href={`mailto:${siteConfig.email}`}>Gmail ↗</a>
            </div>
          </Section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-row">
          <a className="footer-cta" href="#home">{siteConfig.name}</a>
          <p className="footer-meta">© 2026 {siteConfig.name}</p>
        </div>
      </footer>
    </div>
  );
}
