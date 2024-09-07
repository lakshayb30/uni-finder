import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If user is logged in, redirect to the dashboard
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
    return null; // If logged in, no need to show login page
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleSignIn('google')}>Sign in with Google</button>
    </div>
  );
}
