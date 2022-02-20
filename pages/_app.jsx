import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import "nprogress/nprogress.css";
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { wrapper } from "../redux/store";
import "../styles/Global.scss";
const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps, footer, meta, term }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  return (
    <>
      <Head>
        <link rel="dns-prefetch" href="https://memevui.com" />
        <link rel="dns-prefetch" href="https://cdn.memevui.com/" />
        <link rel="dns-prefetch" href="//facebook.com/" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
        <link
          rel="icon"
          href="/images/favicon-memevui.png"
          type="image/x-icon"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index,follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: meta.url,
              name: meta.site_name,
              description: meta.site_description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ho Chi Minh",
                addressRegion: "VietNam",
                postalCode: "70000",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: meta.search_url,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: meta.site_name,
              description: meta.site_description,
            }),
          }}
        ></script>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `function gtag(){window.dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${GA_MEASUREMENT_ID}");`,
          }}
        ></script>
      </Head>
      <TopProgressBar />
      <MainLayout footer={footer} term={term}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const APP_URL = process.env.APP_URL;
  const res_meta = await fetch(`${APP_URL}/api/page/init`);
  const meta = await res_meta.json();
  const term_data = await fetch(`${APP_URL}/api/term/all`);
  const term = await term_data.json();
  const r_footer = await fetch(`${APP_URL}/api/layout/footer-content`);
  const footer = await r_footer.json();
  const appProps = {
    footer,
    meta,
    term,
  };

  return appProps;
};

export default wrapper.withRedux(MyApp);
