import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    console.log(ctx)
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script src="http://localhost:3002/_next/static/runtime/app2RemoteEntry.js" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;