import '../styles/globals.css'
import 'styles/index.scss'
import type { AppProps } from 'next/app'
import 'styles/antd.less';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    console.log(router);
    
    const user = sessionStorage.getItem("sec_user");
   
    if(user && router.pathname === "/login"){
      router.back()
    }
    
    
  },[router.route])
  
  return <Component {...pageProps} />
}

export default MyApp
