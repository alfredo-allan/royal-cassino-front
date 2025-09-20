import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Crown, ArrowLeft, Gift } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Termos obrigatórios",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        name: formData.name,
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
      };

      register(userData);
      
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo ao Royal Casino, ${userData.name}! Você ganhou R$ 1.000 de bônus!`,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
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
            Junte-se ao <span className="text-yellow-400">Royal Casino</span>
          </h1>
          <p className="text-gray-400">
            Crie sua conta grátis e ganhe R$ 1.000 de bônus de boas-vindas!
          </p>
        </div>

        {/* Bonus Banner */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Gift className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">Oferta Especial</span>
          </div>
          <p className="text-sm text-gray-300">
            R$ 1.000 grátis + 50 rodadas no seu primeiro depósito!
          </p>
        </div>

        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-700 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                  />
                </div>
              </div>

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
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 bg-gray-700 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-purple-500/30"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-300 leading-5">
                  Eu concordo com os{' '}
                  <Link to="/terms" className="text-yellow-400 hover:underline">Termos de Uso</Link>,{' '}
                  <Link to="/privacy" className="text-yellow-400 hover:underline">Política de Privacidade</Link> e{' '}
                  <Link to="/responsible-gaming" className="text-yellow-400 hover:underline">Jogo Responsável</Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold py-3"
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta Grátis'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold"
                >
                  Faça login
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/30 text-center">
              <p className="text-xs text-gray-500">
                Ao se cadastrar, você concorda que tem mais de 18 anos e está ciente dos riscos do jogo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;