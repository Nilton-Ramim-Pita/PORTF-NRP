import React from 'react';
import { Download } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ResumeProps {
  language: string;
}

const Resume: React.FC<ResumeProps> = ({ language }) => {
  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/nilton-cv.pdf';
    link.download = language === 'pt' ? 'Nilton-Ramim-Pita-CV.pdf' : 'Nilton-Ramim-Pita-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show alert for download confirmation
    alert(language === 'pt' ? 
      'Obrigado por baixar meu currículo! Qualquer dúvida, entre em contato.' : 
      'Thank you for downloading my resume! Feel free to contact me with any questions.');
  };

  const translations = {
    pt: {
      title: 'Currículo',
      subtitle: 'Minha experiência profissional',
      download: 'Baixar CV',
      experience: 'Experiência',
      education: 'Educação',
      skills: 'Habilidades',
      languages: 'Idiomas',
      experiences: [
        {
          position: 'Programador',
          company: 'Nexus JR',
          period: '2023 - Presente',
          description: 'Desenvolvimento de aplicações web e sistemas de gestão para empresas.'
        },
        {
          position: 'Gerente de Vendas',
          company: 'NCANGAZA MULTISERVICES LDA',
          period: '2021 - 2023',
          description: 'Gestão de equipe de vendas e desenvolvimento de estratégias comerciais.'
        },
        {
          position: 'Professor e Técnico de Informática',
          company: 'Instituto Nacional de Governo Eletrônico (INAGE, IP)',
          period: '2019 - 2021',
          description: 'Ensino de informática e suporte técnico.'
        }
      ],
      educations: [
        {
          degree: 'Ensino Superior',
          institution: 'Universidade Católica de Moçambique (UCM)',
          period: '2018 - 2022'
        },
        {
          degree: 'Ensino Secundário',
          institution: 'Escola Secundária do Songo e Escola da HCB',
          period: '2014 - 2017'
        },
        {
          degree: 'Ensino Primário',
          institution: 'Escola Primária da Liberdade de Songo',
          period: '2006 - 2013'
        }
      ],
      languagesList: [
        { name: 'Português', level: 'Fluente' },
        { name: 'Nhungue', level: 'Fluente' },
        { name: 'Inglês', level: 'Básico' }
      ]
    },
    en: {
      title: 'Resume',
      subtitle: 'My professional experience',
      download: 'Download CV',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      experiences: [
        {
          position: 'Programmer',
          company: 'Nexus JR',
          period: '2023 - Present',
          description: 'Development of web applications and management systems for companies.'
        },
        {
          position: 'Sales Manager',
          company: 'NCANGAZA MULTISERVICES LDA',
          period: '2021 - 2023',
          description: 'Management of sales team and development of commercial strategies.'
        },
        {
          position: 'Teacher and IT Technician',
          company: 'National Institute of Electronic Government (INAGE, IP)',
          period: '2019 - 2021',
          description: 'Teaching computer science and technical support.'
        }
      ],
      educations: [
        {
          degree: 'Higher Education',
          institution: 'Catholic University of Mozambique (UCM)',
          period: '2018 - 2022'
        },
        {
          degree: 'Secondary Education',
          institution: 'Songo Secondary School and HCB School',
          period: '2014 - 2017'
        },
        {
          degree: 'Primary Education',
          institution: 'Liberdade de Songo Primary School',
          period: '2006 - 2013'
        }
      ],
      languagesList: [
        { name: 'Portuguese', level: 'Fluent' },
        { name: 'Nhungue', level: 'Fluent' },
        { name: 'English', level: 'Basic' }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          <button 
            onClick={handleDownloadCV}
            className="inline-flex items-center mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Download className="w-5 h-5 mr-2" />
            {t.download}
          </button>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal delay={0.2} direction="left">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-600 rounded-full mr-3"></span>
              {t.experience}
            </h3>
            
            <div className="space-y-8">
              {t.experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-blue-600">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <h4 className="text-xl font-bold">{exp.position}</h4>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">{exp.company} | {exp.period}</p>
                  <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          
          <div className="space-y-12">
            <ScrollReveal delay={0.4} direction="right">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-600 rounded-full mr-3"></span>
                {t.education}
              </h3>
              
              <div className="space-y-8 mb-12">
                {t.educations.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-purple-600">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full"></div>
                    <h4 className="text-xl font-bold">{edu.degree}</h4>
                    <p className="text-purple-600 dark:text-purple-400 mb-2">{edu.institution} | {edu.period}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6} direction="right">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-600 rounded-full mr-3"></span>
                {t.languages}
              </h3>
              
              <div className="space-y-4">
                {t.languagesList.map((lang, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                    <span className="font-medium">{lang.name}</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">({lang.level})</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;