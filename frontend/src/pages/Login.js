import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Crown, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        name: 'Jogador VIP',
        email: formData.email,
        balance: 2500,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        level: 'Gold',
        joinedAt: new Date().toISOString()
      };

      login(userData);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${userData.name}!`,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao início
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full">
              <Crown className="h-12 w-12 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Entrar no <span className="text-yellow-400">Royal Casino</span>
          </h1>
          <p className="text-gray-400">
            Faça login para acessar sua conta e continuar jogando
          </p>
        </div>

        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-700 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 bg-gray-700 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input type="checkbox" className="rounded border-purple-500/30" />
                  <span>Lembrar de mim</span>
                </label>
                <Link to="/forgot-password" className="text-yellow-400 hover:text-yellow-300">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold py-3"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Não tem uma conta?{' '}
                <Link
                  to="/register"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold"
                >
                  Cadastre-se grátis
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/30 text-center">
              <p className="text-xs text-gray-500">
                Ao fazer login, você concorda com nossos{' '}
                <Link to="/terms" className="text-yellow-400 hover:underline">Termos de Uso</Link> e{' '}
                <Link to="/privacy" className="text-yellow-400 hover:underline">Política de Privacidade</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;