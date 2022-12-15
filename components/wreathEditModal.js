import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Text, Button, Grid, Row } from "@nextui-org/react";
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_MY_BACK

export const WreathEditModal = ({ getData, removeQ, usertoken, refinedData, index }) => {

    const [isSelect, setIsSelect] = useState([]);

    const wreathPost = async() => {
        console.log(usertoken);
        console.log("+++++++++++++++++++++++++");
        console.log(index)
        console.log(isSelect.src)
        if (isSelect.src == undefined) {
            setIsSelect([])
            alert("변경사항이 없습니다.")
        }
        else {
            let res2 = await axios.post(BASE_URL+"realwreath/", 
            {
              jwt:usertoken,
              index:index,
              src:isSelect.src,
            });
            var datajson2 = res2.data;
            console.log("리얼리스 오너먼트 post =======");
            console.log(datajson2);
            console.log(usertoken);
            console.log("~~~~~~~~~~~~~~~~")
            
            let res = await axios.post(BASE_URL+"ornament/", 
                {
                    jwt:usertoken,
                    src:isSelect.src,
                });
            var datajson = res.data;
            console.log("오너먼트 post =======");
            console.log(datajson);
            alert("저장되었습니다.")
        }
    }

    const onClickHandler = (t1) => {
        setIsSelect({
            src : t1
        })
    }

    useEffect(() => {
        getData(isSelect.src);
    })

    return (
        <Grid.Container
            css={{ borderRadius: "13px", minWidth: "297px", minHeight: "340px" }}  onContextMenu={e => e.preventDefault()}>
            <Grid>
                <div className="wreath_edit_orna_group overflow-scroll">
                    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2">
                        {(refinedData.length != 0) ? refinedData.map((el,index) =>
                        <div id="ornaBox" className="wreath_edit_orna_box" key={index}>
                            <button onClick={() => {
                                onClickHandler(el);
                                console.log("click");
                                removeQ()
                            }} 
                            className="py-4">
                                <Image src={el} width='54' height='54'/>
                            </button>
                        </div>
                        ) :
                        <div>
                            <p className="no_ornament">매일 도착하는 새로운 퀴즈를 풀고</p>
                            <p className="no_ornament2">오너먼트를 획득해보세요!</p>
                        </div>    
                        }
                        <div className="mt-10 mb-10">
                            <button onClick={()=>{wreathPost()}} className="wreath_edit_save col-span-3">
                                <div className="wreath_edit_saveText">변경저장</div>
                            </button>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid.Container>
    );
};

export default WreathEditModal