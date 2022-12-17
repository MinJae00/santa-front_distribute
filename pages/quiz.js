import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, withRouter } from 'next/router'
import { useRef, useState, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";
import ReinModal from "../components/reindeerModal";
import axios from 'axios';

const BASE_URL = "http://localhost:8000/"

export default function quiz(){
  /* 순록 모달 */
  const [showR_Modal, setShowR_Modal] = useState(false);

  /* quiz data */
  var quizzes = [
    {
        question : '몇몇 순록은 얼음이 아닌 눈에 덮인 이끼를 찾아 남쪽으로 무려 OOOkm까지 이동한다',
        correct : '100',
        hints : 'https://www.bbc.com/korean/features-59777860',
    },{
        question : '영국 감시단체는 오염으로 OOOOO 가까워진다고 경고하였다',
        correct : '회복불가능',
        hints : 'https://www.bbc.com/korean/news-61419228'
    }, {
        question : '환경보호 중요성 알리기는 환경보호 실천 방법 리스트 중 몇 번째 목표인가요? ex) 10',
        correct : '25',
        hints : 'https://brunch.co.kr/@hantole/13'
    }, {
        question : '지구의 날은 몇 월 며칠 인가요? ex) 0927',
        correct : '0422',
        hints : 'https://www.korea.kr/news/reporterView.do?newsId=148900968'
    },{
        question : '32개의 글로벌 패션 기업이 체결한 패션 협약에서 0000년까지 온실가스 배출량 제로의 목표를 잡았다 ex) 2022',
        correct : '2050',
        hints : 'https://hypebeast.kr/2019/8/g-7-fashion-pact-kering-emmanuel-macron-prada-nike-hermes-burberry-chanel'
    }, {
        question : 'ESG에서 G의 의미를 한국어로 입력해주세요',
        correct : '지배구조',
        hints : 'https://www.clickesg.co.kr/ui/overview/descriptionEsg.html'
    }, {
        question : '새활용 특화시설 중 세계 최대 규모로 평가되는 이곳의 이름을 입력해주세요',
        correct : '서울새활용플라자',
        hints : 'https://n.news.naver.com/mnews/article/014/0004933889?sid=102'
    }, {
        question : '사람들이 기후변화를 잘 받아들이지 않는 것은 OOO효과 혹은 자기범주화이론이 작용하기 때문이다',
        correct : '방관자',
        hints : 'https://ecosophialab.com/%EC%99%9C-%EA%B8%B0%ED%9B%84%EC%9C%84%EA%B8%B0%EB%8A%94-%EC%97%AC%ED%83%9C-%ED%95%B4%EA%B2%B0%EC%9D%B4-%EC%95%88-%EB%90%98%EA%B3%A0-%EC%9E%88%EB%8A%94%EA%B0%80-ccc%EC%9D%98-%EB%B9%84%EB%B0%80-3/'
    }, {
        question : '환경문제 해결을 위한 그린피스만의 캠페인 방식 중 세번째는 온라인, 오프라인 시민 OOOOO 프로젝트 진행이다',
        correct : '액티비스트',
        hints : 'https://www.greenpeace.org/korea/report/23590/blog-etc-how_we_do/'
    }, {
        question : '지구 온난화로 먹을 것이 없어진 순록은 살기 위해 소금기가 많은 OO도 먹는 모습을 보이고 있다',
        correct : '해초',
        hints : 'https://www.sciencetimes.co.kr/news/%EB%B6%81%EA%B7%B9-%EC%88%9C%EB%A1%9D-%EC%A7%80%EA%B5%AC-%EC%98%A8%EB%82%9C%ED%99%94-%EC%98%81%ED%96%A5-%EC%8B%9D%EB%8B%A8-%EB%B0%94%EA%BF%94/'
    }
  ]

  /* 로그인 확인 */
  const [paramValue, setParamValue] = useState();  // url의 query :string
  const [windowGet, setWindowGet] = useState();  // session에 user라는 이름의 key 있는지 확인 ( 없으면 null )
  const [user, setUser] = useState([]);  // 토큰, 닉네임, solve_count :object
  const [usertoken, setUsertoken] = useState(); // 유저 토큰 :string
  const [preSolvedNum, setPreSolvedNum] = useState(); // 유저가 푼 문제 갯수
  const [solvedNum, setSolvedNum] = useState(); // 유저가 푼 문제 갯수
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== 'undefined') {
      var today = new Date();
      /* 테스트 원하는 경우 목표 날짜 수정후 확인 */
      var dDay = new Date(2022,11,25);
      var gap = dDay.getTime() - today.getTime();
      var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
      if(result <0 ) result = 0;

      const params = new URLSearchParams(location.search);
      const t_paramvalue = params.get("value");
      setParamValue(t_paramvalue)
      const t_windowGet = window.sessionStorage.getItem('user');
      setWindowGet( window.sessionStorage.getItem('user') );
      console.log(t_paramvalue);
      console.log(JSON.parse(window.sessionStorage.token));
      // user key가 session에 존재하고, url value와 token이 동일하고, 퀴즈가 남아있는 경우만 접근 허용
      if(t_windowGet !== null && t_paramvalue == JSON.parse(window.sessionStorage.token)){
        const t_testNum = JSON.parse(window.sessionStorage.solvecount) + result
        console.log(t_testNum);
        if( t_testNum < 10 ){
          setUser(JSON.parse(window.sessionStorage.user));
          setUsertoken(JSON.parse(window.sessionStorage.token));
          setPreSolvedNum(JSON.parse(window.sessionStorage.solvecount));
          setSolvedNum(JSON.parse(window.sessionStorage.solvecount));
        }
        else {
          router.push({
            pathname: '/main',
            query: {
              value:t_paramvalue
            },
          },);
          alert("오늘의 퀴즈가 남아있지 않습니다.");
        }
      } else {
        window.sessionStorage.clear();
        router.push('/');
        alert("잘못된 접근입니다.");
      }
    }
  },[])

  /* quizzes에서 해당하는 퀴즈 꺼내기 */
  const [quizdata, setQuizData] = useState();
  useEffect(() => {
    const tmp = quizzes[preSolvedNum];
    setQuizData(tmp);
    console.log("====quizData====")
    console.log(quizzes[preSolvedNum])
  },[preSolvedNum])

  /* 오늘 날짜 */
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  /* 정답 컨페티 */
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(()=>{
    if(showConfetti){
      const confettiSettings = { target: 'my-canvas', clock: 40, props:['square'], size:1.3, rotate:true };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      console.log("컨페티")
    }
  },[showConfetti])

  /* 사용자 입력 값 */
  const quizInput = useRef();

  /* 정답 확인 */
  function quizConfirm() {
    const quizInput_t = quizInput.current.value.toLowerCase().trim();
    let answerResult = quizdata.correct.toLowerCase().trim();
    const t_solvedNum = solvedNum +1;
    // 확인후 지워도 됨
    console.log(t_solvedNum)
    console.log(usertoken)
    if (quizInput_t == answerResult && typeof window !== 'undefined') {
      // 정답 
      /* 백엔드 서버로 solvedQuiz 갯수 증가 */
      axios.post(process.env.NEXT_PUBLIC_MY_BACK+"solvequestion/",
      {
        jwt:usertoken,
        src:'/img/ornaments/'+ t_solvedNum +'.png'
      })
      .then(res => {
        setSolvedNum(res.data.solve_count);
        console.log(res.data);
      })
      .catch(res => {
        console.log(res.data);
      });
      document.getElementById('quiz_view_f').classList.remove('block');
      document.getElementById('quiz_view_f').classList.add('hidden');
      document.getElementById('quiz').classList.add('invisible');    // 문제 가리기
      document.getElementById('quiz_view_t').classList.remove('hidden');
      document.getElementById('quiz_view_t').classList.add('block');
      document.getElementById('u_anw').readOnly = true;   // input readonly 활성화
      document.getElementById('rd_arrive').classList.remove('hidden');
      document.getElementById('rd_arrive').classList.add('block');
      document.getElementById('submit-btn').classList.add('hidden');
      setShowConfetti(true);  // confetti 활성화
      if(typeof window !== 'undefined') {
        window.sessionStorage.solvecount = JSON.stringify(t_solvedNum)
        console.log(window.sessionStorage)
      }
    }else{
      // 오답 
      document.getElementById('quiz_view_t').classList.remove('block');
      document.getElementById('quiz_view_t').classList.add('hidden');
      document.getElementById('quiz_view_f').classList.remove('hidden');
      document.getElementById('quiz_view_f').classList.add('block');
    }
  }

  /* 순록 모달ON 버튼 클릭시 */
  const [deerData, setDeerData] = useState();
  async function getDeer(){
    let res = await axios.get(process.env.NEXT_PUBLIC_MY_BACK+"deer/", {
      params: {
        jwt:usertoken
      },
    });
    console.log("getDeer 결과 =======");
    var datajson = res.data;
    console.log(datajson);
    setDeerData(datajson[preSolvedNum]);
    return setShowR_Modal(true); 
  }

  return (
    <div className="
        flex flex-col h-screen relative
        overflow-auto bg-cover bg-local
        bg-[url('../public/img/wood_pattern_dark.png')]
    " onContextMenu={e => e.preventDefault()}>
        <Head>
          <title>돌아와! 순록!</title>
          <meta name="description" content="콘텐트 내용" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <canvas id="my-canvas" className="absolute"></canvas>
        <div className="back-btn pl-16 pt-16">
          <Link href={{
              pathname: '/main',
              query: { value:usertoken }, }} as={`/main?value=${usertoken}`}
            >
            <Image src="/img/back_white.png" width='40' height='40'/>
          </Link>
        </div>
        
        <div className="day-text text-white pt-8 pb-4 text-xl">{month}월 {day}일 {preSolvedNum+1}번째 퀴즈</div>
        <div className="flex-1 w-full text-center m-auto relative">
          <div className="absolute mt-5 hint-btn">
            <Link href={quizdata ? quizdata.hints : "/main"}><a target="_blank" className="hint-btn text-xs text-white py-1 px-6 mb-1 bg-green-800 rounded-md">ㅤ힌트 보러가기</a></Link>
          </div>
          <div className="hint-btn-img">
            <Image src="/img/hint_btn.png" width='31' height='36'/>
          </div>
        </div>
        <div className="flex letter-wrapper mt-10">
          <Image className=" w-full max-x-md absolute" src='/img/quiz_back.webp' priority width='430' height='639'/>
          <div className="flex flex-col letter-text1 px-5 relative ">
            <div className="flex text-rose-800 mb-3 max-[374px]:text-xs max-[374px]:mb-0.5 max-[374px]:mt-8">~ 오늘의 퀴즈 ~</div>
            <div id="quiz" className="flex text-base max-[374px]:text-sm">{quizdata ? quizdata.question: null}</div>
            <div id="quiz_view_t" className="absolute mb-56 quiz_view_t hidden">
              <Image className=""src='/img/closeBtn_Santa.png' width='52' height='54' />
              <div className="">정답입니다 !</div>
            </div>
            <div id="quiz_view_f" className="absolute mb-32 bg-rose-800 text-white hidden max-[374px]:mb-32">
              <div className="text-xs pt-0.5 px-2 ">땡! 다시 생각해보세요.</div>
            </div>
            <div className="quiz_answer">
              <input type="text" ref={quizInput} className="quiz_input" id="u_anw" placeholder="정답 입력하기"/>
              <button id="submit-btn" className="submit" onClick={()=>quizConfirm()}>제출</button>
            </div>
          </div>
          <div id="rd_arrive" className="absolute rd-arrive hidden">
            <div className="absolute">
              <button onClick={()=>getDeer()} className="rd-arrive-btn py-1 px-4 mb-1 rounded-md">ㅤ순록이 돌아왔어요o&#40;≧∇≦o&#41;</button>
            </div>
            <div className="arrive-btn-img">
              <Image src="/img/rd_arrive.png" width='48' height='71'/>
            </div>
          </div>
        </div>
        <ReinModal isVisible={showR_Modal} onRClose={()=>setShowR_Modal(false)} usertoken={usertoken} nickname={user.nickname} solvedNum={solvedNum} deerData={deerData}/>
    </div>
  );
}