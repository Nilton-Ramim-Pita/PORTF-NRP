import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FAQProps {
  language: string;
}

const FAQ: React.FC<FAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const translations = {
    pt: {
      title: 'Perguntas Frequentes',
      subtitle: 'Respostas para dúvidas comuns',
      faqs: [
        {
          question: 'Quais são os prazos para desenvolvimento de um website?',
          answer: 'O prazo para desenvolvimento de um website varia de acordo com a complexidade do projeto. Em média, um site institucional simples pode levar de 2 a 3 semanas, enquanto projetos mais complexos com sistemas integrados podem levar de 1 a 3 meses.'
        },
        {
          question: 'Como funciona o processo de desenvolvimento de um sistema?',
          answer: 'O processo começa com uma reunião para entender as necessidades do cliente. Em seguida, é feito um levantamento de requisitos, desenvolvimento de protótipos, implementação, testes e, por fim, a entrega do sistema. Durante todo o processo, o cliente é consultado para garantir que o sistema atenda às suas expectativas.'
        },
        {
          question: 'Quais são as formas de pagamento aceitas?',
          answer: 'Aceito pagamentos via transferência bancária, M-Pesa, e-Mola e pagamento parcelado para projetos maiores. Geralmente, é solicitado um adiantamento de 50% para iniciar o projeto e o restante na entrega.'
        },
        {
          question: 'Você oferece suporte após a entrega do projeto?',
          answer: 'Sim, ofereço suporte técnico por 3 meses após a entrega do projeto, incluindo correções de bugs e pequenos ajustes. Após esse período, é possível contratar um plano de manutenção mensal.'
        },
        {
          question: 'Como posso entrar em contato para um orçamento?',
          answer: 'Você pode entrar em contato através do WhatsApp, e-mail ou pelo formulário de contato neste site. Respondo em até 24 horas úteis com um orçamento personalizado para o seu projeto.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions',
      faqs: [
        {
          question: 'What are the deadlines for website development?',
          answer: 'The deadline for website development varies according to the complexity of the project. On average, a simple institutional website can take 2 to 3 weeks, while more complex projects with integrated systems can take 1 to 3 months.'
        },
        {
          question: 'How does the system development process work?',
          answer: 'The process begins with a meeting to understand the client\'s needs. Then, a requirements gathering, prototype development, implementation, testing, and finally, system delivery. Throughout the process, the client is consulted to ensure that the system meets their expectations.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'I accept payments via bank transfer, M-Pesa, e-Mola, and installment payment for larger projects. Generally, a 50% advance is requested to start the project and the rest upon delivery.'
        },
        {
          question: 'Do you offer support after project delivery?',
          answer: 'Yes, I offer technical support for 3 months after project delivery, including bug fixes and small adjustments. After this period, it is possible to hire a monthly maintenance plan.'
        },
        {
          question: 'How can I contact you for a quote?',
          answer: 'You can contact me through WhatsApp, email, or the contact form on this website. I respond within 24 business hours with a personalized quote for your project.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {t.faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                  openIndex === index ? 'shadow-lg' : ''
                }`}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <button 
                  className={`w-full flex justify-between items-center p-6 text-left transition-colors ${
                    openIndex === index 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                   onClick={() => toggleFAQ(index)}
                   aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-lg pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 p-2 rounded-full ${
                      openIndex === index 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;