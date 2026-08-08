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
  Download,
  Gauge,
  Github,
  Globe2,
  Server,
  Smartphone,
  Users,
} from "lucide-react";

const productSurfaces = [
  {
    icon: Globe2,
    label: "Web",
    detail: "Next.js product experience",
  },
  {
    icon: Server,
    label: "API",
    detail: "FastAPI services and automation",
  },
  {
    icon: Smartphone,
    label: "Android",
    detail: "Native Kotlin and Compose",
  },
  {
    icon: Smartphone,
    label: "iOS",
    detail: "Native Swift and SwiftUI",
  },
];

const productMetrics = [
  { icon: Users, value: "4K+", label: "daily active users" },
  { icon: Activity, value: "22K+", label: "daily API calls" },
  { icon: Download, value: "10K+", label: "Play downloads" },
  { icon: Gauge, value: "<40ms", label: "cached responses" },
];

const principles = [
  {
    number: "01",
    title: "Start with a real problem",
    description:
      "Build for a specific person and a repeated frustration—not for a feature checklist.",
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
      "Reliability, observability, cost, and user feedback are part of the build—not an afterthought.",
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
    topic: "Algorithms",
    title: "Three tree traversals in one recursive pass",
    description:
      "A compact technique for producing preorder, inorder, and postorder traversals together.",
    href: "https://www.geeksforgeeks.org/dsa/pre-order-post-order-and-in-order-traversal-of-a-binary-tree-in-one-traversal-using-recursion/",
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
  return (
    <Layout>
      <SEOHead
        title="Dhethi — Useful software, built all the way through"
        description="Dhethi is an independent product brand creating practical web, mobile, backend, and platform software. Home of JNTUH Connect."
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
              backend products—then keeps them fast, useful, and running.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#product">
                Explore the flagship
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                className="button button-quiet"
                href="#principles"
              >
                How Dhethi builds
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-object reveal reveal-delay" aria-label="Dhethi product system">
            <div className="object-label">
              <span>Now operating</span>
              <strong>01 live product</strong>
            </div>
            <div className="object-core">
              <span className="object-mark">d.</span>
              <span className="object-ring" aria-hidden="true" />
              <span className="object-ring object-ring-two" aria-hidden="true" />
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
            <span>PRODUCT ENGINEERING</span><i />
            <span>NATIVE MOBILE</span><i />
            <span>BACKEND SYSTEMS</span><i />
            <span>RELEASE AUTOMATION</span><i />
            <span>PRODUCTION OPERATIONS</span><i />
          </div>
        </div>
      </section>

      <section id="product" className="product-section section-pad">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Product 01 · Live</p>
              <h2>A student utility became a complete product system.</h2>
            </div>
            <p>
              JNTUH Connect started with one recurring problem: getting university
              results without friction. It now brings 12+ academic and career tools
              together across four production surfaces.
            </p>
          </div>

          <article className="product-card">
            <div className="product-topline">
              <div className="product-identity">
                <span className="product-icon" aria-hidden="true">JC</span>
                <div>
                  <p>Independently built &amp; operated</p>
                  <h3>JNTUH Connect</h3>
                </div>
              </div>
              <span className="live-pill"><span /> Live in production</span>
            </div>

            <div className="product-main">
              <div className="product-story">
                <p className="product-intro">
                  Results, credits, backlogs, resources, rankings, careers, and
                  university updates—designed for the students who use them every day.
                </p>
                <div className="product-links">
                  <a
                    href="https://jntuhconnect.dhethi.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open the web product <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Play <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/jntuh-connect/id6790828236"
                    target="_blank"
                    rel="noreferrer"
                  >
                    App Store <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="metric-grid">
                {productMetrics.map(({ icon: Icon, value, label }) => (
                  <div className="metric" key={label}>
                    <Icon size={18} aria-hidden="true" />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-grid">
              {productSurfaces.map(({ icon: Icon, label, detail }, index) => (
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
                <Cloud size={20} aria-hidden="true" />
                <p>
                  <strong>Lean production economics</strong>
                  The complete AWS, Cloudflare, web, API, and app-store footprint
                  operates for under $14 per month.
                </p>
              </div>
              <a
                href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} aria-hidden="true" /> View source
              </a>
            </div>
          </article>
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
            <div><Code2 size={18} aria-hidden="true" /> React &amp; Next.js</div>
            <div><Server size={18} aria-hidden="true" /> FastAPI &amp; Java</div>
            <div><Boxes size={18} aria-hidden="true" /> Postgres, Redis &amp; queues</div>
            <div><Cloud size={18} aria-hidden="true" /> AWS &amp; Cloudflare</div>
          </div>
        </div>
      </section>

      <section id="brand" className="builder-section section-pad">
        <div className="shell builder-grid">
          <div className="builder-title">
            <p className="section-kicker">Why Dhethi</p>
            <h2>A home for products that earn their place.</h2>
            <div className="builder-mark" aria-hidden="true">d.</div>
          </div>

          <div className="builder-copy">
            <p className="builder-lede">
              Dhethi is a standalone product brand for focused digital tools that
              solve specific, repeated problems.
            </p>
            <p>
              Each product is expected to be clear, dependable, economical to run,
              and useful beyond its launch day. JNTUH Connect is the first complete
              expression of that standard.
            </p>

            <div className="builder-proof">
              <div>
                <Compass size={20} aria-hidden="true" />
                <span>Purpose<br /><strong>Practical problems first</strong></span>
              </div>
              <div>
                <Gauge size={20} aria-hidden="true" />
                <span>Standard<br /><strong>Fast and dependable</strong></span>
              </div>
              <div>
                <Cloud size={20} aria-hidden="true" />
                <span>Ownership<br /><strong>Built to keep running</strong></span>
              </div>
            </div>

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
              <a href={note.href} target="_blank" rel="noreferrer" key={note.href}>
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
          <p className="section-kicker">What comes next</p>
          <h2>One live product. More useful work ahead.</h2>
          <p>
            Dhethi is focused on building and operating practical digital products.
            New releases and experiments will appear here when they are ready.
          </p>
          <a
            className="button button-invert"
            href="https://jntuhconnect.dhethi.com/"
            target="_blank"
            rel="noreferrer"
          >
            Explore JNTUH Connect
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
