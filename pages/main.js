import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Popover, Modal, useModal, Switch, Spacer } from '@nextui-org/react';
import {Howl, Howler} from 'howler';
import axios from 'axios';
import Layout from '../components/layout'
import GuideModal from '../components/guideModal'
import QuizModal from '../components/quizModals'
import NoQuizModal from '../components/noQuizModal'
import ReindeerCollectionModal from '../components/reindeerCollectionModal'
import SocksModal_1 from '../components/socksModal_1'
import SocksModal_2 from '../components/socksModal_2'
import SocksModal_3 from '../components/socksModal_3'
import { WreathEditModal } from '../components/wreathEditModal'

const SHARE_URL = "http://localhost:3000/"
const BASE_URL = "http://localhost:8000/"
const DEFAULT_IMG = "/img/ornaments/orna_none.png"

export default function Main(){
  /* 모달 STATE */
  const [showG_Modal, setShowG_Modal] = useState(false);  // 가이드
  const [showQ_Modal, setShowQ_Modal] = useState(false);  // 퀴즈 있음
  const [showNq_Modal, setShowNq_Modal] = useState(false);  // 퀴즈 없음
  const [showCollectionModal, setCollectionModal] = useState(false);  // 순록도감
  const [showS1_Modal, setShowS1_Modal] = useState(false);  // 양말1
  const [showS2_Modal, setShowS2_Modal] = useState(false);  // 양말2
  const [showS3_Modal, setShowS3_Modal] = useState(false);  // 양말3
  
  /* 로그인 확인 */
  const [paramValue, setParamValue] = useState();  // url의 query :string
  const [windowGet, setWindowGet] = useState();  // session에 user라는 이름의 key 있는지 확인용 ( 없으면 null )
  const [user, setUser] = useState([]);  // 토큰, 닉네임, solve_count :object
  const [usertoken, setUsertoken] = useState(); // 유저 토큰 :string
  const [solvedNum, setSolvedNum] = useState(); // 유저가 푼 문제 갯수
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const params = new URLSearchParams(location.search);
      const t_paramvalue = params.get("value");
      setParamValue(t_paramvalue)
      const t_windowGet = window.sessionStorage.getItem('user');
      setWindowGet( window.sessionStorage.getItem('user') );
      // user key가 session에 존재하고, url value와 token이 동일한 경우에만 허용
      if(t_windowGet !== null && t_paramvalue == JSON.parse(window.sessionStorage.token)){
        setUser(JSON.parse(window.sessionStorage.user));
        setUsertoken(JSON.parse(window.sessionStorage.token));
        setSolvedNum(JSON.parse(window.sessionStorage.solvecount));
      } else {
        window.sessionStorage.clear();
        router.push('/');
        alert("잘못된 접근입니다.");
      }
    }
  },[console.log(usertoken)])

  /* 로그아웃 */
  const logoutHandler = () => {
    window.Kakao.Auth.logout(function() {
      console.log('로그아웃');
      window.sessionStorage.clear();
      router.push('/');
    });
  }

  /* 순록 데이터 불러오기(button 클릭 실행) */
  const [deerData, setDeerData] = useState([]);
  async function getDeer(){
    let res = await axios.get(BASE_URL+"deer/", {
      params: {
        jwt:usertoken
      },
    });
    console.log("getDeer 결과 =======");
    var datajson = res.data;
    console.log(datajson);
    setDeerData(datajson);
    return setCollectionModal(true); 
  }

  /* 양말1 데이터 불러오기(button 클릭 실행) */
  const [sock1Data, setSock1Data] = useState();
  async function getSock1(){
  let res = await axios.get(BASE_URL+"socks/", {
      params: {
        jwt:usertoken,
        num:1
      },
    });
    console.log("socks 결과 =======");
    var datajson = res.data;
    console.log(datajson);
    setSock1Data(datajson);
    return setShowS1_Modal(true);
  }

  // 백엔드 api 테스트용 코드
  // const [deerData, setDeerData] = useState([]);
  // async function getDeer(){
  //   const t_src = "/img/ornaments/1.png"
  //   const t_name = "임시이름"
  //   const t_num = 1
  // =========== 아래 작동 확인 완료 =====================

  //   let res2 = await axios.post(BASE_URL+"socks/",
  //     {
  //       url:t_src,
  //       jwt:usertoken,
  //       num:1,
  //       name:t_name,
  //     });
  //   console.log("socks 결과 =======");
  //   var datajson2 = res2.data;
  //   console.log(datajson2);
  //   setDeerData(datajson2);
  //   let res = await axios.get(BASE_URL+"socks/", {
  //     params: {
  //       jwt:usertoken,
  //       num:1
  //     },
  //   });
  //   console.log("socks 결과 =======");
  //   var datajson = res.data;
  //   console.log(datajson);
  //   setDeerData(datajson);
  // let res3 = await axios.post(BASE_URL+"ornament/",
  //   {
  //     src:t_src,
  //     jwt:usertoken,
  //   });
  // console.log("ornament 결과 =======");
  // var datajson3 = res3.data;
  // console.log(datajson3);
  // setDeerData(datajson3);
  // let res4 = await axios.get(BASE_URL+"ornament/", {
  //   params: {
  //     jwt:usertoken,
  //   },
  // });
  // console.log("ornament 결과 =======");
  // var datajson4 = res4.data;
  // console.log(datajson4);
  // setDeerData(datajson4);
  //   let res5 = await axios.get(BASE_URL+"realwreath/", {
  //     params: {
  //       jwt:usertoken,
  //     },
  //   });
  //   console.log("realwreath 결과 =======");
  //   var datajson5 = res5.data;
  //   console.log(datajson5);
  //   setDeerData(datajson5);
  // =================================================
  //}

  /* 링크복사 */
  const [urlForm, setUrlForm] = useState();
  useEffect(() => {
    if(!router.isReady) return;
    setUrlForm(SHARE_URL + "share?value=" + paramValue)
  }, [router.isReady, paramValue])

  const copyLinkHandler = async() => {
    try {
      await navigator.clipboard.writeText(urlForm);
      alert('링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  }

  /* 디데이 계산, 사용자가 푼 퀴즈 갯수 불러오기 */
  const [quizzesNum, setQuizzesNum] = useState(); // 남은 퀴즈 갯수
  const [d_Day, setD_Day] = useState();
  useEffect(() => {
    var today = new Date();
    /* 테스트 원하는 경우 목표 날짜 수정후 확인 */
    var dDay = new Date(2022,11,14);
    var gap = dDay.getTime() - today.getTime();
    var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    setD_Day(result);
    if(solvedNum+result>=10){
      setQuizzesNum(0)
    } else {
      setQuizzesNum(10-solvedNum-result)
    }
  }, [solvedNum]);  // ===============================> 1213 미현 user -> solvedNum 변경 useEffect 제대로 작동 안하는 경우 여기 확인해보기

  /* Audio */
  const [play, setPlay] = useState(false);
  let snd = new Howl({
    src: ['/audio/Christmas_Is_Coming.mp3'],
    loop: true,
    volume: 0.3,
  });
  useEffect(() => {
    if(play) {  
      snd.play();
      console.log("play실행")
    }
    if(!play){
      Howler.stop();
      console.log("stop실행")
    }
  }, [play]);

  //양말편집창 모달
  const { setVisible, bindings } = useModal();
  //이미지 이름 가져오기
  const [giftName, setGiftName] = useState('');
  //이미지 사진 가져오기
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
          setImageSrc(reader.result);
          resolve();
      };
    });
  };

  // useRef를 이용해 input태그에 접근하기
  const imageInput = useRef();
  // 버튼클릭시 input태그에 클릭이벤트를 걸어주기 
  const onCickImageUpload = () => {
      imageInput.current.click();
  };

  // 예시 코드 =======================================================
  // setUserData(res.data[0].ornaments); // =========================================================> 윤성이 코드

  //리스에 있는 데이터
  const [userData, setUserData] = useState({});

  //리스 오너먼트
  const [wreathSrc, setWreathSrc] = useState([]);
  const getData = (wreathSrc) => {
    setWreathSrc(wreathSrc);
  }
  const [wreathSrc2, setWreathSrc2] = useState([]);
  const getData2 = (wreathSrc2) => {
    setWreathSrc2(wreathSrc2);
  }
  const [wreathSrc3, setWreathSrc3] = useState([]);
  const getData3 = (wreathSrc3) => {
    setWreathSrc3(wreathSrc3);
  }
  const [wreathSrc4, setWreathSrc4] = useState([]);
  const getData4 = (wreathSrc4) => {
    setWreathSrc4(wreathSrc4);
  }
  const [wreathSrc5, setWreathSrc5] = useState([]);
  const getData5 = (wreathSrc5) => {
    setWreathSrc5(wreathSrc5);
  }
  const [wreathSrc6, setWreathSrc6] = useState([]);
  const getData6 = (wreathSrc6) => {
    setWreathSrc6(wreathSrc6);
  }
  const [wreathSrc7, setWreathSrc7] = useState([]);
  const getData7 = (wreathSrc7) => {
    setWreathSrc7(wreathSrc7);
  }
  function removeQ() {
    document.getElementById('qimg').classList.add('invisible');
  }
  function removeQ2() {
    document.getElementById('qimg2').classList.add('invisible');
  }
  function removeQ3() {
    document.getElementById('qimg3').classList.add('invisible');
  }
  function removeQ4() {
    document.getElementById('qimg4').classList.add('invisible');
  }
  function removeQ5() {
    document.getElementById('qimg5').classList.add('invisible');
  }
  function removeQ6() {
    document.getElementById('qimg6').classList.add('invisible');
  }
  function removeQ7() {
    document.getElementById('qimg7').classList.add('invisible');
  }
  
  return (
    <Fragment>
    { (windowGet !== null && paramValue !== null) && (
    <div className="
    flex flex-col items-center h-screen overflow-auto bg-cover bg-local
    bg-[url('../public/img/wood_pattern.png')]
    ">
      <Head>
      <title>돌아와 순록!</title>
      <meta name="description" content="콘텐트 내용" />
      <link rel="icon" href="/favicon.ico" />
      </Head> 

      <div className="flex flex-col h-full">
        <div id="title-guide-switch" className="flex flex-row justify-between items-end mb-[5px]">
          <div id="title-guide" className="flex flex-row items-end">
            <h1 className="flex ml-2 mb-0 relative text-lg font-bold text-left text-[#4F3131] pt-4">돌아와 순록!</h1>
            <div id="guide" className="items-center pl-1.5 pb-1.5"><button onClick={()=>setShowG_Modal(true)} className="drop-shadow-md rounded-full bg-[#BA0A0A] w-[16px] text-xs text-white block pt-[1px] px-[1px]">?</button></div>
          </div>
          <div id="bgm-switch" className="bg-stone-600/50 flex pl-2.5 pr-1 pb-[3px] rounded-xl mb-1">
            <div className="max-h-[10px]">
              { !play ? 
              <Image src='/img/sound_mute.png' width='13' height='10'/> :
              <Image src='/img/sound_play.png' width='13' height='10'/>
              }
            </div>
            <div className="text-white text-sm px-1.5 pt-[1.5px]">Music</div>
            <Switch checked={false} size="xs" color="success" onChange={(e) => setPlay(!play)}/>
          </div>
        </div>            
        <div id="door-top-wrapper" className="relative">
          <div id="door-top-border" className="text-center m-auto relative"> 
            <Image src='/img/door-border_1.png' width='307' height='537'/>
          </div>

          <div id="door-top-contents" className="door-top">
            <div id='nickname-rename' className="flex flex-row w-[307px]"> 
              <div className="flex flex-row"> 
                <h1 className="ml-8 mr-1 text-white text-base font-normal align-bottom">{user.nickname}님의 소원양말</h1>
                <Link href={{
                  pathname: '/nickname',
                  query: { value:paramValue }, }} as={`/nickname?value=${paramValue}`}>
                  <div className="mt-[2px]"><Image src='/img/edit_name.png' width='12' height='12'/></div>
                </Link>
              </div>
            </div>

            <div id="socks-1-to-3" className="px-10 relative">
              <div className="w-60 text-center m-auto relative">
                <Image src='/img/socks_line.png' width='350' height='50'/>
              </div>
              <div className="sock-1">
                <button onClick={()=>getSock1()}>
                  <Image src='/img/sock_1.png' width='83.95' height='102.5'/>
                </button>
              </div>
              <div className="sock-2">
                <button onClick={()=> setShowS2_Modal(true)}>
                  <Image src='/img/sock_2.png' width='79.07' height='109.33p'/>
                </button>
              </div>
              <div className="sock-3">
                <button onClick={()=> setShowS3_Modal(true)}>
                  <Image src='/img/sock_3.png' width='82.98' height='107.38'/>
                </button>
              </div>
            </div>

            <div id="wreath-all" className="pt-16 mt-6 place-items-center flex-1">
              <Image src='/img/wreath_non_2.png' quality='90' width='280' height='280'/>
              <div className="wreath-text">
                  <Image src='/img/christmas_text.png' width='97' height='25'/>
                  {d_Day > 0
                  ?
                    <h1 className="text-center text-xl font-bold">
                      D - {d_Day}
                    </h1>
                  :
                    <h1 className="text-center text-xl font-bold">
                      D - Day
                    </h1>
                  }
              </div>
              <div id="wreath-ornaments-edit" className="wreath_edit_center">
                <div className="collection">
                  <button onClick={()=>getDeer()} >
                    <Image src='/img/collection.png' quality='100' width='95' height='131'/>
                  </button>
                </div>
                {/* 1번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg" onClick={removeQ} className="wreath_orna_q1">
                            <Image src={userData[0]?.src ? userData[0].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData} />
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg" onClick={removeQ} className="wreath_orna_q1">
                            <Image src={wreathSrc} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData}/>
                    </Popover.Content>
                </Popover>
                {/* 2번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg2" onClick={removeQ2} className="wreath_orna_q2">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData2}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg2" onClick={removeQ2} className="wreath_orna_q2">
                            <Image src={wreathSrc2} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData2}/>
                    </Popover.Content>
                </Popover>
                {/* 3번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg3" onClick={removeQ3} className="wreath_orna_q3">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData3}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg3" onClick={removeQ3} className="wreath_orna_q3">
                            <Image src={wreathSrc3} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData3}/>
                    </Popover.Content>
                </Popover>
                {/* 4번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg4" onClick={removeQ4} className="wreath_orna_q4">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData4}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg4" onClick={removeQ4} className="wreath_orna_q4">
                            <Image src={wreathSrc4} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData4}/>
                    </Popover.Content>
                </Popover>
                {/* 5번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg5" onClick={removeQ5} className="wreath_orna_q5">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg5" onClick={removeQ5} className="wreath_orna_q5">
                            <Image src={wreathSrc5} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData5}/>
                    </Popover.Content>
                </Popover>
                {/* 6번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg6" onClick={removeQ6} className="wreath_orna_q6">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg6" onClick={removeQ6} className="wreath_orna_q6">
                            <Image src={wreathSrc6} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData6}/>
                    </Popover.Content>
                </Popover>
                {/* 7번 */}
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg7" onClick={removeQ7} className="wreath_orna_q7">
                            <Image src={userData[1]?.src ? userData[1].src : DEFAULT_IMG} width='60' height='60'/>
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <WreathEditModal getData={getData}/>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Popover.Trigger>
                        <button id = "qimg7" onClick={removeQ7} className="wreath_orna_q7">
                            <Image src={wreathSrc7} width='60' height='60'></Image>
                        </button>
                    </Popover.Trigger> 
                    <Popover.Content>
                        <WreathEditModal getData={getData7}/>
                    </Popover.Content>
                </Popover>
              </div>
            </div>
            <div className="door-handle"><Image src='/img/handle.png' width='76' height='103'/></div>
            {/* 콜렉션 원래 자리 오너먼트 아래쪽에 있어서 겹쳐서 클릭돼서 위로 올림 */}
          </div>
        </div>

        <div id="door-bottom-wrapper" className="w-full relative top-5">
          <div className="w-full text-center m-auto relative">
            <Image src='/img/door-dorder_2.png' width='307' height='165'/>
          </div>
          <div className="quiz-black">
            <Image src='/img/quiz_black.png' width='191' height='10'/>
          </div>
          <div className="quiz-white">
            <Image src='/img/quiz_white.png' width='149' height='40'/>
          </div>
          <div className="quiz-text">
            <button onClick={quizzesNum!==0 ? ()=> setShowQ_Modal(true) : ()=> setShowNq_Modal(true)}>
              <h1 className="pt-2 text-center font-bold text-base">오늘의 퀴즈</h1>
            </button>
          </div>
          {quizzesNum !== 0 ? 
            <div className="quiz-notification bg-red-600 rounded-full">
              <div className="text-white text-sm font-normal">{quizzesNum}</div>
            </div> :
            null
          }
          <div className="quiz-deco"><Image src='/img/quiz_deco.png' width='272' height='89'/></div>
        </div>

        <div className="w-full flex justify-center mt-10"><button onClick={copyLinkHandler} className="drop-shadow-md w-[270px] text-white text-[16px] bg-[#BD2E2E] rounded-xl py-3 px-3 block">내 현관 공유링크 복사하기</button></div>
        <div className="w-full flex justify-center mb-10"><button onClick={logoutHandler} className="drop-shadow-md w-[270px] text-white text-[14px] bg-[#737373] rounded-xl py-3 px-3 mt-2.5 block">로그아웃</button></div>
        
        <div className="flex-1"></div>
        <Layout/>
        <GuideModal isVisible={showG_Modal} onClose={()=>setShowG_Modal(false)}/>
        <QuizModal isVisible={showQ_Modal} onClose={()=>setShowQ_Modal(false)} usertoken={usertoken}/>
        <NoQuizModal  isVisible={showNq_Modal} onClose={()=>setShowNq_Modal(false)}/>
        <ReindeerCollectionModal isVisible={showCollectionModal} onClose={()=>setCollectionModal(false)} nickname={user.nickname} usertoken={usertoken} deerData={deerData}/>
        <SocksModal_1 isVisible={showS1_Modal} onClose={()=>setShowS1_Modal(false)} nickname={user.nickname} usertoken={usertoken} sockData={sock1Data}/>
        <SocksModal_2 isVisible={showS2_Modal} onClose={()=>setShowS2_Modal(false)} nickname={user.nickname} usertoken={usertoken}/>
        <SocksModal_3 isVisible={showS3_Modal} onClose={()=>setShowS3_Modal(false)} nickname={user.nickname} usertoken={usertoken}/>
      </div>
    </div>
    )}
    </Fragment>
  );
}