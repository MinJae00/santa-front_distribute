import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const QuizModal = ({ isVisible, onClose, usertoken }) => {  

  if(!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 
                    flex flex-col justify-center items-center z-0">
      <div className="wrapper mb-8">
        <div className="lid one"></div>
        <div className="lid two"></div>
        <div className="envelope"></div>
        <Link href={{
              pathname: '/quiz',
              query: { value:usertoken }, }} as={`/quiz?value=${usertoken}`}
        >
          <div className="letter">
          <Link href={{pathname: '/quiz', query: { value:usertoken }, }} as={`/quiz?value=${usertoken}`}><a className="flex flex-col text-black">퀴즈가</a></Link>
          <Link href={{pathname: '/quiz', query: { value:usertoken }, }} as={`/quiz?value=${usertoken}`}><a className="flex flex-col text-black">도착했어요!</a></Link>
          </div>
        </Link>
      </div>
      <div className="qmodal-text font-normal text-sm text-white">편지를 눌러주세요</div>
      <button className="x-btn text-xl" onClick={()=>onClose()}>x</button>
      <style jsx>{`
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          .wrapper {
              height: 136px;
              width: 204px;
              background-color: #990000;
              position: relative;
              display: flex;
              justify-content: center;
              z-index: 0;
          }

          .lid {
              position: absolute;
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              border-right: 102px solid transparent;
              border-bottom: 68px solid transparent;
              border-left: 102px solid transparent;
              transform-origin: top;
              transition: transform 0.25s linear;
          }

          /* Lid when closed */
          .lid.one {
              border-top: 100px solid #cc0000;
              transform: rotateX(0deg);
              z-index: 3;
              transition-delay: 0.75s;
          }

          /* Lid when opened */
          .lid.two {
              border-top: 68px solid #990000;
              transform: rotateX(90deg);
              z-index: 1;
              transition-delay: 0.5s;
          }

          .envelope {
              position: absolute;
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              border-top: 68px solid transparent;
              border-right: 102px solid #b30000;
              border-bottom: 68px solid #cc0000;
              border-left: 102px solid #b30000;
              z-index: 3;
          }

          .letter {
              position: absolute;
              top: 0;
              width: 80%;
              height: 80%;
              background-color: white;
              border-radius: 15px;
              z-index: 2;
              transition: 0.5s;
              padding-top: 20px;
          }
          
          .letter a {
              text-align: center;
          }

          .wrapper:hover .lid.one {
              transform: rotateX(90deg);
              transition-delay: 0s;
          }

          .wrapper:hover .lid.two {
              transform: rotateX(180deg);
              transition-delay: 0.25s;
          }

          .wrapper:hover .letter {
              transform: translateY(-60px);
              transition-delay: 0.5s;
          }
          .x-btn {
              color : white;
              position : absolute;
          }
          .qmodal-text {
              position : absolute;
              top: 65%;
          }
      `}</style>
    </div>
  )
}

export default QuizModal