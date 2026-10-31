import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found - Dhethi";
  }, []);

  return (
    <main className="not-found">
      <div className="panel">
        <div className="panel-band">
          <a href="/" className="wordmark" aria-label="Dhethi home">
            dhethi<span>.</span>
          </a>
          <span className="mono-meta">Error 404</span>
        </div>
        <div className="not-found-body">
          <p className="eyebrow eyebrow-sm">Off the map</p>
          <h1>This product surface doesn’t exist.</h1>
          <a className="button button-primary" href="/">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Dhethi
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
