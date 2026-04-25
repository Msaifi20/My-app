import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  TrendingUp, 
  Dumbbell, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronLeft,
  Gamepad2,
  Menu,
  X,
  Code2,
  Binary,
  Smartphone,
  Layers,
  Monitor,
  Briefcase,
  Palette,
  Hotel,
  Activity,
  Zap,
  Calculator,
  Languages,
  BookOpenCheck,
  User,
  Send,
  Phone,
  Globe,
  Shield,
  Download,
  Bitcoin,
  Trophy,
  BookOpen,
  Wind,
  Compass,
  Volume2,
  Sun,
  Moon,
  FileText,
  Target,
  Cpu,
  Instagram,
  MapPin,
  Rocket,
  Sparkles
} from "lucide-react";
import { useState, useEffect, useRef, createContext, useContext, useCallback, useMemo } from "react";
import { translations, Language } from "./translations";

// --- Utilities ---
const playClickSound = () => {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
  audio.volume = 0.2;
  audio.play().catch(() => {}); // Catch browser blocking
};

const tapEffect = {
  scale: 0.98,
  boxShadow: "0 0 20px rgba(59,130,246,0.3)",
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

// --- Context ---
type Theme = 'light' | 'dark';

const GlobalContext = createContext<{ 
  lang: Language; 
  setLang: (l: Language) => void; 
  t: typeof translations.en;
  isAboutOpen: boolean;
  setIsAboutOpen: (val: boolean) => void;
  activeDossier: string | null;
  setActiveDossier: (val: string | null) => void;
  theme: Theme;
  toggleTheme: () => void;
}>({ 
  lang: 'en', 
  setLang: () => {}, 
  t: translations.en,
  isAboutOpen: false,
  setIsAboutOpen: () => {},
  activeDossier: null,
  setActiveDossier: () => {},
  theme: 'dark',
  toggleTheme: () => {}
});

const useGlobal = () => useContext(GlobalContext);
const useLanguage = useGlobal; // Backward compatibility

// --- Components ---

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));
        setTypingSpeed(30);
        
        if (displayText === text) {
          setIsDeleting(true);
          setTypingSpeed(5000); // Pause at the end
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));
        setTypingSpeed(10); // Fast delete
        
        if (displayText === "") {
          setIsDeleting(false);
          setTypingSpeed(1000); // Pause before restart
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, typingSpeed]);

  return <span>{displayText}</span>;
};

const MultiWordTypewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentWord = words[index];
      
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          setTypingSpeed(2000); // Wait before start deleting
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500); // Pause before restart
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, words, typingSpeed]);

  return (
    <span className="text-blue-500">
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-1.5 h-8 md:h-16 bg-blue-500 ml-2 align-middle"
      />
    </span>
  );
};

