import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleBookmark = () => {
    if (!session) {
        alert("You need to log in to use the bookmark feature.");
        router.push('/login');
        return;
    }else{
        router.push('/bookmark');
    }
  }
  const handleApplication = () => {
    router.push('/apply');
  }

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return null;
  }

  return (
    
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid black'}}>
                <div style={{paddingLeft:'5%',}}>
                    <a href='/' style={{textDecoration:'none',color:'black'}}><h1>UniFinder</h1></a>   
                </div>
                <div style={{display:'flex',paddingRight:'10%'}}>
                    <img src='/images/bookmark.png' alt='Bookmark' onClick = {handleBookmark} style={{width:'2vw',cursor:"pointer",marginRight:'20%'}}/>
                    <img src='/images/apply.png' alt='apply' onClick = {handleApplication} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>
                    {session && (<img src='/images/logout.png' alt='logout' onClick={() => signOut()} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>)}
                    {!session && (<img src='/images/login.png' alt='login' onClick={() => signIn()} style={{cursor:"pointer",width:'2vw',marginRight:'20%'}}/>)}
                </div>
      </div>
      <div  style={{ height: '50vh',border:'3px solid black',borderRadius:'50px',justifyContent:'center ', alignItems:'center',display:'flex', flexDirection:'column',marginTop:'5%',paddingTop:'5%',width:'25%',marginLeft:'40%',marginRight:'25%',paddingTop:'0%' }} >
        <div style={{ marginBottom: '20px',borderBottom:'1px solid black',marginTop:'0%'}}>
          <h1>Login</h1>
        </div>

        <a style={{marginBottom:'20px',display:'flex',alignItems:'center'}} onClick={() => handleSignIn('google')}>
          <img src='/images/google.png' alt='Google' style={{width:'2vw',marginRight:'10px'}}/>
          <span style={{fontSize:'20px'}}>Sign in with Google</span>
        </a>
      </div>
      
    </div>
  );
}
