import React, { useState } from 'react';
import { MapPin, Linkedin, Github, Facebook, Instagram, Mail, Phone } from 'lucide-react';

interface ContactProps {
  language: string;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const translations = {
    pt: {
      title: 'Contato',
      subtitle: 'Entre em contato comigo',
      location: 'Localização',
      locationValue: 'Moçambique',
      form: {
        name: 'Nome',
        email: 'E-mail',
        subject: 'Assunto',
        message: 'Mensagem',
        send: 'Enviar Mensagem'
      },
      formSuccess: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      scanQR: 'Escaneie para WhatsApp'
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in touch with me',
      location: 'Location',
      locationValue: 'Mozambique',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      formSuccess: 'Message sent successfully! I will contact you soon.',
      scanQR: 'Scan for WhatsApp'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-bold">{t.location}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t.locationValue}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <a 
                  href="mailto:ramimpita65@gmail.com" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  ramimpita65@gmail.com
                </a>
                <a 
                  href="tel:+258876450559" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +258 87 645 0559
                </a>
                <a 
                  href="tel:+258844060984" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +258 84 406 0984
                </a>
              </div>
              
              <div className="flex space-x-4 mb-8">
                <a 
                  href="https://linkedin.com/in/nilton-ramim-a29bb0272" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </a>
                <a 
                  href="https://github.com/Niltonpro12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
              </div>
              
              <div className="text-center">
                <p className="mb-4 font-medium">{t.scanQR}</p>
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/258876450559`} 
                    alt="WhatsApp QR Code" 
                    className="w-32 h-32"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <form 
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                  {t.formSuccess}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    {t.form.name}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {t.form.email}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 font-medium">
                  {t.form.subject}
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t.form.message}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {t.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;