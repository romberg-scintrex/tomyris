import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/authentication/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
