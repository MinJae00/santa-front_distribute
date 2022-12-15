import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Modal, Link } from "@nextui-org/react";


const Share_SocksModal_3 = ({ isVisible, onClose, nickname, sockData }) => {
	/* 백엔드에서 TOKEN, 양말번호 이용해서 양말 SRC, NAME 받아오기 */
	if(!isVisible) return null;

	return (
		<div  onContextMenu={e => e.preventDefault()}>
		<Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={335} height={624} animated={false}>
				<div className="inset-0 bg-opacity-75 flex justify-center items-center z-0 overflow-scroll bg-cover bg-scroll h-[684px] w-[335px]">
					<div className="socks_back">
						<div className="socks_back2 relative">
							<div className="socks_flower">
								<Image src='/img/ornaments/6.png' width='100' height='100'></Image>
							</div>
							<button className="text-white absolute flex top-[2%] right-[6%] text-[20px]" onClick={()=>onClose()}>x</button>
							<div className="pt-[70px] h-[20px] w-[300px] top-[10%] text-white text-center text-[18px]">{nickname}님의 소원양말 3</div>
							<div className="socks_center3">
								<div className="socks_edit_noneBox">
									{ sockData.url !== null
										?
										<img src={sockData.url} className="rounded-2xl max-w-[214px] max-h-[194px]"></img>
										:
										<div id="non-img-wish" className="w-[234px] h-[214px] pt-[65px] text-center text-white">
											<div className="text-[35px] font-bold">텅 ~</div>
											<div className="text-[12px] font-bold">친구가 아직 고민중인가 봐요</div>
										</div>
									}
								</div>
								<div className="socks_img">
									<Image src='/img/sock_3.png' width='89' height='109.5'></Image>
								</div>
							</div>
							<div className="absolute h-[23px] w-[300px] top-[453px] text-white text-center text-[18px]">{sockData.name}</div>
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
export default Share_SocksModal_3