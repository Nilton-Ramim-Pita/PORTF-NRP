import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface GalleryProps {
  language: string;
}

const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for right, -1 for left
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  const translations = {
    pt: {
      title: 'Galeria',
      subtitle: 'Imagens de eventos, projetos e atividades',
      close: 'Fechar',
      prev: 'Anterior',
      next: 'Próximo',
      play: 'Reproduzir',
      pause: 'Pausar',
      viewAll: 'Ver Todas',
      categories: {
        all: 'Todas',
        events: 'Eventos',
        team: 'Equipe',
        projects: 'Projetos'
      }
    },
    en: {
      title: 'Gallery',
      subtitle: 'Images of events, projects, and activities',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      play: 'Play',
      pause: 'Pause',
      viewAll: 'View All',
      categories: {
        all: 'All',
        events: 'Events',
        team: 'Team',
        projects: 'Projects'
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Workshop de programação',
      category: 'events'
    },
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Equipe de trabalho',
      category: 'team'
    },
    {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Desenvolvimento de projeto',
      category: 'projects'
    },
    {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Apresentação de projeto',
      category: 'events'
    },
    {
      src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Trabalho no escritório',
      category: 'team'
    },
    {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Reunião de equipe',
      category: 'team'
    },
    {
      src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Desenvolvimento de aplicativo',
      category: 'projects'
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Apresentação para clientes',
      category: 'events'
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (isPlaying && !isHovering) {
      slideTimerRef.current = setTimeout(() => {
        setSlideDirection(1); // Always move right in auto-play
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
    };
  }, [currentSlide, isPlaying, isHovering, images.length]);

  // Handle keyboard navigation for slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slideshowRef.current) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === ' ') { // Spacebar
          togglePlayPause();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openImage = (src: string, index: number) => {
    setSelectedImage(src);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (selectedIndex + 1) % images.length 
      : (selectedIndex - 1 + images.length) % images.length;
    
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex].src);
  };

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Change slide with specific direction
  const changeSlide = (newSlide: number) => {
    setSlideDirection(newSlide > currentSlide ? 1 : -1);
    setCurrentSlide(newSlide);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        {/* Featured Slideshow */}
        <div 
          ref={slideshowRef}
          className="relative mb-16 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="aspect-w-16 aspect-h-7 relative h-[500px]">
            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img 
                    src={images[currentSlide].src} 
                    alt={images[currentSlide].alt} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h3 className="text-white text-2xl font-bold mb-2">{images[currentSlide].alt}</h3>
                      <p className="text-blue-200 text-lg capitalize">{images[currentSlide].category}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
              <motion.button
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSlideDirection(-1);
                  prevSlide();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t.prev}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSlideDirection(1);
                  nextSlide();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t.next}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
            
            {/* Play/Pause and View All controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
              <motion.button
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                onClick={togglePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPlaying ? t.pause : t.play}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
              
              <div className="flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-6 bg-white' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <motion.button
                className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors text-sm flex items-center"
                onClick={() => openImage(images[currentSlide].src, currentSlide)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                {t.viewAll}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Thumbnail Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
              }}
              className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''
              }`}
              onClick={() => {
                openImage(image.src, index);
                changeSlide(index);
              }}
            >
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white font-medium text-sm">{image.alt}</p>
                  <span className="text-blue-300 text-xs capitalize">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
              onClick={closeImage}
              aria-label={t.close}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                <motion.button
                  className="bg-black/50 text-white p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={t.prev}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                
                <motion.button
                  className="bg-black/50 text-white p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={t.next}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default Gallery;