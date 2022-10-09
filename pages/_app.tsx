/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.css";
import type { AppProps } from "next/app";
// import Header from '../components/Header'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/Header"), { ssr: false });
function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <Script
        src="https://unpkg.com/flowbite@latest/dist/flowbite.js"
        strategy="lazyOnload"
      ></Script>

      <ToastContainer />
      <Header />
      <AnyComponent {...pageProps} />
    </>
  );
}

export default MyApp;
