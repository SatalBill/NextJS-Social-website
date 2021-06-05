import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <title>Phiz</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" href="./swiper.min.css" />
        <link rel="stylesheet" href="./app.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="./styles/react-big-calendar.css"
        />
        <link rel="stylesheet" type="text/css" href="./styles/popup.css" />
        <link rel="stylesheet" type="text/css" href="./styles/style.css" />
        <link rel="stylesheet" type="text/css" href="./styles/line-icons.css" />
        <body>
          <Main />
          <div className="exit-game-cover pos-ab" style={{ display: "none" }}>
            <div className="circle-animation-body pos-ab g-back">
              <p className="exitingtext">Exiting</p>
            </div>
          </div>
          <script type="text/javascript" src="./js/vtc.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
