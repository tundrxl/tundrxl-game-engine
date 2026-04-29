/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, Play, FileCode, Check, Copy, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'text/html' || file?.name.endsWith('.html'))) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        openInAboutBlank(content);
      };
      reader.readAsText(file);
    }
  };

  const openInAboutBlank = (content: string) => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.open();
      win.document.write(content);
      win.document.close();
    } else {
      alert("Popup blocked! Please allow popups to run games.");
    }
  };

  const copyStandaloneHtml = () => {
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>xlTundr Game Engine</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style>
    body { background-color: #0A0C10; color: #cbd5e1; font-family: sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body class="relative overflow-hidden">
  <div class="absolute top-0 right-0 w-[500px] h-[500px] border-r border-t border-slate-800/30 -mr-64 -mt-64 rotate-45 pointer-events-none"></div>
  <div class="max-w-xl w-full p-12 text-center relative z-10">
    <div class="mb-12 inline-flex items-center justify-center">
      <div class="w-20 h-20 border border-slate-700 p-2">
        <div class="w-full h-full border border-cyan-500/50 flex items-center justify-center">
          <svg class="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
    </div>
    <h1 class="text-3xl font-light text-white mb-4 uppercase tracking-[0.2em]">xlTundr <span class="italic font-serif">Engine</span></h1>
    <input type="file" id="fi" accept=".html" class="hidden">
    <button onclick="document.getElementById('fi').click()" class="bg-white text-black px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-cyan-500 transition-all">Initialize Runtime</button>
  </div>
  <script>
    document.getElementById('fi').addEventListener('change', function(e) {
      const f = e.target.files[0];
      if (f) {
        const r = new FileReader();
        r.onload = function(ev) {
          const win = window.open('about:blank', '_blank');
          if (win) { win.document.open(); win.document.write(ev.target.result); win.document.close(); }
        };
        r.readAsText(f);
      }
    });
  </script>
</body>
</html>`;
    navigator.clipboard.writeText(standaloneHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      {/* Background Geometric Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border-r border-t geo-accent -mr-64 -mt-64 rotate-45" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border-l border-b geo-accent -ml-32 -mb-32 rotate-12" />

      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-8 md:px-12 pt-10 pb-6 border-b border-slate-800/40 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center font-bold text-black text-xs">
            XL
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">
            xlTundr <span className="font-light text-cyan-400">Engine</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500">
          <span className="text-cyan-500 cursor-default">01. Local Runner</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">02. Documentation</span>
          <button 
            onClick={copyStandaloneHtml}
            className={`transition-colors ${copied ? 'text-green-500' : 'hover:text-slate-300'}`}
          >
            03. {copied ? 'Standalone Copied' : 'Standalone HTML'}
          </button>
        </div>
      </nav>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Visual Header */}
          <div className="mb-12 inline-flex items-center justify-center">
            <div className="w-24 h-24 border border-slate-700 p-2">
              <div className="w-full h-full border border-cyan-500/50 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FileCode className="w-10 h-10 text-cyan-500" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
            Ready for <span className="italic font-serif text-slate-400">Deployment</span>
          </h2>
          <p className="text-slate-500 mb-12 text-sm leading-relaxed max-w-md mx-auto">
            Upload a compiled .HTML file to initialize the xlTundr runtime. 
            Your assets will be executed in a secure, isolated sandbox environment.
          </p>

          {/* Interactive Zone */}
          <div className="flex flex-col items-center gap-8">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".html"
              className="hidden"
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:bg-cyan-500 active:scale-95 shadow-2xl"
            >
              Initialize Engine
            </button>
            
            <AnimatePresence>
              {fileName ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-cyan-500 font-mono text-[10px] uppercase tracking-widest bg-cyan-500/5 px-4 py-2 border border-cyan-500/20"
                >
                  <Check className="w-3 h-3" />
                  Loaded: {fileName}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-4 py-8 border-t border-slate-800/50 w-full">
              <div className="flex-1 text-left">
                <span className="block text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-1">Runtime Status</span>
                <span className={`text-xs font-mono ${fileName ? 'text-emerald-500' : 'text-cyan-500'}`}>
                  {fileName ? 'ENGINE_ACTIVE' : 'IDLE_WAITING'}
                </span>
              </div>
              <div className="flex-1 text-left">
                <span className="block text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-1">Engine Core</span>
                <span className="text-xs font-mono text-white">V2.4.0-STABLE</span>
              </div>
              <div className="flex-1 text-left border-l md:border-l-0 md:pl-0 pl-12 border-slate-800/50">
                <span className="block text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-1">Security</span>
                <span className="text-xs font-mono text-emerald-500">SANDBOXED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* System Footer */}
      <footer className="px-8 md:px-12 py-8 flex justify-between items-end border-t border-slate-800/40 relative z-10">
        <div className="max-w-xs">
          <p className="text-[10px] text-slate-600 leading-tight">
            &copy; 2026 xlTundr Project. Designed for instantaneous cross-platform HTML5 game delivery and testing suite.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-1.5">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-500" 
            />
            <div className="w-1.5 h-1.5 bg-slate-800" />
            <div className="w-1.5 h-1.5 bg-slate-800" />
          </div>
          <span className="text-[9px] text-slate-700 tracking-tighter uppercase font-mono">
            System_Latent_Clock: 0.002ms
          </span>
        </div>
      </footer>
    </div>
  );
}
