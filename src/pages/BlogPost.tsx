import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import SEOHead from "@/components/SEOHead";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const related = slug ? getRelatedPosts(slug, 3) : [];

  if (!post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold font-sans mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you are looking for does not exist.</p>
          <Link to="/blog" className="text-primary font-sans text-sm font-medium hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "Dhethi" },
  };

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.metaDescription}
        type="article"
        article={{ publishedTime: post.date, author: post.author, tags: post.tags }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/blog" className="text-sm font-sans text-primary hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-xs font-sans font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
            >
              {post.category}
            </Link>
            <span className="text-xs text-muted-foreground font-sans">{post.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold font-sans text-foreground leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        <div className="prose max-w-none">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i}>{block.replace("## ", "")}</h2>;
            }
            if (block.startsWith("### ")) {
              return <h3 key={i}>{block.replace("### ", "")}</h3>;
            }
            if (block.startsWith("```")) {
              const lines = block.split("\n");
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre key={i}>
                  <code>{code}</code>
                </pre>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-sans px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-sans text-xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
