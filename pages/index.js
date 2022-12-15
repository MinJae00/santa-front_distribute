import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import axios from 'axios';

const BASE_URL = "http://localhost:8000/"

export default function Home() {
  const router = useRouter();

  const loginFormWithKakao = () => {
    window.Kakao.Auth.login({
      success(authObj) {
        console.log("로그인 토큰 정보 =======");
        console.log(authObj);
        kakaoResponse(authObj);
      },
      fail(err) {
        console.log(err);   
      }
    })
  }

  const kakaoResponse = async(authObj)=>{
    let res = await axios.get(process.env.NEXT_PUBLIC_MY_BACK+"rest-auth/kakao/", {
      params: {
        code:authObj.access_token
      },
    });
    console.log("백서버에서 받아온 사용자 정보 =======");
    var datajson = res.data;
    console.log(datajson);
    console.log(datajson.token);
    window.sessionStorage.user = JSON.stringify(datajson);
    window.sessionStorage.token = JSON.stringify(datajson.token);
    window.sessionStorage.solvecount = JSON.stringify(datajson.solve_count);
    console.log("===========index.js SessionStorage=======================");
    console.log(window.sessionStorage);
    if(datajson.nickname == '임시닉네임') {
      router.push({
        pathname: '/nickname',
        query: {
          value: datajson.token
        },
      },);
    } else {
      router.push({
        pathname: '/main',
        query: {
          value: datajson.token
        },
      },);
    }
  }

  return (
    <div className="
      flex flex-col items-center h-screen
      overflow-auto bg-auto bg-center bg-local pt-[54px]
      bg-[url('../public/img/start_bg.png')]
    " onContextMenu={e => e.preventDefault()}>
      <Head>
        <title>돌아와 순록!</title>
        <meta name="description" content="콘텐트 내용" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <div className="flex flex-col justify-between h-screen">

        <div id="top-title" className="flex flex-col w-full justify-center h-[155px] relative">
          <div className="absolute left-[-2%] top-[0%]">
            <Image src='/img/start_deco.png' width='320' height='121.72'/>
          </div>
          <div className="font-['yg-jalnan'] place-items-center items-center pt-[75px] text-center text-[41px] text-white">
            돌아와 순록!
          </div>
          <div className="font-['GmarketSansMedium'] place-items-center items-center pt-2 text-center text-[13px] text-white font-light">
            크리스마스를 기다리며 매일매일 퀴즈를 맞춰보세요!
          </div>
        </div>

        <div id="middle-artwork" className="mt-[47px] mb-[80px]">
          <Image src='/img/start_artwork.png' quality='100' width='320' height='339.51'/>
          <div className="place-items-center items-center pt-3 text-center text-[17px] text-[#13277A] font-bold">
            " 사라진 순록을 찾아주세요! " 
          </div>
        </div>

        <div id="start-btn" className="w-full flex flex-col justify-center relative">
          <div className="absolute top-[11.5%] left-[15%]">
            <Image src='/img/kakao_logo.png' width='24' height='24'/>
          </div>
          <button onClick={loginFormWithKakao} className ="flex h-[55px] mb-[40px] pl-[90px] rounded-xl items-center bg-[#BD2E2E] text-white font-bold text-[18px]">
            카카오톡으로 시작하기
          </button>
          <Layout/>
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(){
//   // api 이용해서 데이터 불러오기 (async, await으로 기다려주기)
//   const res = await fetch("https://example_site.com/user_data")
  
//   // page에 props로 전달하기위해, json 형식으로 변경해주기
//   const data = res.json()
  
//   // 페이지 props로 전달하기 (json 형식만 가능)
//   return {
//     props: {
//       user_data: data
//     },
//   }
// }