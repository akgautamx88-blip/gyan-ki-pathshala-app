import React, { useState } from 'react';
import { loginUser, signUpStudent, resetPassword } from './api';

export default function Login({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (view === 'register') {
      const { data, error } = await signUpStudent(email, password, fullName, phone);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('पंजीकरण सफल! अब आप लॉगिन कर सकते हैं।');
        setView('login');
      }
    } else if (view === 'login') {
      const { data, profile, error } = await loginUser(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        if (role === 'admin' && profile?.role !== 'admin') {
          setErrorMsg('यह अकाउंट एडमिन का नहीं है। स्टूडेंट लॉगिन चुनें।');
        } else {
          onLoginSuccess(data.session, profile);
        }
      }
    } else if (view === 'forgot') {
      const { error } = await resetPassword(email);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया है।');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '450px',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        boxSizing: 'border-box'
      }}>
        
        {/* लोगो (बड़ा 'A' प्रतीक) */}
        <div style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          margin: '0 auto 10px auto',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)'
        }}>
          <span style={{ fontSize: '35px', fontWeight: 'bold', color: '#fff' }}>A</span>
        </div>

        <div className="text-center mb-4" style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#1e293b', fontSize: '22px', margin: '0 0 5px 0' }}>ज्ञान की पाठशाला</h1>
          <p style={{ color: '#64748b', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>Learn Today... Lead Tomorrow!</p>
        </div>

        {/* स्वागत बैनर बॉक्स */}
        <div style={{
          background: '#ef4444',
          color: '#fff',
          padding: '8px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          ✨ ज्ञान की पाठशाला में आपका स्वागत है! ✨
        </div>

        {/* आकाश सर परिचय */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '10px',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0 0 3px 0', fontSize: '13px', color: '#334155' }}>मैं आपका <b>आकाश सर</b></p>
          <p style={{ margin: 0, fontSize: '11px', color: '#d97706', fontWeight: 'bold' }}>आपके साथ, आपकी सफलता के लिए!</p>
          <small style={{ display: 'block', marginTop: '3px', color: '#64748b', fontSize: '10px' }}>
            B.Sc. Agriculture | M.Sc. Agriculture | B.Ed.
          </small>
        </div>

        {/* Admin / Student Switcher */}
        {view === 'login' && (
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4" style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px', marginBottom: '15px' }}>
            <button
              type="button"
              onClick={() => setRole('student')}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '13px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: role === 'student' ? '#2563eb' : 'transparent',
                color: role === 'student' ? '#fff' : '#475569',
                transition: '0.2s'
              }}
            >
              👨‍🎓 स्टूडेंट लॉगिन
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '13px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: role === 'admin' ? '#2563eb' : 'transparent',
                color: role === 'admin' ? '#fff' : '#475569',
                transition: '0.2s'
              }}
            >
              👑 एडमिन लॉगिन
            </button>
          </div>
        )}

        {errorMsg && (
          <div style={{ marginBottom: '12px', padding: '10px', background: '#fef2f2', color: '#dc2626', fontSize: '12px', borderRadius: '8px', border: '1px solid #fecaca' }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ marginBottom: '12px', padding: '10px', background: '#f0fdf4', color: '#16a34a', fontSize: '12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {view === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>पूरा नाम</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="अपना नाम लिखें"
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>मोबाइल नंबर</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 अंकों का नंबर"
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>ईमेल ID / Login ID</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          {view !== 'forgot' && (
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>पासवर्ड / PIN</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#2563eb',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              marginTop: '5px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading
              ? 'प्रतीक्षा करें...'
              : view === 'register'
              ? 'रजिस्ट्रेशन करें'
              : view === 'forgot'
              ? 'पासवर्ड रिसेट लिंक भेजें'
              : 'लॉगिन करें'}
          </button>
        </form>

        {/* निर्देश / मोटिवेशनल बातें (बैनर से) */}
        <div style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          padding: '10px',
          borderRadius: '8px',
          marginTop: '15px'
        }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '11px', fontWeight: 'bold', color: '#b45309' }}>
            🌟 कुछ बातें जो आपको आगे बढ़ाएंगी...
          </p>
          <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '10px', color: '#78350f', lineHeight: '1.5' }}>
            <li>रोज़ थोड़ा पढ़ो, लेकिन पढ़ो ज़रूर।</li>
            <li>मेहनत आज की, सफलता कल की।</li>
            <li><b>आकाश सर हैं ना, टेंशन किस बात की!</b></li>
          </ul>
        </div>

        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {view === 'login' && (
            <>
              {role === 'student' && (
                <div>
                  <button
                    onClick={() => setView('register')}
                    style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    🆕 नया स्टूडेंट? रजिस्ट्रेशन करें
                  </button>
                </div>
              )}
              <div>
                <button
                  onClick={() => setView('forgot')}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  🔑 PIN / Password भूल गए?
                </button>
              </div>
            </>
          )}

          {view !== 'login' && (
            <button
              onClick={() => setView('login')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ← वापस लॉगिन पर जाएं
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
