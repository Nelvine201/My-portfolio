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

            <a className="cv-button desktop-cv" href={siteConfig.cv} target="_blank" rel="noreferrer">Download CV ↗</a>

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
            <a href={siteConfig.cv} target="_blank" rel="noreferrer" onClick={closeMenu}>Download CV ↗</a>
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
                <a className="resume-button" href={siteConfig.cv} target="_blank" rel="noreferrer">View / Download Resume ↗</a>
              </aside>
            </div>
          </Section>

          <Section id="about" title="About">
            <div className="about-layout">
              <div className="about-copy">
                <p className="section-kicker">A little about me</p>
                <h3>Curious about how things work. Driven to build them better.</h3>
                <p>
                  I’m Nelvin Ochieng, a Full-Stack & Backend Software Developer focused on Go, Python, web platforms,
                  and data. I enjoy turning ideas into practical software and understanding how the pieces of a system fit together.
                </p>
                <p>
                  I work with Go, Python, Django, Flask, SQL, HTML, and CSS, with an interest in backend development,
                  database design, and integrations such as M-Pesa STK Push and OAuth. I also explore data analytics using Power BI and Excel.
                </p>
                <p>
                  I enjoy collaborative environments, clean code, clear documentation, and learning through building.
                  I’m still growing as a developer, and each project is another opportunity to learn something new and build better.
                </p>
              </div>

              <div className="about-side">
                <span className="mono-label">Technical Toolkit</span>
                <div className="competency-group">
                  <h4>Languages</h4>
                  <p>Go · Python · SQL · HTML · CSS</p>
                </div>
                <div className="competency-group">
                  <h4>Frameworks</h4>
                  <p>Django · Flask</p>
                </div>
                <div className="competency-group">
                  <h4>Integrations</h4>
                  <p>M-Pesa STK Push · OAuth</p>
                </div>
                <div className="competency-group">
                  <h4>Data</h4>
                  <p>SQL · Power BI · Excel</p>
                </div>
                <div className="competency-group">
                  <h4>Tools</h4>
                  <p>Git · GitHub · Gitea · Linux / Unix Shell</p>
                </div>
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
                ["X", siteConfig.socials.x, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.683l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>],
                ["LinkedIn", siteConfig.socials.linkedin, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.98H3.54v11.47Z" /></svg>],
                ["GitHub", siteConfig.socials.github, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.64-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z" /></svg>],
                ["dev.to", siteConfig.socials.devto, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.25 4.5h9.5A2.75 2.75 0 0 1 19.5 7.25v9.5a2.75 2.75 0 0 1-2.75 2.75h-9.5A2.75 2.75 0 0 1 4.5 16.75v-9.5A2.75 2.75 0 0 1 7.25 4.5Zm.75 3v9h1.75V13h1.1c1.6 0 2.6-1.08 2.6-2.75S12.45 7.5 10.85 7.5H8Zm1.75 1.5h1.02c.64 0 .93.42.93 1.25s-.29 1.25-.93 1.25H9.75V9Zm4.5-1.5v9h4v-1.5h-2.25v-2.25h2v-1.5h-2V9h2.25V7.5h-4Z" /></svg>],
                ["Instagram", siteConfig.socials.instagram, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2.5h9A5 5 0 0 1 21.5 7.5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 4.3 7.5v9a3.2 3.2 0 0 0 3.2 3.2h9a3.2 3.2 0 0 0 3.2-3.2v-9a3.2 3.2 0 0 0-3.2-3.2h-9Zm9.65 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 1.8a2.95 2.95 0 1 0 0 5.9 2.95 2.95 0 0 0 0-5.9Z" /></svg>],
                ["WhatsApp", siteConfig.socials.whatsapp, <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.22 14.26L2.5 21.5l4.9-1.25A9.5 9.5 0 1 0 12 2.5Zm0 1.8a7.7 7.7 0 0 1 6.55 11.74l-.3.47.72 2.7-2.77-.71-.45.27A7.7 7.7 0 1 1 12 4.3Zm-3.2 3.3c-.22 0-.57.08-.87.42-.3.34-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.27 3.64 5.57 4.95 2.75 1.09 3.31.87 3.91.82.6-.05 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.39-.33-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.01-2.45-.27-.65-.54-.55-.74-.56Z" /></svg>],
              ]
                .filter(([, href]) => href && !href.includes("["))
                .map(([label, href, icon]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                    <span className="social-icon" aria-hidden="true">{icon}</span>
                    <span className="social-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              <a href={`mailto:${siteConfig.email}`} aria-label="Email" title="Email">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h17A2.5 2.5 0 0 1 23 8v8a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 16V8a2.5 2.5 0 0 1 2.5-2.5Zm0 1.8a.7.7 0 0 0-.42.14L12 13.66l8.92-6.22a.7.7 0 0 0-.42-.14h-17ZM21.2 9.08l-8.69 6.05a.9.9 0 0 1-1.02 0L2.8 9.08V16a.7.7 0 0 0 .7.7h17a.7.7 0 0 0 .7-.7V9.08Z" /></svg>
                </span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </a>
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
