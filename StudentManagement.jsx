import React, { useState } from 'react';

export default function StudentManagement({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, blocked
  const [selectedStudent, setSelectedStudent] = useState(null); // Course allotment modal

  // 1. उपलब्ध कोर्सेस (अलॉट करने के लिए)
  const availableCourses = [
    { id: 'agri_101', title: '🌾 कृषि विज्ञान (Agri Special)' },
    { id: 'gs_2026', title: '📖 सामान्य अध्ययन (GS Batch)' },
    { id: 'test_2026', title: '📝 Full Mock Test Series 2026' },
  ];

  // 2. छात्रों का डमी डेटाबेस (Supabase से सिंक होगा)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'राहुल वर्मा',
      phone: '9876543210',
      email: 'rahul@gmail.com',
      joinedDate: '10 Jan 2026',
      status: 'active', // 'active' या 'blocked'
      enrolledCourses: ['🌾 कृषि विज्ञान (Agri Special)'],
      validityTill: '20 Aug 2026',
    },
    {
      id: 2,
      name: 'प्रिया शर्मा',
      phone: '9123456789',
      email: 'priya@gmail.com',
      joinedDate: '15 Feb 2026',
      status: 'active',
      enrolledCourses: ['📖 सामान्य अध्ययन (GS Batch)'],
      validityTill: '15 Nov 2026',
    },
    {
      id: 3,
      name: 'विक्रम सिंह',
      phone: '9988776655',
      email: 'vikram@gmail.com',
      joinedDate: '01 Mar 2026',
      status: 'blocked',
      enrolledCourses: [],
      validityTill: '-',
    },
  ]);

  // 🛡️ ब्लॉक / अनब्लॉक फ़ंक्शन
  const toggleBlockStatus = (studentId) => {
    setStudents(
      students.map((st) => {
        if (st.id === studentId) {
          const newStatus = st.status === 'active' ? 'blocked' : 'active';
          return { ...st, status: newStatus };
        }
        return st;
      })
    );
  };

  // 🎓 मैन्युअल कोर्स अलॉट करने का फ़ंक्शन
  const assignCourse = (studentId, courseTitle) => {
    setStudents(
      students.map((st) => {
        if (st.id === studentId) {
          if (st.enrolledCourses.includes(courseTitle)) return st;
          return {
            ...st,
            enrolledCourses: [...st.enrolledCourses, courseTitle],
            validityTill: '31 Dec 2026', // डिफ़ॉल्ट वैलिडिटी
          };
        }
        return st;
      })
    );
    setSelectedStudent(null);
  };

  // 🔍 खोज और फ़िल्टर लॉजिक
  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.phone.includes(searchTerm);
    const matchesFilter =
      filterStatus === 'all' || st.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
      {/* 🔝 हेडर */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            👨‍🎓 स्टूडेंट मैनेजमेंट कंट्रोल पैनल
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            छात्रों की सूची देखें, ब्लॉक/अनब्लॉक करें और सीधे कोर्स अलॉट करें
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-3.5 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition self-start sm:self-auto"
          >
            ← एडमिन डैशबोर्ड
          </button>
        )}
      </div>

      {/* 🔍 सर्च एवं फ़िल्टर बार */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="नाम या मोबाइल नंबर से खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span className="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            सभी ({students.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'active'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            एक्टिव ({students.filter((s) => s.status === 'active').length})
          </button>
          <button
            onClick={() => setFilterStatus('blocked')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'blocked'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ब्लॉक्ड ({students.filter((s) => s.status === 'blocked').length})
          </button>
        </div>
      </div>

      {/* 📑 स्टूडेंट लिस्ट टेबल */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
              <th className="p-3.5">छात्र का विवरण</th>
              <th className="p-3.5">रजिस्ट्रेशन तिथि</th>
              <th className="p-3.5">एक्टिव कोर्सेस</th>
              <th className="p-3.5">स्थिति (Status)</th>
              <th className="p-3.5 text-right">कार्रवाई (Actions)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400 font-medium">
                  कोई छात्र नहीं मिला।
                </td>
              </tr>
            ) : (
              filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{st.name}</div>
                    <div className="text-[11px] text-slate-500">📞 {st.phone} | ✉️ {st.email}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 font-medium">{st.joinedDate}</td>
                  <td className="p-3.5">
                    {st.enrolledCourses.length > 0 ? (
                      <div className="space-y-1">
                        {st.enrolledCourses.map((c, i) => (
                          <span
                            key={i}
                            className="inline-block bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold mr-1"
                          >
                            {c}
                          </span>
                        ))}
                        <div className="text-[10px] text-slate-400">वैलिडिटी: {st.validityTill}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">कोई कोर्स नहीं</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        st.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {st.status === 'active' ? '🟢 Active' : '🔴 Blocked'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    {/* 🎓 कोर्स अलॉट बटन */}
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[11px] transition"
                    >
                      ➕ कोर्स दें
                    </button>

                    {/* 🛡️ ब्लॉक/अनब्लॉक बटन */}
                    <button
                      onClick={() => toggleBlockStatus(st.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                        st.status === 'active'
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {st.status === 'active' ? '🚫 ब्लॉक करें' : '✅ अनब्लॉक करें'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🎓 कोर्स अलॉटमेंट मॉडेल (Modal Popup) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">
                🎓 कोर्स अलॉट करें: {selectedStudent.name}
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              नीचे दिए गए किसी भी कोर्स पर क्लिक करके इस छात्र को तुरंत मुफ़्त / मैन्युअल एक्सेस दें:
            </p>

            <div className="space-y-2">
              {availableCourses.map((crs) => {
                const isAlreadyEnrolled = selectedStudent.enrolledCourses.includes(crs.title);
                return (
                  <div
                    key={crs.id}
                    className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition"
                  >
                    <span className="text-xs font-bold text-slate-800">{crs.title}</span>
                    <button
                      disabled={isAlreadyEnrolled}
                      onClick={() => assignCourse(selectedStudent.id, crs.title)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isAlreadyEnrolled
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isAlreadyEnrolled ? 'पहले से उपलब्ध' : '+ अलॉट करें'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
              >
                रद्द करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
