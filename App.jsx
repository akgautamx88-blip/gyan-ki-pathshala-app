import React, { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import TestSeries from './TestSeries';
import CourseManager from './CourseManager';
import AppSettings from './AppSettings';

export default function App() {
  const [role, setRole] = useState('student'); // 'student' या 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* 🔝 टॉप नेविगेशन बार */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg text-indigo-700 leading-none">ज्ञान की पाठशाला</h1>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">आकाश सर की क्लास</p>
            </div>
          </div>

          {/* 🔄 Student vs Admin स्विच मोड */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border">
            <button
              onClick={() => { setRole('student'); setActiveTab('dashboard'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                role === 'student' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Student Mode
            </button>
            <button
              onClick={() => { setRole('admin'); setActiveTab('admin_courses'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                role === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👑 Admin Mode
            </button>
          </div>
        </div>
      </header>

      {/* 👑 एडमिन सब-मेन्यू (जब Admin Mode चालू हो) */}
      {role === 'admin' && (
        <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('admin_courses')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeTab === 'admin_courses' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📚 Dynamic Courses
            </button>
            <button
              onClick={() => setActiveTab('admin_content')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeTab === 'admin_content' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              📤 PDF / Video Manager
            </button>
            <button
              onClick={() => setActiveTab('admin_settings')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeTab === 'admin_settings' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              ⚙️ App & Teacher Settings
            </button>
          </div>
        </div>
      )}

      {/* 📱 मुख्य कंटेंट एरिया */}
      <main className="py-6">
        {role === 'student' ? (
          activeTab === 'test_series' ? (
            <div className="max-w-7xl mx-auto px-4">
              <TestSeries onBack={() => setActiveTab('dashboard')} />
            </div>
          ) : (
            <StudentDashboard name="आकाश" />
          )
        ) : (
          <div className="max-w-7xl mx-auto px-4">
            {activeTab === 'admin_courses' && <CourseManager />}
            {activeTab === 'admin_content' && <AdminDashboard />}
            {activeTab === 'admin_settings' && <AppSettings />}
          </div>
        )}
      </main>
    </div>
  );
}
