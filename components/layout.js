// 모든 레이아웃을 집어넣을 js 입니다~
// 헤더랑 푸터 넣을 건데 푸터만 넣으면 되겠죵?

import Footer from './footer'

export default function Layout({children}){
    return (
        <>  
            <div>{children}</div>
            <Footer/>
        </>
    );
}