import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We will get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <Layout>
      <SEOHead title="Contact Us" description="Get in touch with the Dhethi team. Send us your questions, feedback, or article suggestions." />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question, suggestion, or feedback? We would love to hear from you. Fill out the form below and we will respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-sans font-medium text-foreground mb-1.5">Name *</label>
            <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-sans font-medium text-foreground mb-1.5">Email *</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-sans font-medium text-foreground mb-1.5">Subject</label>
            <input id="subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200} className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-sans font-medium text-foreground mb-1.5">Message *</label>
            <textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button type="submit" disabled={sending} className="px-6 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
