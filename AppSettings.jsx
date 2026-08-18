import React, { useState } from 'react';

export default function AppSettings() {
  const [settings, setSettings] = useState({
    appName: 'ज्ञान की पाठशाला',
    teacherName: 'आकाश सर',
    teacherPhotoUrl: '',
    contactNo: '9876543210',
    whatsappNo: '9876543210',
    noticeText: 'ज्ञान की पाठशाला में आपका स्वागत है! नए बैचेस शुरू हो चुके हैं।',
    bannerText: 'आकाश सर की स्पेशल कृषि एवं सामान्य अध्ययन ऑनलाइन क्लासेज',
  });

  const [msg, setMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setMsg('✅ ऐप की सेटिंग्स सफलतापूर्वक अपडेट हो गई हैं!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-4xl">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">⚙️ ऐप कस्टमाइज़ेशन (App & Teacher Settings)</h2>
        <p className="text-xs text-slate-500">यहाँ से अपनी ऐप का नाम, शिक्षक का नाम, फोटो, नोटिस और संपर्क विवरण बदलें</p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-semibold">
          {msg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">ऐप का नाम (App Name)</label>
            <input
              type="text"
              required
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">मुख्य शिक्षक का नाम (Teacher Name)</label>
            <input
              type="text"
              required
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.teacherName}
              onChange={(e) => setSettings({ ...settings, teacherName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">शिक्षक की फोटो URL (Profile Photo URL)</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.teacherPhotoUrl}
              onChange={(e) => setSettings({ ...settings, teacherPhotoUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">WhatsApp हेल्पडेस्क नंबर</label>
            <input
              type="tel"
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.whatsappNo}
              onChange={(e) => setSettings({ ...settings, whatsappNo: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-600 block mb-1">होमपेज बैनर संदेश (Banner Text)</label>
            <input
              type="text"
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.bannerText}
              onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-600 block mb-1">नवीनतम सूचना (Notice Board Text)</label>
            <textarea
              rows={2}
              className="w-full p-2.5 border rounded-xl text-sm focus:outline-indigo-600"
              value={settings.noticeText}
              onChange={(e) => setSettings({ ...settings, noticeText: e.target.value })}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition"
        >
          💾 सेटिंग्स सेव करें
        </button>
      </form>
    </div>
  );
}
