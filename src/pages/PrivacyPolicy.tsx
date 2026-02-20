import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead title="Privacy Policy" description="Read Dhethi's privacy policy. Learn how we collect, use, and protect your personal data, including our use of cookies and third-party advertising." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8 font-sans">Last updated: February 19, 2025</p>

        <div className="prose max-w-none">
          <p>At Dhethi.com ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website dhethi.com.</p>

          <h2>Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the website includes:</p>
          <p><strong>Personal Data:</strong> When you voluntarily provide it through our contact form, we may collect your name, email address, and any other information you choose to provide in your message.</p>
          <p><strong>Usage Data:</strong> We automatically collect certain information when you visit the website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.</p>

          <h2>Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.</p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>

          <h2>Third-Party Advertising</h2>
          <p>We may use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
          <p>Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.</p>

          <h2>Google AdSense</h2>
          <p>Some of the ads may be served by Google. Google's use of the DoubleClick cookie enables it and its partners to serve ads to users based on their visit to dhethi.com and/or other sites on the Internet. You may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Google Ads Settings.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to operate and maintain our website, respond to your inquiries and communications, improve the user experience, analyze usage trends, and serve relevant advertisements.</p>

          <h2>Data Security</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

          <h2>Third-Party Links</h2>
          <p>Our website may contain links to third-party websites and services. We are not responsible for the content or privacy practices of those third parties. We encourage you to read the privacy policies of every website you visit.</p>

          <h2>Children's Privacy</h2>
          <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>

          <h2>Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our <a href="/contact">contact page</a>.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
