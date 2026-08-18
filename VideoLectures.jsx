import React, { useState } from 'react';

export default function VideoLectures({ onBack }) {
  const [selectedCourse, setSelectedCourse] = useState('agri_101');
  const [selectedChapter, setSelectedChapter] = useState('ch1');
  const [activeVideo, setActiveVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([1]); // डमी: पूरी हो चुकी वीडियो IDs

  // डमी यूज़र स्टेटस (कोर्स खरीदा है या नहीं)
  const isEnrolled = false; // true = खरीदा हुआ, false = मुफ़्त/अनप्रेड यूज़र

  // 1. कोर्सेस सूची
  const courses = [
    { id: 'agri_101', title: '🌾 कृषि विज्ञान (Agri Special)' },
    { id: 'gs_2026', title: '📖 सामान्य अध्ययन (GS Batch)' },
  ];

  // 2. चैप्टर सूची (Chapter-wise)
  const chapters = [
    { id: 'ch1', title: 'अध्याय 1: मृदा विज्ञान (Soil Science)' },
    { id: 'ch2', title: 'अध्याय 2: फसल सुरक्षा (Crop Protection)' },
    { id: 'ch3', title: 'अध्याय 3: बीज प्रौद्योगिकी (Seed Tech)' },
  ];

  // 3. वीडियो डेटाबेस (Course, Chapter, Free/Paid & Private Links)
  const videos = [
    {
      id: 1,
      courseId: 'agri_101',
      chapterId: 'ch1',
      title: '01. मृदा की संरचना एवं उसके प्रकार',
      duration: '45 मिनट',
      isFree: true, // 🟢 मुफ़्त वीडियो (डेमो)
      youtubeId: 'dQw4w9WgXcQ', // Private / Unlisted YouTube ID
      description: 'इस क्लास में मृदा के प्रकार, pH मान और उपजाऊ क्षमता पर विस्तार से चर्चा की गई है।',
    },
    {
      id: 2,
      courseId: 'agri_101',
      chapterId: 'ch1',
      title: '02. NPK उर्वरक एवं जैविक खाद का उपयोग',
      duration: '52 मिनट',
      isFree: false, // 🔒 पेड वीडियो
      youtubeId: 'dQw4w9WgXcQ',
      description: 'NPK की सही मात्रा, रासायनिक और जैविक खाद के तुलनात्मक लाभ।',
    },
    {
      id: 3,
      courseId: 'agri_101',
      chapterId: 'ch2',
      title: '01. कीटनाशक एवं प्रमुख रोगों की पहचान',
      duration: '38 मिनट',
      isFree: true,
      youtubeId: 'dQw4w9WgXcQ',
      description: 'फसलों में लगने वाले कीट और उनके जैविक नियंत्रण।',
    },
  ];

  // फ़िल्टर किए गए वीडियो
  const currentChapterVideos = videos.filter(
    (v) => v.courseId === selectedCourse && v.chapterId === selectedChapter
  );

  const currentVideo = activeVideo || currentChapterVideos[0] || videos[0];

  // वीडियो को Complete / Incomplete मार्क करने का फ़ंक्शन
  const toggleCompletion = (videoId) => {
    if (completedVideos.includes(videoId)) {
      setCompletedVideos(completedVideos.filter((id) => id !== videoId));
    } else {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  // कुल प्रगति (Completion Percentage)
  const progressPercent = Math.round(
    (completedVideos.length / videos.length) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 🔝 हेडर एवं प्रोग्रेस बार */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">🎥 वीडियो क्लासेस एवं लेक्चर्स</h2>
          <p className="text-xs text-slate-500 mt-0.5">अध्याय-वार पढ़ाई करें और अपनी प्रगति ट्रैक करें</p>
        </div>

        {/* 📊 Progress Bar (वीडियो ट्रैकिंग) */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">आपकी प्रगति</span>
            <span className="text-sm font-extrabold text-indigo-600">{progressPercent}% पूर्ण</span>
          </div>
          <div className="w-20 bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* 📺 मुख्य वीडियो प्लेयर (Left / Top Area) */}
        <div className="lg:col-span-2 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-4">
          {/* वीडियो एक्सेस चेक */}
          {!currentVideo.isFree && !isEnrolled ? (
            <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col justify-center items-center text-center p-6 text-white space-y-3">
              <span className="text-4xl">🔒</span>
              <h3 className="font-bold text-lg">यह प्रीमियम वीडियो लॉक्ड है</h3>
              <p className="text-xs text-slate-400 max-w-md">
                इस क्लास को देखने के लिए कोर्स में एनरोल करें या एडमिन से एक्सेस प्राप्त करें।
              </p>
              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs rounded-xl shadow-md transition">
                💳 कोर्स अनलॉक करें (Unlock Now)
              </button>
            </div>
          ) : (
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* वीडियो विवरण व मार्क एज़ कम्प्लीट बटन */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentVideo.isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {currentVideo.isFree ? 'FREE DEMO' : 'PAID CLASS'}
                </span>
                <span className="text-xs text-slate-400">⏱️ {currentVideo.duration}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mt-1">{currentVideo.title}</h3>
            </div>

            <button
              onClick={() => toggleCompletion(currentVideo.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                completedVideos.includes(currentVideo.id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {completedVideos.includes(currentVideo.id) ? '✅ क्लास पूर्ण (Completed)' : '⚪ Mark as Completed'}
            </button>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {currentVideo.description}
          </p>
        </div>

        {/* 📚 कोर्स, चैप्टर एवं प्लेलिस्ट साइडबार (Right Area) */}
        <div className="p-4 sm:p-6 bg-slate-50/50 space-y-5">
          {/* कोर्स सिलेक्शन */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">1. कोर्स चुनें</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* चैप्टर सिलेक्शन */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">2. अध्याय (Chapter) चुनें</label>
            <div className="space-y-1.5">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition ${
                    selectedChapter === ch.id
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </div>

          {/* चैप्टर के वीडियो की लिस्ट */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2">3. लेक्चर्स सूची ({currentChapterVideos.length})</h4>
            <div className="space-y-2">
              {currentChapterVideos.map((vid) => {
                const isDone = completedVideos.includes(vid.id);
                const isActive = currentVideo.id === vid.id;

                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-sm">{isDone ? '✅' : vid.isFree ? '▶️' : '🔒'}</span>
                      <div className="truncate">
                        <p className={`text-xs font-bold truncate ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                          {vid.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{vid.duration}</p>
                      </div>
                    </div>
                    {vid.isFree && (
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded shrink-0">
                        FREE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
