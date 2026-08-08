import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <a href="#top" className="wordmark wordmark-footer" aria-label="Dhethi, back to top">
            dhethi<span>.</span>
          </a>
          <p>The home of practical digital products.</p>
        </div>

        <div className="footer-links">
          <a href="https://jntuhconnect.dhethi.com/" target="_blank" rel="noreferrer">
            JNTUH Connect <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect"
            target="_blank"
            rel="noreferrer"
          >
            Google Play <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://apps.apple.com/in/app/jntuh-connect/id6790828236"
            target="_blank"
            rel="noreferrer"
          >
            App Store <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Dhethi.</p>
        <p>Useful software · deliberately built</p>
      </div>
    </footer>
  );
};

export default Footer;
