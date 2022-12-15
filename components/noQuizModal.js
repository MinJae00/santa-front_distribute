import React, { useEffect, useState } from "react";
import { Modal } from "@nextui-org/react";

const noQuizModal = ({ isVisible, onClose }) => {
  if(!isVisible) return null;

  return (
    <div  onContextMenu={e => e.preventDefault()}>
		<Modal noPadding open={isVisible} onClose={onClose} width={200} height={100} animated={false}>
      <div className="font-normal text-base text-black py-4">
        내일 새롭게 도착할<br/>퀴즈를 기대해주세요!
      </div>
    </Modal>
    </div>
  )
}

export default noQuizModal