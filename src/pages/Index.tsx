import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Cloud,
  Code2,
  Compass,
  Database,
  Download,
  Gauge,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Server,
  Smartphone,
  Users,
  Bot,
  Zap,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Bot,
    title: "AI Integration",
    headline: "AI that does something useful",
    description:
      "LLM integrations, agents, RAG pipelines, and AI features built to run in production, not just proof-of-concepts.",
    tags: ["LLM Integration", "AI Agents", "RAG", "OpenAI · Claude · Gemini"],
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Web & Mobile",
    headline: "Products people actually use",
    description:
      "React web apps, Android, and iOS, designed and built together so nothing gets lost between design and code.",
    tags: ["React / Next.js", "Android", "iOS", "UI/UX Design"],
  },
  {
    number: "03",
    icon: Zap,
    title: "Automation",
    headline: "Repetitive work, automated",
    description:
      "Custom pipelines, scheduled jobs, and workflow automation that replaces manual processes with something dependable.",
    tags: [
      "FastAPI",
      "Data Pipelines",
      "Workflow Automation",
      "Scraping & Scheduling",
    ],
  },
];

const products = [
  {
    id: "jntuh-connect",
    tag: "JC",
    name: "JNTUH Connect",
    kicker: "Product 01 · Live",
    heading: "A student utility became a complete product system.",
    intro:
      "JNTUH Connect started with one recurring problem: getting university results without friction. It now brings 12+ academic and career tools together across four production surfaces.",
    eyebrow: "Independently built & operated",
    story:
      "Results, credits, backlogs, resources, rankings, careers, and university updates, designed for the students who use them every day.",
    links: [
      {
        label: "Open the web product",
        href: "https://jntuhconnect.dhethi.com/",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/jntuh-connect/id6790828236",
      },
    ],
    metrics: [
      { icon: Users, value: "4K+", label: "daily active users" },
      { icon: Activity, value: "22K+", label: "daily API calls" },
      { icon: Download, value: "10K+", label: "Play downloads" },
      { icon: Gauge, value: "<40ms", label: "cached responses" },
    ],
    surfaces: [
      { icon: Globe2, label: "Web", detail: "Next.js product experience" },
      { icon: Server, label: "API", detail: "FastAPI services and automation" },
      { icon: Smartphone, label: "Android", detail: "Native Kotlin and Compose" },
      { icon: Smartphone, label: "iOS", detail: "Native Swift and SwiftUI" },
    ],
    foot: {
      icon: Cloud,
      title: "Lean production economics",
      text: "The complete AWS, Cloudflare, web, API, and app-store footprint operates for under $14 per month.",
      link: {
        label: "View source",
        href: "https://github.com/ThilakReddyy/JNTUHRESULTS-WEB",
      },
    },
  },
  {
    id: "bhubharati-explorer",
    tag: "BB",
    name: "BhuBharati Explorer",
    kicker: "Product 02 · Live",
    heading: "Public land records, made searchable.",
    intro:
      "BhuBharati Explorer turns Telangana's public land-record portal into a guided search, district to mandal to village to record, with live streaming and exportable results.",
    eyebrow: "Independently built & operated",
    story:
      "Search, filter, sort, and export survey and Khata records, with Telugu owner names searchable by English pronunciation and real progress streaming instead of a simulated loading bar.",
    links: [
      {
        label: "Open the web product",
        href: "https://bhubharati.dhethi.com/",
      },
    ],
    metrics: [{ icon: Users, value: "200+", label: "daily active users" }],
    surfaces: [
      { icon: Globe2, label: "Web", detail: "Guided district to mandal to village search" },
      { icon: Server, label: "API", detail: "FastAPI backend with live SSE streaming" },
      { icon: Boxes, label: "MCP Server", detail: "12 tools for AI clients over streamable HTTP" },
      { icon: Database, label: "Database", detail: "PostgreSQL-backed hierarchy cache" },
    ],
    foot: {
      icon: Compass,
      title: "Unofficial and read-only",
      text: "Public portal data, made understandable. Verify anything consequential against the official source.",
      link: null,
    },
  },
];

const principles = [
  {
    number: "01",
    title: "Start with a real problem",
    description:
      "Build for a specific person and a repeated frustration, not for a feature checklist.",
  },
  {
    number: "02",
    title: "Own the whole path",
    description:
      "Design, interfaces, services, data, delivery, and support should work as one product.",
  },
  {
    number: "03",
    title: "Operate what ships",
    description:
      "Reliability, observability, cost, and user feedback are part of the build, not an afterthought.",
  },
  {
    number: "04",
    title: "Stay deliberately lean",
    description:
      "Use the smallest dependable system that can serve real users and grow without drama.",
  },
];

