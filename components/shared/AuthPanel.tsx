'use client';

import { useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { Button } from '@/components/shared/Button';

export function AuthPanel() {
  const supabase = getBrowserSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
  }, [supabase]);

  if (!supabase) {
    return <div className="notice info">Supabase is not configured. You can still test the product in local preview mode.</div>;
  }

  async function signUp() {
    if (!supabase) return;
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error?.message ?? 'Account created. You can now sign in.');
  }

  async function signIn() {
    if (!supabase) return;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setUserEmail(data.user?.email ?? null);
    setMessage(error?.message ?? (data.user ? `Signed in as ${data.user.email}` : 'Signed in.'));
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail(null);
    setMessage('Signed out.');
  }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="spaced" style={{ marginBottom: 10 }}>
        <strong>Account</strong>
        {userEmail ? <span className="small muted">Signed in as: {userEmail}</span> : <span className="small muted">Optional, but recommended</span>}
      </div>
      {!userEmail && (
        <div className="grid-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
      )}
      <div className="row" style={{ marginTop: 12 }}>
        {!userEmail ? (
          <>
            <Button className="btn-outline" onClick={signUp} type="button">Create account</Button>
            <Button className="btn-rust" onClick={signIn} type="button">Sign in</Button>
          </>
        ) : (
          <Button className="btn-outline" onClick={signOut} type="button">Sign out</Button>
        )}
      </div>
      {message ? <div className="notice info" style={{ marginTop: 12 }}>{message}</div> : null}
    </div>
  );
}
