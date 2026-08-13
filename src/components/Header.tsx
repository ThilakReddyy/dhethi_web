import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#services", label: "Services" },
  { href: "#principles", label: "Principles" },
  { href: "#brand", label: "Why Dhethi" },
  { href: "#notes", label: "Notes" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header
      className={scrolled ? "site-header site-header-scrolled" : "site-header"}
    >
      <div className="shell header-inner">
        <a href="#top" className="wordmark" aria-label="Dhethi, back to top">
          dhethi<span>.</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="lets-talk-btn hidden lg:inline-flex">
          Let's Talk
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <div className="shell">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Let's Talk
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
