import React, { useState, useEffect, useRef } from 'react';
import { Play, Send, RotateCcw, Code2, Sparkles, Terminal } from 'lucide-react';

export default function CodeEditor({ initialCode, starterCode, onRunTests, onSubmit, onCodeChange, isExecuting }) {
  const [code, setCode] = useState(initialCode || starterCode || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialCode !== undefined) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleKeyDown = (e) => {
    // 1. Tab Key Handling (Insert 2 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      if (onCodeChange) onCodeChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }

    // 2. Ctrl+Enter or Cmd+Enter: Run Tests
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isExecuting && onRunTests) {
        onRunTests(code);
      }
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setCode(val);
    if (onCodeChange) onCodeChange(val);
  };

  const handleReset = () => {
    const defaultCode = starterCode || '';
    setCode(defaultCode);
    if (onCodeChange) onCodeChange(defaultCode);
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#0d121f] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            solution.js
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            JavaScript (Node.js Sandbox)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset to starter template"
            className="p-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => onRunTests(code)}
            disabled={isExecuting}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Run Tests</span>
            <span className="hidden md:inline text-[10px] text-slate-400 font-mono ml-1 px-1 bg-slate-900 rounded">Ctrl+↵</span>
          </button>

          <button
            onClick={() => onSubmit(code)}
            disabled={isExecuting}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Solution</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 relative flex font-mono text-sm overflow-hidden bg-[#0a0e17]">
        {/* Line Numbers Gutter */}
        <div className="w-12 py-3 bg-[#080b12] text-slate-600 text-right pr-3 select-none border-r border-slate-800/60 font-mono text-xs leading-6">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Input Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          placeholder="// Type your solution here..."
          className="flex-1 py-3 px-4 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-6 resize-none outline-none border-none whitespace-pre overflow-auto selection:bg-emerald-500/30 selection:text-white"
        />
      </div>

    </div>
  );
}
