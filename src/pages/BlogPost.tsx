import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import SEOHead from "@/components/SEOHead";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getPostBySlug, getRelatedPosts, formatDate } from "@/data/posts";
import { Check, Copy } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    return slug ? getPostBySlug(slug) : undefined;
  }, [slug]);

  const related = useMemo(() => {
    return slug ? getRelatedPosts(slug, 3) : [];
  }, [slug]);

  const jsonLd = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      author: { "@type": "Organization", name: post.author },
      datePublished: post.date,
      publisher: { "@type": "Organization", name: "Dhethi" },
    };
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you are looking for does not exist.
          </p>
          <Link to="/blog" className="text-primary text-sm font-medium hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const renderContent = (content: string) => {
    const [copiedCode, setCopiedCode] = useState<string>("");
    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);

        setCopiedCode(text);

        setTimeout(() => setCopiedCode(""), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };
    return <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const isInline = !className;

          if (isInline) {
            return (
              <code
                className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono border"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <div className=" rounded-md overflow-hidden border border-gray-200 relative group">
              {language && (
                <div className="px-4 py-2 text-xs font-mono text-gray-600 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <span>{language}</span>

                  <button
                    onClick={() =>
                      copyToClipboard(String(children))
                    }
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-200 rounded"
                    title="Copy code"
                  >
                    {copiedCode === String(children) ? (
                      <Check
                        size={14}
                        className="text-green-600"
                      />
                    ) : (
                      <Copy size={14} className="text-gray-600" />
                    )}
                  </button>
                </div>
              )}

              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 overflow-x-auto text-sm p-0">
                  <code className="font-mono" {...props}>
                    {children}
                  </code>
                </pre>

                {!language && (
                  <button
                    onClick={() =>
                      copyToClipboard(String(children))
                    }
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-700 rounded"
                    title="Copy code"
                  >
                    {copiedCode === String(children) ? (
                      <Check
                        size={14}
                        className="text-green-400"
                      />
                    ) : (
                      <Copy size={14} className="text-gray-300" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        },
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-3 space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-3 space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 text-gray-900">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold mb-3 text-gray-900">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold mb-2 text-gray-900">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-sm font-semibold mb-2 text-gray-900">
            {children}
          </h4>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-200 pl-4 py-2 my-3 bg-blue-50 italic text-gray-700 rounded-r">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
            {children}
          </td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800">{children}</em>
        ),
        hr: () => (
          <hr className="my-4 border-0 h-px bg-gray-300 hidden" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>

  };

  return (
    <Layout>
      <SEOHead
        title={post.title}
        description={post.metaDescription}
        type="article"
        article={{
          publishedTime: post.date,
          author: post.author,
          tags: post.tags,
        }}
      />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/blog" className="text-sm text-primary hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20"
            >
              {post.category}
            </Link>
            <span className="text-xs text-muted-foreground">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
        </header>

        <div className="prose max-w-none pre:p-0">
          {renderContent(post.content)}
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-xl font-bold mb-6">Related Articles</h2>
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