import React, { useEffect, useState } from 'react';

interface ScrollProgressIndicatorProps {
  sections: string[];
  language: string;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({ sections, language }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
      
      // Determine active section
      const sectionElements = sections.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sectionElements.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Translations for section tooltips
  const translations = {
    pt: {
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      projects: 'Projetos',
      skills: 'Habilidades',
      testimonials: 'Depoimentos',
      contact: 'Contato'
    },
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      skills: 'Skills',
      testimonials: 'Testimonials',
      contact: 'Contact'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="hidden md:block">
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{ height: `${scrollProgress}%` }}
        ></div>
        
        <div className="scroll-progress-dots">
          {sections.map((section, index) => (
            <a 
              key={index}
              href={`#${section}`}
              className={`scroll-dot ${index === activeSection ? 'active' : ''}`}
              title={t[section as keyof typeof t] || section}
              aria-label={t[section as keyof typeof t] || section}
            ></a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;