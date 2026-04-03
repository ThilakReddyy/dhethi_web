import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import SEOHead from "@/components/SEOHead";
import { blogPosts, getFeaturedPosts, categories } from "@/data/posts";

const Index = () => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = getFeaturedPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recent = sortedPosts.slice(0, 6);

  return (
    <Layout>
      <SEOHead
        title="Programming Tutorials & Developer Resources"
        description="Dhethi offers high-quality programming tutorials, coding guides, and developer resources. Learn JavaScript, Python, React, and more."
        canonical="https://dhethi.com/"
      />

      {/* WebSite Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Dhethi",
            url: "https://dhethi.com",
            description: "High-quality programming tutorials and developer resources.",
            publisher: { "@type": "Organization", name: "Dhethi" },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-foreground mb-4 leading-tight">
            Learn to Code,<br />
            <span className="text-primary">Build Better Software</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            In-depth programming tutorials and developer guides. Clear explanations, practical examples, and real-world best practices.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Articles
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-2.5 bg-secondary text-secondary-foreground font-sans text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/blog?category=${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 text-xs font-sans font-medium rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="font-sans text-xl font-bold text-foreground mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((post) => (
            <BlogCard key={post.id} post={post} featured />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans text-xl font-bold text-foreground">Latest Articles</h2>
          <Link to="/blog" className="text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
