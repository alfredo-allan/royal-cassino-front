import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Sun, Moon, User, LogOut, Crown, Coins, Settings } from 'lucide-react';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const Header = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 dark:bg-black/95 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Crown className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Royal Casino
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Início
            </Link>
            <Link to="/games" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Jogos
            </Link>
            <Link to="/promotions" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Promoções
            </Link>
            <Link to="/tournaments" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Torneios
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-yellow-400 hover:bg-purple-900/50"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-purple-900/50 rounded-lg px-3 py-1">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">
                    R$ {user.balance?.toLocaleString('pt-BR') || '0'}
                  </span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-yellow-400/50">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-800 border-purple-500/30" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-purple-500/30" />
                    <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-purple-900/50">
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-purple-900/50">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-purple-500/30" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-purple-900/50"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => setShowRegisterModal(true)}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Header;