import { useEffect } from "react";

type SEOHeadProps = {
  title: string;
  description: string;
  canonical?: string;
};

const setMeta = (key: string, content: string, property = false) => {
  const attribute = property ? "property" : "name";
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const SEOHead = ({ title, description, canonical }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Dhethi", true);
    setMeta("og:image", "https://dhethi.com/og.png", true);
    setMeta("og:image:alt", title, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", "https://dhethi.com/og.png");
    setMeta("twitter:image:alt", title);

    if (canonical) {
      setMeta("og:url", canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [canonical, description, title]);

  return null;
};

export default SEOHead;
