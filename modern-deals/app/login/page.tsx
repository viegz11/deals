'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@deals.local');
  const [password, setPassword] = useState('admin123');
  return (
    <div className="card">
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={() => signIn('credentials', { email, password, callbackUrl: '/admin/dashboard' })}>Sign in</button>
    </div>
  );
}
