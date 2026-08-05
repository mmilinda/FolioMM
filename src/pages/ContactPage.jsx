import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

/**
 * Contact page — wraps the Contact section component
 * as a standalone page with its own layout.
 */
const ContactPage = ({ lang = 'fr' }) => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <Contact lang={lang} id="contact-page-section" />
      <Footer lang={lang} />
    </div>
  );
};

export default ContactPage;
