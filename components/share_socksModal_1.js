import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Modal, Link } from "@nextui-org/react";

const SOCKNAME = "임시이름"
const NICKNAME = "임시닉네임"
const imgsrc = "https://advent-reindeer-test.s3.ap-northeast-2.amazonaws.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU0MjQ5MzM5Mn0.qqWEU-lxyN0XnBxIjKdGj0P81wJATwvz3sgAkBsT0nQd.jpg"
const null_img = null;
const null_sockname = null;

const Share_SocksModal_1 = ({ isVisible, onClose, usertoken, nickname }) => {
	/* 백엔드에서 TOKEN, 양말번호 이용해서 양말 SRC, NAME 받아오기 */
	if(!isVisible) return null;

	return (
		<div>
		<Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={335} height={624} animated={false}>
				<div className="inset-0 bg-opacity-75 flex justify-center items-center z-0 overflow-scroll bg-cover bg-scroll h-[684px] w-[335px]">
					<div className="socks_back">
						<div className="socks_back2 relative">
							<div className="socks_flower">
								<Image src='/img/ornaments/6.png' width='100' height='100'></Image>
							</div>
							<button className="text-white absolute flex top-[2%] right-[6%] text-[20px]" onClick={()=>onClose()}>x</button>
							<div className="pt-[70px] h-[20px] w-[300px] top-[10%] text-white text-center text-[18px]">{nickname}님의 소원양말 1</div>
							<div className="socks_center">
								<div className="socks_giftImg">
									{ null_img !== null
										?
										<Image src={null_img} width='234' height='214' className="rounded-2xl"></Image>
										:
										<div>
										{ SOCKNAME !== null
											? 
											<div id="non-img" className="w-[234px] h-[214px] pt-[76px] text-center text-white">
												<div className="text-[15px] font-bold">친구가 이미지를</div>
												<div className="text-[15px] font-bold pt-[15px]">등록하지 않았어요</div>
											</div>
											:
											<div id="non-img-wish" className="w-[234px] h-[214px] pt-[50px] text-center text-white">
												<div className="text-[35px] font-bold">텅~</div>
												<div className="text-[12px] font-bold">친구가 아직 고민중인가 봐요</div>
											</div>
										}
										</div>
									}
								</div>
								<div className="socks_img">
									<Image src='/img/sock_1.png' width='89' height='109.5'></Image>
								</div>
							</div>
							<div className="absolute h-[23px] w-[300px] top-[453px] text-white text-center text-[18px]">{null_sockname}</div>
							<div className="socks_closeBtn">
								<button className="socks_closeWord" onClick={()=>onClose()}>닫기</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
			</div>
	);
}
export default Share_SocksModal_1