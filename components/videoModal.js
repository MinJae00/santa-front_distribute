import React, { useState, useEffect } from 'react'
import { useRef } from "react";
import Image from 'next/image';
import { Modal, Link } from "@nextui-org/react";

const VideoModal = ({ isVisible, onClose, user, usertoken }) => {

	if(!isVisible) return null;
	
	/* AWS 설정 객체 업데이트 */
	AWS.config.update({
		region: "ap-northeast-2", // 버킷이 존재하는 리전
		credentials: new AWS.CognitoIdentityCredentials({
		  IdentityPoolId: process.env.NEXT_PUBLIC__AWS_CONFIG, // cognito 인증 풀에서 받아온 키
		}),
	})

    return (
		<div  onContextMenu={e => e.preventDefault()}>
			<Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={335} height={624} animated={false}>
				<div className="inset-0 bg-opacity-75 flex justify-center items-center z-0 overflow-scroll bg-cover bg-scroll h-full w-full">
					<video
                        src="https://advent-reindeer-test.s3.ap-northeast-2.amazonaws.com/testVideo.mp4"
                        width="335"
                        height="624"
                        controls="controls"
                        autoPlay="autoplay">
                    </video>
				</div>
			</Modal>
		</div>
    );
}
export default VideoModal
