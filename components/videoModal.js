import React, { useState, useEffect } from 'react'
import { useRef } from "react";
import Image from 'next/image';
import { Modal, Link } from "@nextui-org/react";

const VideoModal = ({ isVisible, onClose, user, usertoken }) => {

	if(!isVisible) return null;

    return (
		<div  onContextMenu={e => e.preventDefault()}>
			<Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={335} height={624} animated={false}>
				<div className="inset-0 bg-opacity-75 flex justify-center items-center z-0 overflow-scroll bg-cover bg-scroll h-full w-full">
					<video
                        src="/video/testVideo.mp4"
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