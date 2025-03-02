import React, { createContext, useContext, ReactNode } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextProps {
  showWelcomeToast: () => void;
  showDarkModeToast: (isDarkMode: boolean) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  language: string;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, language }) => {
  const translations = {
    pt: {
      welcome: 'Olá! Bem-vindo ao meu portfólio. Explore meus projetos e entre em contato!',
      darkModeOn: 'Modo escuro ativado. Ajuste suas preferências no menu.',
      darkModeOff: 'Modo claro ativado. Ajuste suas preferências no menu.'
    },
    en: {
      welcome: 'Hello! Welcome to my portfolio. Explore my projects and get in touch!',
      darkModeOn: 'Dark mode activated. Adjust your preferences in the menu.',
      darkModeOff: 'Light mode activated. Adjust your preferences in the menu.'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Custom toast configuration
  const toastConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontSize: '14px'
    }
  };

  const showWelcomeToast = () => {
    toast.info(t.welcome, {
      ...toastConfig,
      icon: '👋',
      autoClose: 4000
    });
  };

  const showDarkModeToast = (isDarkMode: boolean) => {
    toast.info(isDarkMode ? t.darkModeOn : t.darkModeOff, {
      ...toastConfig,
      icon: isDarkMode ? '🌙' : '☀️',
      autoClose: 2000,
      position: "top-right"
    });
  };

  return (
    <ToastContext.Provider value={{ 
      showWelcomeToast, 
      showDarkModeToast 
    }}>
      {children}
      <ToastContainer limit={1} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};