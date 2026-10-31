import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
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
  Wallet,
  Zap,
} from "lucide-react";

const stats = [
  { icon: Boxes, value: "02", label: "Live products", detail: "JNTUH Connect and BhuBharati Explorer" },
  { icon: Users, value: "4K+", label: "Daily users", detail: "Students on JNTUH Connect every day" },
  { icon: Activity, value: "22K+", label: "Daily API calls", detail: "Served from cached, async services" },
  { icon: Wallet, value: "<$14", label: "Monthly infra", detail: "Full AWS, Cloudflare and app-store footprint" },
];

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

const hostOf = (href: string) => new URL(href).host;

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];
  const FootIcon = activeProduct.foot.icon;

  return (
    <Layout>
      <SEOHead
        title="Dhethi - Useful software, built all the way through"
        description="Dhethi is an independent product brand creating practical web, mobile, backend, and platform software. Home of JNTUH Connect and BhuBharati Explorer."
        canonical="https://dhethi.com/"
      />

      <section className="hero band band-card" aria-labelledby="hero-title">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Independent product home</p>
            <h1 id="hero-title">
              Useful software, built all the way <span className="highlight">through</span>.
            </h1>
            <p className="hero-lede">
              Dhethi turns practical problems into dependable web, mobile, and
              backend products — then keeps them fast, useful, and running.
            </p>
            <div className="hero-actions">
              <a className="button button-primary button-lg" href="#product">
                Explore the products
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="button button-outline button-lg" href="#principles">
                How Dhethi builds
              </a>
            </div>
            <div className="hero-chips">
              <span className="mono-meta">Also here</span>
              <a className="chip" href="#services">Services</a>
              <a className="chip" href="#notes">Build notes</a>
              <a className="chip" href="#contact">Work with us</a>
            </div>
          </div>

          <div className="register panel" aria-label="Dhethi product register">
            <div className="panel-band">
              <h2>Product register</h2>
              <span className="mono-meta">0{products.length} live</span>
            </div>
            <div>
              {products.map((p) => (
                <a
                  key={p.id}
                  className="register-row"
                  href={p.links[0].href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon-box icon-box-lg" aria-hidden="true">
                    {p.tag}
                  </span>
                  <span className="register-body">
                    <strong>{p.name}</strong>
                    <small>{hostOf(p.links[0].href)}</small>
                  </span>
                  <span className="register-status mono-meta">
                    <span className="live-dot" aria-hidden="true" /> Live
                  </span>
                </a>
              ))}
            </div>
            <div className="register-surfaces" aria-label="Surfaces Dhethi ships on">
              <span>Web</span>
              <span>API</span>
              <span>Android</span>
              <span>iOS</span>
              <span>MCP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-paper" aria-labelledby="stats-title">
        <div className="shell" style={{ paddingBlock: 40 }}>
          <h2 id="stats-title" className="eyebrow eyebrow-sm">
            Where Dhethi stands today
          </h2>
          <div className="stats-grid">
            {stats.map(({ icon: Icon, value, label, detail }) => (
              <div className="stat" key={label}>
                <Icon size={16} aria-hidden="true" />
                <strong>{value}</strong>
                <span>{label}</span>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="section-pad">
        <div className="shell">
          <div className="group-head">
            <h2>Products</h2>
            <p>{activeProduct.kicker}</p>
          </div>

          <div className="product-head">
            <div>
              <h2 className="section-title" style={{ marginTop: 0 }}>
                {activeProduct.heading}
              </h2>
              <p className="section-lede">{activeProduct.intro}</p>
            </div>
            <div className="tabs" role="tablist" aria-label="Dhethi products">
              {products.map((p, index) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <article className="product-panel panel">
            <div className="panel-band">
              <h3>{activeProduct.eyebrow}</h3>
              <span className="register-status mono-meta" style={{ marginTop: 0 }}>
                <span className="live-dot" aria-hidden="true" /> Live in production
              </span>
            </div>

            <div className={`product-main${activeProduct.metrics.length === 1 ? " product-main-solo" : ""}`}>
              <div>
                <div className="product-identity">
                  <span className="icon-box icon-box-lg" aria-hidden="true">
                    {activeProduct.tag}
                  </span>
                  <h3>{activeProduct.name}</h3>
                </div>
                <p className="product-story">{activeProduct.story}</p>
                <div className="product-links">
                  {activeProduct.links.map((link, index) => (
                    <a
                      key={link.href}
                      className={`button ${index === 0 ? "button-primary" : "button-outline"}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={`metric-grid${activeProduct.metrics.length === 1 ? " metric-grid-solo" : ""}`}
              >
                {activeProduct.metrics.map(({ icon: Icon, value, label }) => (
                  <div className="stat" key={label}>
                    <Icon size={16} aria-hidden="true" />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ledger-grid">
              {activeProduct.surfaces.map(({ icon: Icon, label, detail }, index) => (
                <div className="ledger-cell" key={label}>
                  <div className="ledger-cell-head">
                    <Icon size={17} aria-hidden="true" />
                    <span className="mono-meta">0{index + 1}</span>
                  </div>
                  <strong>{label}</strong>
                  <p>{detail}</p>
                </div>
              ))}
            </div>

            <div className="panel-foot product-foot">
              <div>
                <FootIcon size={14} aria-hidden="true" />
                <p>
                  <strong>{activeProduct.foot.title}</strong>
                  {activeProduct.foot.text}
                </p>
              </div>
              {activeProduct.foot.link && (
                <a
                  className="text-link"
                  href={activeProduct.foot.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={13} aria-hidden="true" /> {activeProduct.foot.link.label}
                </a>
              )}
            </div>
          </article>
        </div>
      </section>

      <section id="services" className="band band-sage section-pad" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="shell">
          <div className="group-head">
            <h2>Services</h2>
            <p>Two builders. Three service lines.</p>
          </div>

          <div className="card-grid">
            {services.map(({ number, icon: Icon, title, headline, description, tags }) => (
              <article className="tool-card" key={number}>
                <div className="tool-card-head">
                  <span className="icon-box" aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <span className="tag">{number}</span>
                </div>
                <p className="eyebrow eyebrow-sm">{title}</p>
                <h3>{headline}</h3>
                <p>{description}</p>
                <div className="tool-card-tags">
                  {tags.map((tag) => (
                    <span className="tag tag-paper" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="band section-pad">
        <div className="shell">
          <div className="group-head">
            <h2>How Dhethi builds</h2>
            <p>Small surface area. Serious ownership.</p>
          </div>
          <p className="section-lede">
            The name on the product should be accountable for the experience,
            the infrastructure, and what happens after release.
          </p>

          <table className="ledger-table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Principle</th>
                <th scope="col">In practice</th>
              </tr>
            </thead>
            <tbody>
              {principles.map((principle) => (
                <tr key={principle.number}>
                  <td>{principle.number}</td>
                  <td>{principle.title}</td>
                  <td>{principle.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="stack-line">
            <span className="mono-meta">Stack</span>
            <span className="chip">
              <Code2 size={14} aria-hidden="true" /> React &amp; Next.js
            </span>
            <span className="chip">
              <Server size={14} aria-hidden="true" /> FastAPI &amp; Java
            </span>
            <span className="chip">
              <Boxes size={14} aria-hidden="true" /> Postgres, Redis &amp; queues
            </span>
            <span className="chip">
              <Cloud size={14} aria-hidden="true" /> AWS &amp; Cloudflare
            </span>
          </div>
        </div>
      </section>

      <section id="brand" className="band band-card section-pad">
        <div className="shell brand-grid">
          <div>
            <p className="eyebrow">Why Dhethi</p>
            <h2 className="section-title">A home for products that earn their place.</h2>
          </div>

          <div className="brand-copy">
            <p className="brand-lede">
              Dhethi is a standalone product brand for focused digital tools
              that solve specific, repeated problems.
            </p>
            <p>
              Each product is expected to be clear, dependable, economical to
              run, and useful beyond its launch day. JNTUH Connect is the first
              complete expression of that standard.
            </p>

            <div className="proof-grid">
              {[
                { icon: Compass, label: "Purpose", value: "Practical problems first" },
                { icon: Gauge, label: "Standard", value: "Fast and dependable" },
                { icon: Cloud, label: "Ownership", value: "Built to keep running" },
              ].map(({ icon: Icon, label, value }) => (
                <div className="stat" key={label}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <figure className="ownership panel panel-ink" style={{ margin: "28px 0 0" }}>
              <div className="panel-band">
                <h3>Ownership statement</h3>
              </div>
              <blockquote>
                We don't assume we're the smartest team in the room. But we know
                we're one of the most reliable. Skills can be trained. Experience
                can be gained. What's harder to teach is ownership. If something
                has the Dhethi name on it, it gets done properly.
              </blockquote>
            </figure>

            <div className="brand-links">
              <a className="chip" href="https://jntuhconnect.dhethi.com/" target="_blank" rel="noreferrer">
                JNTUH Connect <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                className="chip"
                href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
                target="_blank"
                rel="noreferrer"
              >
                Google Play <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                className="chip"
                href="https://apps.apple.com/in/app/jntuh-connect/id6790828236"
                target="_blank"
                rel="noreferrer"
              >
                App Store <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="notes" className="band section-pad">
        <div className="shell">
          <div className="group-head">
            <h2>Build notes</h2>
            <p>Lessons from the work.</p>
          </div>

          <div className="notes-panel panel panel-sm">
            {notes.map((note, index) => (
              <a className="note-row" href={note.href} target="_blank" rel="noreferrer" key={note.href}>
                <span className="note-index">0{index + 1}</span>
                <span className="tag tag-paper">{note.topic}</span>
                <span className="note-copy">
                  <strong>{note.title}</strong>
                  <small>{note.description}</small>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="band band-sage section-pad">
        <div className="shell">
          <div className="contact-panel panel panel-ink">
            <div className="panel-band">
              <h2>
                <span className="live-dot live-dot-ink" aria-hidden="true" />
                Let's talk
              </h2>
              <span className="mono-meta">We reply personally</span>
            </div>
            <div className="contact-body">
              <div>
                <h2>Got an idea? Need something built?</h2>
                <p>
                  Tell us the problem worth solving. Two lines is enough. We
                  only take on work we can build all the way through.
                  Collaborations welcome — especially if you're a student with
                  a real idea and no team yet.
                </p>
              </div>
              <div className="contact-actions">
                <a
                  className="button button-primary button-lg"
                  href="mailto:thilakreddy@dhethi.com?subject=Hi%20Dhethi%20%E2%80%94%20I%20have%20an%20idea"
                >
                  <span>
                    <Mail size={16} aria-hidden="true" /> thilakreddy@dhethi.com
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  className="button button-outline button-lg"
                  href="https://www.instagram.com/__thilak_reddy__/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <Instagram size={16} aria-hidden="true" /> DM on Instagram
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  className="button button-outline button-lg"
                  href="https://www.linkedin.com/company/dhethi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <Linkedin size={16} aria-hidden="true" /> Follow on LinkedIn
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
