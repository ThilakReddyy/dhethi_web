import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  return (
    <Layout>
      <SEOHead title="Terms & Conditions" description="Read the terms and conditions governing your use of Dhethi.com, including content usage, intellectual property, and limitations of liability." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-6">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8 font-sans">Last updated: February 19, 2025</p>

        <div className="prose max-w-none">
          <p>Welcome to Dhethi.com. By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined below. If you do not agree with any part of these terms, please do not use our website.</p>

          <h2>Use of Content</h2>
          <p>All content published on Dhethi.com, including articles, tutorials, code examples, images, and other materials, is for informational and educational purposes only. You may read, download, and print content for your personal, non-commercial use. You may not reproduce, distribute, or republish our content without prior written permission.</p>

          <h2>Intellectual Property</h2>
          <p>All content on this website is the intellectual property of Dhethi.com unless otherwise stated. This includes text, graphics, logos, and the overall design of the website. Unauthorized use of any materials may violate copyright, trademark, and other applicable laws.</p>

          <h2>Code Examples</h2>
          <p>Code examples provided in our tutorials are intended for educational purposes. You are free to use and adapt these code snippets in your own projects. However, we provide no warranty that the code is error-free or suitable for production use. Always review and test code thoroughly before using it in a production environment.</p>

          <h2>User Conduct</h2>
          <p>When using our website, including the contact form, you agree not to submit false or misleading information, upload or transmit any harmful content, attempt to gain unauthorized access to our systems, use our website for any unlawful purpose, or interfere with the proper functioning of the website.</p>

          <h2>Disclaimer of Warranties</h2>
          <p>This website and its content are provided "as is" without any warranties, expressed or implied. We do not guarantee that the website will be available at all times or that the content is accurate, complete, or current. We reserve the right to modify or discontinue any aspect of the website at any time without notice.</p>

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, Dhethi.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of or inability to use the website or its content.</p>

          <h2>External Links</h2>
          <p>Our website may contain links to external websites. We are not responsible for the content, accuracy, or practices of any third-party websites. The inclusion of any link does not imply endorsement by Dhethi.com.</p>

          <h2>Changes to Terms</h2>
          <p>We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.</p>

          <h2>Governing Law</h2>
          <p>These Terms & Conditions shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>

          <h2>Contact</h2>
          <p>If you have questions about these Terms & Conditions, please reach out through our <a href="/contact">contact page</a>.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
