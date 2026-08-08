import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div id="top" className="site-frame">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;
