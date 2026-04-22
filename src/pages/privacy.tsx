import Link from 'next/link';

import { Meta } from '../components/Meta';
import { Main } from '../templates/Main';
import config from '../utils/config';

const Privacy = () => (
  <Main
    meta={
      <Meta
        title="Privacy Policy — FLY5 Aerial Cinematography"
        description="Privacy policy for FLY5 aerial cinematography studio. Learn how we collect, use, and protect your personal information when you use our website and services."
        ogImage={config.ogImage}
      />
    }
  >
    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
    <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

    <p className="mb-4">
      This privacy policy explains how FLY5 Aerial Cinematography collects, uses, and protects your personal information when you visit our website at fly5.live and use our services. We are committed to protecting your privacy and ensuring that your personal data is handled responsibly.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
    <p className="mb-4">
      When you use our contact form, we collect the information you provide, including your name, email address, phone number, and message content. We use this information solely to respond to your inquiry and discuss potential projects. We do not collect personal information from visitors who simply browse our website without submitting the contact form.
    </p>
    <p className="mb-4">
      We may also collect non-personal information automatically when you visit our site, such as your browser type, operating system, referring website, pages visited, and the date and time of your visit. This information helps us understand how visitors interact with our website so we can improve the user experience.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analytics</h2>
    <p className="mb-4">
      We use privacy-focused analytics tools to understand how visitors use our website. Our primary analytics platform aggregates data without personally identifying individual visitors. We may also use Google Analytics, which collects anonymized usage data including page views, session duration, and general geographic location. Google Analytics uses cookies to distinguish unique users and sessions. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
    <p className="mb-4">
      Our website may use cookies for analytics purposes. Cookies are small text files stored on your device that help us analyze website traffic and improve your browsing experience. You can disable cookies in your browser settings at any time. Disabling cookies will not prevent you from accessing any part of our website, though some analytics features may not function properly.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
    <p className="mb-4">
      The personal information you provide through our contact form is used exclusively to respond to your inquiry, provide quotes for our aerial cinematography services, and communicate about potential projects. We retain contact form submissions only as long as necessary to fulfill these purposes.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Sharing</h2>
    <p className="mb-4">
      We do not sell, trade, or share your personal information with third parties, except as necessary to respond to your inquiries or as required by law. We may share anonymized, aggregated analytics data that cannot be used to identify individual visitors.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
    <p className="mb-4">
      We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Our website uses HTTPS encryption to secure data transmitted between your browser and our servers. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
    <p className="mb-4">
      You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, please reach out to us through our contact form. We will respond to your request within a reasonable timeframe.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
    <p className="mb-4">
      We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. Any updates will be posted on this page with a revised date. We encourage you to review this policy periodically.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
    <p className="mb-4">
      If you have questions about this privacy policy or how we handle your data, please reach out through our{' '}
      <Link href="/contact/">
        <a className="text-blue-600 hover:underline">contact form</a>
      </Link>.
    </p>
  </Main>
);

export default Privacy;
