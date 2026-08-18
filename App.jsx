import React, { useEffect, useState } from 'react';
import Login from './Login';
import Layout from './Layout';
import StudentDashboard from './StudentDashboard';
import StudentManager from './StudentManager';
import { supabase } from './api';

export default function App() {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('student');
  const [page, setPage] = useState('home');

  useEffect(() => {
    // Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) {
      setUserProfile(data);
      if (data.role === 'admin') setMode('admin');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        ज्ञाना की पाठशाला लोड हो रही है...
      </div>
    );
  }

  // अगर यूजर लॉगिन नहीं है तो Login स्क्रीन दिखाएं
  if (!session) {
    return (
      <Login
        onLoginSuccess={(newSession, profile) => {
          setSession(newSession);
          setUserProfile(profile);
          if (profile?.role === 'admin') setMode('admin');
        }}
      />
    );
  }

  return (
    <Layout
      mode={mode}
      setMode={setMode}
      page={page}
      setPage={setPage}
      studentName={userProfile?.full_name || 'Student'}
      onLogout={handleLogout}
    >
      {mode === 'admin' ? (
        <StudentManager />
      ) : (
        <StudentDashboard name={userProfile?.full_name} setPage={setPage} />
      )}
    </Layout>
  );
}
