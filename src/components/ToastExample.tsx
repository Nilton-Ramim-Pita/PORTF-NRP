import React from 'react';
import { useToast } from '../context/ToastContext';

interface ToastExampleProps {
  language: string;
}

const ToastExample: React.FC<ToastExampleProps> = ({ language }) => {
  const { 
    showToast, 
    showWelcomeToast, 
    showFormSubmitToast, 
    showCVDownloadToast, 
    showDarkModeToast 
  } = useToast();

  const translations = {
    pt: {
      title: 'Exemplos de Notificações',
      subtitle: 'Clique nos botões para ver as notificações',
      welcome: 'Boas-vindas',
      form: 'Formulário Enviado',
      cv: 'CV Baixado',
      dark: 'Modo Escuro',
      light: 'Modo Claro',
      custom: 'Personalizada',
      customSuccess: 'Sucesso Personalizado',
      customWarning: 'Aviso Personalizado',
      customError: 'Erro Personalizado'
    },
    en: {
      title: 'Toast Notification Examples',
      subtitle: 'Click the buttons to see the notifications',
      welcome: 'Welcome',
      form: 'Form Submitted',
      cv: 'CV Downloaded',
      dark: 'Dark Mode',
      light: 'Light Mode',
      custom: 'Custom',
      customSuccess: 'Custom Success',
      customWarning: 'Custom Warning',
      customError: 'Custom Error'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={showWelcomeToast}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.welcome}
          </button>
          
          <button 
            onClick={showFormSubmitToast}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {t.form}
          </button>
          
          <button 
            onClick={showCVDownloadToast}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {t.cv}
          </button>
          
          <button 
            onClick={() => showDarkModeToast(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            {t.dark}
          </button>
          
          <button 
            onClick={() => showDarkModeToast(false)}
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            {t.light}
          </button>
          
          <button 
            onClick={() => showToast('Esta é uma notificação personalizada!', 'info')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t.custom}
          </button>
          
          <button 
            onClick={() => showToast('Operação realizada com sucesso!', 'success')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {t.customSuccess}
          </button>
          
          <button 
            onClick={() => showToast('Atenção! Isto é um aviso.', 'warning')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {t.customWarning}
          </button>
          
          <button 
            onClick={() => showToast('Erro! Algo deu errado.', 'error')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {t.customError}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToastExample;