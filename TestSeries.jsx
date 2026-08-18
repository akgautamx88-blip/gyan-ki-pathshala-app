import React, { useState } from 'react';

export default function TestSeries({ onBack }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 📝 डमी 5-ऑप्शन टेस्ट डेटा (Supabase से कनेक्ट करने के लिए तैयार)
  const sampleTest = {
    title: 'कृषि एवं सामान्य अध्ययन (Agriculture & GS) - Mock Test 01',
    questions: [
      {
        id: 1,
        question: 'भारत में "हरित क्रांति" (Green Revolution) का जनक किसे माना जाता है?',
        options: [
          'A) डॉ. वर्गीज कुरियन',
          'B) एम. एस. स्वामीनाथन',
          'C) डॉ. नॉर्मन बोरलॉग',
          'D) सी. सुब्रमण्यम',
          'E) इनमें से कोई नहीं'
        ],
        correct: 1, // Index 1 = B
        explanation: 'भारत में हरित क्रांति का श्रेय डॉ. एम. एस. स्वामीनाथन को जाता है, जबकि विश्व स्तर पर डॉ. नॉर्मन बोरलॉग को जनक माना जाता है।'
      },
      {
        id: 2,
        question: 'मृदा में नाइट्रोजन स्थिरीकरण (Nitrogen Fixation) के लिए कौन सा जीवाणु उत्तरदायी है?',
        options: [
          'A) राइजोबियम (Rhizobium)',
          'B) एजोटोबैक्टर (Azotobacter)',
          'C) क्लॉस्ट्रिडियम (Clostridium)',
          'D) लैक्टोबैसिलस (Lactobacillus)',
          'E) उपरोक्त A और B दोनों'
        ],
        correct: 4, // Index 4 = E
        explanation: 'राइजोबियम दलहनी फसलों की जड़ों में तथा एजोटोबैक्टर स्वतंत्र रूप से मिट्टी में नाइट्रोजन स्थिरीकरण करते हैं।'
      }
    ]
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  // स्कोर की गणना
  const calculateResult = () => {
    let correctCount = 0;
    let wrongCount = 0;

    sampleTest.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        if (ans === q.correct) correctCount++;
        else wrongCount++;
      }
    });

    const total = sampleTest.questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    return { correctCount, wrongCount, total, percentage };
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {/* 📌 हेडर व नेविगेशन */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">📝 ऑनलाइन टेस्ट सीरीज़ (5 Options Engine)</h2>
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

      {!selectedTest ? (
        /* 📋 उपलब्ध टेस्ट्स की सूची */
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 text-sm">उपलब्ध मॉक टेस्ट (Mock Tests List):</h3>
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex justify-between items-center">
            <div>
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase">FREE</span>
              <h4 className="font-bold text-slate-800 mt-1">{sampleTest.title}</h4>
              <p className="text-xs text-slate-500">कुल प्रश्न: {sampleTest.questions.length} | प्रत्येक प्रश्न में 5 विकल्प</p>
            </div>
            <button
              onClick={() => setSelectedTest(sampleTest)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              🚀 टेस्ट शुरू करें
            </button>
          </div>
        </div>
      ) : (
        /* ✍️ टेस्ट स्क्रीन / स्कोरकार्ड */
        <div>
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* प्रश्न हेडर */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <span className="text-xs font-bold text-indigo-600">
                  प्रश्न {currentQIndex + 1} / {selectedTest.questions.length}
                </span>
                <span className="text-xs font-semibold text-slate-500">5 विकल्पों वाला प्रश्न</span>
              </div>

              {/* प्रश्न टेक्स्ट */}
              <div className="text-slate-800 font-semibold text-base sm:text-lg">
                {selectedTest.questions[currentQIndex].question}
              </div>

              {/* 5 ऑप्शंस की लिस्ट */}
              <div className="space-y-2">
                {selectedTest.questions[currentQIndex].options.map((opt, idx) => {
                  const qId = selectedTest.questions[currentQIndex].id;
                  const isSelected = userAnswers[qId] === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(qId, idx)}
                      className={`w-full text-left p-3 rounded-xl text-sm font-medium border transition ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* नेविगेशन बटन */}
              <div className="flex justify-between items-center pt-4 border-t">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(currentQIndex - 1)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  ← पिछला प्रश्न
                </button>

                {currentQIndex < selectedTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(currentQIndex + 1)}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700"
                  >
                    अगला प्रश्न →
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
                  >
                    ✅ टेस्ट सबमिट करें
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* 🏆 टेस्ट सबमिट होने के बाद स्कोरकार्ड एवं उत्तर व्याख्या */
            <div className="space-y-6">
              {(() => {
                const res = calculateResult();
                return (
                  <div className="bg-slate-50 p-6 rounded-2xl border text-center space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">🎉 टेस्ट रिज़ल्ट कार्ड</h3>
                    <div className="text-4xl font-extrabold text-indigo-600">{res.percentage}%</div>

                    <div className="flex justify-center gap-6 text-xs font-bold">
                      <span className="text-emerald-600">🟢 सही: {res.correctCount}</span>
                      <span className="text-rose-600">🔴 गलत: {res.wrongCount}</span>
                      <span className="text-slate-500">⚪ कुल: {res.total}</span>
                    </div>
                  </div>
                );
              })()}

              {/* उत्तर व्याख्या (Detailed Explanations) */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-bold text-slate-800 text-sm">📖 प्रश्नों की व्याख्या व सही उत्तर:</h4>
                {selectedTest.questions.map((q, qIdx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correct;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border bg-white space-y-2">
                      <div className="font-semibold text-slate-800 text-sm">
                        {qIdx + 1}. {q.question}
                      </div>
                      <div className="text-xs space-y-1">
                        <p className={isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                          आपका उत्तर: {userAns !== undefined ? q.options[userAns] : 'कोई उत्तर नहीं दिया'}
                        </p>
                        <p className="text-indigo-700 font-bold">
                          सही उत्तर: {q.options[q.correct]}
                        </p>
                        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-800 text-xs mt-2">
                          💡 <strong>व्याख्या:</strong> {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setSelectedTest(null);
                  setIsSubmitted(false);
                  setUserAnswers({});
                  setCurrentQIndex(0);
                }}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700"
              >
                🔄 दूसरा टेस्ट दें
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
