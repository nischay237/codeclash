import React, { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, AlertTriangle, FileCode } from 'lucide-react';

export default function TestConsole({ testResults, isExecuting }) {
  const [activeTab, setActiveTab] = useState(0);

  if (isExecuting) {
    return (
      <div className="h-44 p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-emerald-400">Executing code in Node.js Sandbox...</span>
      </div>
    );
  }

  if (!testResults || !testResults.results || testResults.results.length === 0) {
    return (
      <div className="h-44 p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col items-center justify-center gap-2 text-slate-500">
        <Terminal className="w-5 h-5 text-slate-600" />
        <span className="text-xs font-mono">Run tests or press Ctrl+Enter to see sandbox outputs</span>
      </div>
    );
  }

  const results = testResults.results;
  const currentTest = results[activeTab] || results[0];

  return (
    <div className="h-48 flex flex-col rounded-2xl bg-[#0d121f] border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      
      {/* Header Bar with Overall Score & Tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto">
          {results.map((res, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                activeTab === idx
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {res.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-400" />
              )}
              <span>Case {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Overall Passed Indicator */}
        <div className="flex items-center gap-3 text-[11px] shrink-0 pl-2">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{testResults.averageTimeMs}ms avg</span>
          </div>
          <span className={`px-2 py-0.5 rounded font-bold ${
            testResults.success
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {testResults.passedCount}/{testResults.totalTests} Passed
          </span>
        </div>
      </div>

      {/* Test Case Detail Content */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#0a0e17]">
        {currentTest.error ? (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300">
            <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1">
              <AlertTriangle className="w-4 h-4" />
              Runtime Error
            </div>
            <div className="text-xs font-mono whitespace-pre-wrap">{currentTest.error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            
            {/* Input */}
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Input</span>
              <pre className="text-slate-200 overflow-x-auto text-[11px]">
                {JSON.stringify(currentTest.input, null, 2)}
              </pre>
            </div>

            {/* Expected Output */}
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Expected Output</span>
              <pre className="text-emerald-400 overflow-x-auto text-[11px]">
                {JSON.stringify(currentTest.expectedOutput, null, 2)}
              </pre>
            </div>

            {/* Actual Output */}
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Your Output</span>
              <pre className={`overflow-x-auto text-[11px] ${currentTest.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                {JSON.stringify(currentTest.actualOutput, null, 2)}
              </pre>
            </div>

          </div>
        )}

        {/* Logs */}
        {currentTest.logs && currentTest.logs.length > 0 && (
          <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Console Output</span>
            {currentTest.logs.map((log, lIdx) => (
              <div key={lIdx} className="text-[11px] text-slate-300 font-mono">{log}</div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
