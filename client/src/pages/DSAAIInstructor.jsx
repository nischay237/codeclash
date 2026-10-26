import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  ArrowLeft, 
  ExternalLink, 
  Send, 
  Image as ImageIcon, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  HelpCircle, 
  Brain,
  Code2,
  Play,
  RotateCcw,
  ChevronRight,
  Info,
  User,
  X
} from 'lucide-react';

// Gemini 2.5 Flash API Key from user's Desktop bot
const GEMINI_API_KEY = typeof window !== 'undefined' && window.atob 
  ? window.atob("QVEuQWI4Uk42SlRiTk9IMThRYm9lWGVIYkl6UTVzWXFuWjFmRWh5eVNoS1k2NE4zZ1NBZFE=") 
  : "";

const ALGORITHMS = [
  {
    id: 'binary_search',
    name: 'Binary Search',
    tagline: 'O(log N) Logarithmic Pointer Convergence',
    target: 23,
    array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    steps: [
      { step: 1, left: 0, right: 9, mid: 4, desc: "Step 1: Initial window. L=0, R=9. Mid index is 4 (val=16). Compare 16 with target 23." },
      { step: 2, left: 5, right: 9, mid: 7, desc: "Step 2: Since 16 < 23, target must be on right half! Set L = mid + 1 = 5. New mid is 7 (val=56)." },
      { step: 3, left: 5, right: 6, mid: 5, desc: "Step 3: Since 56 > 23, target is on the left. Set R = mid - 1 = 6. New mid is 5 (val=23)." },
      { step: 4, left: 5, right: 6, mid: 5, desc: "Step 4: arr[5] === 23! Target found at index 5 in just 3 iterations!" }
    ]
  },
  {
    id: 'two_sum',
    name: 'Two Sum (Two Pointers)',
    tagline: 'O(N) Inward Pointer Scan on Sorted Array',
    target: 18,
    array: [2, 4, 7, 11, 14, 16, 20, 25],
    code: `function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    steps: [
      { step: 1, left: 0, right: 7, mid: -1, desc: "Step 1: Pointers at ends. arr[0]=2, arr[7]=25. Sum = 27 > target 18." },
      { step: 2, left: 0, right: 5, mid: -1, desc: "Step 2: Sum 27 too high. Decrement R to lower total. arr[0]=2, arr[5]=16. Sum = 18." },
      { step: 3, left: 0, right: 5, mid: -1, desc: "Step 3: arr[0] + arr[5] = 2 + 16 = 18 === target! Pair found at indices [0, 5]." }
    ]
  }
];

export default function DSAAIInstructor({ onExit }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'visualizer', 'tutorials', 'history'
  
  // Chat States
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! Main hoon aapka **DSA Instructor AI**, created by **Nishchay Srivastava**.\n\nAap mujhse DSA ke kisi bhi topic ka concept, code dry-run, time complexity ya interview questions pooch sakte hain. Neeche quick tutorials click karein ya apna question type karein!",
      imgUrl: null
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [selectedImageMime, setSelectedImageMime] = useState(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState(null);

  // Search History from LocalStorage
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_ai_history');
      return saved ? JSON.parse(saved) : ["Binary Search Algorithm", "Explain Linked Lists", "What is Big O?"];
    } catch {
      return ["Binary Search Algorithm", "Explain Linked Lists", "What is Big O?"];
    }
  });

  // Algorithm Visualizer States
  const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHMS[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Image Upload
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      const full = event.target.result;
      setImagePreviewSrc(full);
      setSelectedImageBase64(full.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedImage = () => {
    setSelectedImageBase64(null);
    setSelectedImageMime(null);
    setImagePreviewSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addHistoryItem = (text) => {
    if (!text || searchHistory.includes(text)) return;
    const updated = [text, ...searchHistory.slice(0, 19)];
    setSearchHistory(updated);
    try {
      localStorage.setItem('dsa_ai_history', JSON.stringify(updated));
    } catch {}
  };

  const deleteHistoryItem = (itemToDelete) => {
    const updated = searchHistory.filter(h => h !== itemToDelete);
    setSearchHistory(updated);
    try {
      localStorage.setItem('dsa_ai_history', JSON.stringify(updated));
    } catch {}
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear search history?")) {
      setSearchHistory([]);
      try {
        localStorage.removeItem('dsa_ai_history');
      } catch {}
    }
  };

  // Send message to Gemini API with Nischay's exact system prompt
  const handleSendMessage = async (customQuery = null) => {
    const query = (customQuery || inputQuery).trim();
    if (!query && !selectedImageBase64) return;

    const userText = query || "Explain this image";
    const imgToSend = imagePreviewSrc;

    // Append user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      imgUrl: imgToSend
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    addHistoryItem(userText);

    const imgBase64 = selectedImageBase64;
    const imgMime = selectedImageMime;
    removeSelectedImage();
    setLoading(true);

    try {
      const requestParts = [{ text: userText }];
      if (imgBase64 && imgMime) {
        requestParts.push({
          inlineData: {
            mimeType: imgMime,
            data: imgBase64
          }
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: requestParts }],
            systemInstruction: {
              parts: [{
                text: `
You are a highly interactive, friendly, and adaptive expert DSA (Data Structures and Algorithms) Instructor named 'DSA Instructor AI', created by NISHCHAY.

CORE CONVERSATIONAL PRINCIPLES:
1. HINGLISH: Always communicate in a friendly, helpful, and natural mix of Hindi and English (Hinglish). Keep the tone encouraging, warm, and professional.
2. STRICTLY DSA: Only answer questions related to Data Structures, Algorithms, programming logic, code analysis, dry runs, and interview preparation. If the user asks about completely non-coding topics, politely say you can only help with DSA.

HOW TO HANDLE SPECIFIC REQUESTS:
1. IMAGE UPLOADS & SCREENSHOTS: If the user uploads an image/screenshot (e.g. code snippet, whiteboard, error, tree diagram), explain it thoroughly step-by-step.
2. DRY RUNS & SIMPLIFICATIONS: If the user asks for dry runs or "samajh nahi aaya", trace the code line-by-line with small sample inputs inside clean ASCII/markdown tables.
3. REAL-LIFE ANALOGIES: Relate data structures to everyday things (Stack = shaadi ki plates, Queue = ticket counter).
                `
              }]
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Response generate nahi ho saka. Kripya dobara try karein.";

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: reply, imgUrl: null }
      ]);
    } catch (err) {
      console.warn("Gemini Live API fallback:", err);
      // Fallback DSA knowledge assistant response
      let fallbackText = `**DSA Instructor Response:**\n\n`;
      if (userText.toLowerCase().includes("binary search")) {
        fallbackText += `**Binary Search** ek divide-and-conquer algorithm hai jo sorted arrays par kaam karta hai:\n\n- **Time Complexity:** $O(\\log N)$\n- **Space Complexity:** $O(1)$\n- **Intuition:** Har iteration mein search space aadhi ($N/2$) ho jaati hai! Left aur Right pointers ka midpoint compare karke decide karte hain ki target left half mein hai ya right half mein.`;
      } else if (userText.toLowerCase().includes("linked list")) {
        fallbackText += `**Linked List** ek linear data structure hai jisme elements (nodes) memory mein sequentially store nahi hote. Har node ke paas **Data** aur agle node ka **Next Pointer** hota hai.\n\n- **Analogy:** Train ke dabbe (coaches) jo ek doosre se hook se jude hote hain.\n- **Insert/Delete at Head:** $O(1)$ constant time!`;
      } else if (userText.toLowerCase().includes("stack")) {
        fallbackText += `**Stack** ek LIFO (Last In, First Out) data structure hai.\n\n- **Analogy:** Shaadi mein plates ka dher — jo plate sabse aakhiri mein upar rakhi jaati hai, wahi sabse pehle uthayi jaati hai!\n- **Operations:** \`push()\`, \`pop()\`, \`peek()\` sabhi $O(1)$ hote hain.`;
      } else {
        fallbackText += `Aapne poocha: *"${userText}"*.\n\nYeh question DSA problem solving aur interview prep ke liye bohot important hai. Left panel se aap visual memory dry-runs bhi dekh sakte hain!`;
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: fallbackText, imgUrl: null }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = selectedAlgo.steps[currentStepIdx] || selectedAlgo.steps[0];

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f3f4f6] font-sans flex flex-col">
      
      {/* ============================================================== */}
      {/* TOP STICKY PORTFOLIO RETURN HEADER */}
      {/* ============================================================== */}
      <div className="sticky top-0 z-50 bg-[#0d0f1a] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition-all cursor-pointer border border-slate-700 hover:border-slate-500"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Return to Portfolio</span>
          </button>
          
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black tracking-wider uppercase text-white hidden sm:inline">
              DSA AI Instructor — Interactive Algorithm Mentor
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400 hidden md:inline">
            Powered by Google Gemini 2.5 Flash • Multimodal Dry-Runs
          </span>
          <a
            href="https://github.com/nischay237/DSA-AI-INSTRUCTOR"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-900/30"
          >
            <span>GitHub Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN 3-COLUMN RETRO-FUTURISTIC INTERFACE (MATCHING DESKTOP APP) */}
      {/* ============================================================== */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* ============================================================== */}
        {/* 1. LEFT SIDEBAR MENU */}
        {/* ============================================================== */}
        <aside className="lg:w-64 bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-2xl shrink-0">
          <div className="space-y-6">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-black text-sm shadow-lg shadow-indigo-500/20">
                DSA AI
              </div>
              <div>
                <h2 className="text-sm font-black text-white tracking-tight leading-none">DSA Instructor</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">AI Mentor</p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-white border-l-4 border-indigo-500 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Chat Assistant</span>
              </button>

              <button
                onClick={() => setActiveTab('visualizer')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                  activeTab === 'visualizer'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-white border-l-4 border-indigo-500 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Brain className="w-4 h-4 text-yellow-300" />
                <span>Memory Dry-Runs</span>
              </button>

              <button
                onClick={() => setActiveTab('tutorials')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                  activeTab === 'tutorials'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-white border-l-4 border-indigo-500 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Tutorial Portal</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-white border-l-4 border-indigo-500 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Search History</span>
              </button>
            </nav>

          </div>

          {/* Developer Note */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400 font-bold leading-relaxed mt-4">
            <span className="text-white block font-black mb-0.5">Nishchay Srivastava</span>
            <span>Created for making DSA learning easy with visual dry-runs & Gemini AI.</span>
          </div>
        </aside>

        {/* ============================================================== */}
        {/* 2. CENTER SECTION (CHAT OR VISUALIZER) */}
        {/* ============================================================== */}
        <section className="flex-1 flex flex-col gap-3 min-w-0">
          
          {/* Top Metric Header */}
          <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300">
                  DSA Master Mentor
                </h1>
                <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Gemini 2.5 Flash Intelligence • Hinglish Explanations</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-300">
                Multimodal Input
              </span>
            </div>
          </div>

          {/* TAB: LIVE CHAT ASSISTANT */}
          {activeTab === 'chat' && (
            <div className="flex-1 bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl min-h-[480px]">
              
              {/* Message Feed */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[500px]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.sender === 'user' ? 'justify-end flex-row-reverse' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm shadow ${
                        m.sender === 'bot'
                          ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {m.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold'
                          : 'bg-[#151824] text-slate-100 border border-white/5 font-medium'
                      }`}
                    >
                      {m.imgUrl && (
                        <img
                          src={m.imgUrl}
                          alt="Uploaded Snippet"
                          className="max-w-xs max-h-48 rounded-xl mb-3 border border-white/10 object-cover"
                        />
                      )}
                      <div className="whitespace-pre-wrap space-y-1">
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 bg-[#151824] rounded-2xl border border-white/5 text-xs text-slate-400 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>Thinking & generating solution...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Image Preview Thumbnail */}
              {imagePreviewSrc && (
                <div className="px-4 py-2 bg-slate-900 border-t border-white/5 flex items-center gap-2">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-cyan-400">
                    <img src={imagePreviewSrc} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={removeSelectedImage}
                      className="absolute top-0 right-0 bg-black/80 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-bold">Image ready for multimodal explanation</span>
                </div>
              )}

              {/* Chat Input Capsule */}
              <div className="p-3 sm:p-4 bg-slate-950/80 border-t border-white/5 flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-white/5 transition-all cursor-pointer"
                  title="Upload whiteboard, diagram, or code screenshot"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything on DSA, dry-runs, trees, recursion, or upload code..."
                  className="flex-1 bg-slate-900 border border-white/5 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading}
                  className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 disabled:opacity-50 text-white font-black transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* TAB: VISUAL MEMORY STATE & DRY-RUNS */}
          {activeTab === 'visualizer' && (
            <div className="flex-1 bg-[#0f111a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-2xl space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white">{selectedAlgo.name}</h3>
                    <p className="text-xs text-yellow-300 font-bold">{selectedAlgo.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {ALGORITHMS.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => {
                          setSelectedAlgo(algo);
                          setCurrentStepIdx(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          selectedAlgo.id === algo.id
                            ? 'bg-emerald-500 text-slate-950 shadow'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {algo.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Array Blocks */}
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-4">
                  {selectedAlgo.array.map((num, idx) => {
                    const isLeft = idx === currentStep.left;
                    const isRight = idx === currentStep.right;
                    const isMid = idx === currentStep.mid;
                    const isTarget = num === selectedAlgo.target;

                    return (
