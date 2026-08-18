import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');

  // फ़ॉर्म स्टेट्स
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialUrl, setMaterialUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setMsg(`${type} सफलतापूर्वक जोड़ दिया गया है!`);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* 👑 एडमिन हेडर */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">👑 एडमिन सामग्री प्रबंधन (Content Manager)</h1>
          <p className="text-slate-400 text-xs mt-1">ज्ञान की पाठशाला — आकाश सर की क्लास</p>
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-semibold">
          ✅ {msg}
        </div>
      )}

      {/* 📌 एडमिन नेविगेशन टैब्स */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          📚 Courses प्रबंधन
        </button>
        <button
          onClick={() => setActiveTab('study_material')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'study_material' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          📖 Study Material (PDF)
        </button>
        <button
          onClick={() => setActiveTab('video_classes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'video_classes' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          🎥 Video Classes
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'tests' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          📝 Test Series
        </button>
      </div>

      {/* 🛠️ सामग्री जोड़ने के फ़ॉर्म */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        {activeTab === 'courses' && (
          <form onSubmit={(e) => handleSubmit(e, 'Course')} className="space-y-4 max-w-lg">
            <h2 className="text-lg font-bold text-slate-800">➕ नया Course जोड़ें</h2>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">कोर्स का नाम</label>
              <input
                type="text"
                required
                placeholder="जैसे: UP Police / SSC स्पेशल बैच"
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">विवरण (Description)</label>
              <textarea
                rows={3}
                placeholder="कोर्स के मुख्य बिंदु..."
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition">
              🚀 Course प्रकाशित करें
            </button>
          </form>
        )}

        {activeTab === 'study_material' && (
          <form onSubmit={(e) => handleSubmit(e, 'PDF नोट्स')} className="space-y-4 max-w-lg">
            <h2 className="text-lg font-bold text-slate-800">📖 PDF / Study Material अपलोड करें</h2>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">नोट्स का शीर्षक</label>
              <input
                type="text"
                required
                placeholder="जैसे: गणित हस्तलिखित नोट्स - भाग 1"
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={materialTitle}
                onChange={(e) => setMaterialTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">PDF URL / गूगल ड्राइव लिंक</label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/..."
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={materialUrl}
                onChange={(e) => setMaterialUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700 transition">
              📤 PDF नोट्स सेव करें
            </button>
          </form>
        )}

        {activeTab === 'video_classes' && (
          <form onSubmit={(e) => handleSubmit(e, 'वीडियो क्लास')} className="space-y-4 max-w-lg">
            <h2 className="text-lg font-bold text-slate-800">🎥 वीडियो क्लास जोड़ें</h2>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">वीडियो का शीर्षक</label>
              <input
                type="text"
                required
                placeholder="जैसे: Lecture 01 - प्रतिशत (Percentage)"
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">YouTube / Video URL</label>
              <input
                type="url"
                required
                placeholder="https://youtube.com/watch?v=..."
                className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-700 transition">
              🎥 वीडियो लिंक सेव करें
            </button>
          </form>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800">📝 नई Test Series जोड़ें</h2>
            <div className="bg-slate-50 border border-dashed border-slate-300 p-6 rounded-xl text-center text-slate-500 text-xs">
              यहाँ से आप प्रश्नों की संख्या, समय सीमा और उत्तर कुंजी सेट करके नया मॉक टेस्ट बना सकते हैं।
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
