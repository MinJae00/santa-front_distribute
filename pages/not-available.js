import { useRouter } from 'next/router'
export default function PageNotFound(){
  const router = useRouter();
    router.push('/');
    alert("로그인 후 이용해주세요.")
  return(
    <div>  
    </div>
  );
}
