import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const About = () => {
  return (
    <Layout>
      <SEOHead title="About Us" description="Learn about Dhethi.com — our mission to provide high-quality programming tutorials and developer resources for the global coding community." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-6">About Dhethi</h1>

        <div className="prose max-w-none">
          <p>
            Welcome to <strong>Dhethi.com</strong>, a dedicated platform for developers who want to improve their programming skills through clear, well-structured, and practical tutorials. We believe that quality education should be accessible to everyone, and our mission is to make complex programming concepts easy to understand.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to bridge the gap between theoretical knowledge and practical application in software development. We create content that helps developers at all levels — from beginners writing their first lines of code to experienced engineers looking to deepen their expertise in specific technologies.
          </p>

          <h2>What We Cover</h2>
          <p>
            Dhethi covers a wide range of programming topics including JavaScript, TypeScript, Python, React, web development, data structures and algorithms, DevOps practices, career guidance, and software engineering best practices. Every article is carefully written to provide genuine value, with real-world examples and actionable advice.
          </p>

          <h2>Our Content Philosophy</h2>
          <p>
            We believe in quality over quantity. Every article on Dhethi is original, thoroughly researched, and written with the reader in mind. We avoid filler content, clickbait titles, and superficial coverage. Instead, we focus on depth, accuracy, and practical relevance. Our goal is for every reader to walk away from an article having learned something useful that they can apply immediately.
          </p>

          <h2>Our Team</h2>
          <p>
            Dhethi is maintained by a team of passionate developers and technical writers who have hands-on experience in the technologies they write about. We draw from our collective experience working in software development to create tutorials that address real challenges developers face in their daily work.
          </p>

          <h2>Get in Touch</h2>
          <p>
            We love hearing from our readers. Whether you have a question about one of our articles, a suggestion for a topic you would like us to cover, or feedback on how we can improve, please do not hesitate to <Link to="/contact" className="text-primary hover:underline">contact us</Link>. Your input helps us create better content for the developer community.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
