import { useState } from 'react';
import StatCard from './StatCard';
import { BookOpen, Award, Clock, Calendar } from 'lucide-react';

export default function StudentDashboard({ name, setPage }) {
  return (
    <div className="p-6 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">नमस्ते, {name || 'Student'} 👋</h1>
        <p className="text-gray-600">ज्ञान की पाठशाला में आपका स्वागत है।</p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="कुल कोर्स" value="4" icon={BookOpen} color="bg-blue-500" />
        <StatCard title="उपस्थिति" value="88%" icon={Calendar} color="bg-green-500" />
        <StatCard title="पूरे टेस्ट" value="12" icon={Award} color="bg-purple-500" />
        <StatCard title="लंबित कार्य" value="2" icon={Clock} color="bg-amber-500" />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">त्वरित विकल्प</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => setPage && setPage('courses')}
            className="p-4 bg-indigo-50 text-indigo-700 rounded-lg text-left font-medium hover:bg-indigo-100 transition"
          >
            📚 मेरे कोर्स
          </button>
          <button 
            onClick={() => setPage && setPage('tests')}
            className="p-4 bg-emerald-50 text-emerald-700 rounded-lg text-left font-medium hover:bg-emerald-100 transition"
          >
            📝 टेस्ट सीरीज
          </button>
          <button 
            onClick={() => setPage && setPage('attendance')}
            className="p-4 bg-amber-50 text-amber-700 rounded-lg text-left font-medium hover:bg-amber-100 transition"
          >
            📅 उपस्थिति देखें
          </button>
        </div>
      </div>
    </div>
  );
}
