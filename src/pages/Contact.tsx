import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const recipient = "cloudbyte.byte@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Use mailto as a simple client-side fallback (opens user's email client).
    const subject = `Contact request from ${name || "Website Visitor"}`;
    const body = `${message || "(no message)"}%0D%0A%0D%0AFrom: ${name || "Anonymous"} <${
      senderEmail || "no-reply"
    }>`;

    // Build a mailto URL and open the user's mail client
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Reset sending state after a short delay to allow mail client to open
    setTimeout(() => setSending(false), 700);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Have questions or need support? Fill out the form below or email us directly at{" "}
        <a
          href={`mailto:${recipient}`}
          className="text-primary hover:underline"
          aria-label={`Email ${recipient}`}
        >
          {recipient}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={6}
            className="w-full px-3 py-2 border rounded-md bg-background"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Opening email client..." : "Send message"}
          </button>
        </div>
      </form>

      <section className="mt-8 text-sm text-muted-foreground">
        <h2 className="font-semibold">Other ways to reach us</h2>
        <p className="mt-2">
          Direct email:{" "}
          <a href={`mailto:${recipient}`} className="text-primary hover:underline">
            {recipient}
          </a>
        </p>
      </section>
    </div>
  );
}