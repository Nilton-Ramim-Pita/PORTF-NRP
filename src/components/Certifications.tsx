import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface CertificationsProps {
  language: string;
}

const Certifications: React.FC<CertificationsProps> = ({ language }) => {
  const translations = {
    pt: {
      title: 'Certificações e Cursos',
      subtitle: 'Minha formação contínua',
      viewCertificate: 'Ver Certificado',
      certifications: [
        {
          title: 'Curso de Redes Cisco - CCNA',
          issuer: 'Cisco',
          date: '2022',
          description: 'Certificação em redes de computadores e infraestrutura de TI.',
          skills: ['Roteamento e Switching', 'Segurança de Rede', 'Protocolos TCP/IP', 'Configuração de Equipamentos'],
          certificateUrl: '#'
        },
        {
          title: 'Certificação Google em Marketing Digital',
          issuer: 'Google',
          date: '2021',
          description: 'Curso completo de marketing digital e estratégias de SEO.',
          skills: ['SEO', 'Google Ads', 'Analytics', 'Marketing de Conteúdo'],
          certificateUrl: '#'
        },
        {
          title: 'Desenvolvimento Web Full Stack',
          issuer: 'Universidade Católica de Moçambique',
          date: '2020',
          description: 'Curso de desenvolvimento web com foco em tecnologias front-end e back-end.',
          skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'Banco de Dados'],
          certificateUrl: '#'
        },
        {
          title: 'Programação em Python',
          issuer: 'Instituto Nacional de Governo Eletrônico',
          date: '2019',
          description: 'Curso avançado de programação em Python para automação e análise de dados.',
          skills: ['Python', 'Pandas', 'Automação', 'Análise de Dados'],
          certificateUrl: '#'
        }
      ]
    },
    en: {
      title: 'Certifications and Courses',
      subtitle: 'My continuous education',
      viewCertificate: 'View Certificate',
      certifications: [
        {
          title: 'Cisco Networks Course - CCNA',
          issuer: 'Cisco',
          date: '2022',
          description: 'Certification in computer networks and IT infrastructure.',
          skills: ['Routing & Switching', 'Network Security', 'TCP/IP Protocols', 'Equipment Configuration'],
          certificateUrl: '#'
        },
        {
          title: 'Google Digital Marketing Certification',
          issuer: 'Google',
          date: '2021',
          description: 'Complete course in digital marketing and SEO strategies.',
          skills: ['SEO', 'Google Ads', 'Analytics', 'Content Marketing'],
          certificateUrl: '#'
        },
        {
          title: 'Full Stack Web Development',
          issuer: 'Catholic University of Mozambique',
          date: '2020',
          description: 'Web development course focusing on front-end and back-end technologies.',
          skills: ['HTML/CSS', 'JavaScript', 'Node.js', 'Databases'],
          certificateUrl: '#'
        },
        {
          title: 'Python Programming',
          issuer: 'National Institute of Electronic Government',
          date: '2019',
          description: 'Advanced Python programming course for automation and data analysis.',
          skills: ['Python', 'Pandas', 'Automation', 'Data Analysis'],
          certificateUrl: '#'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tiktok-gradient-text">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] mx-auto mt-4"></div>
        </ScrollReveal>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {t.certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="tiktok-card relative overflow-hidden group"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-[#fe2c55] transition-colors">{cert.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <span className="mr-3">{cert.issuer}</span>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-[#25f4ee]" />
                        {cert.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">{cert.description}</p>
                
                <div className="mb-4 flex-grow">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2 text-[#25f4ee]">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex}
                        className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        variants={skillVariants}
                        custom={skillIndex}
                      >
                        <CheckCircle className="w-3 h-3 mr-1 text-[#fe2c55]" />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href={cert.certificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-[#fe2c55] hover:text-[#ff4d6d] transition-colors"
                  >
                    {t.viewCertificate}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#fe2c55]/10 to-[#25f4ee]/10 rounded-bl-full -z-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#25f4ee]/10 to-[#fe2c55]/10 rounded-tr-full -z-10"></div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#fe2c55]/30 rounded-lg transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;