"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [prepared, setPrepared] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const project = String(form.get("project") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", "Project overview:", project, "", message].join("\n");
    setPrepared(true);
    window.location.href = `mailto:truvtechteam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={90} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={160} /></label>
      </div>
      <label>What are you building?<input name="project" type="text" placeholder="Product, workflow, website..." required maxLength={140} /></label>
      <label>A little more context<textarea name="message" rows={4} placeholder="What problem are you trying to solve?" required maxLength={2000} /></label>
      <div className="form-submit-row"><button className="button-primary" type="submit">Prepare email <span>↗</span></button><span className="form-note" aria-live="polite">{prepared ? "Your email app should open with a draft. Nothing is sent automatically." : "Opens your email app with a pre-filled draft."}</span></div>
    </form>
  );
}