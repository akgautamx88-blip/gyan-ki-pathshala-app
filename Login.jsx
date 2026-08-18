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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">ज्ञान की पाठशाला</h1>
          <p className="text-sm text-slate-500 mt-1">आकाश सर की क्लास</p>
        </div>

        {/* Admin / Student Switcher */}
        {view === 'login' && (
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                role === 'student' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              👨‍🎓 स्टूडेंट लॉगिन
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                role === 'admin' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              👑 एडमिन लॉगिन
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">पूरा नाम</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="अपना नाम लिखें"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">मोबाइल नंबर</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 अंकों का नंबर"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">ईमेल ID / Login ID</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>

          {view !== 'forgot' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">पासवर्ड / PIN</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-200 disabled:opacity-50 text-sm"
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

        <div className="mt-6 text-center text-xs space-y-2">
          {view === 'login' && (
            <>
              {role === 'student' && (
                <div>
                  <button
                    onClick={() => setView('register')}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    🆕 नया स्टूडेंट? रजिस्ट्रेशन करें
                  </button>
                </div>
              )}
              <div>
                <button
                  onClick={() => setView('forgot')}
                  className="text-slate-500 hover:underline"
                >
                  🔑 PIN / Password भूल गए?
                </button>
              </div>
            </>
          )}

          {view !== 'login' && (
            <button
              onClick={() => setView('login')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              ← वापस लॉगिन पर जाएं
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
