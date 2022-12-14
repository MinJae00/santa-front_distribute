import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { Modal, Image } from "@nextui-org/react";
import axios from 'axios';

/* 만약에 image src가 없어서 빈 이미지가 아니라 뭔가 에러 이미지가뜨면 Image 태그 img로 변경 */
const fallBackSrc = "/img/reindeer/null_callback.png"   

const ReindeerModal = ({ isVisible, onRClose, usertoken, nickname, solvedNum, deerData }) => {
  if(!isVisible) return null;

  return (
    <div>
    <Modal css={{background:"transparent"}} noPadding open={isVisible} preventClose onClose={onRClose} width={300} height={563} animated={false}>
      <Modal.Header className="flex flex-col items-center text-center w-full" css={{ position: "absolute", zIndex: "$1"}}>
        <div className="flex flex-col items-center text-center">
            <div id="inner-white-box" className="relative">
              <div className="min-w-[200px] min-h-[280px] max-w-[200px] max-h-[500px]"/>
              <div className="top-[54%] left-[37%] absolute"><Image src={deerData.m_horn} width={64.58} height={37.92} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
              <div className="top-[64%] left-[30%] absolute"><Image src={deerData.m_body_color} width={91} height={107.68} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
              <div className="top-[83%] left-[36%] absolute"><Image src={deerData.m_body_deco} width={64.58} height={30.33} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
              <div className="top-[73%] left-[43.6%] absolute"><Image src={deerData.m_eye} width={36.69} height={9.1} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
              <div className="top-[61%] left-[37.3%] absolute"><Image src={deerData.m_hair} width={67.52} height={30.33} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
            </div>
          <div className="">
            <div className="pt-10 font-bold text-[16px]">{solvedNum}번째 순록이 도착했어요 ♥</div>
            <div className="pt-[27px] text-[12px]">{nickname}님만의 특별한 순록이예요.</div>
            <div className="pt-1 text-[12px]">방문 앞의 순록도감에서 확인할 수 있어요!</div>
          </div>
            <Link href={{
              pathname: '/main',
              query: { value:usertoken }, }} as={`/main?value=${usertoken}`}
            >
              <button className="mt-[55px] px-4 py-2 text-white text-base rounded-2xl bg-red-800">맘에 들어요!</button>
            </Link>
        </div>
      </Modal.Header>
      <Image src="/img/r_modal_bg.png" width={300} height={563}/>
    </Modal>
    </div>
  );
}

export default ReindeerModal