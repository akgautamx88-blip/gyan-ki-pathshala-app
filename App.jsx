import { useEffect, useState } from 'react';
import Layout from './Layout';
import StudentDashboard from './StudentDashboard';
import GenericPage from './GenericPage';
import { getSession, getProfile } from './api';

export default function App() {
  const [mode, setMode] = useState('student');
  const [page, setPage] = useState('home');
  const [session, setSession] = useState(null);
  const [name, setName] = useState('Student');

  useEffect(() => {
    getSession().then(({ data }) => {
      setSession(data?.session || null);
      if (data?.session?.user?.id) {
        getProfile(data.session.user.id).then(({ data: p }) => {
          if (p?.full_name) setName(p.full_name);
        });
      }
    });
  }, []);

  const adminPages = ['students', 'review', 'attendance', 'tests', 'courses', 'payments', 'settings'];
  const current = mode === 'student' && page === 'home' 
    ? <StudentDashboard name={name} setPage={setPage} /> 
    : <GenericPage page={page} mode={mode} />;

  return (
    <Layout 
      mode={mode} 
      page={page} 
      setPage={setPage} 
      onToggleMode={() => {
        setMode(m => m === 'student' ? 'admin' : 'student');
        setPage(mode === 'student' ? 'students' : 'home');
      }} 
      studentName={name}
    >
      {current}
    </Layout>
  );
}
