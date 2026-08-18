import React, { useEffect, useState } from 'react';
import { fetchAllStudents, updateStudentStatus } from './api';

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    const { data } = await fetchAllStudents();
    if (data) setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await updateStudentStatus(id, newStatus);
    if (!error) {
      setMsg(`छात्र का स्टेटस सफलता से बदलकर '${newStatus}' कर दिया गया है।`);
      loadStudents();
      setTimeout(() => setMsg(''), 3000);
    } else {
      alert('स्टेटस बदलने में एरर आया: ' + error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">👨‍🎓 छात्र नियंत्रण (Student Management)</h2>
          <p className="text-xs text-slate-500">यहाँ से छात्रों को Active (ON), Inactive (OFF), या Block करें</p>
        </div>
        <button
          onClick={loadStudents}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition"
        >
          🔄 रिफ्रेश लिस्ट
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200">
          {msg}
        </div>
      )}

      {loading ? (
        <p className="text-center py-8 text-slate-400 text-sm">छात्रों की सूची लोड हो रही है...</p>
      ) : students.length === 0 ? (
        <p className="text-center py-8 text-slate-400 text-sm">अभी तक कोई छात्र पंजीकृत नहीं हुआ है।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-600 text-xs">
                <th className="p-3">छात्र का नाम</th>
                <th className="p-3">संपर्क / मोबाइल</th>
                <th className="p-3">वर्तमान स्टेटस</th>
                <th className="p-3">एक्शन (Status Control)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{st.full_name || '—'}</td>
                  <td className="p-3 text-slate-500">{st.phone || 'उपलब्ध नहीं'}</td>
                  <td className="p-3">
                    {st.status === 'active' && (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        🟢 Active (ON)
                      </span>
                    )}
                    {st.status === 'inactive' && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                        🟡 Inactive (OFF)
                      </span>
                    )}
                    {st.status === 'blocked' && (
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">
                        🔴 Blocked
                      </span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleStatusChange(st.id, 'active')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold border ${
                        st.status === 'active'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      ON
                    </button>
                    <button
                      onClick={() => handleStatusChange(st.id, 'inactive')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold border ${
                        st.status === 'inactive'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-amber-600 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      OFF
                    </button>
                    <button
                      onClick={() => handleStatusChange(st.id, 'blocked')}
                      className={`px-2.5 py-1 text-xs rounded-lg font-semibold border ${
                        st.status === 'blocked'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-rose-600 border-rose-300 hover:bg-rose-50'
                      }`}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
