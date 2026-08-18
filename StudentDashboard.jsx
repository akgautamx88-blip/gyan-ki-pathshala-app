import React, { useState } from 'react';

export default function StudentDashboard({ name }) {
  const [activeTab, setActiveTab] = useState('home');

  // Student Dashboard के 10 मुख्य सेक्शन
  const dashboardItems = [
    { id: 'courses', title: 'मेरे Courses', icon: '📚', color: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', desc: 'आपके नामांकित एवं जारी कोर्स' },
    { id: 'tests', title: 'Test Series', icon: '📝', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', desc: 'अभ्यास टेस्ट व मॉक टेस्ट' },
    { id: 'study_material', title: 'Study Material', icon: '📖', color: 'bg-purple-500', bgLight: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', desc: 'PDF नोट्स व क्लास नोट्स' },
    { id: 'video_classes', title: 'Video Classes', icon: '🎥', color: 'bg-rose-500', bgLight: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', desc: 'रिकॉर्डेड एवं लाइव कक्षाएं' },
    { id: 'progress', title: 'मेरी Progress', icon: '📊', color: 'bg-indigo-500', bgLight: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', desc: 'आपकी पढ़ाई का संपूर्ण विश्लेषण' },
    { id: 'result', title: 'मेरा Result', icon: '🏆', color: 'bg-amber-500', bgLight: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', desc: 'टेस्ट स्कोर व ऑल इंडिया रैंक' },
    { id: 'certificates', title: 'Certificates', icon: '📜', color: 'bg-teal-500', bgLight: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', desc: 'कोर्स कंप्लीशन सर्टिफिकेट' },
    { id: 'notifications', title: 'Notifications', icon: '🔔', color: 'bg-orange-500', bgLight: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', desc: 'नवीनतम सूचनाएं एवं अपडेट' },
    { id: 'profile', title: 'My Profile', icon: '👤', color: 'bg-cyan-500', bgLight: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', desc: 'आपकी व्यक्तिगत जानकारी' },
    { id: 'subscription', title: 'My Subscription', icon: '💳', color: 'bg-violet-500', bgLight: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', desc: 'सब्सक्रिप्शन व फीस विवरण' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* 🌟 मुख्य बैनर (Header Banner) */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">জ্ঞান की पाठशाला</h1>
        <p className="text-indigo-100 font-medium text-sm sm:text-base mt-1">आकाश सर की क्लास</p>
        
        <div className="mt-6 pt-4 border-t border-indigo-400/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-indigo-200 block">छात्र का नाम:</span>
            <span className="text-lg font-bold">{name || 'विद्यार्थी'} 👋</span>
          </div>
          <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 text-xs px-3 py-1 rounded-full font-semibold">
            🟢 Active Account
          </span>
        </div>
      </div>

      {/* 📱 मुख्य डैशबोर्ड कार्ड्स */}
      {activeTab === 'home' ? (
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📌</span> आपके मुख्य विकल्प (Dashboard Menu)
          </h2>

          {/* 10 कार्ड्स की ग्रिड */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-5 rounded-2xl border ${item.border} ${item.bgLight} hover:shadow-lg transition cursor-pointer flex items-start gap-4 group`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm ${item.color} text-white group-hover:scale-110 transition transform`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-base ${item.text}`}>{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 📖 किसी विकल्प पर क्लिक करने पर अंदर का पेज */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition"
            >
              ← वापस मुख्य डैशबोर्ड पर जाएं
            </button>
            <span className="text-xs text-slate-400">ज्ञान की पाठशाला</span>
          </div>

          {dashboardItems.filter(i => i.id === activeTab).map(item => (
            <div key={item.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h2 className={`text-xl font-bold ${item.text}`}>{item.title}</h2>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500 text-sm">
                <p className="font-semibold text-slate-700 mb-1">{item.title}</p>
                <p className="text-xs">यहाँ पर आपके {item.title} की पूरी सूची और सामग्री दिखेगी।</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
