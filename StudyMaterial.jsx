import React, { useState } from 'react';

export default function StudyMaterial({ onBack }) {
  const [activeTab, setActiveTab] = useState('pdf');

  // PDF नोट्स का डमी डेटा (Supabase से ऑटोमैटिक लोड होगा)
  const pdfNotes = [
    {
      id: 1,
      title: 'कृषि विज्ञान - हस्तलिखित नोट्स (Part 1)',
      size: '2.4 MB',
      date: '15 Aug 2026',
      link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      id: 2,
      title: 'सामान्य अध्ययन - इतिहास एवं भूगोल सार संग्रह',
      size: '4.1 MB',
      date: '18 Aug 2026',
      link: '#',
    },
  ];

  // वीडियो क्लासेस का डेटा
  const videoLectures = [
    {
      id: 1,
      title: 'Lecture 01: मृदा विज्ञान एवं उर्वरक (Soil Science)',
      duration: '45 mins',
      teacher: 'आकाश सर',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Lecture 02: फसल उत्पादन के सिद्धांत (Crop Production)',
      duration: '50 mins',
      teacher: 'आकाश सर',
      youtubeId: 'dQw4w9WgXcQ',
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* 📌 हेडर */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">📖 Study Material & Video Classes</h2>
          <p className="text-xs text-slate-500">ज्ञान की पाठशाला — आकाश सर की क्लास</p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-200 transition"
          >
            ← डैशबोर्ड पर जाएं
          </button>
        )}
      </div>

      {/* 📑 टैब स्विच */}
      <div className="flex gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab('pdf')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'pdf' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          📄 PDF नोट्स ({pdfNotes.length})
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'video' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          🎥 वीडियो क्लासेस ({videoLectures.length})
        </button>
      </div>

      {/* 📄 PDF नोट्स सेक्शन */}
      {activeTab === 'pdf' && (
        <div className="space-y-3">
          {pdfNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
            >
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{note.title}</h4>
                <p className="text-xs text-slate-400 mt-1">आकार: {note.size} | दिनांक: {note.date}</p>
              </div>
              <a
                href={note.link}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition text-center"
              >
                📥 PDF डाउनलोड / देखें
              </a>
            </div>
          ))}
        </div>
      )}

      {/* 🎥 वीडियो प्लेयर सेक्शन */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoLectures.map((vid) => (
            <div key={vid.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 space-y-3">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                  title={vid.title}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-800 text-sm">{vid.title}</h4>
                <p className="text-xs text-slate-500 mt-1">शिक्षक: {vid.teacher} | अवधि: {vid.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
