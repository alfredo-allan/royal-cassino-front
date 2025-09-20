import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Cookie, Settings, Shield, BarChart3 } from 'lucide-react';

const CookieModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show modal after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsOpen(false);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: Date.now()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: Date.now()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsOpen(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-gray-900 border-purple-500/30 text-white">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Cookie className="h-6 w-6 text-yellow-400" />
            <DialogTitle className="text-xl font-bold">
              Política de Cookies
            </DialogTitle>
          </div>
        </DialogHeader>

        {!showSettings ? (
          <div className="space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Utilizamos cookies para melhorar sua experiência, personalizar conteúdo, 
              analisar o tráfego e fornecer recursos de mídia social. Alguns cookies são 
              essenciais para o funcionamento do site.
            </p>

            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-green-400">Jogo Responsável</span>
              </div>
              <p className="text-sm text-gray-300">
                Utilizamos cookies para monitorar padrões de jogo e ajudar na prevenção 
                de vício em jogos, garantindo um ambiente seguro.
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <Button
                onClick={handleAcceptAll}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold"
              >
                Aceitar Todos os Cookies
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  className="flex-1 border-purple-500/50 text-gray-300 hover:bg-purple-900/50"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Personalizar
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="flex-1 border-gray-500/50 text-gray-400 hover:bg-gray-800/50"
                >
                  Rejeitar Opcionais
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Ao continuar navegando, você concorda com nossa{' '}
              <a href="#" className="text-yellow-400 hover:underline">Política de Privacidade</a>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={() => setShowSettings(false)}
              variant="ghost"
              className="text-gray-400 hover:text-white p-0"
            >
              ← Voltar
            </Button>

            <div className="space-y-4">
              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Cookies Necessários</h4>
                    <p className="text-xs text-gray-400">Essenciais para o funcionamento do site</p>
                  </div>
                  <div className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      <h4 className="font-semibold text-white">Cookies Analíticos</h4>
                    </div>
                    <p className="text-xs text-gray-400">Ajudam a entender como você usa o site</p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? 'bg-yellow-500 justify-end' : 'bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Cookies de Marketing</h4>
                    <p className="text-xs text-gray-400">Personalizam anúncios e promoções</p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.marketing ? 'bg-yellow-500 justify-end' : 'bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Cookies Funcionais</h4>
                    <p className="text-xs text-gray-400">Melhoram a funcionalidade do site</p>
                  </div>
                  <button
                    onClick={() => togglePreference('functional')}
                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.functional ? 'bg-yellow-500 justify-end' : 'bg-gray-600 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAcceptSelected}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold"
            >
              Salvar Preferências
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CookieModal;