const notes = [
  {
    topic: "Architecture",
    title: "How JNTUH Results grew to 22K+ API calls a day",
    description:
      "The practical evolution from a simple script to cached, asynchronous production services.",
    href: "https://thilakreddy.medium.com/how-i-scaled-jntuh-results-vercel-from-a-simple-script-to-22k-api-calls-daily-e3e3052fff32",
  },
  {
    topic: "Automation",
    title: "Building useful automation with Postman",
    description:
      "Turning repeatable API work into clear collections and dependable workflows.",
    href: "https://www.geeksforgeeks.org/websites-apps/how-to-make-automation-projects-using-postman/",
  },
];

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  return (
    <Layout>
      <SEOHead
        title="Dhethi - Useful software, built all the way through"
        description="Dhethi is an independent product brand creating practical web, mobile, backend, and platform software. Home of JNTUH Connect and BhuBharati Explorer."
        canonical="https://dhethi.com/"
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="grid-wash" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />

        <div className="shell hero-inner">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Independent product home
            </p>
            <h1 id="hero-title">
              Useful software,
              <span>built all the way through.</span>
            </h1>
            <p className="hero-lede">
              Dhethi turns practical problems into dependable web, mobile, and
              backend products, then keeps them fast, useful, and running.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#product">
                Explore the flagship
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#principles">
                How Dhethi builds
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div
            className="hero-object reveal reveal-delay"
            aria-label="Dhethi product system"
          >
            <div className="object-label">
              <span>Now operating</span>
              <strong>0{products.length} live products</strong>
            </div>
            <div className="object-core">
              <span className="object-mark">d.</span>
              <span className="object-ring" aria-hidden="true" />
              <span
                className="object-ring object-ring-two"
                aria-hidden="true"
              />
            </div>
            <div className="object-footer">
              <span>Web</span>
              <span>API</span>
              <span>Android</span>
              <span>iOS</span>
            </div>
          </div>
        </div>

        <div className="hero-ticker" aria-label="Dhethi capabilities">
          <div className="ticker-track">
            <span>PRODUCT ENGINEERING</span>
            <i />
            <span>NATIVE MOBILE</span>
            <i />
            <span>BACKEND SYSTEMS</span>
            <i />
            <span>RELEASE AUTOMATION</span>
            <i />
            <span>PRODUCTION OPERATIONS</span>
            <i />
          </div>
        </div>
      </section>

      <section id="product" className="product-section section-pad">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="product-kicker-row">
                <p className="section-kicker">{activeProduct.kicker}</p>
                <div className="product-switch" role="tablist" aria-label="Dhethi products">
                  {products.map((p, index) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      className={`product-switch-tab${index === activeIndex ? " is-active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <h2>{activeProduct.heading}</h2>
            </div>
            <p>{activeProduct.intro}</p>
          </div>

          <article className="product-card">
            <div className="product-topline">
              <div className="product-identity">
                <span className="product-icon" aria-hidden="true">
                  {activeProduct.tag}
                </span>
                <div>
                  <p>{activeProduct.eyebrow}</p>
                  <h3>{activeProduct.name}</h3>
                </div>
              </div>

              <span className="live-pill">
                <span /> Live in production
              </span>
            </div>

            <div
              className={`product-main${activeProduct.metrics ? "" : " product-main-solo"}`}
            >
              <div className="product-story">
                <p className="product-intro">{activeProduct.story}</p>
                <div className="product-links">
                  {activeProduct.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {activeProduct.metrics && (
                <div
                  className={`metric-grid${activeProduct.metrics.length === 1 ? " metric-grid-solo" : ""}`}
                >
                  {activeProduct.metrics.map(({ icon: Icon, value, label }) => (
                    <div className="metric" key={label}>
                      <Icon size={18} aria-hidden="true" />
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="surface-grid">
              {activeProduct.surfaces.map(({ icon: Icon, label, detail }, index) => (
                <div className="surface" key={label}>
                  <div className="surface-head">
                    <Icon size={19} aria-hidden="true" />
                    <span>0{index + 1}</span>
                  </div>
                  <strong>{label}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>

            <div className="product-foot">
              <div>
                <activeProduct.foot.icon size={20} aria-hidden="true" />
                <p>
                  <strong>{activeProduct.foot.title}</strong>
                  {activeProduct.foot.text}
                </p>
              </div>
              {activeProduct.foot.link && (
                <a
                  href={activeProduct.foot.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} aria-hidden="true" /> {activeProduct.foot.link.label}
                </a>
              )}
            </div>
          </article>
        </div>
      </section>

      <section id="services" className="services-section section-pad">
        <div className="shell">
          <div className="section-heading section-heading-solo">
            <div>
              <p className="section-kicker">What we build</p>
              <h2>Two builders. Three service lines.</h2>
            </div>
          </div>

          <div className="service-grid">
            {services.map(
              ({ number, icon: Icon, title, headline, description, tags }) => (
                <article className="service-card" key={number}>
                  <div className="service-card-head">
                    <span className="service-number">{number}</span>
                    <span className="service-icon-wrap">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="service-label">{title}</p>
                  <h3>{headline}</h3>
                  <p className="service-desc">{description}</p>
                  <div className="service-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="principles" className="principles-section section-pad">
        <div className="shell">
          <div className="section-heading section-heading-light">
            <div>
              <p className="section-kicker">How Dhethi builds</p>
              <h2>Small surface area. Serious ownership.</h2>
            </div>
            <p>
              The name on the product should be accountable for the experience,
              the infrastructure, and what happens after release.
            </p>
          </div>

          <div className="principle-grid">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>

          <div className="stack-line">
            <div>
              <Code2 size={18} aria-hidden="true" /> React &amp; Next.js
            </div>
            <div>
              <Server size={18} aria-hidden="true" /> FastAPI &amp; Java
            </div>
            <div>
              <Boxes size={18} aria-hidden="true" /> Postgres, Redis &amp;
              queues
            </div>
            <div>
              <Cloud size={18} aria-hidden="true" /> AWS &amp; Cloudflare
            </div>
          </div>
        </div>
      </section>

      <section id="brand" className="builder-section section-pad">
        <div className="shell builder-grid">
          <div className="builder-title">
            <p className="section-kicker">Why Dhethi</p>
            <h2>A home for products that earn their place.</h2>
            <div className="builder-mark" aria-hidden="true">
              d.
            </div>
          </div>

          <div className="builder-copy">
            <p className="builder-lede">
              Dhethi is a standalone product brand for focused digital tools
              that solve specific, repeated problems.
            </p>
            <p>
              Each product is expected to be clear, dependable, economical to
              run, and useful beyond its launch day. JNTUH Connect is the first
              complete expression of that standard.
            </p>

            <div className="builder-proof">
              <div>
                <Compass size={20} aria-hidden="true" />
                <span>
                  Purpose
                  <br />
                  <strong>Practical problems first</strong>
                </span>
              </div>
              <div>
                <Gauge size={20} aria-hidden="true" />
                <span>
                  Standard
                  <br />
                  <strong>Fast and dependable</strong>
                </span>
              </div>
              <div>
                <Cloud size={20} aria-hidden="true" />
                <span>
                  Ownership
                  <br />
                  <strong>Built to keep running</strong>
                </span>
              </div>
            </div>

            <p className="builder-ownership">
              We don't assume we're the smartest team in the room. But we know
              we're one of the most reliable. Skills can be trained. Experience
              can be gained. What's harder to teach is ownership. If something
              has the Dhethi name on it, it gets done properly.
            </p>

            <div className="builder-links">
              <a
                href="https://jntuhconnect.dhethi.com/"
                target="_blank"
                rel="noreferrer"
              >
                JNTUH Connect <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
                target="_blank"
                rel="noreferrer"
              >
                Google Play <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://apps.apple.com/in/app/jntuh-connect/id6790828236"
                target="_blank"
                rel="noreferrer"
              >
                App Store <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="notes" className="notes-section section-pad">
        <div className="shell">
          <div className="notes-heading">
            <div>
              <p className="section-kicker">Build notes</p>
              <h2>Lessons from the work.</h2>
            </div>
            <BookOpen size={34} aria-hidden="true" />
          </div>

          <div className="notes-list">
            {notes.map((note, index) => (
              <a
                href={note.href}
                target="_blank"
                rel="noreferrer"
                key={note.href}
              >
                <span className="note-index">0{index + 1}</span>
                <span className="note-topic">{note.topic}</span>
                <span className="note-copy">
                  <strong>{note.title}</strong>
                  <small>{note.description}</small>
                </span>
                <ArrowUpRight size={21} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="shell contact-inner">
          <p className="section-kicker">Let&apos;s talk</p>
          <h2>Got an idea? Need something built?</h2>
          <p>
            Tell us the problem worth solving. Two lines is enough. We reply
            personally and only take on work we can build all the way through.
            Collaborations welcome, especially if you&apos;re a student with a
            real idea and no team yet.
          </p>
          <div
            className="hero-actions"
            style={{ justifyContent: "center", marginTop: "2.4rem" }}
          >
            <a
              className="button button-invert"
              href="mailto:thilakreddy@dhethi.com?subject=Hi%20Dhethi%20%E2%80%94%20I%20have%20an%20idea"
            >
              <Mail size={18} aria-hidden="true" />
              thilakreddy@dhethi.com
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="button button-quiet"
              href="https://www.instagram.com/__thilak_reddy__/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} aria-hidden="true" />
              DM on Instagram
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="button button-quiet"
              href="https://www.linkedin.com/company/dhethi/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} aria-hidden="true" />
              Follow on LinkedIn
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
