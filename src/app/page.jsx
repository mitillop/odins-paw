'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the dashboard page when the component mounts
    router.push('/dashboard');
  }, [router]);
  return null;
}
