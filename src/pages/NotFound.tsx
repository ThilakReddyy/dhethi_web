import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found - Dhethi";
  }, []);

  return (
    <main className="not-found">
      <a href="/" className="wordmark" aria-label="Dhethi home">dhethi<span>.</span></a>
      <div>
        <p>404 / Off the map</p>
        <h1>This product surface doesn’t exist.</h1>
        <a className="button button-primary" href="/">
          <ArrowLeft size={18} aria-hidden="true" /> Back to Dhethi
        </a>
      </div>
    </main>
  );
};

export default NotFound;
