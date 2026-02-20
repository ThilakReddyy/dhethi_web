import { Link } from "react-router-dom";
import { type BlogPost, formatDate } from "@/data/posts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <article className={`group ${featured ? "md:col-span-2" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="bg-card rounded-lg border border-border p-6 h-full transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-sans font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground font-sans">{post.readTime}</span>
          </div>

          <h2 className={`font-sans font-bold text-foreground group-hover:text-primary transition-colors mb-2 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
            {post.title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-sans">{formatDate(post.date)}</span>
            <span className="text-xs font-sans font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
