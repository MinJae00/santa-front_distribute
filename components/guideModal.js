import Link from 'next/link';
import React from "react";
import { Modal, Image} from "@nextui-org/react";

const guideModal = ({ isVisible, onClose }) => {

  if(!isVisible) return null;

  return (
    <div onContextMenu={e => e.preventDefault()}>
		<Modal css={{background:"transparent",}} width="320px" noPadding open={isVisible} onClose={onClose} animated={false}>
			<div className="flex flex-col justify-items-center items-center h-[692px] w-[320px] overflow-scroll bg-cover bg-scroll
											bg-[url('../public/img/guide/guide_bg.png')]">

				<div id="guide-top" className="flex justify-items-center items-center text-[18px] h-[70px] text-white">
					<div>돌아와 순록 가이드</div>
					<div className="absolute top-[1%] right-[5%]"><button className="text-xl" onClick={()=>onClose()}>x</button></div>
				</div>

				<div id="guide-content" className="max-h-[597px] min-h-[597px] flex flex-col justify-start overflow-y-scroll w-[280px] py-[20px]">
					
					<div id="0-title-content" className="mb-[23px]">
						<div id="title-0" className="flex flex-row justify-start h-[27px] w-max items-center">
							<Image src="/img/guide/title_img.png" width={18} height={27}/>
							<div className="pl-[5px] pt-0.5 text-[#393333] text-[14px] font-bold">
								돌아와 순록이란?
							</div>
						</div>
						<div id="content-0" className="flex flex-col justify-start pl-[10px] w-[277px] items-center text-left">
							<div className="mt-[15px] text-[#282525] text-[10px]">
								환경 오염으로 인해 순록들이 사라져서 산타가 아이들에게 선물을 전달 할 수 없게 되었어요!
							</div>
							<div className="mt-[15px] text-[#282525] text-[10px]">
								매일 퀴즈를 맞추면서 방 문을 꾸미는 어드벤트 캘린더 형식의 서비스 입니다. 매일 매일 사라진 순록을 찾아주세요!
							</div>
						</div>
					</div>
					
					<div id="1-title-content" className="mb-[23px]">
						<div id="title-1" className="flex flex-row justify-start h-[27px] w-max items-center">
							<Image src="/img/guide/title_img.png" width={18} height={27}/>
							<div className="pl-[5px] pt-0.5 text-[#393333] text-[14px] font-bold">
								이용하는 방법
							</div>
						</div>
						<div id="content-1" className="flex flex-col justify-start pl-[20px] w-[277px] items-center text-left">
							<div className="left-[6%] top-[40%] absolute"><Image src="/img/ornaments/9.png" width={17} height={17}/></div>
							<div className="left-[6%] top-[47%] absolute"><Image src="/img/guide/U2.png" width={17} height={17}/></div>
							<div className="left-[6%] top-[53.5%] absolute"><Image src="/img/ornaments/6.png" width={17} height={17}/></div>
							<div className="left-[6%] top-[60%] absolute"><Image src="/img/guide/U4.png" width={17} height={17}/></div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								양말에 갖고 싶은 선물을 등록해 보세요! 아래의 공유링크를 통해 공유하고, 다른 친구들의 소원양말도 확인해 볼까요?
							</div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								매일 환경과 관련된 퀴즈를 맞추면 오너먼트와 함께 나만의 특별한 순록이 돌아와요!
							</div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								획득한 오너먼트를 통해 크리스마스 리스를 꾸며보세요! 나만의 리스와 순록들도 공유링크를 통해 친구가 볼 수 있어요!
							</div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								리스를 꾸미고 순록들을 찾으면서 기다리다 보면 크리스마스 당일엔 문손잡이가 열릴지도 몰라요! 🎁
							</div>
						</div>
					</div>
					
					<div id="2-title-content">
						<div id="title-0" className="flex flex-row justify-start h-[27px] w-max items-center">
							<Image src="/img/guide/title_img.png" width={18} height={27}/>
							<div className="pl-[5px] pr-[8px] text-[#393333] text-[14px] font-bold">
								돌아와 순록단
							</div>
							<Link href="https://www.instagram.com/comeback_reindeer/"><a target="_blank" className="pt-[1.5px]">
								<Image src="/img/guide/insta_icon.png" width={10} height={10}/></a>
							</Link>
							<Link href="https://www.instagram.com/comeback_reindeer/"><a target="_blank" className="pt-[3.5px] pl-[3px] text-[#393333] text-[10px] font-bold">
								comeback_reindeer</a>
							</Link>
						</div>
						<div id="content-2" className="flex flex-col justify-start pl-[20px] w-[277px] items-center text-left">
							<div className="left-[6%] top-[74%] absolute"><Image src="/img/guide/D1.png" width={17} height={17}/></div>
							<div className="left-[6%] top-[79.8%] absolute"><Image src="/img/guide/D2.png" width={17} height={17}/></div>
							<div className="left-[6%] top-[85%] absolute"><Image src="/img/guide/D3.png" width={17} height={17}/></div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								돌아와 순록은 한양대학교 ERICA 멋쟁이 사자처럼 10기 호랑팀원 6명이 함께 만든 크리스마스 시즌 한정 서비스 입니다.
							</div>
							<div className="mt-[16px] text-[#282525] text-[10px] pr-[21px]">
								돌아와 순록은 비영리 목적으로 운영하는 서비스 입니다.
							</div>
							<div className="mt-[16px] text-[#282525] text-[10px]">
								궁금한 점이나 자세한 사항 및 이벤트는 인스타를 통해 확인 가능합니다.
							</div>
						</div>
					</div>

					<div className="right-0 top-[86%] absolute"><Image src="/img/share/package_btm.png" width={126} height={74.16}/></div>
				
				</div>
				<div id="guide-bottom" className="max-h-[25px] min-h-[25px]"/>
			</div>
		</Modal>
		</div>
  );
}

export default guideModal;