import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Smartphone, RefreshCw, User, CircleUser, Shield, ShieldAlert, KeyRound, 
  CloudUpload, Lock, Users, Laptop, ShieldCheck, FileCheck,
  X, Check, AlertTriangle, ArrowRight, MessageSquare, Send,
  Globe, Instagram, Facebook, Youtube, ChevronDown, ChevronRight, HelpCircle, Menu
} from 'lucide-react';
import { SUPPORT_ARTICLES, PRIMARY_HELP_CARDS, GENERAL_PRODUCT_CARDS, FOOTER_LINKS_DATA } from './data/supportData';
import { SupportArticle, ProductCardData } from './types';
import { ArticleViewer, ThreatScanner, ActivationWizard, ScamQuiz } from './components/InteractiveOverlays';
import nortonLogo from './assets/images/norton_logo.png';
import userOnPhone from './assets/images/user_on_phone_1781864001658.png';
import scamPrevention from './assets/images/scam_prevention_1781864017898.png';


export default function App() {
  // Search & Navigation States
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Modal & Interactive states
  const [selectedArticle, setSelectedArticle] = useState<SupportArticle | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'scanner' | 'activation' | 'scam-quiz'>('none');
  const [prefilledActivation, setPrefilledActivation] = useState(false);

  // Client Simulation states
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'support' | 'products' | 'blog' | 'trial'>('support');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Hi! I am your Norton Virtual Assistant. How can I help secure your device today?', time: 'Just now' }
  ]);
  const [userChatMsg, setUserChatMsg] = useState('');

  // Auto-scrolled chat container
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showLiveChat]);

  // Filter support articles based on typing query
  const filteredArticles = SUPPORT_ARTICLES.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearchResultClick = (art: SupportArticle) => {
    setSelectedArticle(art);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  const handlePrimaryCardClick = (type: string) => {
    if (type === 'download' || type === 'renew') {
      setActiveOverlay('activation');
    } else if (type === 'account') {
      triggerToast('Account Help simulation active. You can manage license keys dynamically below.');
    }
  };

  const handleProductCardClick = (type: string) => {
    if (type === 'threat') {
      setActiveOverlay('scanner');
    } else if (type === 'vpn') {
      triggerToast('Norton VPN Standard: High-security Tunnel simulation initialized.');
    } else if (type === 'password') {
      // Find the Password Manager article and open it
      const pmArt = SUPPORT_ARTICLES.find(a => a.id === 'art-7');
      if (pmArt) setSelectedArticle(pmArt);
    } else {
      triggerToast(`Redirecting to help files for ${type === 'device' ? 'Device security' : type === 'backup' ? 'Cloud backup' : type === 'family' ? 'Parental filters' : 'Small Business shields'}...`);
    }
  };

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Chat message submit
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatMsg.trim()) return;

    const userText = userChatMsg;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setUserChatMsg('');

    // Simulated responses
    setTimeout(() => {
      let agentReply = "I understand you have queries about your protection. Let's look up corresponding solutions in our support vault.";
      const lowTxt = userText.toLowerCase();

      if (lowTxt.includes('virus') || lowTxt.includes('malware') || lowTxt.includes('scan') || lowTxt.includes('infect')) {
        agentReply = "Would you like to run a diagnostics scan right now? Select the 'Threat Removal' hub or try typing 'run scan' on your console! I can also check device integrity instantly.";
      } else if (lowTxt.includes('download') || lowTxt.includes('install') || lowTxt.includes('key')) {
        agentReply = "To register or download your product, navigate back to our 'Download & Install' desk, enter your premium 25-digit activation key, and register the package.";
      } else if (lowTxt.includes('vpn') || lowTxt.includes('ip') || lowTxt.includes('anonymous')) {
        agentReply = "Norton Secure VPN secures all outstanding tracking connections. Make sure to choose Nearest Location in settings or toggle Split Tunneling if web apps raise alerts.";
      } else if (lowTxt.includes('renew') || lowTxt.includes('price') || lowTxt.includes('pay')) {
        agentReply = "Subscriptions can be easily renewed via our 'Buy & Renew' assistance card. You can toggle Automatic Renewal on or off directly inside your profile settings.";
      }

      setChatMessages(prev => [...prev, { sender: 'agent', text: agentReply, time: 'Just now' }]);
    }, 1000);
  };

  // Helper mapping string to Lucide-React Component
  const renderIcon = (name: string, className = "h-8 w-8 text-gray-800", filled = false) => {
    const props: Record<string, any> = { className };
    if (filled) {
      props.fill = 'currentColor';
      props.strokeWidth = 1;
    }
    switch (name) {
      case 'Smartphone': return <Smartphone {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'RefreshCw': return <RefreshCw {...props} />;
      case 'CircleUser': return <CircleUser {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'KeyRound': return <KeyRound {...props} />;
      case 'CloudUpload': return <CloudUpload {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-amber-150 selection:text-amber-900">
      
      {/* --- TOAST --- */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xl border border-slate-800"
          >
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-150 shadow-xs">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          
          {/* Mobile Menu Icon (left) */}
          <button 
            className="md:hidden p-1 -ml-1 text-gray-700 hover:text-gray-950 transition-colors cursor-pointer"
            onClick={() => triggerToast('Mobile Navigation Menu opened')}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-10 flex-1 md:flex-initial justify-center md:justify-start">
            <div className="flex items-center select-none cursor-pointer relative w-[120px] sm:w-[160px] h-14" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src={nortonLogo} 
                alt="Norton" 
                className="h-16 sm:h-20 w-auto object-contain absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 max-w-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
              <button 
                onClick={() => setActiveTab('products')}
                className={`py-1.5 transition-colors cursor-pointer hover:text-gray-950 ${activeTab === 'products' ? 'text-gray-950 border-b-2 border-[#FC0]' : 'text-gray-600'}`}
              >
                Products & Services
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`py-1.5 transition-colors cursor-pointer hover:text-gray-950 ${activeTab === 'blog' ? 'text-gray-950 border-b-2 border-[#FC0]' : 'text-gray-600'}`}
              >
                Blog
              </button>
              <button 
                onClick={() => setActiveTab('support')}
                className={`py-1.5 transition-colors cursor-pointer hover:text-gray-950 ${activeTab === 'support' ? 'text-gray-950 border-b-2 border-[#FC0]' : 'text-gray-650'}`}
              >
                Support
              </button>
              <button 
                onClick={() => setActiveTab('trial')}
                className={`py-1.5 transition-colors cursor-pointer hover:text-gray-950 ${activeTab === 'trial' ? 'text-gray-950 border-b-2 border-[#FC0]' : 'text-gray-600'}`}
              >
                Free Trial
              </button>
            </nav>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => triggerToast('Direct profile Sign-In module simulator activated.')}
              className="flex items-center gap-1.5 text-[14px] font-medium text-gray-700 hover:text-gray-950 transition-all cursor-pointer"
            >
              <CircleUser className="h-5 w-5 text-gray-800" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>

        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-[#424242] text-white pt-14 pb-32 md:pb-36 lg:pb-40 relative overflow-visible">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            What can we help you with?
          </h1>

          {/* Search bar console */}
          <div className="mx-auto mt-8 max-w-2xl relative">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                placeholder="Type your questions or issue here"
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(e.target.value.trim().length > 0);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowSearchDropdown(true);
                }}
                className="w-full text-sm text-gray-900 placeholder-gray-400 bg-white rounded-full py-3.5 pl-13 pr-6 outline-hidden shadow-lg border border-transparent focus:border-[#FC0] focus:ring-2 focus:ring-amber-300 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchDropdown(false);
                  }}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Smart Search results Dropdown */}
            <AnimatePresence>
              {showSearchDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 z-30 max-h-80 overflow-y-auto rounded-2xl bg-white text-gray-800 shadow-2xl border border-gray-150 text-left"
                >
                  <div className="p-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center px-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">SUPPORT DOCUMENTS FOUND ({filteredArticles.length})</span>
                    <button onClick={() => setShowSearchDropdown(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {filteredArticles.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredArticles.map(art => (
                        <button
                          key={art.id}
                          onClick={() => handleSearchResultClick(art)}
                          className="w-full px-5 py-3.5 text-left text-xs font-semibold text-gray-900 hover:bg-amber-50/40 transition-colors flex justify-between items-center gap-3"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-bold text-amber-600 block">{art.category}</span>
                            <span>{art.title}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      <p className="text-sm">No exact documentation match found.</p>
                      <button 
                        onClick={() => {
                          setShowLiveChat(true);
                          setShowSearchDropdown(false);
                        }}
                        className="mt-3 inline-flex items-center gap-1 text-xs text-amber-600 font-bold hover:underline"
                      >
                        Ask Norton Specialist Assistant instead
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* --- FLOATING PROMO BANNER --- */}
        <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-[92%] max-w-5xl px-4 z-20">
          <div className="rounded-3xl bg-[#F5F2EB] border border-[#E6E1D5] p-5 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Promo Left (Visual + Copy) */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full">
              {/* Product holding visual - Hidden on mobile/tablet */}
              <div className="hidden md:block h-24 w-36 sm:h-28 sm:w-44 shrink-0 rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
                <img 
                  src={userOnPhone} 
                  alt="Norton Online Check-up Tool" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-amber-600">Norton Authenticator</h3>
                <p className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900">Connect your account to upgrade your securities.</p>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl">
                  Scan your device for malware, privacy risks, and speed issues in less than 2 minutes. No credit card required.
                </p>
              </div>
            </div>

            {/* Promo Right Button */}
            <a
              href="https://down.aweray.com/awesun/windows/Aweray_Remote_2.0.0.45399_x64.exe"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                triggerToast('Downloading Norton Security Inspector utility...');
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#FFE600] border-2 border-black hover:bg-[#E6CE00] text-xs md:text-sm font-extrabold text-slate-950 px-8 md:px-10 py-2.5 md:py-3.5 transition-all duration-100 active:scale-95 shadow-md shrink-0 cursor-pointer hover:scale-[1.02]"
            >
              Download
            </a>

          </div>
        </div>

      </section>

      <div className="h-20 md:h-16 bg-white" />

      {/* --- SECTION 1: WHAT CAN WE HELP YOU WITH? CARDS --- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            What can we help you with?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {PRIMARY_HELP_CARDS.map(card => (
              <motion.div 
                key={card.id}
                whileHover={{ y: -4, shadow: '0 12px 20px -8px rgba(0,0,0,0.06)' }}
                onClick={() => handlePrimaryCardClick(card.actionType)}
                className="rounded-2xl border border-gray-150 bg-white p-4 sm:p-8 shadow-xs flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center cursor-pointer gap-4 hover:border-amber-400/80 transition-all group min-h-[80px] md:min-h-[160px]"
              >
                {renderIcon(card.iconName, "h-8 w-8 md:h-10 md:w-10 text-gray-800 group-hover:text-amber-600 transition-colors shrink-0", true)}
                <h3 className="text-sm md:text-[13px] font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{card.title}</h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 2: HELP WITH NORTON PRODUCTS --- */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Help with Norton Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {GENERAL_PRODUCT_CARDS.map(card => (
              <motion.div 
                key={card.id}
                whileHover={{ y: -3, shadow: '0 8px 16px -6px rgba(0,0,0,0.06)' }}
                onClick={() => handleProductCardClick(card.actionType)}
                className="rounded-xl border border-gray-150 bg-white p-4 sm:p-8 shadow-xs flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center cursor-pointer gap-4 hover:border-amber-300 transition-all group min-h-[70px]"
              >
                {renderIcon(card.iconName, "h-7 w-7 md:h-10 md:w-10 text-gray-800 group-hover:text-amber-600 transition-colors shrink-0", true)}
                <h3 className="text-sm md:text-[13px] font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{card.title}</h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SCAN EDUCATION SECTION ("Did you know?") --- */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#F7F5F0] p-6 sm:p-10 flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12">
            
            {/* Left Content */}
            <div className="space-y-4 max-w-xl">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Did you know?
              </h2>
              <p className="text-sm font-bold text-gray-850">
                Online scams: don't be a victim.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Learn more about some of the most common scams and crimes our customers encounter as well as useful tips to help prevent you from being victimized.
              </p>

              <div className="pt-3">
                <button 
                  onClick={() => setActiveOverlay('scam-quiz')}
                  className="rounded-full bg-[#FFE600] border border-black hover:bg-[#E6CE00] text-sm font-extrabold text-slate-950 px-8 py-3 transition-all duration-100 active:scale-95 shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  Read more
                </button>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="w-full lg:max-w-md shrink-0">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-md bg-white border border-gray-150">
                <img 
                  src={scamPrevention} 
                  alt="Scam Prevention Advice" 
                  className="h-full w-full object-cover hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: NEED MORE HELP? --- */}
      <section className="bg-[#494949] text-white py-14">
        <div className="mx-auto max-w-5xl px-4 text-center space-y-8">
          
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Need more help?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            <button 
              onClick={() => setActiveOverlay('activation')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Download
            </button>
            <button 
              onClick={() => triggerToast('Direct Profile billing simulation initialized.')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Manage my account
            </button>
            <button 
              onClick={() => setActiveOverlay('activation')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Buy & Renew
            </button>

            <button 
              onClick={() => setShowLiveChat(true)}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Contact us
            </button>
            <button 
              onClick={() => triggerToast('Redirecting to the Norton Community Forums Hub...')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Community
            </button>
            <button 
              onClick={() => setActiveOverlay('scam-quiz')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Support scams
            </button>

            <button 
              onClick={() => setActiveOverlay('scanner')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Norton rescue tools
            </button>
            <button 
              onClick={() => setActiveOverlay('scanner')}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Think you have virus?
            </button>
            <button 
              onClick={() => {
                const art1 = SUPPORT_ARTICLES.find(a => a.id === 'art-1');
                if (art1) setSelectedArticle(art1);
              }}
              className="rounded-full bg-white text-gray-900 font-bold px-5 py-3 text-sm border border-gray-900 hover:border-[#FC0] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Problem Launching on Windows
            </button>

          </div>

        </div>
      </section>

      {/* --- LEGAL COPYRIGHTS WARNING REMINDER --- */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <p className="text-[10px] text-gray-500 leading-normal">
            Copyright © 2026 Gen Digital Inc. All rights reserved. All trademarks, service marks, and tradenames (collectively, the "Marks") are trademarks or registered trademarks of Gen Digital Inc. or its affiliates ("Gen") or other respective owners that have granted Gen the right to use such Marks. For a list of Gen Marks, please see GenDigital.com/trademarks.
          </p>
        </div>
      </section>

      {/* --- FOOTER: SITE DIRECTORY --- */}
      <footer className="bg-[#FAF9F6] pt-12 pb-6 text-gray-700 text-xs">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
            
            {/* Col 1 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS_DATA.products.map((item, id) => (
                  <li key={id}>
                    <button onClick={() => triggerToast(`Navigating to ${item} page.`)} className="text-blue-600 hover:text-blue-800 transition-colors text-left cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Product Features</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS_DATA.features.map((item, id) => (
                  <li key={id}>
                    <button onClick={() => triggerToast(`Explaining ${item} functionality`)} className="text-blue-600 hover:text-blue-800 transition-colors text-left cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Services & Support</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS_DATA.services.map((item, id) => (
                  <li key={id}>
                    <button onClick={() => triggerToast(`Service query: ${item}`)} className="text-blue-600 hover:text-blue-800 transition-colors text-left cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">About</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS_DATA.about.map((item, id) => (
                  <li key={id}>
                    <button onClick={() => triggerToast(`Corporate redirect: ${item}`)} className="text-blue-600 hover:text-blue-800 transition-colors text-left cursor-pointer">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Socials & Language Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-b border-gray-200">
            
            {/* Social icons */}
            <div className="flex items-center gap-4 text-gray-500">
              <button onClick={() => triggerToast('Connecting to X profile.')} className="hover:text-amber-600 transition-colors cursor-pointer"><span className="font-bold text-lg">𝕏</span></button>
              <button onClick={() => triggerToast('Connecting to Instagram profile.')} className="hover:text-amber-600 transition-colors cursor-pointer"><Instagram className="h-5 w-5" /></button>
              <button onClick={() => triggerToast('Connecting to Facebook profile.')} className="hover:text-amber-600 transition-colors cursor-pointer"><Facebook className="h-5 w-5" /></button>
              <button onClick={() => triggerToast('Connecting to Youtube Channel.')} className="hover:text-amber-600 transition-colors cursor-pointer"><Youtube className="h-5 w-5" /></button>
            </div>

            {/* Locale code */}
            <div className="flex items-center gap-1.5 text-gray-650 font-medium">
              <Globe className="h-4 w-4" />
              <span>United States</span>
            </div>

          </div>

          {/* Copyrights and legal policies */}
          <div className="pt-6 text-[10.5px] text-gray-500 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button onClick={() => triggerToast('Legal notices')} className="hover:underline cursor-pointer">Legal</button>
              <span>|</span>
              <button onClick={() => triggerToast('License agreements')} className="hover:underline cursor-pointer">License Agreements</button>
              <span>|</span>
              <button onClick={() => triggerToast('Privacy policy details')} className="hover:underline cursor-pointer">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => triggerToast('Support policies')} className="hover:underline cursor-pointer">Support Policy</button>
              <span>|</span>
              <button onClick={() => triggerToast('Careers page')} className="hover:underline cursor-pointer">Careers</button>
              <span>|</span>
              <button onClick={() => triggerToast('Cookie consent panels')} className="hover:underline cursor-pointer">Cookies</button>
              <span>|</span>
              <button onClick={() => triggerToast('Full systems telemetry online')} className="hover:underline cursor-pointer">System Status</button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-sm select-none">Gen</span>
              <span>© 2026 Gen Digital Inc. All rights reserved.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* --- FLOATING reCAPTCHA BADGE --- */}
      <div className="fixed bottom-4 right-4 z-40">
        <div 
          className="flex items-center gap-1.5 bg-white rounded shadow-md border border-gray-200 px-2 py-1.5 cursor-pointer hover:shadow-lg transition-shadow"
          title="Protected by reCAPTCHA"
        >
          <svg viewBox="0 0 48 48" className="h-7 w-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L4 24l20 20 20-20L24 4z" fill="none"/>
            <path d="M24 10.5v7.8l6.3-4.5-2.1-3.3H24z" fill="#1C3AA9"/>
            <path d="M24 10.5l-4.2 0-2.1 3.3 6.3 4.5v-7.8z" fill="#4285F4"/>
            <path d="M13.7 17.1L9.5 24l4.2 6.9 6.3-4.5V18.6l-6.3-1.5z" fill="#3F51B5"/>
            <path d="M24 25.5l-6.3 4.5 2.1 3.3H24v-7.8z" fill="#1C3AA9"/>
            <path d="M24 25.5v7.8h4.2l2.1-3.3-6.3-4.5z" fill="#4285F4"/>
            <path d="M30.3 29.9l6.3-4.5V18.6l-6.3 4.5v6.8z" fill="#1A237E"/>
            <path d="M36.6 18.6l-6.3-4.5v6.8l6.3 4.5V18.6z" fill="#3F51B5"/>
            <path d="M30.3 14.1l-6.3 4.5 6.3 4.5 6.3-4.5-6.3-4.5z" fill="#8187FF"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-[9px] text-gray-500">protected by</span>
            <span className="text-[10px] font-bold text-gray-500">reCAPTCHA</span>
          </div>
        </div>
      </div>

      {/* --- OVERLAYS MOUNTING DRAWERS --- */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleViewer article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}

        {activeOverlay === 'scanner' && (
          <ThreatScanner onClose={() => setActiveOverlay('none')} />
        )}

        {activeOverlay === 'activation' && (
          <ActivationWizard onClose={() => setActiveOverlay('none')} />
        )}

        {activeOverlay === 'scam-quiz' && (
          <ScamQuiz imagePath={scamPrevention} onClose={() => setActiveOverlay('none')} />
        )}
      </AnimatePresence>

    </div>
  );
}
