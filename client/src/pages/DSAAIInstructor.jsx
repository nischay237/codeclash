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
