import React, { useEffect, useState, img } from "react";
import { Modal, Link } from "@nextui-org/react";
import Image from 'next/image';
// import {getPromise} from './func';
import axios from 'axios';

/* 만약에 image src가 없어서 빈 이미지가 아니라 뭔가 에러 이미지가뜨면 Image 태그 img로 변경 */
const fallBackSrc = "/img/reindeer/null_callback.png"

const ReindeerCollectionModal = ({ isVisible, onClose, nickname , deerData }) => {
  if(!isVisible) return null;
	
	/* 1 ~ 7 세트 보고싶을때 활성화 */
  // const [	refinedData, setRefinedData] = useState([]);
	// useEffect(() => {
	// 	axios.get("http://localhost:3000/api/temp")
	// 	.then(res => {
	// 			setRefinedData(res.data[0].reindeers);
	// 	});
	// }, []);

	/* 순록 없는 부분 그림자 출력 */
	const rendering = () => {
    const result = [];
    for (let i = 0; i < 10-deerData.length; i++) {
      result.push(
				<div id="one-white-box" className="bg-white p-2 rounded-md relative">
					<div id="inner-white-box" className="bg-[#D4C7AD] pt-3.5 relative">
						<div className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px]">
							<div className="reindeer1 top-[50%] absolute"><Image src="/img/collection_shadow.png" width={53} height={79.5}/></div>
						</div>
					</div>
				</div>
			);
    }
    return result;
  };

	return (
		<div  onContextMenu={e => e.preventDefault()}>
		<Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={300} height={464} animated={false}>
			<div className="flex flex-col items-center h-[464px] w-[300px] overflow-scroll bg-cover bg-scroll
											bg-[url('../public/img/collection_bg.png')]"
			>
				<div id="collection-top" className="text-base font-[600] mt-16 mb-3.5">
					{nickname}님의 순록 도감
				</div>
				<div id="reindeer-set" className="max-h-[440px] overflow-y-scroll grid grid-cols-2 gap-3 justify-items-center">
					{deerData.map((v,index) =>
						<div id="one-white-box" className="bg-white p-2 rounded-md relative" key={index}>
							<div id="inner-white-box" className="bg-[#D4C7AD] mx-[0px] pt-3.5 px-[3px] relative">
								<div className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px]"/>
								<div className="top-[10%] left-[29%] absolute drop-shadow-xl"><Image src={v.m_horn} priority width={44} height={25} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
								<div className="top-[28%] left-[21%] absolute drop-shadow-xl"><Image src={v.m_body_color} priority width={62} height={71} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
								<div className="top-[59%] left-[30%] absolute"><Image src={v.m_body_deco} priority width={44} height={20} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
								<div className="top-[33%] left-[38.8%] absolute"><Image src={v.m_eye} priority width={25} height={6} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
								<div className="top-[22%] left-[29.5%] absolute"><Image src={v.m_hair} priority width={46} height={20} onError={(e) => (e.currentTarget.src = fallBackSrc)}/></div>
							</div>
						</div>
					)}
					{rendering()}
				</div>
				<div id="collection-bottom" className="py-[4.6px]"/>
			</div>
			<Modal.Footer css={{ margin:"7px 0 0 0", }} justify='center'>
				<button onClick={()=>onClose()} className="rounded-xl font-base text-xl text-white bg-black py-1 px-[120px]">
					닫기
				</button>
			</Modal.Footer>
		</Modal>
		</div>
	);
}

export default ReindeerCollectionModal
