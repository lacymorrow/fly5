import { Meta } from '../components/Meta';
import { Main } from '../templates/Main';
import config from '../utils/config';

const Privacy = () => (
  <Main
    meta={
      <Meta
        title="Privacy Policy — FLY5 Aerial Cinematography"
        description="Privacy policy for FLY5 aerial cinematography studio. Learn how we collect, use, and protect your personal information when you use our website and services."
      />
    }
  >
    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
    <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
    <p className="mb-4">
      When you use our contact form, we collect the information you provide, including your name, email address, phone number, and message content. We use this information solely to respond to your inquiry.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analytics</h2>
    <p className="mb-4">
      We use privacy-focused analytics to understand how visitors use our website. This data is aggregated and does not personally identify you. We may also use Google Analytics, which collects anonymized usage data.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
    <p className="mb-4">
      Our website may use cookies for analytics purposes. You can disable cookies in your browser settings at any time.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Sharing</h2>
    <p className="mb-4">
      We do not sell, trade, or share your personal information with third parties, except as necessary to respond to your inquiries or as required by law.
    </p>

    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
    <p className="mb-4">
      If you have questions about this privacy policy, please contact us at{' '}
      <a href={`mailto:${config.email}`} className="text-blue-600 hover:underline">
        {config.email}
      </a>.
    </p>
  </Main>
);

export default Privacy;
