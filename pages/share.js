import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment, useState, useEffect } from 'react'
import { Modal, useModal, Switch, Spacer } from '@nextui-org/react';
import {Howl, Howler} from 'howler';
import axios from 'axios';
import ReindeerCollectionModal from '../components/reindeerCollectionModal'
import SocksModal_1 from '../components/share_socksModal_1'
import SocksModal_2 from '../components/share_socksModal_2'
import SocksModal_3 from '../components/share_socksModal_3'

const BASE_URL = process.env.NEXT_PUBLIC_MY_BACK
const DEFAULT_IMG = "/img/reindeer/null_callback.png"

export default function share(){

  /* 링크의 사용자 정보 불러오기 */
  const [usertoken, setUsertoken] = useState(); // url로 전달된 유저jwt토큰
  const [nickname, setNickname] = useState(""); // jwt로 받은 유저닉네임
  const router = useRouter();
  useEffect(() => {
    if(typeof window !== 'undefined') {
      const params = new URLSearchParams(location.search);
      const t_paramvalue = params.get("value");
      setUsertoken(t_paramvalue)
      realWreath(t_paramvalue)
      if(t_paramvalue !== null){
        /* t_paramvalue(token)으로 백엔드에 realwreath, socks, reindeer 요청 */
        axios.get(BASE_URL+"nickname/",{
          params: {
            jwt:t_paramvalue
          },}
        )
        .then(res => {
          setNickname(res.data.nickname);
        })
        .catch(res => {
          router.push('/');
          alert("잘못된 공유주소입니다.");
        })
      }
      else {
        router.push('/');
        alert("잘못된 접근입니다.");
      }
    }
  },[])

  /* 순록 데이터 불러오기 */
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
    console.log("socks1 결과 =======");
    var datajson = res.data;
    if(datajson.url=="null" && datajson.name=="null"){
      const tmp = {
        url : null,
        name : null,
      }
      console.log(tmp);
      setSock1Data(tmp);
      return setShowS1_Modal(true);
    }else{
      console.log(datajson);
      setSock1Data(datajson);
      return setShowS1_Modal(true);
    }
  }

  /* 양말2 데이터 불러오기(button 클릭 실행) */
  const [sock2Data, setSock2Data] = useState();
  async function getSock2(){
  let res = await axios.get(BASE_URL+"socks/", {
      params: {
        jwt:usertoken,
        num:2
      },
    });
    console.log("socks2 결과 =======");
    var datajson = res.data;
    if(datajson.url=="null" && datajson.name=="null"){
      const tmp = {
        url : null,
        name : null,
      }
      console.log(tmp);
      setSock2Data(tmp);
      return setShowS2_Modal(true);
    }else{
      console.log(datajson);
      setSock2Data(datajson);
      return setShowS2_Modal(true);
    }
  }

  /* 양말3 데이터 불러오기(button 클릭 실행) */
  const [sock3Data, setSock3Data] = useState();
  async function getSock3(){
  let res = await axios.get(BASE_URL+"socks/", {
      params: {
        jwt:usertoken,
        num:3
      },
    });
    console.log("socks3 결과 =======");
    var datajson = res.data;
    console.log(datajson);
    if(datajson.url=="null" && datajson.name=="null"){
      const tmp = {
        url : null,
        name : null,
      }
      console.log(tmp);
      setSock3Data(tmp);
      return setShowS3_Modal(true);
    }else{
      console.log(datajson);
      setSock3Data(datajson);
      return setShowS3_Modal(true);
    }
  }

  /* 시작화면으로 돌아가기 */
  const [clickGo, setClickGo] = useState(false);
  useEffect(() => {
    if(clickGo) {
      router.push('/');
    }
  },[clickGo])

  /* 디데이 계산 */
  const [d_Day, setD_Day] = useState();
  useEffect(() => {
    var today = new Date();
    /* 테스트 원하는 경우 목표 날짜 수정후 확인 */
    var dDay = new Date(2022,11,26);
    var gap = dDay.getTime() - today.getTime();
    var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    setD_Day(result);
  }, []);

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

  //오너먼트 데이터 불러오기
  const [userData, setUserData] = useState({}); 
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

  const [trueWreath, setTrueWreath] = useState([]);
  useEffect(() => {
    console.log(trueWreath)
  })
  async function realWreath(usertoken){
    let res = await axios.get(BASE_URL+"realwreath/", {
      params: {
        jwt:usertoken,
      },
    });
    console.log("realwreath 결과 =======");
    setTrueWreath(res.data.ornaments);
    console.log(trueWreath);
    //setRefinedData(datajson);
    //return WreathEditModal({ getData, removeQ, user, usertoken, refinedData }); 
  }

  const [showCollectionModal, setCollectionModal] = useState(false);
  const [showS1_Modal, setShowS1_Modal] = useState(false);
  const [showS2_Modal, setShowS2_Modal] = useState(false);
  const [showS3_Modal, setShowS3_Modal] = useState(false);
  
  return (
    <Fragment>
    <div className="
        flex flex-col items-center h-screen overflow-auto bg-cover bg-local
        bg-[url('../public/img/wood_pattern.png')]"
    onContextMenu={e => e.preventDefault()}>
      <Head>
      <title>돌아와 순록!</title>
      <meta name="description" content="콘텐트 내용"/>
      <link rel="icon" href="/favicon.ico" />
      </Head> 

      <div className="flex flex-col items-center h-full">
        <div className="flex flex-row max-w-[300px] min-w-[300px] justify-between items-end">
          <h1 className="flex ml-2 mb-0 relative text-lg font-bold text-left text-[#4F3131] pt-4">돌아와 순록!</h1>
          <div id="bgm-toggle" className="bg-stone-600/50 flex pl-2.5 pr-1 pb-[3px] rounded-xl mb-1">
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
        <div className="relative">
          <div className="text-center m-auto relative"> 
            <Image src='/img/door-border_1.png' width='307' height='537'/>
          </div>
          <div className="door-top">
            <div className="flex justify-between">  
              <h1 className="ml-8 text-white text-base font-normal align-bottom">
                {nickname}님의 소원양말
              </h1>
            </div>
            <div className="px-10 relative">
              <div className="w-60 text-center m-auto relative">
                <Image src='/img/socks_line.png' width='350' height='50'/>
              </div>
              <div className="sock-1">
                <button onClick={()=>getSock1()}>
                  <Image src='/img/sock_1.png' width='83.95' height='102.5'/>
                </button>
              </div>
              <div className="sock-2">
                <button onClick={()=>getSock2()}>
                  <Image src='/img/sock_2.png' width='79.07' height='109.33p'/>
                </button>
              </div>
              <div className="sock-3">
                <button onClick={()=>getSock3()}>
                  <Image src='/img/sock_3.png' width='82.98' height='107.38'/>
                </button>
              </div>
            </div>
            <div className="pt-16 mt-6 place-items-center flex-1">
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
            </div>

            <div className="orna-q1">
              <Image src={(trueWreath[0] == -1) ? DEFAULT_IMG : trueWreath[0]} width='60' height='60'/>
            </div>
            <div className="orna-q2">
              <Image src={(trueWreath[1] == -1) ? DEFAULT_IMG : trueWreath[1]} width='60' height='60'/>
            </div>
            <div className="orna-q3">
              <Image src={(trueWreath[2] == -1) ? DEFAULT_IMG : trueWreath[2]} width='60' height='60'/>
            </div>
            <div className="orna-q4">
              <Image src={(trueWreath[3] == -1) ? DEFAULT_IMG : trueWreath[3]} width='60' height='60'/>
            </div>
            <div className="orna-q5">
              <Image src={(trueWreath[4] == -1) ? DEFAULT_IMG : trueWreath[4]} width='60' height='60'/>
            </div>
            <div className="orna-q6">
              <Image src={(trueWreath[5] == -1) ? DEFAULT_IMG : trueWreath[5]} width='60' height='60'/>
            </div>
            <div className="orna-q7">
              <Image src={(trueWreath[6] == -1) ? DEFAULT_IMG : trueWreath[6]} width='60' height='60'/>
            </div>

            <div className="door-handle"><Image src='/img/handle.png' width='76' height='103'/></div>
            <div id="collection"className="absolute w-[95px] h-[131px] top-[84%] left-[65%] text-align">
              <button onClick={()=> getDeer()} >
                <Image src='/img/collection.png' quality='100' width='95' height='131'/>
              </button>
            </div>
          </div>
        </div>
        <div id="go-index" className="relative min-w-[320px]">
          <button onClick={()=>setClickGo(true)} className="text-xs px-6 py-2.5 text-white bg-[#B30000] m-auto mt-[10px] block relative">저도 크리스마스 방문 꾸미러 갈래요!</button>
          <div className="share-go-index top-[68%] left-[13%]"><Image src='/img/ornaments/santa.png' width='39' height='44'/></div>
          <div className="share-go-index top-[56%] left-[86%]"><Image src='/img/ornaments/socks.png' width='35' height='57'/></div>
        </div>
        <div className="flex-1"></div>
        <div className="flex share-btm"><Image className="max-x-md" src='/img/share/package_btm.png' width='425' height='238'/></div>
        <ReindeerCollectionModal isVisible={showCollectionModal} onClose={()=>setCollectionModal(false)} usertoken={usertoken} nickname={nickname} deerData={deerData}/>
        <SocksModal_1 isVisible={showS1_Modal} onClose={()=>setShowS1_Modal(false)} usertoken={usertoken} nickname={nickname} sockData={sock1Data}/>
        <SocksModal_2 isVisible={showS2_Modal} onClose={()=>setShowS2_Modal(false)} usertoken={usertoken} nickname={nickname} sockData={sock2Data}/>
        <SocksModal_3 isVisible={showS3_Modal} onClose={()=>setShowS3_Modal(false)} usertoken={usertoken} nickname={nickname} sockData={sock3Data}/>
      </div>
    </div>
    </Fragment>
  );
}