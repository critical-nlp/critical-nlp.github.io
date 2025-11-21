import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Target, 
  Brain, 
  ChevronDown, 
  Menu, 
  X, 
  Monitor,
  ArrowRight
} from 'lucide-react';

// --- Content Data Configuration ---
const SITE_DATA = {
  home: {
    title: "Critical NLP Group",
    subtitle: "Where Natural Language Processing Meets Critical and Sociotheoretical Inquiry",
    sections: [
      {
        id: "who-we-are",
        title: "Who We Are",
        icon: <Users className="w-6 h-6 text-blue-600" />,
        content: "We are part of the ThirdSpace research group at the University of Toronto's Department of Computer Science. We are a collective of graduate students and researchers interested in examining the social, ethical, and political implications of NLP."
      },
      {
        id: "objective",
        title: "Our Objective",
        icon: <Target className="w-6 h-6 text-blue-600" />,
        content: "We seek to shift NLP beyond the dominant heuristic practice by grounding it in rigorous theoretical and interdisciplinary discourse. Our aim is to foster dialogue shaped by diverse fields, encouraging critical reflection, shared learning, and the development of more socially grounded perspectives on NLP"
      },
      {
        id: "programs",
        title: "Programs",
        icon: <BookOpen className="w-6 h-6 text-blue-600" />,
        content: "We will soon host a range of focused activities, including bi-weekly reading groups on seminal texts and Q&A sessions with experts from diverse disciplines. These programs aim to bridge the gap between conventional NLP practices and more theory-grounded approaches."
      },
      {
        id: "topics",
        title: "Topics",
        icon: <Brain className="w-6 h-6 text-blue-600" />,
        content: "We convene to examine themes that sit at the intersection of multiple disciplines, including LLM reasoning, fairness in machine learning, cultural bias and sensitivity, data-annotation practices, misinformation, and related concerns."
      }
    ]
  },
  pages: {
    motivation: {
      title: "Our Motivation",
      content: [
        "We seek to shift NLP beyond the dominant heuristic practice by grounding it in rigorous theoretical and interdisciplinary discourse. Our aim is to foster dialogue shaped by diverse fields, encouraging critical reflection, shared learning, and the development of more socially grounded perspectives on NLP"
      ]
    },
    whoWeAre: {
      title: "Who We Are",
      content: [
        "We are part of the ThirdSpace research group at the University of Toronto's Department of Computer Science. We are a collective of graduate students and researchers interested in examining the social, ethical, and political implications of NLP."
      ]
    },
    "program-reading": {
      title: "Reading Group",
      content: [
        "Our Reading Group meets on Thursday at T PM every two weeks..."
      ]
    },
    "program-qa": {
      title: "Q/A Sessions",
      content: [
        "The Q/A series invites experts and practitioners from diverse domains...."
      ]
    },
    "topic-reasoning": {
      title: "Reasoning & Logic",
      content: [
        "Can machines truly reason, or do they merely mimic statistical patterns? This topic track explores the limitations of current LLMs in logical inference and causal reasoning.",
        "We are particularly interested in the failures of 'common sense' reasoning in critical scenarios..."
      ]
    },
    "topic-bias": {
      title: "Culture & Bias",
      content: [
         "To be filled soon.."
      ]
    },
    "topic-data": {
      title: "Data Annotation",
      content: [
        "To be filled soon.."
      ]
    },

  }
};

// --- Components ---

