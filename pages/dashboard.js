// pages/dashboard.js
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>You need to be authenticated to view this page.</p>
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => router.push('/')}>Home</button>
      <button onClick={() => signOut()}>Sign Out</button>
    
    </div>
  );
}