import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SEOHead = ({ title, description, canonical, type = "website", article }: SEOHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Dhethi`;
    
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", "Dhethi", true);
    if (canonical) {
      setMeta("og:url", canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    if (article) {
      if (article.publishedTime) setMeta("article:published_time", article.publishedTime, true);
      if (article.author) setMeta("article:author", article.author, true);
    }
  }, [title, description, canonical, type, article]);

  return null;
};

export default SEOHead;
