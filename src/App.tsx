import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Lazy load components to improve initial load time
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Technologies = lazy(() => import('./components/Technologies'));
const Certifications = lazy(() => import('./components/Certifications'));
const Timeline = lazy(() => import('./components/Timeline'));
const FAQ = lazy(() => import('./components/FAQ'));
const Gallery = lazy(() => import('./components/Gallery'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Partnerships = lazy(() => import('./components/Partnerships'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const InitialsAnimation = lazy(() => import('./components/InitialsAnimation'));
const NetworkBackground = lazy(() => import('./components/NetworkBackground'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-[#fe2c55] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Main App content component
const AppContent: React.FC = () => {
  const { darkMode } = useTheme();
  const [language, setLanguage] = useState('pt'); // 'pt' for Portuguese, 'en' for English
  const [showAnimation, setShowAnimation] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sections for the scroll progress indicator
  const mainSections = ['home', 'about', 'services', 'projects', 'skills', 'testimonials', 'contact'];

  useEffect(() => {
    // Track scroll position for parallax effects - with throttling for performance
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 50) { // Only update every 50ms
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mark as loaded after a delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <div className="app-container">
      <Suspense fallback={<LoadingFallback />}>
        {showAnimation && (
          <InitialsAnimation onAnimationComplete={handleAnimationComplete} />
        )}
        
        <div 
          className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative"
          style={{ 
            opacity: showAnimation ? 0 : 1,
            transition: 'opacity 0.5s'
          }}
        >
          {/* Network background for the entire app - only load when needed */}
          {isLoaded && !showAnimation && (
            <NetworkBackground 
              darkMode={darkMode} 
              pointCount={60} 
              lineDistance={150} 
              speed={0.2} 
              interactive={false}
            />
          )}
          
          {/* Fixed header */}
          <Header 
            language={language}
            changeLanguage={changeLanguage}
          />
          
          {/* Theme Toggle Button */}
          <ThemeToggle />
          
          {/* Scroll progress indicator */}
          {isLoaded && !showAnimation && (
            <ScrollProgressIndicator sections={mainSections} language={language} />
          )}
          
          <main className="relative z-10">
            <Hero language={language} darkMode={darkMode} />
            
            {/* About section with scroll reveal */}
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#fe2c55] border-t-transparent rounded-full animate-spin"></div></div>}>
              <About language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Services language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Projects language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Skills language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Testimonials language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Partnerships language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Technologies language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Certifications language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Timeline language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Newsletter language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <FAQ language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Gallery language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Resume language={language} />
            </Suspense>
            
            <Suspense fallback={<div className="h-96"></div>}>
              <Contact language={language} />
            </Suspense>
          </main>
          
          <Suspense fallback={<div className="h-20"></div>}>
            <Footer language={language} />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
};

// Root App component with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;