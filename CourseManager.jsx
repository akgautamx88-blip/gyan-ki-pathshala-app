import React, { useState } from 'react';

export default function CourseManager() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Agriculture Complete Course',
      category: 'Agriculture',
      price: 999,
      offerPrice: 499,
      validity: 180,
      isFree: false,
      teacher: 'आकाश सर',
      demoLink: 'https://youtube.com/...',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Agriculture',
    customCategory: '',
    price: '',
    offerPrice: '',
    validity: 180,
    isFree: false,
    teacher: 'आकाश सर',
    demoLink: '',
    description: '',
  });

  const [msg, setMsg] = useState('');

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...formData,
      category: formData.category === 'Custom' ? formData.customCategory : formData.category,
      price: formData.isFree ? 0 : Number(formData.price),
      offerPrice: formData.isFree ? 0 : Number(formData.offerPrice),
    };

    setCourses([newCourse, ...courses]);
    setMsg('🎉 नया कोर्स सफलतापूर्वक प्रकाशित कर दिया गया है!');
    setTimeout(() => setMsg(''), 3000);

    // Reset Form
    setFormData({
      title: '',
      category: 'Agriculture',
      customCategory: '',
      price: '',
      offerPrice: '',
      validity: 180,
      isFree: false,
      teacher: 'आकाश सर',
      demoLink: '',
      description: '',
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">📚 कोर्स प्रबंधन (Unlimited Custom Courses)</h2>
        <p className="text-xs text-slate-500">यहाँ से नए फ्री/पेड कोर्सेस, प्राइस, ऑफर और वैलिडिटी सेट करें</p>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-semibold">
          {msg}
        </div>
      )}

      {/* ➕ नया कोर्स जोड़ने का फ़ॉर्म */}
      <form onSubmit={handleAddCourse} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-700 text-sm">➕ नया कोर्स बनाएं</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">कोर्स का नाम (Course Title)</label>
            <input
              type="text"
              required
              placeholder="उदा: Agriculture Assistant Prep / English Grammar"
              className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">शिक्षक का नाम (Teacher)</label>
            <input
              type="text"
              required
              placeholder="जैसे: आकाश सर"
              className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">कैटेगरी (Category)</label>
            <select
              className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Agriculture">Agriculture Complete Course</option>
              <option value="Agriculture Assistant">Agriculture Assistant Preparation</option>
              <option value="English Grammar">English Grammar</option>
              <option value="Science">Science</option>
              <option value="General Studies">General Studies</option>
              <option value="Test Series">Test Series Package</option>
              <option value="Notes Package">Notes Package</option>
              <option value="Custom">+ अन्य नई कैटेगरी जोड़ें</option>
            </select>
          </div>

          {formData.category === 'Custom' && (
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">नई कैटेगरी का नाम</label>
              <input
                type="text"
                required
                placeholder="उदा: Reasoning / Current Affairs"
                className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
                value={formData.customCategory}
                onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
              />
            </div>
          )}

          <div className="sm:col-span-2 flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFree"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="isFree" className="text-xs font-bold text-emerald-700 cursor-pointer">
              🎁 क्या यह Free / Demo Course है?
            </label>
          </div>

          {!formData.isFree && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">मूल मूल्य (Original Price ₹)</label>
                <input
                  type="number"
                  required
                  placeholder="999"
                  className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">ऑफ़र मूल्य (Offer Price ₹)</label>
                <input
                  type="number"
                  required
                  placeholder="499"
                  className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
                  value={formData.offerPrice}
                  onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">वैधता (Validity in Days)</label>
            <input
              type="number"
              required
              placeholder="180"
              className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
              value={formData.validity}
              onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">डेमो क्लास / यूट्यूब वीडियो लिंक</label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              className="w-full p-2.5 bg-white border rounded-xl text-sm focus:outline-indigo-600"
              value={formData.demoLink}
              onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-indigo-100"
        >
          🚀 नया कोर्स प्रकाशित करें
        </button>
      </form>

      {/* 📋 प्रकाशित कोर्सेस की सूची */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">प्रबंधित कोर्सेस की सूची ({courses.length}):</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="p-4 border rounded-xl bg-white shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">
                    {c.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base mt-1">{c.title}</h4>
                  <p className="text-xs text-slate-500">शिक्षक: {c.teacher}</p>
                </div>
                {c.isFree ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">
                    FREE
                  </span>
                ) : (
                  <div className="text-right">
                    <span className="text-xs line-through text-slate-400 block">₹{c.price}</span>
                    <span className="text-base font-extrabold text-emerald-600">₹{c.offerPrice}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-500 flex justify-between pt-2 border-t">
                <span>⏱️ Validity: {c.validity} Days</span>
                <span className="text-indigo-600 font-semibold cursor-pointer">✏️ एडिट / डिलीट</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
