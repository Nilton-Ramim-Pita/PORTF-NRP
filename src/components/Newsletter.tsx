import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface NewsletterProps {
  language: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const translations = {
    pt: {
      title: 'Newsletter',
      subtitle: 'Inscreva-se para receber novidades',
      description: 'Receba atualizações sobre tecnologia, novos projetos e dicas exclusivas diretamente no seu e-mail.',
      placeholder: 'Seu melhor e-mail',
      button: 'Inscrever-se',
      success: 'Obrigado por se inscrever! Em breve você receberá nossas novidades.',
      benefits: [
        'Conteúdo exclusivo sobre tecnologia',
        'Dicas de programação e design',
        'Novidades sobre projetos e serviços',
        'Promoções especiais para assinantes'
      ]
    },
    en: {
      title: 'Newsletter',
      subtitle: 'Subscribe to receive updates',
      description: 'Receive updates about technology, new projects, and exclusive tips directly in your email.',
      placeholder: 'Your best email',
      button: 'Subscribe',
      success: 'Thank you for subscribing! You will soon receive our updates.',
      benefits: [
        'Exclusive content about technology',
        'Programming and design tips',
        'News about projects and services',
        'Special promotions for subscribers'
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal className="md:w-1/2" direction="left">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <p className="text-lg mb-6">{t.description}</p>
              
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholder}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <motion.button 
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t.button}
                  </motion.button>
                </form>
              ) : (
                <motion.div 
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {t.success}
                </motion.div>
              )}
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="md:w-1/2" direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ✨
                </motion.span> 
                {language === 'pt' ? 'Benefícios' : 'Benefits'}
              </h3>
              
              <ul className="space-y-4">
                {t.benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-1"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                    </motion.div>
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;