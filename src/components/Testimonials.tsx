import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsProps {
  language: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;

  const translations = {
    pt: {
      title: 'Depoimentos',
      subtitle: 'O que dizem sobre mim',
      prev: 'Anterior',
      next: 'Próximo',
      testimonials: [
        {
          text: 'Nilton desenvolveu nosso site com excelência! Profissional dedicado e muito talentoso. Superou todas as nossas expectativas e entregou antes do prazo.',
          author: 'Maria Silva',
          position: 'Gerente de Marketing',
          company: 'Clínica Saúde Total',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          text: 'O sistema de gestão desenvolvido pelo Nilton revolucionou nossa loja. Agora temos controle total do estoque e das vendas. Recomendo fortemente!',
          author: 'João Pereira',
          position: 'Proprietário',
          company: 'Loja TechMoz',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          text: 'Excelente profissional! Resolveu todos os problemas do nosso sistema de forma rápida e eficiente. Sua capacidade técnica é impressionante.',
          author: 'Ana Machava',
          position: 'Diretora',
          company: 'Hotel Panorama',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
          text: 'Trabalhar com o Nilton foi uma experiência incrível. Ele entendeu perfeitamente nossas necessidades e entregou um produto de alta qualidade.',
          author: 'Carlos Mondlane',
          position: 'CEO',
          company: 'Startup Inovação',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
        },
        {
          text: 'Nilton é um profissional extremamente competente e dedicado. Seu conhecimento técnico e criatividade fizeram toda a diferença em nosso projeto.',
          author: 'Fátima Nuvunga',
          position: 'Diretora de Projetos',
          company: 'Agência Digital',
          avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
        },
        {
          text: 'Recomendo o trabalho do Nilton sem hesitação. Ele transformou nossa presença online e aumentou significativamente nossas vendas.',
          author: 'Pedro Matusse',
          position: 'Gerente Comercial',
          company: 'Loja Virtual MZ',
          avatar: 'https://randomuser.me/api/portraits/men/40.jpg'
        },
        {
          text: 'A capacidade do Nilton de resolver problemas complexos é impressionante. Ele encontrou soluções criativas para desafios que pareciam impossíveis.',
          author: 'Luísa Tembe',
          position: 'Coordenadora de TI',
          company: 'Instituto Educacional',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        {
          text: 'Nilton não apenas desenvolveu nosso sistema, mas também nos ensinou a utilizá-lo de forma eficiente. Seu suporte pós-entrega é excepcional.',
          author: 'António Cossa',
          position: 'Diretor Financeiro',
          company: 'Empresa de Logística',
          avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
        },
        {
          text: 'Profissionalismo, pontualidade e qualidade definem o trabalho do Nilton. Estamos extremamente satisfeitos com os resultados obtidos.',
          author: 'Sofia Machel',
          position: 'Gerente de Produto',
          company: 'Empresa de Software',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
      ]
    },
    en: {
      title: 'Testimonials',
      subtitle: 'What they say about me',
      prev: 'Previous',
      next: 'Next',
      testimonials: [
        {
          text: 'Nilton developed our website with excellence! Dedicated and very talented professional. He exceeded all our expectations and delivered ahead of schedule.',
          author: 'Maria Silva',
          position: 'Marketing Manager',
          company: 'Total Health Clinic',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          text: 'The management system developed by Nilton revolutionized our store. Now we have total control of inventory and sales. I strongly recommend!',
          author: 'João Pereira',
          position: 'Owner',
          company: 'TechMoz Store',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          text: 'Excellent professional! Solved all our system problems quickly and efficiently. His technical ability is impressive.',
          author: 'Ana Machava',
          position: 'Director',
          company: 'Panorama Hotel',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
          text: 'Working with Nilton was an incredible experience. He perfectly understood our needs and delivered a high-quality product.',
          author: 'Carlos Mondlane',
          position: 'CEO',
          company: 'Innovation Startup',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
        },
        {
          text: 'Nilton is an extremely competent and dedicated professional. His technical knowledge and creativity made all the difference in our project.',
          author: 'Fátima Nuvunga',
          position: 'Project Director',
          company: 'Digital Agency',
          avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
        },
        {
          text: 'I recommend Nilton\'s work without hesitation. He transformed our online presence and significantly increased our sales.',
          author: 'Pedro Matusse',
          position: 'Commercial Manager',
          company: 'MZ Virtual Store',
          avatar: 'https://randomuser.me/api/portraits/men/40.jpg'
        },
        {
          text: 'Nilton\'s ability to solve complex problems is impressive. He found creative solutions to challenges that seemed impossible.',
          author: 'Luísa Tembe',
          position: 'IT Coordinator',
          company: 'Educational Institute',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        {
          text: 'Nilton not only developed our system but also taught us how to use it efficiently. His post-delivery support is exceptional.',
          author: 'António Cossa',
          position: 'Financial Director',
          company: 'Logistics Company',
          avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
        },
        {
          text: 'Professionalism, punctuality, and quality define Nilton\'s work. We are extremely satisfied with the results obtained.',
          author: 'Sofia Machel',
          position: 'Product Manager',
          company: 'Software Company',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];
  const totalPages = Math.ceil(t.testimonials.length / testimonialsPerPage);
  const currentTestimonials = t.testimonials.slice(
    currentPage * testimonialsPerPage, 
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-200">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {currentTestimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative overflow-hidden h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Quote size={128} />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">{testimonial.text}</p>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-600">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-12 space-x-4">
            <motion.button
              onClick={prevPage}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.prev}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentPage ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
                  } transition-all duration-300`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextPage}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.next}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;