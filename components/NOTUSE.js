import React, { useState, useEffect } from 'react'
import { useRef } from "react";
import Image from 'next/image';
import { Modal, Link } from "@nextui-org/react";
import AWS from "aws-sdk"

const SocksEditModal = ({ isVisible, onClose, user, usertoken}) => {

  /* AWS 설정 객체 업데이트 */
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.NEXT_PUBLIC__AWS_CONFIG, // cognito 인증 풀에서 받아온 키
    }),
  })

  /*  이미지 가져오고 업로드 하는 핸들러 */
  const handleFileInput = (fileBlob1, fileBlob2, fileBlob3, size) => {
    if(fileBlob1 !== null){
      const file1 = fileBlob1
      const t_filename1 = usertoken + file.name1
    }
    if(fileBlob2 !== null){
      const file2 = fileBlob2
      const t_filename1 = usertoken + file.name1
    }
    if(fileBlob3 !== null){
      const file1 = fileBlob1
      const t_filename1 = usertoken + file.name1
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "advent-reindeer-test",
        Key: t_filename,
        Body: file,
      },
    })
    const promise = upload.promise()
    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.")
      },
      function (err) {
        return alert(err.message)
      }
    )
    
    onClose()
  }

  const [imageSrc1, setImageSrc1] = useState('');
  const encodeFileToBase64_1 = (fileBlob) => {
    console.log(fileBlob);
    console.log(fileBlob.name)
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc1(reader.result);
        resolve();
      };}
    );
  };

  //이미지 이름 가져오기
  const [giftName1, setGiftName1] = useState('');
  const [giftName2, setGiftName2] = useState('');
  const [giftName3, setGiftName3] = useState('');
  const imageInput1 = useRef();
  const imageInput2 = useRef();
  const imageInput3 = useRef();

  const onCickImageUpload1 = () => {
    imageInput1.current.click();
  };
  const onCickImageUpload2 = () => {
    imageInput2.current.click();
  };
  const onCickImageUpload3 = () => {
    imageInput3.current.click();
  };

  /* 이미지 미리보기용 함수 1,2,3 */

  const [imageSrc2, setImageSrc2] = useState('');
  const encodeFileToBase64_2 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc2(reader.result);
        resolve();
      };}
    );
  };

  const [imageSrc3, setImageSrc3] = useState('');
  const encodeFileToBase64_3 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc3(reader.result);
        resolve();
      };}
    );
  };

  if(!isVisible) return null;

  return (
    <div>
    <Modal css={{background:"transparent",}} noPadding open={isVisible} onClose={onClose} width={340} height={640} animated={false}>
      <div className="inset-0 bg-opacity-75 flex justify-center items-center z-0
                      overflow-scroll bg-cover bg-scroll h-[640px] w-[340px]"
      >
        <div className="socks_edit_back">
          <button className="edit_x-btn text-lg" onClick={()=>onClose()}>x</button>
          <div className="socks_edit">{user.nickname}님의 소원양말</div>

          <div className="socks_edit_socks">
            <div className="socks_edit_line">
              <Image src='/img/socks_line.png' width='350' height='50'/>
            </div>
            <div className="socks_edit1">
              <Image src='/img/sock_1.png' width='66.44' height='83.33'/>
              <Image src='/img/sock_2.png' width='62' height='89.56'/>
              <Image src='/img/sock_3.png' width='65.56' height='87.78'/>
            </div>

            <div className="socks_edit_box1">
              <div className="socks_edit_box1_inner">
                <div className="socks_edit_smSocks">
                  <div className="socks_edit_img1">
                    <Image src='/img/sock_1.png' width='30' height='35'/>
                  </div>
                  <div className="socks_edit_text">
                    <h1 className="font-normal text-sm">첫 번째 소원 양말</h1>
                  </div>
                </div>
                
                <div id="none_box_1" className="socks_edit_noneBox">
                  <div className="absolute text-[#791818] top-[25%]">
                    <h1 className="font-medium text-2xl">+</h1>
                  </div>
                  {imageSrc1 && <img src={imageSrc1} alt="preview-img"/>}
                </div>
                <div id="upload" className="socks_edit_noneBox2"
                     onClick={ ()=> {onCickImageUpload1()}}
                  >
                  <input type="file" onChange = {(e)=>{encodeFileToBase64_1(e.target.files[0])}}
                        ref={imageInput1} style={{ display: "none" }}
                  />
                  <div className="absolute text-white top-[16%]">
                    <div className="font-bold text-[11px]">사진등록</div>
                  </div>
                </div>

                <div className="socks_edit_giftName">
                  <h1 className="font-normal text-xs">품목명:</h1>
                </div>
                <input type="text" className="socks_edit_textBox1" placeholder="입력해주세요." required 
                       value={giftName1}
                       onChange={(e) => setGiftName1(e.target.value)} 
                />
              </div>
            </div>
              
            <div className="socks_edit_box2">
              <div className="socks_edit_box2_inner">
                <div className="socks_edit_smSocks">
                  <div className="socks_edit_img2">
                    <Image src='/img/sock_2.png' width='30' height='40'/>
                  </div>
                  <div className="socks_edit_text">
                    <h1 className="font-normal text-sm">두 번째 소원 양말</h1>
                  </div>
                </div>

                <div id="none_box" className="socks_edit_noneBox"
                      onClick={ ()=> {onCickImageUpload2()}}
                >
                  <input type="file" onChange={(e) => {encodeFileToBase64_2(e.target.files[0])}} 
                                    ref={imageInput2} style={{ display: "none" }}
                  />
                  <div className="socks_edit_plus">
                    <h1 className="font-medium text-2xl">+</h1>
                  </div>
                  <div className="socks_edit_reg"
                      onClick = { () => {onCickImageUpload2}}
                  >
                    <input type="file" onChange={(e) => {encodeFileToBase64_2(e.target.files[0])}} 
                          ref={imageInput2} style={{ display: "none" }} 
                    />
                    <h1 className="font-bold text-xs">사진등록</h1>
                  </div>
                  {imageSrc2 && <img src={imageSrc2} alt="preview-img"/>}
                  {/* 이미지 미리보기 기능. {imageSrc[번호]}로 이미지 경로 가져올 수 있음  */}
                </div>
                <div className="socks_edit_giftName">
                  <h1 className="font-normal text-xs">품목명:</h1>
                </div>
                <input type="text" className="socks_edit_textBox2" placeholder="입력해주세요." required 
                        value={giftName2}
                        onChange={(e) => setGiftName2(e.target.value)}
                />
                {/* <p>{ giftName[번호] } </p>으로 인풋값 가져올 수 있음 */}
              </div>
            </div>

            <div className="socks_edit_box3">
              <div className="socks_edit_box3_inner">
                <div className="socks_edit_smSocks">
                  <div className="socks_edit_img3">
                    <Image src='/img/sock_3.png' width='30' height='40'/>
                  </div>
                  <div className="socks_edit_text">
                    <h1 className="font-normal text-sm">세 번째 소원 양말</h1>
                  </div>
                </div>
                <div id="none_box" className="socks_edit_noneBox"
                     onClick={ ()=>{onCickImageUpload3()}}
                >
                  <input type="file" onChange={(e) => {encodeFileToBase64_3(e.target.files[0])}} 
                         ref={imageInput3} style={{ display: "none" }}
                  />
                  <div className="socks_edit_plus">
                    <h1 className="font-medium text-2xl">+</h1>
                  </div>
                  <div className="socks_edit_reg" onClick = {() => {onCickImageUpload3}}>
                    <input type="file" onChange={(e) => {encodeFileToBase64_3(e.target.files[0])}}
                           ref={imageInput3} style={{ display: "none" }}
                    />
                    <h1 className="font-bold text-xs">사진등록</h1>
                  </div>
                  {imageSrc3 && <img src={imageSrc3} alt="preview-img"/>}
                  {/* 이미지 미리보기 기능. {imageSrc[번호]}로 이미지 경로 가져올 수 있음  */}
                </div>
                <div className="socks_edit_giftName">
                  <h1 className="font-normal text-xs">품목명:</h1>
                </div>
                <input type="text" className="socks_edit_textBox3" placeholder="입력해주세요." required 
                       value={giftName3}
                       onChange={(e) => setGiftName3(e.target.value)}
                />
                {/* <p>{ giftName[번호] } </p>으로 인풋값 가져올 수 있음 */}
              </div>
            </div>
          </div>

          <div className="socks_edit_closeBtn">
            <button className="socks_edit_closeWord" onClick={()=>handleFileInput(e.target.files[0],3)}>저장하기</button>
          </div>
          <div className="socks_edit_closeSanta">
            <Image src='/img/closeBtn_Santa.png' width='46' height='48'></Image>
          </div>
        </div>
      </div>
    </Modal>
    </div>
  )
}

export default SocksEditModal