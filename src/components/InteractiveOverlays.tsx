import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, AlertTriangle, Play, RefreshCw, Key, Shield, ShieldCheck, 
  Download, Laptop, Smartphone, FileText, ChevronRight, HelpCircle, 
  Lock, Trash2, Users, Cloud, Network, ShieldAlert, BadgeCheck
} from 'lucide-react';
import { SupportArticle, ProductCardData, SecurityScanStats } from '../types';
import { PRE_DEFINED_SITES, MALICIOUS_FILES_SAMPLES } from '../data/supportData';

// --- ARTICLE VIEWER OVERLAY ---
interface ArticleViewerProps {
  article: SupportArticle | null;
  onClose: () => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onClose }) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative flex h-full max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-850">
              {article.category}
            </span>
            <span className="text-xs text-gray-500 font-mono">{article.readingTime}</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-650 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
            {article.title}
          </h2>

          <div className="prose prose-slate max-w-none text-gray-650 text-[15px] space-y-4 leading-relaxed">
            {article.content.split('\n').map((line, idx) => {
              if (line.match(/^\d+\./)) {
                return (
                  <div key={idx} className="flex gap-3 pl-1 py-1">
                    <span className="font-semibold text-amber-600 font-sans min-w-[20px]">{line.split('.')[0]}.</span>
                    <p className="flex-1 text-gray-700">{line.substring(line.indexOf('.') + 1).trim()}</p>
                  </div>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h4 key={idx} className="text-base font-semibold text-gray-850 pt-2 mb-1">
                    {line.replaceAll('**', '')}
                  </h4>
                );
              }
              if (line.startsWith('*')) {
                return (
                  <p key={idx} className="italic bg-amber-50/50 border-l-4 border-amber-400 pl-3 py-1.5 rounded-r">
                    {line.replace('*', '').trim()}
                  </p>
                );
              }
              if (!line.trim()) return <div key={idx} className="h-2" />;
              return <p key={idx}>{line}</p>;
            })}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="border-t border-gray-100 bg-gray-50 px-8 py-5">
          {feedback === null ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-sm font-medium text-gray-750">Was this article helpful to you?</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFeedback('yes')}
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  Yes
                </button>
                <button 
                  onClick={() => setFeedback('no')}
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-700 font-medium text-sm"
            >
              <Check className="h-5 w-5 bg-green-100 text-green-800 rounded-full p-0.5" />
              <span>Thank you for your feedback! Better help resources are continuously integrated.</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// --- THREAT REMOVAL / SECURITY SCANNER OVERLAY ---
export const ThreatScanner: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results' | 'cleaning' | 'clean'>('idle');
  const [stats, setStats] = useState<SecurityScanStats>({
    filesScanned: 0,
    threatsFound: 0,
    progress: 0,
    currentPath: ''
  });
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (scanState !== 'scanning') return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= PRE_DEFINED_SITES.length * 3) {
        clearInterval(interval);
        setScanState('results');
        return;
      }

      const fileIdx = idx % PRE_DEFINED_SITES.length;
      const curPath = PRE_DEFINED_SITES[fileIdx];
      const isFakeThreat = MALICIOUS_FILES_SAMPLES.some(t => t.path === curPath) && Math.random() > 0.3;

      setStats(prev => {
        const nextFiles = prev.filesScanned + Math.floor(Math.random() * 8) + 3;
        const nextThreats = isFakeThreat ? prev.threatsFound + 1 : prev.threatsFound;
        const nextProg = Math.min(Math.round((idx / (PRE_DEFINED_SITES.length * 3)) * 100), 100);

        return {
          filesScanned: nextFiles,
          threatsFound: nextThreats,
          progress: nextProg,
          currentPath: curPath
        };
      });

      if (isFakeThreat) {
        const threatName = MALICIOUS_FILES_SAMPLES.find(t => t.path === curPath)?.threat || 'Suspicious.File';
        setLogs(prev => [`[WARNING] Found threat: ${threatName} in ${curPath}`, ...prev.slice(0, 15)]);
      } else {
        setLogs(prev => [`Inspecting: ${curPath}`, ...prev.slice(0, 15)]);
      }

      idx++;
    }, 120);

    return () => clearInterval(interval);
  }, [scanState]);

  const startScan = () => {
    setStats({
      filesScanned: 0,
      threatsFound: 0,
      progress: 0,
      currentPath: ''
    });
    setLogs(['Initializing Norton Defensive Scanning Engine...']);
    setScanState('scanning');
  };

  const handleClean = () => {
    setScanState('cleaning');
    let p = 0;
    const timer = setInterval(() => {
      p += 20;
      if (p >= 100) {
        clearInterval(timer);
        setScanState('clean');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl bg-slate-900 text-white shadow-2xl overflow-hidden font-sans border border-slate-800"
      >
        {/* Banner header */}
        <div className="flex items-center justify-between bg-slate-950 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-400" />
            <span className="font-semibold text-sm uppercase tracking-wider text-slate-200">Norton Safety & Threat Sandbox</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Interface */}
        <div className="p-8">
          {scanState === 'idle' && (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-amber-400">
                <ShieldAlert className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Norton Threat Removal Simulator</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400 leading-relaxed">
                Scan your virtual system sandbox for potential security tracking scripts, temporary browser malware, and generic spyware.
              </p>
              <button 
                onClick={startScan}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-md hover:bg-amber-300 transition-all cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                Launch System Diagnostic
              </button>
            </div>
          )}

          {scanState === 'scanning' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-200 text-lg">Scanning system files...</h4>
                  <p className="text-xs text-amber-400 mt-1 font-mono uppercase tracking-widest">{stats.progress}% complete</p>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs text-slate-400">Threats logged</span>
                  <span className={`font-mono text-xl font-bold ${stats.threatsFound > 0 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                    {stats.threatsFound}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-400"
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Path and Stats */}
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-950 p-4 border border-slate-850">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">Files Inspected</span>
                  <p className="font-mono text-lg text-slate-200">{stats.filesScanned}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">Engine Core</span>
                  <p className="font-mono text-sm text-amber-300">V.26.6.19-Active</p>
                </div>
                <div className="col-span-2 border-t border-slate-850 pt-3">
                  <span className="text-xs text-slate-400 block mb-1">Inspecting Path:</span>
                  <p className="font-mono text-xs text-slate-300 break-all truncate">{stats.currentPath || 'Hooking file threads...'}</p>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="h-36 rounded-xl bg-slate-950 p-4 border border-slate-850 overflow-y-auto font-mono text-xs text-slate-400 space-y-1">
                {logs.map((log, i) => (
                  <p key={i} className={log.startsWith('[WARNING]') ? 'text-red-400 font-semibold' : 'text-slate-400'}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {scanState === 'results' && (
            <div className="text-center py-6">
              {stats.threatsFound > 0 ? (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-950/50 text-red-400 border border-red-800">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-red-400">Risk Assessment Completed</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-350 leading-relaxed">
                    The scan reported <span className="font-semibold text-red-400 font-mono">{stats.threatsFound} severe tracking/cookie scripts</span> nestled in the sandbox directories. Clean them to sanitize system state.
                  </p>

                  <div className="my-5 rounded-xl bg-slate-950 p-4 max-w-sm mx-auto text-left space-y-2 border border-slate-850">
                    <p className="text-xs font-semibold text-slate-400 border-b border-slate-850 pb-2">Logged Threats:</p>
                    <div className="max-h-24 overflow-y-auto space-y-1.5 font-mono text-[11px]">
                      {MALICIOUS_FILES_SAMPLES.map((val, idx) => (
                        <div key={idx} className="flex justify-between items-center text-red-300">
                          <span className="truncate max-w-[200px]">{val.path.split('/').pop()}</span>
                          <span className="text-[10px] bg-red-900/40 text-red-200 px-2 rounded-full font-bold">{val.threat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 mt-6">
                    <button 
                      onClick={handleClean}
                      className="rounded-full bg-red-500 hover:bg-red-400 px-6 py-2.5 text-sm font-bold text-white transition-all cursor-pointer"
                    >
                      Purge Threats & Heal Cache
                    </button>
                    <button 
                      onClick={startScan}
                      className="rounded-full border border-slate-700 hover:bg-slate-800 px-5 py-2.5 text-sm text-slate-300 transition-all cursor-pointer"
                    >
                      Rescan
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50 text-green-400 border border-green-800">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Sandbox Fully Secure</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-400 leading-relaxed">
                    Fantastic! Our diagnostics returned completely green. No malicious tracking scripts, spyware remnants, or unsafe adware cookies were discovered inside your sandbox.
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-6 rounded-full bg-amber-400 text-slate-950 font-bold px-6 py-2.5 text-sm hover:bg-amber-300 transition-all cursor-pointer"
                  >
                    Finish Session
                  </button>
                </>
              )}
            </div>
          )}

          {scanState === 'cleaning' && (
            <div className="text-center py-10 space-y-4">
              <RefreshCw className="h-10 w-10 text-red-400 animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-slate-200">Purging registry and removing sandboxed traces...</h4>
              <p className="text-xs text-slate-450 font-mono">Running secure 5-tier cryptographic overwrite</p>
            </div>
          )}

          {scanState === 'clean' && (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50 text-green-400 border border-green-800">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-400">Disinfect Successful!</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-350 leading-relaxed">
                All logged threats have been permanently purged and quarantined successfully. Your browser environment diagnostic index contains 0 faults.
              </p>
              <button 
                onClick={onClose}
                className="mt-6 rounded-full bg-amber-400 text-slate-950 font-bold px-6 py-2.5 text-sm hover:bg-amber-300 transition-all cursor-pointer"
              >
                Close Scanner
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// --- DOWNLOAD & ACTIVATION WIZARD ---
export const ActivationWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<'key_entry' | 'validating' | 'platform_select' | 'download_progress' | 'ready'>('key_entry');
  const [licenseKey, setLicenseKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const [platform, setPlatform] = useState<'windows' | 'mac' | 'android' | 'ios'>('windows');
  const [progress, setProgress] = useState(0);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitised = licenseKey.replace(/[^A-Za-z0-9]/g, '');
    if (sanitised.length !== 25) {
      setKeyError('Please enter a valid 25-digit activation key. (Format: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)');
      return;
    }
    setKeyError('');
    setStep('validating');
    setTimeout(() => {
      setStep('platform_select');
    }, 1500);
  };

  const handleDownload = () => {
    setStep('download_progress');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('ready'), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const formatKey = (val: string) => {
    const raw = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const parts = [];
    for (let i = 0; i < raw.length && i < 25; i += 5) {
      parts.push(raw.slice(i, i + 5));
    }
    setLicenseKey(parts.join('-'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl bg-white text-gray-800 shadow-2xl overflow-hidden font-sans border border-gray-100"
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-amber-500" />
            <span className="font-semibold text-gray-800 text-sm">Norton Setup Desk</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'key_entry' && (
            <form onSubmit={handleVerify} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 leading-snug">Register Your Norton Product</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Before downloading, type the 25-character premium product key provided on your card, receipt, or email to verify your subscription duration.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">25-Digit License Activation Key</label>
                <input 
                  type="text"
                  value={licenseKey}
                  placeholder="e.g. NT360-X7V9Q-8P2MR-KL4W5-89YT2"
                  onChange={e => formatKey(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm tracking-widest text-center text-gray-800 uppercase focus:border-amber-400 focus:outline-hidden"
                />
                {keyError && <p className="text-xs text-red-500 mt-1">{keyError}</p>}
              </div>

              <button 
                type="submit"
                className="w-full rounded-lg bg-amber-400 py-2.5 text-sm font-bold text-gray-950 transition-all hover:bg-amber-350 shadow-xs cursor-pointer"
              >
                Validate Activation Key
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setStep('platform_select')}
                  className="text-xs text-amber-600 font-semibold hover:underline"
                >
                  Skip and download demo trial (no key required)
                </button>
              </div>
            </form>
          )}

          {step === 'validating' && (
            <div className="text-center py-8 space-y-4">
              <RefreshCw className="h-8 w-8 text-amber-500 animate-spin mx-auto" />
              <h4 className="font-bold text-slate-800">Contacting Gen Activation Servers...</h4>
              <p className="text-xs text-gray-400 font-mono">Verifying cryptography blocks and TTL indicators</p>
            </div>
          )}

          {step === 'platform_select' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Select Platform OS</h3>
                <p className="text-xs text-gray-500">Pick the target operating system to compile the direct secure installation package.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPlatform('windows')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 gap-2 text-center transition-all cursor-pointer ${
                    platform === 'windows' ? 'border-amber-400 bg-amber-50/20 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Laptop className="h-6 w-6" />
                  <span className="text-xs font-bold">Windows OS</span>
                </button>

                <button 
                  onClick={() => setPlatform('mac')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 gap-2 text-center transition-all cursor-pointer ${
                    platform === 'mac' ? 'border-amber-400 bg-amber-50/20 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Laptop className="h-6 w-6" />
                  <span className="text-xs font-bold">macOS Mojave+</span>
                </button>

                <button 
                  onClick={() => setPlatform('android')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 gap-2 text-center transition-all cursor-pointer ${
                    platform === 'android' ? 'border-amber-400 bg-amber-50/20 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-xs font-bold">Android TV/Mobile</span>
                </button>

                <button 
                  onClick={() => setPlatform('ios')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 gap-2 text-center transition-all cursor-pointer ${
                    platform === 'ios' ? 'border-amber-400 bg-amber-50/20 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-xs font-bold">iOS Shield</span>
                </button>
              </div>

              <button 
                onClick={handleDownload}
                className="w-full rounded-lg bg-amber-400 py-3 text-sm font-bold text-gray-950 transition-all hover:bg-amber-350 shadow-xs cursor-pointer"
              >
                Compile & Download Norton Installer
              </button>
            </div>
          )}

          {step === 'download_progress' && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 capitalize">Pulling installer for {platform}...</span>
                <span className="text-xs font-mono font-bold text-amber-600">{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-405 font-mono text-center">Do not close this application window while downloading...</p>
            </div>
          )}

          {step === 'ready' && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-500 border border-green-200">
                <Check className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Download Initiated!</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  The setup binary installer is packing and forwarding to your downloads folder. Execute the client builder code locally to register virus shields immediately.
                </p>
              </div>

              <div className="bg-amber-50/40 p-3 rounded-lg border border-amber-100 max-w-xs mx-auto text-left flex gap-3 text-xs leading-relaxed text-slate-700">
                <FileText className="h-8 w-8 text-amber-500 shrink-0" />
                <p>
                  <strong>What's next?</strong> Run the setup installer file, permit system accessibility logs, and click "Renew Secure Vault syncing" to pull active client preferences.
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full rounded-lg border border-gray-350 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Return to Help Desk
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// --- SCAM AWARENESS EDUCATIONAL TRIVIA ---
export const ScamQuiz: React.FC<{ onClose: () => void; imagePath?: string }> = ({ onClose, imagePath }) => {
  const [stage, setStage] = useState<'intro' | 'question' | 'result'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);

  const QUESTIONS = [
    {
      q: "A website pops up with loud alarms claiming 'System Infected! Call 1-800-Norton to fix.'. What is your course of action?",
      options: [
        "Call the number immediately to grant them log-in access and disinfect the registry.",
        "Close the browser tab immediately. Genuine antivirus packages never alert you via noisy popups or unrequested phone lines.",
        "Input your Norton master account password to unlock the site security blocker."
      ],
      correct: 1,
      reason: "Antivirus agencies never prompt you with critical errors on random websites or request immediate phone callback numbers. These are generic browser hijack scripts designed to steal credit details."
    },
    {
      q: "You receive an email claiming to be from 'Norton Security Billing' about an automatic $399 renewal charged to your card. It tells you to call a support line if this was in error. Is this real?",
      options: [
        "Yes, it's real. If I don't call, they will withdraw thousands of dollars from my account.",
        "No, it's a social engineering phish. Genuine billing emails never prompt you to call temporary phone lines to cancel renewals."
      ],
      correct: 1,
      reason: "Phishing emails use pre-printed scary totals (like $399 or $499) to strike panic, motivating you to call their mock boiler rooms to reveal banking details."
    }
  ];

  const handleAnswer = (idx: number) => {
    setSelectedAns(idx);
    if (idx === QUESTIONS[qIndex].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAns(null);
    if (qIndex + 1 < QUESTIONS.length) {
      setQIndex(qIndex + 1);
    } else {
      setStage('result');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl bg-white text-gray-800 shadow-2xl overflow-hidden font-sans border border-gray-105"
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#F6C300]" />
            <span className="font-semibold text-gray-800 text-sm">Norton Scam IQ Assessment</span>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {stage === 'intro' && (
            <div className="space-y-4">
              <div className="relative h-44 w-full rounded-xl overflow-hidden">
                <img 
                  src={imagePath || "https://picsum.photos/seed/cybersecurity/500/300"} 
                  alt="Scam Prevention"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-[#F6C300] text-slate-900 px-3 py-1 rounded-full">Scam awareness</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 leading-snug">Online scams: don't be a victim!</h3>
              <p className="text-xs text-gray-655 leading-relaxed">
                Cybercrime and phishing methods are evolving dramatically. Scammers call you on spoofed numbers, send receipt panic mails, and show mock web popup infections. 
              </p>
              <p className="text-xs text-gray-650">
                Take our 2-question diagnostic checklist to test your resilience against sophisticated social engineering frauds.
              </p>

              <button 
                onClick={() => setStage('question')}
                className="w-full rounded-lg bg-[#F6C300] hover:bg-yellow-400 py-2.5 text-sm font-bold text-gray-950 transition-all cursor-pointer"
              >
                Begin Scam Diagnostics
              </button>
            </div>
          )}

          {stage === 'question' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">Question {qIndex + 1} of {QUESTIONS.length}</span>
                <span className="text-xs text-gray-500 font-mono">Score: {score}/{QUESTIONS.length}</span>
              </div>

              <h4 className="text-sm font-semibold text-gray-900 leading-relaxed">
                {QUESTIONS[qIndex].q}
              </h4>

              <div className="space-y-2.5">
                {QUESTIONS[qIndex].options.map((opt, idx) => {
                  let btnStyle = "border-gray-200 text-gray-700 hover:bg-gray-50/50";
                  if (selectedAns !== null) {
                    if (idx === QUESTIONS[qIndex].correct) {
                      btnStyle = "bg-green-50 border-green-400 text-green-900 font-medium";
                    } else if (idx === selectedAns) {
                      btnStyle = "bg-red-50 border-red-400 text-red-900";
                    } else {
                      btnStyle = "opacity-50 border-gray-100 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAns !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-3.5 text-xs rounded-xl border-2 transition-all flex gap-3 items-start ${btnStyle}`}
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[10px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {selectedAns !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 text-xs space-y-1.5 text-gray-700"
                >
                  <p className="flex items-center gap-1.5 font-bold text-amber-850">
                    <HelpCircle className="h-4 w-4 text-amber-500" />
                    <span>Scam Intelligence Insight</span>
                  </p>
                  <p className="leading-relaxed">{QUESTIONS[qIndex].reason}</p>

                  <button 
                    onClick={nextQuestion}
                    className="mt-3 w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    {qIndex + 1 < QUESTIONS.length ? "Next Question" : "View Results"}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {stage === 'result' && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500 border border-amber-200">
                <BadgeCheck className="h-8 w-8 text-[#E0B000]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Diagnostics Concluded</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  You scored <span className="font-bold text-gray-900 font-mono text-sm">{score} out of {QUESTIONS.length}</span>. {score === QUESTIONS.length ? "You are fully equipped to reject social-engineering frauds!" : "Review our safety rules to stay protected."}
                </p>
              </div>

              <div className="rounded-xl border border-gray-150 p-4 bg-gray-50 text-left space-y-2 text-xs">
                <p className="font-bold text-gray-800">Norton Scam Prevention Checklist:</p>
                <div className="space-y-1.5 text-gray-650">
                  <div className="flex gap-2 items-start">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Verify your invoice totals strictly in your personal bank statement, never via suspicious email receipts.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Do not allow anonymous caller agents to link or download screen sharing suites (e.g. AnyDesk, TeamViewer) to your computer.</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 text-sm transition-all"
              >
                Close Diagnostic Console
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
