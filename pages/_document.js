import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';
export default Document;

function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
