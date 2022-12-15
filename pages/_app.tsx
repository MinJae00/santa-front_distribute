import '../styles/globals.css'
import '../styles/main.css'
import '../styles/quiz.css'
import '../styles/sModal.css'
import '../styles/wreath.css'
import type { AppProps } from "next/app";
import { NextUIProvider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import Script from 'next/script'

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  // useEffect(() => {
  //   try {
  //     console.log(window)
  //     console.log(window.Kakao)
  //     if (!window.Kakao.isInitialized() && window.Kakao) {
  //       window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT);
  //       console.log("Kakao.init()")
  //     }
  //   } catch(e) { console.log(e)}
  // }, []) 

  function kakaoInit() { 
    if (!window.Kakao.isInitialized() && window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT);
      console.log("Kakao.init()");
    }
  }
  
  return (
    <NextUIProvider>
      <Script async src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
      <Component {...pageProps}/>
    </NextUIProvider>
  );  
}

export default MyApp;
