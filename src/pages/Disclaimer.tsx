import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const Disclaimer = () => {
  return (
    <Layout>
      <SEOHead title="Disclaimer" description="Read the disclaimer for Dhethi.com regarding the accuracy of information, professional advice, and limitations of our programming tutorials." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-6">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8 font-sans">Last updated: February 19, 2025</p>

        <div className="prose max-w-none">
          <p>The information provided on Dhethi.com is for general informational and educational purposes only. All information on the website is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the website.</p>

          <h2>Not Professional Advice</h2>
          <p>The content on Dhethi.com, including programming tutorials, code examples, career advice, and technical guides, should not be construed as professional advice. The tutorials and guides are educational resources meant to supplement your learning. Before making any decisions based on the information provided, we encourage you to consult with a qualified professional in the relevant field.</p>

          <h2>Code and Technical Information</h2>
          <p>While we strive to provide accurate and up-to-date code examples and technical information, technology evolves rapidly. Code examples may become outdated, deprecated, or incompatible with newer versions of software, libraries, or frameworks. We recommend verifying all code and technical advice against the latest official documentation before use in production environments.</p>

          <h2>No Guarantee of Results</h2>
          <p>We do not guarantee any specific results from following our tutorials or implementing our code examples. Your results may vary depending on your specific circumstances, including your development environment, skill level, and the particular requirements of your project.</p>

          <h2>External Links</h2>
          <p>Dhethi.com may contain links to external websites that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We do not warrant the offerings of any of these entities or their websites.</p>

          <h2>Errors and Omissions</h2>
          <p>While we take great care in creating our content, errors and omissions may occur. If you find any errors in our articles or code examples, please contact us through our contact page so that we can correct them promptly.</p>

          <h2>Affiliate Links and Advertising</h2>
          <p>Dhethi.com may contain affiliate links and display advertisements, including those served by Google AdSense. When you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. Our editorial content is not influenced by advertisers or affiliate partnerships.</p>

          <h2>Use at Your Own Risk</h2>
          <p>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</p>

          <h2>Changes to This Disclaimer</h2>
          <p>We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated revision date.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this disclaimer, please visit our <a href="/contact">contact page</a>.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
