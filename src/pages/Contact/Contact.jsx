import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Contact.css";

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to an email service (e.g. Formspree, EmailJS) or a
    // Firestore "messages" collection whenever you're ready to wire it up.
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main>
      <section className="contact-page">
       <div className="contact-intro">
          <span className="eyebrow">Get in touch</span>
          <h1 style={{ color:"hsl(28, 73%, 60%)"  }}>Questions, corrections, or trip tips?</h1>
          <p style={{ color: "#aba1a1" }}>
            Spot an outdated recommendation, or want a province added? Send a
            note and we'll take a look.
          </p>
        </div>

        <div className="form-shell contact-form">
          {sent ? (
            <p className="contact-success">
              Thanks — your message has been noted. We'll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" type="text" required />
              </div>

              <div className="form-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required />
              </div>

              <div className="form-field">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" rows={5} required />
              </div>

              <button className="form-submit" type="submit">
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
