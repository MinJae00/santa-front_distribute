import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Text, Button, Grid, Row } from "@nextui-org/react";
import axios from 'axios';

export const WreathEditModal = ({ wreathSrc, getData }) => {

    const [refinedData, setRefinedData] = useState([]);
    const [isSelect, setIsSelect] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/temp")
        .then(res => {
            const imgNum = res.data[0].wreath.length;
            setRefinedData(res.data[0].wreath);
        });
    }, []);

    const onClickHandler = (t1) => {
        setIsSelect({
            src : t1
        })
    }

    useEffect(() => {
        wreathSrc = isSelect.src
        // wreathWidth = isSelect.width
        getData(wreathSrc)
    })

    return (
        <Grid.Container
            css={{ borderRadius: "13px", minWidth: "297px", minHeight: "312px" }}>
            <Grid>
                <div className="wreath_edit_orna_group overflow-scroll">
                    <div className="grid grid-cols-3 gap-2">
                        {refinedData.map((el) =>
                        <div className="wreath_edit_orna_box">
                            <button onClick={() => {
                                onClickHandler(el.src);
                                console.log("click");
                            }} 
                            className="py-4">
                                <Image src={el.src} width='54' height='54'/>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            </Grid>
        </Grid.Container>
        
    );
};

export default WreathEditModal