import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Target, 
  MessageCircle, 
  Brain, 
  Database, 
  ChevronDown, 
  Menu, 
  X, 
  Monitor,
  ArrowRight
} from 'lucide-react';

// --- Content Data Configuration ---
// Easily edit this section to update website text
const SITE_DATA = {
  home: {
    title: "Critical Computing Group",
    subtitle: "Interrogating the intersection of technology and society",
    sections: [
      {
        id: "who-we-are",
        title: "Who We Are",
        icon: <Users className="w-6 h-6 text-blue-600" />,
        content: "We are a collective of researchers, practitioners, and students dedicated to examining the social, ethical, and political implications of computing technologies. Our diverse backgrounds spanning computer science, sociology, and philosophy allow us to approach technical problems with critical depth."
      },
      {
        id: "objective",
        title: "Our Objective",
        icon: <Target className="w-6 h-6 text-blue-600" />,
        content: "Our primary objective is to foster a rigorous discourse around the design and deployment of algorithmic systems. We aim to uncover hidden biases, challenge techno-solutionism, and propose alternative frameworks for computing that prioritize human well-being and justice."
      },
      {
        id: "programs",
        title: "Programs",
        icon: <BookOpen className="w-6 h-6 text-blue-600" />,
        content: "We organize a variety of activities to engage our community, including weekly reading groups discussing seminal texts, Q/A sessions with industry experts, and hands-on workshops. These programs are designed to bridge the gap between theory and practice."
      },
      {
        id: "topics",
        title: "Topics",
        icon: <Brain className="w-6 h-6 text-blue-600" />,
        content: "Our research focuses on critical areas such as Data Annotation labor practices, Automated Reasoning limitations, Fairness in Machine Learning, and the environmental impact of Large Language Models. We dive deep into the technical mechanisms to understand their societal echoes."
      }
    ]
  },
  pages: {
    motivation: {
      title: "Our Motivation",
      content: [
        "Technology is not neutral. Every line of code and every dataset carries the values and assumptions of its creators. In an era where algorithmic decision-making increasingly governs our lives—from hiring to policing—the need for critical inquiry has never been more urgent.",
        "We are motivated by the widening gap between the rapid pace of technical innovation and the slower pace of ethical regulation. We believe that by embedding critical thinking directly into the computing curriculum and professional practice, we can steer the trajectory of technology towards more equitable ends.",
        "Furthermore, we strive to demystify complex technical concepts for the broader public, empowering individuals to understand and question the digital systems that shape their reality."
      ]
    },
    whoWeAre: {
      title: "Who We Are",
      content: [
        "Founded in 2024, the Critical Computing Group (CCG) started as a small discussion circle at the university library. Today, we have grown into a formal research unit comprised of faculty members, PhD candidates, and undergraduate scholars.",
        "Our membership is open to anyone interested in the 'why' behind the 'how'. We actively collaborate with other departments including Sociology, Law, and Media Studies to ensure our technical critiques are grounded in robust social theory.",
        "We value inclusivity, intellectual humility, and interdisciplinary collaboration. We are not just critics; we are builders who believe in building better."
      ]
    },
    // Dynamic Program Pages
    "program-reading": {
      title: "Reading Group",
      content: [
        "Our Reading Group meets every Wednesday at 4 PM. We select texts that challenge conventional computing narratives, ranging from STS (Science and Technology Studies) classics to contemporary papers on AI ethics.",
        "Current reading list includes 'Race After Technology' by Ruha Benjamin and 'The Age of Surveillance Capitalism' by Shoshana Zuboff. All sessions are hybrid, allowing for remote participation."
      ]
    },
    "program-qa": {
      title: "Q/A Sessions",
      content: [
        "The Q/A series invites practitioners from the field—software engineers, ethicists, and policy makers—to answer burning questions from students and researchers.",
        "These sessions are 'off the record' to encourage candid discussions about the realities of working in the tech industry and the challenges of implementing ethical guidelines in profit-driven environments."
      ]
    },
    // Dynamic Topic Pages
    "topic-data": {
      title: "Data Annotation",
      content: [
        "Data annotation is the hidden engine of modern AI. We investigate the labor conditions of annotators, the subjectivity inherent in labeling tasks, and the impact of 'ground truth' creation on downstream model performance.",
        "Our recent work explores how cultural context affects the annotation of hate speech datasets and proposes new methodologies for 'disagreement-aware' annotation."
      ]
    },
    "topic-reasoning": {
      title: "Reasoning & Logic",
      content: [
        "Can machines truly reason, or do they merely mimic statistical patterns? This research track explores the limitations of current LLMs in logical inference and causal reasoning.",
        "We are particularly interested in the failures of 'common sense' reasoning in critical scenarios, such as medical diagnosis or legal advice."
      ]
    }
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
        { label: 'Data Annotation', id: 'topic-data' },
        { label: 'Reasoning', id: 'topic-reasoning' }
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
          <span className="font-bold text-xl text-white">CCG</span>
        </div>
        <p className="text-sm text-slate-400">
          Advancing critical perspectives in computing research and education.
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
          Department of Computer Science<br/>
          Tech University, Building 4<br/>
          Room 302
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      © 2024 Critical Computing Group. All rights reserved.
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

      {/* Newsletter / CTA Strip */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Join the Conversation</h2>
          <p className="text-slate-600 mb-8">
            Interested in our research? Subscribe to our newsletter to get updates on upcoming reading groups and events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-80"
            />
            <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
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
  // State to track the current page ('home' is default)
  const [activePage, setActivePage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderContent = () => {
    if (activePage === 'home') {
      return <HomePage setPage={setActivePage} />;
    }
    
    // Check if page exists in our data structure
    const pageData = SITE_DATA.pages[activePage];
    if (pageData) {
      return <GenericPage id={activePage} data={pageData} />;
    }
    
    // Fallback maps navigating from Home cards to general pages if exact match missing
    // E.g. clicking "Programs" card goes to first program or list (simplified here)
    if (activePage === 'programs') return <GenericPage id="program-reading" data={SITE_DATA.pages['program-reading']} />;
    if (activePage === 'topics') return <GenericPage id="topic-data" data={SITE_DATA.pages['topic-data']} />;

    return <HomePage setPage={setActivePage} />;
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <Navbar setPage={setActivePage} activePage={activePage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}