const Navbar = ({ setPage, activePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { label: 'Home', id: 'home' },
    { 
      label: 'Programs', 
      id: 'programs',
      dropdown: [
        { label: 'Reading Group', id: 'program-reading' },
        { label: 'Q/A Sessions', id: 'program-qa' }
      ]
    },
    { 
      label: 'Topics', 
      id: 'topics',
      dropdown: [
        { label: 'Reasoning', id: 'topic-reasoning' },
        { label: 'Culture & Bias', id: 'topic-bias' },
        { label: 'Data Annotation', id: 'topic-data' }
      ]
    },
    { label: 'Motivation', id: 'motivation' },
    { label: 'Who We Are', id: 'whoWeAre' },
  ];

  const handleNavClick = (itemId, isDropdownItem = false) => {
    setPage(itemId);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <Monitor className="h-8 w-8 text-blue-700 mr-2" />
            <span className="font-bold text-xl text-slate-800 tracking-tight">Critical Computing</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <button
                  onClick={() => !item.dropdown && handleNavClick(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePage === item.id || (item.dropdown && item.dropdown.some(d => d.id === activePage))
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.id && (
                  <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id, true)}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {!item.dropdown ? (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                  >
                    {item.label}
                  </button>
                ) : (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-slate-900 bg-slate-50 rounded-md">
                      {item.label}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavClick(subItem.id)}
                        className="block w-full text-left pl-8 pr-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ title, subtitle, colorClass = "from-blue-900 to-slate-800" }) => (
  <div className={`relative bg-gradient-to-r ${colorClass} h-80 flex items-center justify-center overflow-hidden`}>
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight shadow-sm">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-2xl text-blue-100 font-light">
          {subtitle}
        </p>
      )}
    </div>
    {/* Decorative Circles */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
  </div>
);

const ContentSection = ({ content }) => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
      {content.map((paragraph, idx) => (
        <p key={idx} className="text-slate-700 leading-relaxed mb-6 text-lg last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <Monitor className="h-6 w-6 text-blue-400 mr-2" />
          <span className="font-bold text-xl text-white">Critical NLP</span>
        </div>
        <p className="text-sm text-slate-400">
          NLP + Other Disciplines.
        </p>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Connect</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Twitter / X</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Email Us</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Location</h3>
        <p className="text-sm text-slate-400">
          Third Space Research Lab<br/>
          Department of Computer Science<br/>
          University of Toronto
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      Created using Gemini + lot of manual tinkering
    </div>
  </footer>
);

// --- Main Page Components ---

const HomePage = ({ setPage }) => {
  const data = SITE_DATA.home;
  
  return (
    <div className="animate-fade-in">
      <HeroSection title={data.title} subtitle={data.subtitle} />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.sections.map((section, index) => (
            <div 
              key={section.id} 
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {section.content}
              </p>
              <button 
                onClick={() => setPage(section.id === 'who-we-are' ? 'whoWeAre' : section.id === 'objective' ? 'motivation' : section.id)}
                className="text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GenericPage = ({ id, data }) => {
  if (!data) return <div className="p-20 text-center">Page not found</div>;

  // Determine theme color based on section type for visual variety
  const isTopic = id.startsWith('topic');
  const isProgram = id.startsWith('program');
  const colorClass = isTopic ? "from-emerald-900 to-slate-800" : 
                     isProgram ? "from-indigo-900 to-slate-800" : 
                     "from-blue-900 to-slate-800";

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      <HeroSection title={data.title} colorClass={colorClass} />
      <ContentSection content={data.content} />
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  // 1. Helper to determine page from the URL hash
  const getPageFromHash = () => {
    // Remove the '#' character from the hash
    const hash = window.location.hash.replace('#', '');
    // Default to 'home' if hash is empty
    return hash || 'home';
  };

  // Initialize state based on current URL
  const [activePage, setActivePage] = useState(getPageFromHash());

  // 2. Effect to listen for browser navigation (Back/Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setActivePage(newPage);
      window.scrollTo(0, 0); // Scroll to top on navigation
    };

    // Listen for 'hashchange' events
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Navigation function: Updates the URL hash instead of state directly
  // The 'hashchange' listener above will detect this and update the state
  const navigateTo = (pageId) => {
    if (pageId === 'home') {
      // Clear the hash for home
      window.location.hash = ''; 
    } else {
      // Set hash for other pages
      window.location.hash = pageId;
    }
  };

  const renderContent = () => {
    if (activePage === 'home') {
      return <HomePage setPage={navigateTo} />;
    }
    
    // Check if page exists in our data structure
    const pageData = SITE_DATA.pages[activePage];
    if (pageData) {
      return <GenericPage id={activePage} data={pageData} />;
    }
    
    // Fallback maps navigating from Home cards to general pages if exact match missing
    if (activePage === 'programs') return <GenericPage id="program-reading" data={SITE_DATA.pages['program-reading']} />;
    if (activePage === 'topics') return <GenericPage id="topic-data" data={SITE_DATA.pages['topic-data']} />;

    return <HomePage setPage={navigateTo} />;
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <Navbar setPage={navigateTo} activePage={activePage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}