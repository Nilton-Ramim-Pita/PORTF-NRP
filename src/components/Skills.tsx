import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import FloatingElements from './FloatingElements';

interface SkillsProps {
  language: string;
}

const Skills: React.FC<SkillsProps> = ({ language }) => {
  const translations = {
    pt: {
      title: 'Habilidades',
      subtitle: 'Minhas competências',
      technical: 'Habilidades Técnicas',
      soft: 'Habilidades Interpessoais',
      skills: {
        technical: [
          { name: 'VB.NET', level: 90 },
          { name: 'Python', level: 85 },
          { name: 'Redes', level: 80 },
          { name: 'Flutter', level: 75 },
          { name: 'HTML/CSS', level: 85 },
          { name: 'JavaScript', level: 70 },
          { name: 'SQL', level: 80 },
          { name: 'Montagem e Reparação', level: 95 }
        ],
        soft: [
          { name: 'Vendas', level: 90 },
          { name: 'Gestão de Negócios', level: 85 },
          { name: 'Liderança', level: 80 },
          { name: 'Trabalho em Equipe', level: 90 },
          { name: 'Comunicação', level: 85 },
          { name: 'Resolução de Problemas', level: 90 },
          { name: 'Adaptabilidade', level: 85 },
          { name: 'Criatividade', level: 80 }
        ]
      }
    },
    en: {
      title: 'Skills',
      subtitle: 'My competencies',
      technical: 'Technical Skills',
      soft: 'Soft Skills',
      skills: {
        technical: [
          { name: 'VB.NET', level: 90 },
          { name: 'Python', level: 85 },
          { name: 'Networks', level: 80 },
          { name: 'Flutter', level: 75 },
          { name: 'HTML/CSS', level: 85 },
          { name: 'JavaScript', level: 70 },
          { name: 'SQL', level: 80 },
          { name: 'Assembly & Repair', level: 95 }
        ],
        soft: [
          { name: 'Sales', level: 90 },
          { name: 'Business Management', level: 85 },
          { name: 'Leadership', level: 80 },
          { name: 'Teamwork', level: 90 },
          { name: 'Communication', level: 85 },
          { name: 'Problem Solving', level: 90 },
          { name: 'Adaptability', level: 85 },
          { name: 'Creativity', level: 80 }
        ]
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <FloatingElements 
        count={15} 
        minSize={10} 
        maxSize={30} 
        colors={['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']}
      >
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row gap-12">
            <ScrollReveal className="md:w-1/2" direction="left">
              <h3 className="text-2xl font-bold mb-6">{t.technical}</h3>
              <div className="space-y-6">
                {t.skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="md:w-1/2" direction="right">
              <h3 className="text-2xl font-bold mb-6">{t.soft}</h3>
              <div className="space-y-6">
                {t.skills.soft.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </FloatingElements>
    </section>
  );
};

export default Skills;