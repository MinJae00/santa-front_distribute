import type { NextApiRequest, NextApiResponse } from "next";

/* 유저는 두가지의 Ornaments를 관리할 interface가 필요할 것으로 생각됨.
   보유하고 있는 ornaments를 관리하는 interface, main에 띄워야 할 ornaments를 관리할 interface*/

interface ReinDeer { 
  m_body_color: string;
  m_body_deco : string;
  m_eye : string;
  m_hair : string;
  m_horn : string;
}

interface Wreath { 
  src: string;
}

interface Ornaments {
    src: string;
}

type Data = {
  solvedNum: number;
  socks: string;
  reindeers: ReinDeer[];
  wreath: Wreath[];
  ornaments: Ornaments[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>){
  res.status(200).json([
    { 
      solvedNum : 0,
      socks : "a",
      reindeers: [
          {
            m_body_color: '/img/reindeer/body_color_1.png',
            m_body_deco : '/img/reindeer/body_deco_1.png',
            m_eye : '/img/reindeer/eye_1.png',
            m_hair : '/img/reindeer/hair_1.png',
            m_horn : '/img/reindeer/horn_1.png'
        },{
            m_body_color: '/img/reindeer/body_color_2.png',
            m_body_deco : '/img/reindeer/body_deco_2.png',
            m_eye : '/img/reindeer/eye_2.png',
            m_hair : '/img/reindeer/hair_2.png',
            m_horn : '/img/reindeer/horn_2.png'
        },{
            m_body_color: '/img/reindeer/body_color_3.png',
            m_body_deco : '/img/reindeer/body_deco_3.png',
            m_eye : '/img/reindeer/eye_3.png',
            m_hair : '/img/reindeer/hair_3.png',
            m_horn : '/img/reindeer/horn_3.png'
        },{
            m_body_color: '/img/reindeer/body_color_4.png',
            m_body_deco : '/img/reindeer/body_deco_4.png',
            m_eye : '/img/reindeer/eye_4.png',
            m_hair : '/img/reindeer/hair_4.png',
            m_horn : '/img/reindeer/horn_4.png'
        },{
            m_body_color: '/img/reindeer/body_color_5.png',
            m_body_deco : '/img/reindeer/body_deco_5.png',
            m_eye : '/img/reindeer/eye_5.png',
            m_hair : '/img/reindeer/hair_5.png',
            m_horn : '/img/reindeer/horn_5.png'
        },{
            m_body_color: '/img/reindeer/body_color_6.png',
            m_body_deco : '/img/reindeer/body_deco_6.png',
            m_eye : '/img/reindeer/eye_6.png',
            m_hair : '/img/reindeer/hair_6.png',
            m_horn : '/img/reindeer/horn_6.png'
        },{
            m_body_color: '/img/reindeer/body_color_7.png',
            m_body_deco : '/img/reindeer/body_deco_7.png',
            m_eye : '/img/reindeer/eye_7.png',
            m_hair : '/img/reindeer/hair_7.png',
            m_horn : '/img/reindeer/horn_7.png'
        },
      ],
      wreath : [
          {
              src : '/img/ornaments/1.png'
          },
          {
              src : '/img/ornaments/2.png'
          },
          {
              src : '/img/ornaments/3.png'
          },
          {
              src : '/img/ornaments/4.png'
          },
          {
              src : '/img/ornaments/5.png'
          },
          {
              src : '/img/ornaments/6.png'
          },
          {
              src : '/img/ornaments/7.png'
          },{
              src : '/img/ornaments/8.png'
          },
          {
              src : '/img/ornaments/9.png'
          }
      ],
      ornaments : [
          {
              src:""
          },{
              src:""
          },{
              src:""
          },{
              src:""
          },{
              src:""
          },{
              src:""
          },{
              src:""
          }
      ]
    }
  ]);
}