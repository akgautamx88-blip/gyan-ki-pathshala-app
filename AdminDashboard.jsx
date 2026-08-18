import React, { useState } from 'react';

export default function AdminDashboard() {
  // 📊 डमी एनालिटिक्स डेटा (Supabase से ऑटोमैटिक सिंक होगा)
  const stats = {
    totalStudents: 1248,
    activeStudents: 1195,
    blockedStudents: 15,
    newStudentsToday: 38,
    totalCourses: 8,
    totalTests: 42,
    totalSales: '₹ 2,45,800',
    todaySales: '₹ 4,990',
    monthSales: '₹ 68,400',
  };

  // ⏳ Expiring Students (कोर्स खत्म होने वाले छात्र)
  const expiringStudents = [
    { id: 1, name: 'राहुल वर्मा', phone: '9876543210', course: 'कृषि विज्ञान (Agri Special)', daysLeft: 2, expiryDate: '20 Aug 2026' },
    { id: 2, name: 'प्रिया शर्मा', phone: '9123456789', course: 'सामान्य अध्ययन (GS Batch)', daysLeft: 4, expiryDate: '22 Aug 2026' },
    { id: 3, name: 'अमित कुमार', phone: '9988776655', course: 'Test Series 2026', daysLeft: 5, expiryDate: '23 Aug 2026' },
  ];

  // 💳 Recent Payments (हाल के भुगतान)
  const recentPayments = [
    { id: 'TXN9921', student: 'विकास सिंह', course: 'कृषि विज्ञान (Agri Special)', amount: '₹ 499', time: '10 मिनट पहले', status: 'Success' },
    { id: 'TXN9920', student: 'पूजा यादव', course: 'GS Batch 2026', amount: '₹ 999', time: '35 मिनट पहले', status: 'Success' },
    { id: 'TXN9919', student: 'आलोक रंजन', course: 'Full Mock Test Series', amount: '₹ 299', time: '2 घंटे पहले', status: 'Success' },
    { id: 'TXN9918', student: 'सुनील राजपूत', course: 'कृषि विज्ञान (Agri Special)', amount: '₹ 499', time: '4 घंटे पहले', status: 'Failed' },
  ];

  return (
    <div className="space-y-6">
      {/* 🔝 डैशबोर्ड हेडर */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span>📊</span> मुख्य एडमिन कंट्रोल डैशबोर्ड
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">ज्ञान की पाठशाला — आकाश सर की क्लास</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            🟢 लाइव सिस्टम एक्टिव
          </span>
        </div>
      </div>

      {/* 📈 1. विद्यार्थी मेट्रिक्स (Student Stats) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">👨‍🎓 विद्यार्थी आंकड़े (Students Stats)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 block">Total Students</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">{stats.totalStudents}</span>
            <span className="text-[10px] font-semibold text-emerald-600">कुल पंजीकृत छात्र</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 block">Active Students</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{stats.activeStudents}</span>
            <span className="text-[10px] font-semibold text-slate-400">सक्रिय यूज़र्स</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 block">Blocked Students</span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">{stats.blockedStudents}</span>
            <span className="text-[10px] font-semibold text-rose-500">प्रतिबंधित यूज़र्स</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 block">New Students</span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">+{stats.newStudentsToday}</span>
            <span className="text-[10px] font-semibold text-indigo-500">आज नए जुड़े</span>
          </div>
        </div>
      </div>

      {/* 💰 2. बिक्री एवं कमाई मेट्रिक्स (Sales Stats) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">💰 बिक्री एवं कमाई (Sales & Revenue)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-5 rounded-2xl shadow-md">
            <span className="text-xs font-medium opacity-80 block">आज की बिक्री (Today's Sales)</span>
            <span className="text-3xl font-black mt-1 block">{stats.todaySales}</span>
            <span className="text-[11px] opacity-90 mt-2 block">आज कुल 10 नए कोर्स बिके</span>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
            <span className="text-xs font-medium opacity-80 block">इस महीने की बिक्री (This Month)</span>
            <span className="text-3xl font-black mt-1 block">{stats.monthSales}</span>
            <span className="text-[11px] text-emerald-400 mt-2 block">↑ 18% पिछले महीने से बेहतर</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 block">Total Revenue (कुल बिक्री)</span>
            <span className="text-3xl font-black text-slate-800 mt-1 block">{stats.totalSales}</span>
            <span className="text-[11px] font-semibold text-slate-500 mt-2 block">लाइफटाइम ऐप रेवेन्यू</span>
          </div>
        </div>
      </div>

      {/* 📚 3. कंटेंट मेट्रिक्स (Course & Test Stats) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block">Total Courses</span>
            <span className="text-2xl font-black text-slate-800 mt-0.5">{stats.totalCourses}</span>
          </div>
          <span className="text-3xl">📚</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block">Total Tests</span>
            <span className="text-2xl font-black text-slate-800 mt-0.5">{stats.totalTests}</span>
          </div>
          <span className="text-3xl">📝</span>
        </div>
      </div>

      {/* ⏳ & 💳 4. टेबल सेक्शन: Expiring Students और Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ⏳ Expiring Students Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <span>⏳</span> Expiring Students ({expiringStudents.length})
            </h4>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              जल्द खत्म होने वाले
            </span>
          </div>

          <div className="space-y-3">
            {expiringStudents.map((st) => (
              <div key={st.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <h5 className="font-bold text-slate-800">{st.name} <span className="font-normal text-slate-500">({st.phone})</span></h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{st.course}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded text-[10px] block">
                    {st.daysLeft} दिन बाकी
                  </span>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline mt-1">
                    📲 रिमाइंडर भेजें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💳 Recent Payments Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <span>💳</span> Recent Payments (हाल के भुगतान)
            </h4>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              लाइव ट्रांजेक्शन
            </span>
          </div>

          <div className="space-y-3">
            {recentPayments.map((pay) => (
              <div key={pay.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-800">{pay.student}</h5>
                    <span className="text-[9px] font-mono text-slate-400">{pay.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{pay.course} • <span className="text-slate-400">{pay.time}</span></p>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-800 text-sm block">{pay.amount}</span>
                  <span className={`text-[10px] font-bold ${pay.status === 'Success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {pay.status === 'Success' ? '✓ सफल' : '✗ असफल'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
