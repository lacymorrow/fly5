import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import config from '../utils/config';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={config.locale}>
        <Head>
          <meta charSet="UTF-8" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            src="https://analytics.lacy.sh/script.js"
            data-website-id="84163419-6472-49de-8cbc-33c5e1f206dd"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
