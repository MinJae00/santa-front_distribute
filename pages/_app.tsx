import '../styles/globals.css'
import '../styles/main.css'
import '../styles/quiz.css'
import '../styles/sModal.css'
import '../styles/wreath.css'
import type { AppProps } from "next/app";
import { NextUIProvider } from '@nextui-org/react';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    try {
      if (!window.Kakao.isInitialized() && window.Kakao) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT);
        console.log("Kakao.init()")
      }
    } catch(e) { console.log(e)}
  }, [])

  return (
    <NextUIProvider>
      <script src="https://developers.kakao.com/sdk/js/kakao.js">
      </script>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