const HeartLine = () => (
  <div className="flex items-center justify-center">
    <motion.svg
      width="120"
      height="40"
      viewBox="0 0 100 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
    >
      <motion.path
        d="M0 15H20L25 5L35 25L40 15H60L65 5L75 25L80 15H100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.path
        d="M0 15H20L25 5L35 25L40 15H60L65 5L75 25L80 15H100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.1 }}
      />
    </motion.svg>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t, setIsAboutOpen, setActiveDossier, theme, toggleTheme } = useGlobal();

  const menuItems = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.about, href: "#about", isModal: true },
    { name: t.nav.skills, href: "#skills", dossierId: 'programming' },
    { name: t.nav.software, href: "#computer-skills", dossierId: 'digital' },
    { name: t.nav.accounting, href: "#accounting", dossierId: 'accounting' },
    { name: t.nav.hobby, href: "#hobby", dossierId: 'hobby' },
    { name: t.snake.title, href: "#game" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3 md:px-6 md:py-6 backdrop-blur-md border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-black/10 border-white/5' : 'bg-white/10 border-black/5'}`}>
        <motion.div 
          whileTap={tapEffect}
          onTap={playClickSound}
          className={`text-lg md:text-xl font-bold tracking-tighter cursor-pointer transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
        >
          MEHRAN<span className="text-blue-500/50">.Web</span>
        </motion.div>
        
        {/* Center - Heart Line Animation */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center scale-75 md:scale-100">
          <HeartLine />
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden md:flex items-center space-x-5">
            <motion.div whileTap={tapEffect} onTap={playClickSound}><Github className={`w-4 h-4 cursor-pointer transition-colors ${theme === 'dark' ? 'text-white/30 hover:text-white' : 'text-[#0f172a]/30 hover:text-[#0f172a]'}`} /></motion.div>
            <motion.div whileTap={tapEffect} onTap={playClickSound}><Linkedin className={`w-4 h-4 cursor-pointer transition-colors ${theme === 'dark' ? 'text-white/30 hover:text-white' : 'text-[#0f172a]/30 hover:text-[#0f172a]'}`} /></motion.div>
          </div>

          {/* Language Switcher */}
          <div className={`flex items-center rounded-full border p-0.5 transition-colors ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`}>
             <button 
               onClick={() => { setLang('tr'); playClickSound(); }}
               className={`px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-bold transition-all ${lang === 'tr' ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : `hover:text-current ${theme === 'dark' ? 'text-white/30' : 'text-[#0f172a]/30'}`}`}
             >
               TR
             </button>
             <button 
               onClick={() => { setLang('en'); playClickSound(); }}
               className={`px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-bold transition-all ${lang === 'en' ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : `hover:text-current ${theme === 'dark' ? 'text-white/30' : 'text-[#0f172a]/30'}`}`}
             >
               EN
             </button>
          </div>

          {/* Hamburger Menu Container */}
          <div className="relative">
            <motion.button 
              whileTap={tapEffect}
              onClick={() => { setIsMenuOpen(!isMenuOpen); playClickSound(); }}
              className={`p-1.5 md:p-2 hover:bg-white/5 rounded-full transition-colors z-50 ${theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-[#0f172a]/60 hover:text-[#0f172a]'}`}
            >
              {isMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </motion.button>

            {/* Dropdown Box */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={isMenuOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute right-0 mt-4 w-56 border p-2 shadow-2xl origin-top-right transition-colors ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}
            >
              <div className="flex flex-col">
                <div className={`px-4 py-2 border-b mb-2 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-blue-500 font-bold">{t.nav.navigator}</span>
                </div>
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={(item.isModal || item.dossierId) ? undefined : item.href}
                    style={{ cursor: 'pointer' }}
                    whileTap={tapEffect}
                    onClick={() => { 
                      setIsMenuOpen(false); 
                      playClickSound();
                      if (item.isModal) {
                        setIsAboutOpen(true);
                      } else if (item.dossierId) {
                        setActiveDossier(item.dossierId);
                      }
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                  >
                    <span className={`text-[10px] font-mono group-hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>0{idx + 1}</span>
                    <span className={`text-xs font-semibold transition-colors ${theme === 'dark' ? 'text-white/60 group-hover:text-white' : 'text-[#0f172a]/60 group-hover:text-[#0f172a]'}`}>{item.name}</span>
                  </motion.a>
                ))}

                <div className={`mt-2 pt-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                   <motion.button
                     whileTap={tapEffect}
                     onClick={() => { toggleTheme(); playClickSound(); setIsMenuOpen(false); }}
                     className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                   >
                     <span className={`text-xs font-semibold transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-[#0f172a]/60'}`}>
                        {theme === 'dark' ? 'Lite Mode' : 'Dark Mode'}
                     </span>
                     {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 font-bold" /> : <Moon className="w-4 h-4 text-blue-500 font-bold" />}
                   </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>
    </>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => {
  const { theme } = useGlobal();
  return (
    <div className="mb-14">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-blue-500 font-bold">{subtitle}</span>
      </div>
      <h2 className={`text-5xl md:text-6xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{title}</h2>
    </div>
  );
};

const GalaxyBackground = () => {
  const stars = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2
  })), []);

  return (
    <div className="absolute inset-[-100px] pointer-events-none overflow-hidden rounded-full">
      {/* Moving Stars */}
      {stars.map((star) => (
        <motion.div
           key={star.id}
           animate={{ opacity: [0.2, 1, 0.2] }}
           transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bg-blue-400 rounded-full blur-[0.5px]"
           style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
        />
      ))}

      {/* Orbiting Planet 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[10%] border-2 border-blue-500/10 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm" />
        </div>
      </motion.div>

      {/* Orbiting Planet 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-15%] border border-blue-500/5 rounded-full"
      >
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gradient-to-br from-purple-600 to-pink-900 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]">
           <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm" />
        </div>
      </motion.div>

      {/* Travelling Spaceship 1 */}
      <motion.div
        animate={{ 
           x: [-100, 600],
           y: [-100, 600],
           rotate: 135
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute top-0 left-0 text-blue-500/40"
      >
        <Rocket className="w-5 h-5" />
      </motion.div>

      {/* Travelling Spaceship 2 */}
      <motion.div
        animate={{ 
           x: [600, -100],
           y: [200, 0],
           rotate: -45
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 8 }}
        className="absolute bottom-1/4 right-0 text-blue-400/30"
      >
        <Rocket className="w-4 h-4" />
      </motion.div>

      {/* Central Nebula Glow */}
      <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[100px]" />
    </div>
  );
};

const Hero = () => {
  const { lang, t, theme } = useGlobal();
  return (
    <section id="hero" className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-12 md:px-8 md:pt-0 md:pb-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/10'}`}>
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[140px] -z-10 ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-400/10'}`} />
        <div className={`absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full blur-[70px] md:blur-[120px] -z-10 ${theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/10'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-5xl w-full"
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-10 group">
           {/* Cinematic Galaxy Background behind photo */}
           <GalaxyBackground />

           {/* Pulsing Neon Glow Behind */}
           <motion.div 
             animate={{ 
               scale: [1, 1.1, 1],
               opacity: [0.2, 0.5, 0.2]
             }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-blue-500/30 rounded-full blur-[40px] -z-10"
           />
           
           {/* Back Neon Ring */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute -inset-4 rounded-full border border-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
           />

           {/* The Image Container */}
           <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl z-10">
              <img 
                src="https://lh3.googleusercontent.com/d/17z7xLAYfQTMCo2rTOZXAeOgto_GKGPPt" 
                alt="Mehran Saifi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent mix-blend-overlay" />
           </div>

           {/* Overlapping Neon Arc/Circle */}
           <motion.div 
             animate={{ 
               rotate: [0, 360],
               boxShadow: [
                 "0 0 15px rgba(59, 130, 246, 0.5)",
                 "0 0 30px rgba(59, 130, 246, 0.8)",
                 "0 0 15px rgba(59, 130, 246, 0.5)"
               ]
             }}
             transition={{ 
               rotate: { duration: 8, repeat: Infinity, ease: "linear" },
               boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
             }}
             className="absolute -inset-1 rounded-full border-2 border-blue-500 z-20 pointer-events-none"
             style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
           />
           
           <div className="absolute -inset-1 rounded-full border border-blue-400/30 z-20 pointer-events-none" />
        </div>

        <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-8 block font-semibold transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
          {t.hero.portfolio}
        </span>
        <h1 className={`text-5xl md:text-8xl lg:text-[120px] font-bold tracking-tighter mb-6 md:mb-10 leading-[1] md:leading-[0.9] flex flex-col md:flex-row items-center justify-center md:items-start gap-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
          <div className="flex items-center gap-4">
            MEHRAN <br className="md:hidden" /> <span className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>SAIFI</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playClickSound();
              const utterance = new SpeechSynthesisUtterance(t.hero.welcome_speech);
              const voices = window.speechSynthesis.getVoices();
              
              // Try to find a high-quality male voice
              const targetLang = lang === 'en' ? 'en' : 'tr';
              const bestVoice = voices.find(v => 
                v.lang.startsWith(targetLang) && 
                (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('male'))
              ) || voices.find(v => v.lang.startsWith(targetLang));

              if (bestVoice) utterance.voice = bestVoice;
              
              utterance.lang = lang === 'en' ? 'en-US' : 'tr-TR';
              utterance.rate = 0.85; // Slower is often more natural
              utterance.pitch = 0.9; // Slightly deeper for a male character
              utterance.volume = 1;
              
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utterance);
            }}
            className={`p-3 md:p-4 border rounded-full transition-all group relative overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
            title="Listen"
          >
            <Volume2 className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${theme === 'dark' ? 'text-white/40 group-hover:text-blue-500' : 'text-black/40 group-hover:text-blue-500'}`} />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-500/10 rounded-full pointer-events-none"
            />
          </motion.button>
        </h1>

        <motion.div 
          id="about"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-10 md:mb-16 px-2 md:px-4 w-full"
        >
          <div className={`glass-panel p-5 md:p-8 relative group overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] border-l-2 border-l-blue-500 transition-colors ${theme === 'dark' ? 'bg-black/40' : 'bg-white/40'}`}>
            <div className={`flex items-center space-x-2 mb-4 md:mb-6 border-b pb-4 transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
              <Terminal className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{t.hero.bio_title}</span>
              <div className="flex-grow" />
              <div className="flex space-x-1">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500/20" />
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500/40" />
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500/60 transition-pulse" />
              </div>
            </div>
            
            <div className="text-left font-mono text-[11px] sm:text-xs md:text-base">
              <p className={`leading-relaxed max-w-3xl min-h-[80px] md:min-h-[80px] transition-colors ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>
                <span key={lang}>
                  <Typewriter text={t.hero.bio_text} />
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 h-3 md:w-2 md:h-4 bg-blue-500 ml-1 align-middle"
                />
              </p>
            </div>
            
            <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-[0.03]">
              <Terminal className="w-16 md:w-32 h-16 md:h-32" />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-4 mb-16">
            <div className="flex items-center border-l border-blue-500/30 pl-4 md:pl-6 h-auto md:h-full min-h-[50px] md:min-h-[60px] w-full md:w-auto">
               <TypingMan />
               <div className="text-left">
                  <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mb-0.5 md:mb-1">{t.hero.status}</div>
                  <div className="text-xs md:text-sm font-medium text-white/80">{t.hero.status_text}</div>
               </div>
            </div>
            <div className="text-left border-l border-blue-500/30 pl-4 md:pl-6 flex items-center min-h-[50px] md:min-h-[60px] w-full md:w-auto">
              <AnalysisIcon />
              <div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 mb-0.5 md:mb-1">{t.hero.specialization}</div>
                <div className="text-xs md:text-sm font-medium text-white/80">{t.hero.specialization_text}</div>
              </div>
           </div>
        </div>

        {/* Integrated CV Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center space-y-4 px-4 pb-20 mt-4"
        >
          <motion.a 
            href="https://drive.google.com/file/d/1Vts0zCxsEtX3fTphKfJCBVQOb1-kLQ-f/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(59,130,246,0.6)" }}
            whileTap={tapEffect}
            onTap={playClickSound}
            className="px-8 md:px-12 py-3 md:py-4 bg-blue-500/10 border-2 border-blue-500 text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400 flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all group backdrop-blur-sm"
          >
            <span className="group-hover:tracking-[0.5em] transition-all duration-300">{t.nav.cv}</span>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse" />
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>

          <a 
            href="https://drive.google.com/u/0/uc?id=1Vts0zCxsEtX3fTphKfJCBVQOb1-kLQ-f&export=download"
            onClick={() => playClickSound()}
            className="text-[9px] uppercase font-bold tracking-widest text-white/20 hover:text-blue-500 transition-colors flex items-center space-x-2"
          >
            <span>Direct Download</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-2 md:bottom-4 flex flex-col items-center space-y-4 md:space-y-6 z-20"
      >
        <div 
          className="flex flex-col items-center space-y-2 md:space-y-3 cursor-pointer"
          onClick={() => {
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-blue-500/40 font-bold">{t.hero.initiate}</span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const ProgrammingSection = () => {
  const { t, theme, setActiveDossier } = useGlobal();
  const [selectedTech, setSelectedTech] = useState<any | null>(null);

  const techStack = [
    {
      title: "Python",
      desc: t.programming.python,
      detail: t.programming.python_detail,
      icon: Terminal,
      color: "text-blue-400",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "C++",
      desc: t.programming.cpp,
      detail: t.programming.cpp_detail,
      icon: Binary,
      color: "text-blue-500",
      shadow: "shadow-blue-600/20"
    },
    {
      title: "Flutter",
      desc: t.programming.flutter,
      detail: t.programming.flutter_detail,
      icon: Smartphone,
      color: "text-blue-300",
      shadow: "shadow-blue-400/20"
    },
    {
      title: "TypeScript",
      desc: t.programming.typescript,
      detail: t.programming.typescript_detail,
      icon: Layers,
      color: "text-blue-200",
      shadow: "shadow-blue-300/20"
    }
  ];

  return (
    <section id="skills" className="py-40 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t.programming.title} 
          subtitle={t.programming.subtitle} 
          icon={Code2} 
        />
        
        <div className={`glass-panel p-10 shadow-[0_0_50px_rgba(59,130,246,0.05)] border transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-20 gap-x-12">
            {techStack.map((lang, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={tapEffect}
                onClick={() => { setSelectedTech(lang); playClickSound(); }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <motion.div 
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: idx * 0.5,
                    ease: "easeInOut" 
                  }}
                  className={`w-20 h-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 shadow-xl ${lang.shadow} group-hover:border-blue-500/30 transition-colors`}
                >
                  <lang.icon className={`w-8 h-8 ${lang.color}`} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{lang.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed font-mono max-w-[180px]">
                  {lang.desc}
                </p>
                
                <div className="mt-4 w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 + (idx * 0.2) }}
                    className="h-full bg-blue-500/50"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => { setActiveDossier('programming'); playClickSound(); }}
               className={`px-8 py-4 border rounded-xl flex items-center space-x-3 transition-all ${theme === 'dark' ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20' : 'bg-blue-600/5 border-blue-500/20 text-blue-600 hover:bg-blue-600/10'}`}
             >
                <FileText className="w-4 h-4" />
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">{t.dossiers.view}</span>
             </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-xl w-full p-8 md:p-12 border-blue-500/30 bg-black/60 relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)]"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
              
              <div className="flex items-center space-x-6 mb-8 border-b border-white/5 pb-8">
                <div className={`p-5 rounded-2xl bg-black/40 border border-white/10 ${selectedTech.shadow}`}>
                  <selectedTech.icon className={`w-10 h-10 ${selectedTech.color}`} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white tracking-tighter uppercase italic">{selectedTech.title}</h3>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold">Forge Analysis</div>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="text-white/80 leading-relaxed font-light text-sm md:text-base border-l-2 border-blue-500/50 pl-6 py-2 bg-blue-500/[0.02]">
                  {selectedTech.detail}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Status</div>
                      <div className="text-xs text-blue-400 font-mono font-bold uppercase">Operational</div>
                   </div>
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Logic Level</div>
                      <div className="text-xs text-white/80 font-mono">L5 [Advanced]</div>
                   </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(59,130,246,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTech(null)}
                  className="w-full py-4 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] uppercase font-black tracking-[0.4em] rounded-xl mt-8 transition-colors hover:border-blue-500/60"
                >
                  {t.programming.close}
                </motion.button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                 <div className="absolute top-4 right-[-40px] w-[120px] h-px bg-blue-500/20 rotate-45" />
                 <div className="absolute top-8 right-[-40px] w-[120px] h-px bg-blue-500/20 rotate-45" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TypingMan = () => (
  <div className="flex items-center justify-center translate-y-1 mr-4">
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Monitor */}
      <Monitor className="w-5 h-5 text-blue-500/40" />
      
      {/* Man (leaning slightly over) */}
      <motion.div
        animate={{ 
          x: [-0.5, 0.5, -0.5],
          y: [0, -0.5, 0]
        }}
        transition={{ 
          duration: 0.2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -left-1 bottom-1"
      >
        <User className="w-4 h-4 text-blue-500/80" />
      </motion.div>

      {/* Screen action lines */}
      <div className="absolute top-2 right-1.5 space-y-0.5">
         {[1, 2].map(i => (
           <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: [0, 4, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }}
              className="h-[1px] bg-blue-300"
           />
         ))}
      </div>
    </div>
  </div>
);

const DossierOverlay = () => {
  const { activeDossier, setActiveDossier, t, theme } = useGlobal();
  if (!activeDossier) return null;

  const contentMap: any = {
    programming: {
      data: t.dossiers.programming,
      icon: Code2,
      color: "blue"
    },
    digital: {
      data: t.dossiers.digital,
      icon: Monitor,
      color: "blue"
    },
    accounting: {
      data: t.dossiers.accounting,
      icon: Calculator,
      color: "blue"
    },
    hobby: {
      data: t.dossiers.hobby,
      icon: Trophy,
      color: "blue"
    }
  };

  const current = contentMap[activeDossier];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
      onClick={() => setActiveDossier(null)}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`glass-panel max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden border relative flex flex-col transition-colors ${theme === 'dark' ? 'border-blue-500/30 bg-black/60 shadow-[0_0_150px_rgba(59,130,246,0.2)]' : 'border-blue-500/10 bg-white/60 shadow-[0_0_150px_rgba(59,130,246,0.1)]'}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[120px]"
           />
           <div className={`absolute bottom-0 left-0 w-full h-px transition-colors ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'}`} />
        </div>

        {/* Header */}
        <div className={`p-6 md:p-12 border-b flex items-center justify-between transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
           <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl border shadow-2xl transition-colors ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`}>
                 <current.icon className="w-6 h-6 md:w-10 md:h-10 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div>
                 <h2 className={`text-2xl md:text-5xl font-black italic uppercase tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                   {current.data.title}
                 </h2>
                 <p className="text-blue-500 text-[9px] md:text-xs font-black uppercase tracking-[0.4em] mt-1 md:mt-2">Classified Data // Output</p>
              </div>
           </div>
           
           <motion.button 
             whileHover={{ scale: 1.1, rotate: 90 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setActiveDossier(null)}
             className={`p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-black/5 text-black/40 hover:text-black'}`}
           >
              <X className="w-6 h-6" />
           </motion.button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-8 space-y-8 md:space-y-12">
                 <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                       <FileText className="w-4 h-4 text-blue-500" />
                       <span className={`text-[9px] md:text-[10px] uppercase font-black tracking-widest transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Abstract Summary</span>
                    </div>
                    <p className={`text-base md:text-xl font-light leading-relaxed italic transition-colors ${theme === 'dark' ? 'text-white/90' : 'text-[#0f172a]/90'}`}>
                      "{current.data.summary}"
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
                       <h4 className="text-blue-500 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">{current.data.tech_title}</h4>
                       <p className={`text-sm leading-relaxed transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{current.data.tech_text}</p>
                    </div>
                    <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
                       <h4 className="text-blue-500 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">{current.data.strat_title}</h4>
                       <p className={`text-sm leading-relaxed transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{current.data.strat_text}</p>
                    </div>
                 </div>

                 <div className={`p-6 md:p-12 rounded-2xl md:rounded-3xl border relative overflow-hidden transition-all ${theme === 'dark' ? 'bg-blue-600/[0.03] border-blue-500/20 shadow-[inset_0_0_50px_rgba(59,130,246,0.05)]' : 'bg-blue-600/[0.01] border-blue-500/10'}`}>
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Cpu className="w-20 md:w-32 h-20 md:h-32" />
                    </div>
                    <div className="relative z-10">
                       <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center">
                          <Target className="w-4 h-4 mr-3" />
                          {current.data.philo_title}
                       </h4>
                       <p className={`text-base md:text-2xl font-bold italic tracking-tight leading-snug transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                          "{current.data.philo_text}"
                       </p>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                 <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-black/40 border-white/5 shadow-2xl' : 'bg-white/40 border-black/5 shadow-xl'}`}>
                    <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6 md:mb-8">System Metrics</h4>
                    <div className="space-y-6">
                       {[
                         { label: "Logic Consistency", val: "98%" },
                         { label: "Data Integrity", val: "100%" },
                         { label: "Optimal Output", val: "94%" },
                         { label: "System Load", val: "Low" }
                       ].map((stat, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[9px] uppercase font-black">
                               <span className={theme === 'dark' ? 'text-white/30' : 'text-black/30'}>{stat.label}</span>
                               <span className="text-blue-500">{stat.val}</span>
                            </div>
                            <div className={`h-1 w-full rounded-full overflow-hidden transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: stat.val.includes('%') ? stat.val : '100%' }}
                                 transition={{ duration: 1, delay: i * 0.1 }}
                                 className="h-full bg-blue-500"
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className={`p-8 rounded-2xl border flex flex-col items-center text-center transition-all ${theme === 'dark' ? 'bg-blue-600/10 border-blue-500/20' : 'bg-blue-600/5 border-blue-500/10'}`}>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                       <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-[10px] font-black uppercase text-blue-500 mb-2 tracking-[0.2em]`}>Status: Verified</div>
                    <div className={`text-xs transition-colors ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Identity authenticated via biometric and cryptographic handshake. Access granted.</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className={`p-8 border-t flex items-center justify-between transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
           <div className={`text-[10px] font-mono transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>SHA-256: 8130753A...5298FCQ</div>
           <motion.button 
             whileHover={{ x: 5 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => setActiveDossier(null)}
             className="flex items-center space-x-2 text-blue-500 font-black text-[10px] uppercase tracking-widest"
           >
              <span>{t.dossiers.close}</span>
              <ChevronRight className="w-4 h-4" />
           </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnalysisIcon = () => (
  <div className="flex items-center justify-center mr-4">
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Background Pulse */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-blue-500 rounded-full blur-lg"
      />
      
      {/* Chart Icon */}
      <motion.div
        animate={{ 
          y: [0, -2, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-10"
      >
        <TrendingUp className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
      </motion.div>

      {/* Moving Analysis "Beam" */}
      <motion.div 
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-blue-500/60 shadow-[0_0_10px_#3b82f6] z-20"
      />
    </div>
  </div>
);

const WalkingManIcon = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Briefcase className="w-5 h-5 text-blue-500/70 group-hover:text-blue-400 transition-all" />
      <motion.div
        animate={{ 
          x: [-15, 15],
          y: [0, -1, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-4"
      >
        <User className="w-2.5 h-2.5 text-blue-400 group-hover:text-blue-300" />
      </motion.div>
    </div>
  );
};

const ComputerSkillsSection = () => {
  const { t, theme, setActiveDossier } = useGlobal();
  return (
    <section id="computer-skills" className="py-40 px-8 relative bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t.digital.title} 
          subtitle={t.digital.subtitle} 
          icon={Monitor} 
        />
        
        <div className={`glass-panel p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.05)] border relative overflow-hidden transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 relative z-10">
            {[
              {
                title: "Microsoft Office Suite",
                items: "Word, Excel, PowerPoint, Access",
                customIcon: <WalkingManIcon />,
                desc: t.digital.office
              },
              {
                title: "Adobe Photoshop",
                items: "Visual Design & Assets",
                icon: Palette,
                desc: t.digital.photoshop
              },
              {
                title: "Hotels / Hospitality",
                items: "Property Management Systems",
                icon: Hotel,
                desc: t.digital.hotels
              },
              {
                title: "Flaxxi",
                items: "Business Logic Systems",
                icon: Activity,
                desc: t.digital.flaxxi
              },
              {
                title: "Electra web",
                items: "System Administration",
                icon: Zap,
                desc: t.digital.electra
              }
            ].map((skill, idx) => (
              <motion.div 
                key={idx}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileTap={tapEffect}
                onTap={playClickSound}
                className="flex items-start space-x-6 group cursor-pointer"
              >
                <div className={`shrink-0 w-12 h-12 border rounded-xl flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-white/5 border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/10' : 'bg-black/5 border-black/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/5'}`}>
                  {skill.customIcon ? (
                    skill.customIcon
                  ) : (
                    <skill.icon className="w-5 h-5 text-blue-500/70 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <h3 className={`text-base font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-white/90 group-hover:text-white' : 'text-[#0f172a]/90 group-hover:text-[#0f172a]'}`}>{skill.title}</h3>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400/60 font-mono font-bold">{skill.items}</div>
                  <p className={`text-[11px] leading-relaxed font-light transition-colors max-w-[200px] ${theme === 'dark' ? 'text-white/30 group-hover:text-white/50' : 'text-black/30 group-hover:text-black/50'}`}>
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex border-t pt-8 transition-colors border-white/5 justify-center md:justify-start">
             <motion.button
               whileHover={{ x: 5 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => { setActiveDossier('digital'); playClickSound(); }}
               className="flex items-center space-x-2 text-blue-500 font-black text-[10px] uppercase tracking-widest"
             >
                <span>{t.dossiers.view}</span>
                <ChevronRight className="w-4 h-4" />
             </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LanguageSkillsSection = () => {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<any>(null);
  
  const languages = [
    { 
      name: t.languages.turkish, 
      prof: t.languages.professional, 
      flag: "tr", 
      professional: true,
      stats: t.languages.turkish_stats,
      importance: t.languages.turkish_imp
    },
    { 
      name: t.languages.english, 
      prof: t.languages.professional, 
      flag: "gb", 
      professional: true,
      stats: t.languages.english_stats,
      importance: t.languages.english_imp
    },
    { 
      name: t.languages.persian, 
      prof: t.languages.professional, 
      flag: "ir", 
      professional: true,
      stats: t.languages.persian_stats,
      importance: t.languages.persian_imp
    },
    { 
      name: t.languages.russian, 
      prof: "B1", 
      flag: "ru", 
      professional: false,
      stats: t.languages.russian_stats,
      importance: t.languages.russian_imp
    },
    { 
      name: t.languages.pashto, 
      prof: "Native", 
      flag: "af", 
      professional: false,
      stats: t.languages.pashto_stats,
      importance: t.languages.pashto_imp
    },
    { 
      name: t.languages.urdu, 
      prof: "A2", 
      flag: "pk", 
      professional: false,
      stats: t.languages.urdu_stats,
      importance: t.languages.urdu_imp
    },
    { 
      name: t.languages.hazaragi, 
      prof: "Native", 
      flag: "af",
      professional: false,
      stats: t.languages.hazaragi_stats,
      importance: t.languages.hazaragi_imp
    }
  ];

  return (
    <section id="languages" className="py-40 px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <SectionHeader 
          title={t.languages.title} 
          subtitle={t.languages.subtitle} 
          icon={Languages} 
        />

        <div className="glass-panel p-8 md:p-12 border border-white/5 relative overflow-hidden bg-white/[0.01]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -z-10" />
          
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-12 max-w-2xl font-light italic border-l-2 border-blue-500/30 pl-6 text-left">
            {t.languages.statement}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {languages.map((lang, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                whileTap={tapEffect}
                onClick={() => { setSelectedLang(lang); playClickSound(); }}
                className={`p-6 rounded-2xl border transition-all duration-300 flex items-center space-x-4 cursor-pointer ${
                  lang.professional 
                    ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                    : "border-white/5 bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black/20">
                    <img 
                      src={lang.flag.startsWith('http') ? lang.flag : `https://flagcdn.com/w80/${lang.flag}.png`} 
                      alt={lang.name}
                      className="w-full h-full object-cover scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {lang.professional && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" 
                    />
                  )}
                </div>
                
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-white/20 font-mono text-[10px]">{idx + 1}.</span>
                    <h4 className="text-white font-bold tracking-tight">{lang.name}</h4>
                  </div>
                  <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${lang.professional ? "text-blue-400" : "text-white/20"}`}>
                    {lang.prof}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLang && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLang(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel max-w-lg w-full p-8 md:p-10 border-blue-500/30 bg-black/60 relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)]"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

              <div className="flex items-center space-x-6 mb-8 border-b border-white/5 pb-8">
                <div className="w-20 h-14 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={selectedLang.flag.startsWith('http') ? selectedLang.flag : `https://flagcdn.com/w160/${selectedLang.flag}.png`} 
                    alt={selectedLang.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white tracking-tighter uppercase italic">{selectedLang.name}</h3>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold">{selectedLang.prof}</div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3 h-3 text-blue-500/60" />
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{t.languages.speaker_count}</span>
                  </div>
                  <p className="text-sm text-white/80 font-mono leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                    {selectedLang.stats}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3 h-3 text-blue-500/60" />
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{t.languages.strategic_importance}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-light italic">
                    "{selectedLang.importance}"
                  </p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedLang(null); playClickSound(); }}
                className="mt-10 w-full py-4 bg-blue-600 text-white text-[10px] uppercase tracking-[0.3em] font-black rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all flex items-center justify-center space-x-2"
              >
                <X className="w-3 h-3" />
                <span>{t.languages.close}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FinancialAccountingSection = () => {
  const { t, theme, setActiveDossier } = useGlobal();
  return (
    <section id="accounting" className="py-40 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t.accounting.title} 
          subtitle={t.accounting.subtitle} 
          icon={Calculator} 
        />
        
        <div className={`glass-panel p-1 border shadow-[0_0_50px_rgba(59,130,246,0.05)] overflow-hidden transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <div className="grid md:grid-cols-2 gap-1">
             {/* LUCA Feature Box */}
             <motion.div 
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -20 }}
               whileTap={tapEffect}
               onTap={playClickSound}
               className={`p-12 border-r flex flex-col justify-center relative group cursor-pointer overflow-hidden shadow-inner transition-colors ${theme === 'dark' ? 'bg-blue-600/10 border-white/5' : 'bg-blue-600/5 border-black/5'}`}
             >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                   <Calculator className={`w-64 h-64 -rotate-12 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`} />
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                     <span className="text-white font-black text-2xl tracking-tighter">LUCA</span>
                  </div>
                  <h3 className={`text-3xl font-bold mb-6 uppercase tracking-tight italic transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{t.accounting.luca_title}</h3>
                  <p className={`leading-relaxed max-w-md font-light transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    {t.accounting.luca_desc}
                  </p>
                  
                  <div className="mt-10 flex items-center space-x-6">
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors ${theme === 'dark' ? 'border-[#050505] bg-blue-500/20 text-blue-400' : 'border-white bg-blue-500/10 text-blue-600'}`}>
                             0{i}
                          </div>
                        ))}
                     </div>
                     <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>{t.accounting.certified}</span>
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveDossier('accounting'); playClickSound(); }}
                    className="mt-12 flex items-center space-x-2 text-blue-500 font-black text-[10px] uppercase tracking-widest"
                  >
                    <span>{t.dossiers.view}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
             </motion.div>

             {/* Skills List Box */}
             <motion.div 
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: 20 }}
               className="p-12 space-y-12 flex flex-col justify-center"
             >
                <div className="grid grid-cols-2 gap-8">
                   {[
                     { name: t.accounting.journal, level: "95%" },
                     { name: t.accounting.tax, level: "90%" },
                     { name: t.accounting.balance, level: "92%" },
                     { name: t.accounting.cost, level: "88%" }
                   ].map((item, idx) => (
                     <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-end">
                           <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.name}</span>
                           <span className="text-sm font-black text-blue-500">{item.level}</span>
                        </div>
                        <div className={`h-1 w-full rounded-full overflow-hidden transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: item.level }}
                             transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                             className="h-full bg-blue-500"
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>

             {/* Communication Network / Hub */}
             <motion.div
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="w-full text-left space-y-12 mb-32"
             >
                <div className="flex flex-col space-y-2 border-l-4 border-blue-500 pl-8">
                   <h2 className={`text-4xl md:text-5xl font-black uppercase italic tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Network Hub</h2>
                   <div className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">Secure Communication Ports</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { 
                       label: "Email", 
                       data: "Mehran.saifi96@gmail.com", 
                       href: "mailto:Mehran.saifi96@gmail.com", 
                       icon: Mail,
                       color: "text-blue-500"
                     },
                     { 
                       label: "Phone", 
                       data: "+90 555 197 59 51", 
                       href: "tel:+905551975951", 
                       icon: Phone,
                       color: "text-green-500" 
                     },
                     { 
                       label: "Instagram", 
                       data: "@its_miran0", 
                       href: "https://www.instagram.com/its_miran0?igsh=MWVka3I5bDJ6cHFtMA%3D%3D&utm_source=qr", 
                       icon: Instagram,
                       color: "text-purple-500" 
                     },
                     { 
                       label: "Address", 
                       data: "Pamukkale / Denizli", 
                       href: "https://www.google.com/maps/search/?api=1&query=Hüseyin+Emrah+Mahallesi+Hüseyin+Yılmaz+caddesi+No+21+Pamukkale+Denizli", 
                       icon: MapPin,
                       color: "text-amber-500" 
                     }
                   ].map((method, idx) => (
                      <motion.a
                        key={idx}
                        href={method.href}
                        target={method.href.startsWith('http') ? "_blank" : undefined}
                        rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        whileHover={{ y: -5, backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => playClickSound()}
                        className={`flex flex-col p-8 glass-panel border group overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}
                      >
                         <div className={`${method.color} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                            <method.icon className="w-8 h-8" />
                         </div>
                         <div className={`text-[10px] uppercase tracking-widest font-black mb-2 transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                            {method.label}
                         </div>
                         <div className={`text-sm font-bold tracking-tight break-all ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                            {method.data}
                         </div>
                      </motion.a>
                   ))}
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GymSection = () => {
  const { t, theme, setActiveDossier } = useGlobal();
  return (
    <section id="hobby" className="py-40 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title={t.gym.title} 
          subtitle={t.gym.subtitle} 
          icon={Dumbbell} 
        />
        
        <div className={`glass-panel border relative overflow-hidden transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto group overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1xvuKlp_khZYeW-gGmlXMEUAq5Y10UzQP" 
                alt="Mehran - The Iron Path" 
                className="w-full h-full object-cover object-top transition-transform duration-[3s] group-hover:scale-105 opacity-60 contrast-110 grayscale-[0.2]"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t transition-colors ${theme === 'dark' ? 'from-[#050505] via-[#050505]/40' : 'from-slate-50 via-slate-50/40'} to-transparent`} />
              
              <div className={`absolute top-0 right-0 p-12 opacity-5 font-black text-9xl italic select-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`}>400D</div>

              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => { setActiveDossier('hobby'); playClickSound(); }}
                   className={`px-6 py-3 border rounded-xl flex items-center space-x-3 transition-all backdrop-blur-md ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`}
                 >
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] uppercase font-black tracking-widest">{t.dossiers.view}</span>
                 </motion.button>
              </div>
            </div>

            <div className="p-12 md:p-16 flex flex-col justify-center">
                <h3 className={`text-3xl font-bold mb-6 uppercase tracking-tight italic transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{t.gym.protocol}</h3>
                <p className={`font-light leading-relaxed text-sm mb-12 transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  {t.gym.desc}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={tapEffect}
                  onTap={playClickSound}
                  className={`glass-panel p-6 border relative group cursor-pointer transition-colors ${theme === 'dark' ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-500/10 bg-blue-500/[0.02]'}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-blue-500 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Send className="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <div className={`text-sm font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{t.gym.cta_title}</div>
                        <div className={`text-[11px] font-light mt-1 transition-colors ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                          {t.gym.cta_desc}
                        </div>
                     </div>
                  </div>
                </motion.div>

                <div className="mt-12 h-1 w-full rounded-full overflow-hidden transition-colors bg-blue-500/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
                  />
                </div>

                <div className="mt-12 flex space-x-12 shrink-0">
                  <div className="space-y-1">
                    <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>{t.gym.progress}</div>
                    <div className={`text-3xl font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>85%</div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>{t.gym.streak}</div>
                    <div className="text-3xl text-blue-500 font-bold tracking-tighter">400+</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SnakeGame = () => {
  const { t, theme } = useGlobal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const GRID_SIZE = 20;
  const CELL_COUNT = 20;
  
  const [snake, setSnake] = useState<{x: number, y: number}[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [nextDir, setNextDir] = useState({ x: 0, y: -1 });

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDir({ x: 0, y: -1 });
    setNextDir({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    playClickSound();
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowUp': if (dir.y === 0) setNextDir({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (dir.y === 0) setNextDir({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (dir.x === 0) setNextDir({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (dir.x === 0) setNextDir({ x: 1, y: 0 }); break;
    }
  }, [dir]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    // Difficulty increases: speed speeds up as score goes up
    const speed = Math.max(50, 150 - Math.floor(score / 5) * 10);
    
    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newHead = { x: prevSnake[0].x + nextDir.x, y: prevSnake[0].y + nextDir.y };
        setDir(nextDir);

        // Wall collision
        if (newHead.x < 0 || newHead.x >= CELL_COUNT || newHead.y < 0 || newHead.y >= CELL_COUNT) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) setHighScore(score);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) setHighScore(score);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        
        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          setFood({
            x: Math.floor(Math.random() * CELL_COUNT),
            y: Math.floor(Math.random() * CELL_COUNT)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, nextDir, score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CELL_COUNT; i++) {
       ctx.beginPath();
       ctx.moveTo(i * GRID_SIZE, 0);
       ctx.lineTo(i * GRID_SIZE, canvas.height);
       ctx.stroke();
       ctx.beginPath();
       ctx.moveTo(0, i * GRID_SIZE);
       ctx.lineTo(canvas.width, i * GRID_SIZE);
       ctx.stroke();
    }

    // Draw Food
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ef4444';
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(food.x * GRID_SIZE + 2, food.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4, 4);
    ctx.fill();

    // Draw Snake
    snake.forEach((segment, i) => {
      ctx.shadowBlur = i === 0 ? 20 : 0;
      ctx.shadowColor = '#3b82f6';
      ctx.fillStyle = i === 0 ? '#60a5fa' : `rgba(59, 130, 246, ${1 - i / (snake.length + 5)})`;
      ctx.beginPath();
      // Round head and body segments
      ctx.roundRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2, i === 0 ? 6 : 4);
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
  }, [snake, food]);

  const move = (d: {x: number, y: number}) => {
    if (gameOver) return;
    if (!isPlaying) setIsPlaying(true);
    setNextDir(prev => {
      if ((d.x !== 0 && prev.x !== 0) || (d.y !== 0 && prev.y !== 0)) return prev;
      return d;
    });
    playClickSound();
  };

  return (
    <section id="game" className={`py-40 px-8 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/10'}`}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title={t.snake.title} 
          subtitle={t.snake.subtitle} 
          icon={Gamepad2} 
        />
        
        <div className={`glass-panel p-8 border relative overflow-hidden flex flex-col md:flex-row items-center gap-12 transition-colors ${theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
           <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-[2rem] blur-2xl transition-all group-hover:bg-blue-500/20" />
              <canvas 
                ref={canvasRef} 
                width={GRID_SIZE * CELL_COUNT} 
                height={GRID_SIZE * CELL_COUNT}
                className={`relative z-10 border rounded-xl backdrop-blur-sm shadow-2xl transition-colors ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/10 bg-white/40'}`}
              />
              
              {!isPlaying && (
                <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-sm rounded-xl border transition-colors ${theme === 'dark' ? 'bg-black/60 border-white/5' : 'bg-white/60 border-black/5'}`}>
                   <div className="text-center p-6">
                      <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-2 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                        {gameOver ? t.snake.game_over : "Ready?"}
                      </h3>
                      {gameOver && (
                        <div className="text-4xl text-blue-500 font-black mb-6">{score}</div>
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        className="px-8 py-3 bg-blue-600 text-white text-[10px] uppercase font-black tracking-widest rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        {gameOver ? t.snake.reset : t.snake.start}
                      </motion.button>
                   </div>
                </div>
              )}
           </div>

           <div className="flex-1 w-full space-y-10">
              <div className="grid grid-cols-2 gap-4">
                 <div className={`glass-panel p-6 border transition-colors ${theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
                    <div className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>{t.snake.score}</div>
                    <div className={`text-3xl font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{score}</div>
                 </div>
                 <div className={`glass-panel p-6 border transition-colors ${theme === 'dark' ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-500/10 bg-blue-500/10'}`}>
                    <div className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 transition-colors ${theme === 'dark' ? 'text-blue-500/50' : 'text-blue-600/50'}`}>{t.snake.highscore}</div>
                    <div className={`text-3xl font-bold tracking-tighter transition-colors ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{highScore}</div>
                 </div>
              </div>

              {/* Touch Controls */}
              <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
                 <div />
                 <motion.button 
                   whileTap={tapEffect}
                   onClick={() => move({x: 0, y: -1})}
                   className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white' : 'bg-black/5 border-black/10 text-black/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-black'}`}
                 >
                   <ChevronUp className="w-6 h-6" />
                 </motion.button>
                 <div />
                 
                 <motion.button 
                   whileTap={tapEffect}
                   onClick={() => move({x: -1, y: 0})}
                   className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white' : 'bg-black/5 border-black/10 text-black/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-black'}`}
                 >
                   <ChevronLeft className="w-6 h-6" />
                 </motion.button>
                 <motion.button 
                   whileTap={tapEffect}
                   onClick={() => move({x: 0, y: 1})}
                   className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white' : 'bg-black/5 border-black/10 text-black/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-black'}`}
                 >
                   <ChevronDown className="w-6 h-6" />
                 </motion.button>
                 <motion.button 
                   whileTap={tapEffect}
                   onClick={() => move({x: 1, y: 0})}
                   className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white' : 'bg-black/5 border-black/10 text-black/40 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-black'}`}
                 >
                   <ChevronRight className="w-6 h-6" />
                 </motion.button>
              </div>

              <div className={`text-[10px] uppercase tracking-[0.25em] font-medium text-center transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                System Reflex Training Protocol
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t, theme } = useGlobal();
  
  const contactMethods = [
    {
      label: t.contact.email_label,
      value: "Mehran.saifi96@gmail.com",
      href: "mailto:Mehran.saifi96@gmail.com",
      icon: Mail
    },
    {
      label: t.contact.phone_label,
      value: "+90 555 197 59 51",
      href: "tel:+905551975951",
      icon: Phone
    },
    {
      label: t.contact.instagram_label,
      value: "@its_miran0",
      href: "https://www.instagram.com/its_miran0?igsh=MWVka3I5bDJ6cHFtMA%3D%3D&utm_source=qr",
      icon: Instagram
    },
    {
      label: t.contact.address_label,
      value: "Pamukkale / Denizli",
      href: "https://www.google.com/maps/search/?api=1&query=Hüseyin+Emrah+Mahallesi+Hüseyin+Yılmaz+caddesi+No+21+Pamukkale+Denizli",
      icon: MapPin,
      fullAddress: "Hüseyin Emrah Mah. Hüseyin Yılmaz Cad. No:21"
    }
  ];

  return (
    <section id="contact" className={`py-40 px-8 relative border-t transition-colors duration-500 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 mb-8 block font-black">
          {t.contact.title}
        </span>
        <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-20 uppercase italic transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
          {t.contact.subtitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {contactMethods.map((method, idx) => (
            <motion.a 
              key={idx}
              href={method.href} 
              target={method.href.startsWith('http') ? "_blank" : undefined}
              rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
              whileTap={tapEffect}
              onTap={playClickSound}
              className={`group flex items-center space-x-6 p-8 glass-panel shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all ${theme === 'dark' ? 'hover:bg-white/[0.05]' : 'hover:bg-black/[0.05]'}`}
            >
              <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110 shrink-0">
                <method.icon className="w-6 h-6" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-[10px] uppercase text-blue-500 font-bold tracking-widest mb-1">{method.label}</div>
                <div className={`text-lg font-medium group-hover:text-blue-400 transition-colors tracking-tight truncate ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                   {method.value}
                </div>
                {method.fullAddress && (
                  <div className={`text-[10px] mt-1 opacity-40 truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {method.fullAddress}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, theme } = useGlobal();
  return (
    <footer className={`py-20 border-t px-8 overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'border-white/5 bg-black/50' : 'border-black/5 bg-white/50'}`}>
      <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-[10px] uppercase tracking-widest font-bold transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
        <div className="space-y-6">
          <div className="space-y-2">
              <div className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>{t.footer.stack}</div>
              <div className={`flex gap-6 transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                  <span>Python</span>
                  <span>•</span>
                  <span>C++</span>
                  <span>•</span>
                  <span>Flutter</span>
                  <span>•</span>
                  <span>TypeScript</span>
              </div>
          </div>
          <div>© 2026 MEHRAN SAIFI // {t.footer.university}</div>
        </div>
        <div className="flex md:justify-end gap-12 items-end">
          <motion.a href="#" whileTap={tapEffect} onClick={playClickSound} className="hover:text-blue-500 transition-colors">LinkedIn</motion.a>
          <motion.a href="#" whileTap={tapEffect} onClick={playClickSound} className="hover:text-blue-500 transition-colors">GitHub</motion.a>
          <motion.a href="#" whileTap={tapEffect} onClick={playClickSound} className="hover:text-blue-500 transition-colors">Systems Info</motion.a>
        </div>
      </div>
    </footer>
  );
};

const AboutPageOverlay = () => {
  const { isAboutOpen, setIsAboutOpen, t, theme } = useGlobal();
  
  return (
    <AnimatePresence>
      {isAboutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-start overflow-y-auto p-4 md:p-12 lg:p-20 text-center custom-scrollbar transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#f8fafc] text-[#0f172a]'}`}
        >
          <motion.button
            whileTap={tapEffect}
            onClick={() => { setIsAboutOpen(false); playClickSound(); }}
            className={`fixed top-4 right-4 md:top-8 md:right-8 p-3 md:p-4 transition-colors z-[110] rounded-full backdrop-blur-md border ${theme === 'dark' ? 'text-white/40 hover:text-white bg-black/50 border-white/10' : 'text-black/40 hover:text-black bg-white/50 border-black/10'}`}
          >
            <X className="w-6 h-6 md:w-10 md:h-10" />
          </motion.button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative mb-12 md:mb-16 mt-12 md:mt-20">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-500/30 rounded-full blur-[60px] -z-10"
              />
              
              <div className="relative w-36 h-36 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl z-10 mx-auto">
                <img 
                  src="https://lh3.googleusercontent.com/d/17z7xLAYfQTMCo2rTOZXAeOgto_GKGPPt" 
                  alt="Mehran Saifi" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(59, 130, 246, 0.8)",
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -inset-4 rounded-full border-2 border-blue-500 z-20 pointer-events-none"
                style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6 mb-20"
            >
              <h1 className={`text-5xl md:text-8xl font-black italic uppercase tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                Hi, I'm <MultiWordTypewriter words={["Mehran", "Economist", "Developer", "Manager", "Marketer", "Problem Solver"]} />
              </h1>
              <p className={`text-lg md:text-2xl font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                Economist, Developer, Manager, Problem Solver
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-20">
              {/* Personal Data Box */}
              <motion.div 
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 md:p-10 border-blue-500/20 bg-blue-500/[0.02] text-left relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                   <Terminal className="w-20 h-20 text-blue-500" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold mb-8">Identity // Profile</div>
                
                <div className="space-y-8">
                   <div className="space-y-1">
                      <div className="text-[10px] uppercase text-white/30 tracking-widest font-black">Age</div>
                      <div className="text-2xl text-white font-bold tracking-tight">{t.about_details.age}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[10px] uppercase text-white/30 tracking-widest font-black">University</div>
                      <div className="text-2xl text-white font-bold tracking-tight">{t.about_details.university}</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-[10px] uppercase text-white/30 tracking-widest font-black">Major</div>
                      <div className="text-2xl text-blue-500 font-bold tracking-tight">{t.about_details.department}</div>
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center space-x-4">
                   <div className="p-2 bg-blue-500/10 rounded-lg">
                      <User className="w-4 h-4 text-blue-500" />
                   </div>
                   <div className="text-[10px] uppercase text-white/40 tracking-widest font-bold">Economics & Tech Focus</div>
                </div>
              </motion.div>

              {/* Systemic Analysis Box */}
              <motion.div 
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 md:p-10 border-white/5 bg-white/[0.01] text-left relative overflow-hidden group"
              >
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-[50px]" />
                 <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-8">{t.about_details.analysis_title}</div>
                 
                 <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent" />
                    <p className="pl-6 text-sm md:text-base text-white/80 leading-relaxed font-light">
                       {t.about_details.analysis_text}
                    </p>
                 </div>

                 <div className="mt-10 flex flex-wrap gap-2">
                    {['Economics', 'Code', 'Management', 'Strategy'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/40 font-bold">
                        {tag}
                      </span>
                    ))}
                 </div>
              </motion.div>
            </div>

            {/* NEW: Technical Expertise Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="w-full text-left space-y-12 mb-32"
            >
               <div className="flex flex-col space-y-2 border-l-4 border-blue-500 pl-8">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{t.about_details.expertise_title}</h2>
                  <div className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">{t.about_details.expertise_subtitle}</div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Programming Group */}
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:border-blue-500/20 transition-colors">
                     <div className="flex items-center space-x-4 mb-8">
                        <Code2 className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.about_details.exp_programming}</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-y-4 text-xs font-mono">
                        <div className="text-white/60">Python</div><div className="text-blue-400 text-right">Expert</div>
                        <div className="text-white/60">C++</div><div className="text-blue-400 text-right">Core</div>
                        <div className="text-white/60">Flutter</div><div className="text-blue-400 text-right">Advanced</div>
                        <div className="text-white/60">TypeScript</div><div className="text-blue-400 text-right">Production</div>
                     </div>
                  </div>

                  {/* Digital Operations Group */}
                  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:border-blue-500/20 transition-colors">
                     <div className="flex items-center space-x-4 mb-8">
                        <Monitor className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.about_details.exp_digital}</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-y-4 text-[10px] font-mono leading-tight">
                        <div className="text-white/60">MS Office Suite</div><div className="text-blue-400 text-right">L5</div>
                        <div className="text-white/60">Adobe PS</div><div className="text-blue-400 text-right">Artist</div>
                        <div className="text-white/60">Flaxxi / Electra</div><div className="text-blue-400 text-right">Master</div>
                        <div className="text-white/60">PMS Systems</div><div className="text-blue-400 text-right">Ops</div>
                     </div>
                  </div>

                   {/* Financial Group */}
                   <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:border-blue-500/20 transition-colors">
                     <div className="flex items-center space-x-4 mb-8">
                        <Calculator className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.about_details.exp_financial}</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-y-4 text-xs font-mono">
                        <div className="text-white/60">LUCA Cloud</div><div className="text-blue-400 text-right">Certified</div>
                        <div className="text-white/60">Accounting</div><div className="text-blue-400 text-right">Master</div>
                        <div className="text-white/60">Reporting</div><div className="text-blue-400 text-right">Deep</div>
                        <div className="text-white/60">Analysis</div><div className="text-blue-400 text-right">Advanced</div>
                     </div>
                  </div>
               </div>

               {/* Career Timeline Section */}
               <motion.div
                 initial={{ y: 50, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 className="w-full text-left space-y-12 mb-32"
               >
                  <div className="flex flex-col space-y-2 border-l-4 border-blue-500 pl-8">
                     <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{t.about_details.experience_title}</h2>
                     <div className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">{t.about_details.experience_subtitle}</div>
                  </div>

                  <div className="relative space-y-8 pl-8 md:pl-0">
                     {/* The Vertical Line */}
                     <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/10 to-transparent md:-translate-x-1/2" />

                     {[
                       { 
                         year: "2017 - 2019", 
                         role: t.about_details.exp_manager, 
                         company: t.about_details.exp_manager_loc, 
                         icon: Briefcase,
                         side: 'left'
                       },
                       { 
                         year: "2019 - 2020", 
                         role: t.about_details.exp_instructor, 
                         company: t.about_details.exp_instructor_loc, 
                         icon: BookOpen,
                         side: 'right'
                       },
                       { 
                         year: "2021 - 2023", 
                         role: t.about_details.exp_receptionist, 
                         company: t.about_details.exp_hotel, 
                         icon: Hotel,
                         side: 'left',
                         link: "http://www.magictulip.com/",
                         detail: "JUN 2021 - NOV 2021 / 2022 / 2023 RECURRING"
                       },
                       { 
                         year: "2024", 
                         role: `${t.about_details.exp_receptionist} & ${t.about_details.exp_accountant}`, 
                         company: `${t.about_details.exp_hotel} / Denizli`, 
                         icon: Calculator,
                         side: 'right',
                         link: "http://www.magictulip.com/",
                         detail: `Accountant: DEC 2024`
                       },
                       { 
                         year: "2025", 
                         role: `${t.about_details.exp_receptionist} & ${t.about_details.exp_accountant}`, 
                         company: `${t.about_details.exp_hotel} / Denizli`, 
                         icon: TrendingUp,
                         side: 'left',
                         link: "http://www.magictulip.com/",
                         detail: `Accountant until MAY 2025`
                       }
                     ].map((exp, idx) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, x: exp.side === 'left' ? -30 : 30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.1 }}
                         className={`relative flex items-center md:justify-between w-full ${exp.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                       >
                         {/* Dot */}
                         <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] -translate-x-1.5 md:translate-x-[-50%] z-20" />
                         
                         {/* Card Wrapper */}
                         <div className="w-full md:w-[45%] pl-8 md:pl-0">
                           <div className={`glass-panel p-6 border-white/5 bg-white/[0.02] hover:border-blue-500/20 transition-all group ${exp.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                              <div className={`flex items-center space-x-4 mb-4 ${exp.side === 'left' ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                                 <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                    <exp.icon className="w-5 h-5 text-blue-400" />
                                 </div>
                                 <div>
                                    <div className="text-blue-500 text-[10px] font-black tracking-widest uppercase mb-1">{exp.year}</div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{exp.role}</h3>
                                 </div>
                              </div>
                              <div className={`flex items-center ${exp.side === 'left' ? 'md:flex-row-reverse' : ''} space-x-2 ${exp.side === 'left' ? 'md:space-x-reverse' : ''}`}>
                                 <span className="text-xs text-white/40 font-medium uppercase tracking-wider">{exp.company}</span>
                                 {exp.link && (
                                   <motion.a 
                                     href={exp.link}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     whileHover={{ scale: 1.1 }}
                                     className="text-blue-500 hover:text-blue-400"
                                   >
                                     <ExternalLink className="w-3 h-3" />
                                   </motion.a>
                                 )}
                              </div>
                              {exp.detail && (
                                <p className={`text-[10px] text-blue-500/60 font-mono mt-3 uppercase tracking-tighter`}>
                                   {exp.detail}
                                </p>
                              )}
                           </div>
                         </div>

                         {/* Gap for MD+ */}
                         <div className="hidden md:block w-[45%]" />
                       </motion.div>
                     ))}
                  </div>
               </motion.div>

               {/* Multi-Language Hub */}
               <div className="glass-panel p-8 md:p-12 border-blue-500/10 bg-blue-500/[0.02]">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold mb-10 flex items-center">
                    <Globe className="w-4 h-4 mr-3" /> Linguistic Infrastructure // Neural Adapters
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                     {[
                       { name: 'Persian', level: 'Native / 100%', val: 100, flag: 'ir', code: 'fa-IR', greeting: 'سلام، چطور هستید؟' },
                       { name: 'Hazaragi', level: 'Native / 100%', val: 100, flag: 'af', code: 'fa-AF', greeting: 'سلام، چطور هستید؟' },
                       { name: 'Turkish', level: 'Fluent / 100%', val: 100, flag: 'tr', code: 'tr-TR', greeting: 'Merhaba, nasılsın?' },
                       { name: 'English', level: 'Fluent / 100%', val: 100, flag: 'gb', code: 'en-US', greeting: 'Hi, how are you?' },
                       { name: 'Pashto', level: '70%', val: 70, flag: 'af', code: 'ps-AF', greeting: 'سلام، څنګه یئ؟' },
                       { name: 'Russian', level: '50%', val: 50, flag: 'ru', code: 'ru-RU', greeting: 'Привет, как дела?' },
                       { name: 'Urdu', level: '50%', val: 50, flag: 'pk', code: 'ur-PK', greeting: 'ہیلو، آپ کیسے ہیں؟' },
                     ].map(lang => (
                       <div key={lang.name} className="space-y-3 group">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center space-x-3">
                               <div className="flex items-center space-x-2">
                                 <img 
                                   src={`https://flagcdn.com/w20/${lang.flag}.png`} 
                                   alt={lang.name}
                                   className="w-4 h-3 object-cover rounded-[1px] opacity-70 group-hover:opacity-100 transition-opacity"
                                   referrerPolicy="no-referrer"
                                 />
                                 <span className="text-[11px] font-black uppercase tracking-widest text-white/80 group-hover:text-blue-400 transition-colors">{lang.name}</span>
                               </div>
                               <motion.button
                                 whileHover={{ scale: 1.2, color: '#3b82f6' }}
                                 whileTap={{ scale: 0.9 }}
                                 onClick={() => {
                                   playClickSound();
                                   const utterance = new SpeechSynthesisUtterance(lang.greeting);
                                   utterance.lang = lang.code;
                                   utterance.rate = 0.85;
                                   
                                   const voices = window.speechSynthesis.getVoices();
                                   const bestVoice = voices.find(v => v.lang.startsWith(lang.code.split('-')[0])) || voices[0];
                                   if (bestVoice) utterance.voice = bestVoice;
                                   
                                   window.speechSynthesis.cancel();
                                   window.speechSynthesis.speak(utterance);
                                 }}
                                 className="text-white/20 hover:text-blue-500 transition-colors"
                               >
                                 <Volume2 className="w-3.5 h-3.5" />
                               </motion.button>
                            </div>
                            <span className="text-[10px] font-mono text-white/30 font-bold uppercase">{lang.level}</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: `${lang.val}%` }}
                               transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                               className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                             />
                             {/* Scanline effect on bars */}
                             <motion.div 
                               animate={{ x: ['-100%', '200%'] }}
                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                             />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>

            {/* NEW: Hobbies Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="w-full text-left space-y-12 mb-32"
            >
               <div className="flex flex-col space-y-2 border-l-4 border-blue-500 pl-8">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{t.about_details.hobbies_title}</h2>
                  <div className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">{t.about_details.hobbies_subtitle}</div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: t.about_details.fitness, icon: Dumbbell, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: t.about_details.horse_riding, icon: Compass, color: "text-amber-600", bg: "bg-amber-600/10" },
                    { label: t.about_details.reading, icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
                    { label: t.about_details.bursa, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
                    { label: t.about_details.btc, icon: Bitcoin, color: "text-orange-500", bg: "bg-orange-500/10" },
                    { label: t.about_details.football, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { label: t.about_details.gaming, icon: Gamepad2, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { label: t.about_details.paragliding, icon: Wind, color: "text-sky-400", bg: "bg-sky-400/10" },
                  ].map((hobby, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass-panel p-6 flex flex-col items-center justify-center text-center space-y-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
                    >
                       <div className={`p-4 rounded-2xl ${hobby.bg} ${hobby.color} mb-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                          <hobby.icon className="w-6 h-6 md:w-8 md:h-8" />
                       </div>
                       <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/70">{hobby.label}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* Communication Network / Hub */}
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="w-full text-left space-y-12 mb-32"
            >
                <div className="flex flex-col space-y-2 border-l-4 border-blue-500 pl-8">
                   <h2 className={`text-4xl md:text-5xl font-black uppercase italic tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Network Hub</h2>
                   <div className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">Secure Communication Ports</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { 
                       label: "Email", 
                       data: "Mehran.saifi96@gmail.com", 
                       href: "mailto:Mehran.saifi96@gmail.com", 
                       icon: Mail,
                       color: "text-blue-500"
                     },
                     { 
                       label: "Phone", 
                       data: "+90 555 197 59 51", 
                       href: "tel:+905551975951", 
                       icon: Phone,
                       color: "text-green-500" 
                     },
                     { 
                       label: "Instagram", 
                       data: "@its_miran0", 
                       href: "https://www.instagram.com/its_miran0?igsh=MWVka3I5bDJ6cHFtMA%3D%3D&utm_source=qr", 
                       icon: Instagram,
                       color: "text-purple-500" 
                     },
                     { 
                       label: "Address", 
                       data: "Pamukkale / Denizli", 
                       href: "https://www.google.com/maps/search/?api=1&query=Hüseyin+Emrah+Mahallesi+Hüseyin+Yılmaz+caddesi+No+21+Pamukkale+Denizli", 
                       icon: MapPin,
                       color: "text-amber-500" 
                     }
                   ].map((method, idx) => (
                      <motion.a
                        key={idx}
                        href={method.href}
                        target={method.href.startsWith('http') ? "_blank" : undefined}
                        rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        whileHover={{ y: -5, backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => playClickSound()}
                        className={`flex flex-col p-8 glass-panel border group overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}
                      >
                         <div className={`${method.color} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                            <method.icon className="w-8 h-8" />
                         </div>
                         <div className={`text-[10px] uppercase tracking-widest font-black mb-2 transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                            {method.label}
                         </div>
                         <div className={`text-sm font-bold tracking-tight break-all ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
                            {method.data}
                         </div>
                      </motion.a>
                   ))}
                </div>
            </motion.div>
          </div>

          {/* Atmospheric background elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
             <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[150px]" />
             <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-900/[0.03] rounded-full blur-[150px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeDossier, setActiveDossier] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const t = translations[lang];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <GlobalContext.Provider value={{ 
      lang, 
      setLang, 
      t, 
      isAboutOpen, 
      setIsAboutOpen,
      activeDossier,
      setActiveDossier,
      theme,
      toggleTheme 
    }}>
      <div className={`min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-500 ${theme === 'light' ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#050505] text-white'}`}>
        <Navbar />
        <AboutPageOverlay />
        <AnimatePresence>
          {activeDossier && <DossierOverlay key="dossier-overlay" />}
        </AnimatePresence>
        <main>
          <Hero />
          <ProgrammingSection />
          <ComputerSkillsSection />
          <LanguageSkillsSection />
          <FinancialAccountingSection />
          <GymSection />
          <SnakeGame />
          <Contact />
        </main>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}
