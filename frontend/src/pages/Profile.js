import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { 
  User, 
  Mail, 
  Calendar,
  Coins,
  Trophy,
  TrendingUp,
  Shield,
  Settings,
  History,
  Gift,
  Star,
  Target,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  const mockGameHistory = [
    { id: 1, game: 'Royal Blackjack', result: 'win', amount: 250, date: '2024-01-15 14:30' },
    { id: 2, game: 'Golden Roulette', result: 'loss', amount: -100, date: '2024-01-15 13:45' },
    { id: 3, game: 'Mega Fortune Slots', result: 'win', amount: 500, date: '2024-01-14 19:20' },
    { id: 4, game: 'Diamond Poker', result: 'win', amount: 150, date: '2024-01-14 16:15' },
    { id: 5, game: 'Lightning Baccarat', result: 'loss', amount: -75, date: '2024-01-13 21:10' }
  ];

  const mockTransactions = [
    { id: 1, type: 'deposit', amount: 1000, method: 'PIX', date: '2024-01-15 10:00' },
    { id: 2, type: 'bonus', amount: 500, method: 'Bônus de Boas-vindas', date: '2024-01-15 10:01' },
    { id: 3, type: 'withdrawal', amount: -200, method: 'PIX', date: '2024-01-14 15:30' },
    { id: 4, type: 'deposit', amount: 500, method: 'Cartão', date: '2024-01-13 12:00' }
  ];

  const stats = {
    totalGames: 127,
    totalWins: 78,
    totalLosses: 49,
    winRate: '61.4%',
    totalWagered: 15750,
    totalWon: 18250,
    biggestWin: 1250,
    currentStreak: 3
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Profile */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-yellow-900/50 border-purple-500/30 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-yellow-400/50">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-purple-600 text-white text-2xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 -right-2 bg-yellow-500 text-black font-semibold">
                  {user.level || 'Bronze'}
                </Badge>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-gray-300 mb-2">{user.email}</p>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2 bg-purple-900/50 rounded-lg px-3 py-1">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">
                      R$ {user.balance?.toLocaleString('pt-BR') || '0'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Membro desde {new Date(user.joinedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-purple-500/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Histórico
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Vitórias</p>
                      <p className="text-2xl font-bold text-white">{stats.totalWins}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Taxa de Vitória</p>
                      <p className="text-2xl font-bold text-white">{stats.winRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Total Ganho</p>
                      <p className="text-2xl font-bold text-white">R$ {stats.totalWon.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Sequência Atual</p>
                      <p className="text-2xl font-bold text-white">{stats.currentStreak} vitórias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <History className="mr-2 h-5 w-5" />
                    Jogos Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockGameHistory.slice(0, 5).map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${game.result === 'win' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <div>
                            <p className="text-white font-medium">{game.game}</p>
                            <p className="text-sm text-gray-400">{game.date}</p>
                          </div>
                        </div>
                        <div className={`font-semibold ${game.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {game.result === 'win' ? '+' : ''}R$ {Math.abs(game.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Gift className="mr-2 h-5 w-5" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                      <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Primeiro Depósito</p>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                      <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">100 Vitórias</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                      <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Sequência de 5</p>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                      <Coins className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">R$ 10k Apostado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Estatísticas Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total de Jogos</span>
                      <span className="text-white font-semibold">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vitórias</span>
                      <span className="text-green-400 font-semibold">{stats.totalWins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Derrotas</span>
                      <span className="text-red-400 font-semibold">{stats.totalLosses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxa de Vitória</span>
                      <span className="text-yellow-400 font-semibold">{stats.winRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Apostado</span>
                      <span className="text-white font-semibold">R$ {stats.totalWagered.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Ganho</span>
                      <span className="text-green-400 font-semibold">R$ {stats.totalWon.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Maior Vitória</span>
                      <span className="text-yellow-400 font-semibold">R$ {stats.biggestWin.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lucro Líquido</span>
                      <span className="text-green-400 font-semibold">R$ {(stats.totalWon - stats.totalWagered).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Sequências</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sequência Atual</span>
                      <span className="text-green-400 font-semibold">{stats.currentStreak} vitórias</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Melhor Sequência</span>
                      <span className="text-yellow-400 font-semibold">8 vitórias</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pior Sequência</span>
                      <span className="text-red-400 font-semibold">4 derrotas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Histórico de Jogos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockGameHistory.map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${game.result === 'win' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <div>
                            <p className="text-white font-medium">{game.game}</p>
                            <p className="text-sm text-gray-400 flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {game.date}
                            </p>
                          </div>
                        </div>
                        <div className={`font-semibold flex items-center ${game.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {game.result === 'win' ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                          R$ {Math.abs(game.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            transaction.type === 'deposit' || transaction.type === 'bonus' ? 'bg-green-400' : 'bg-red-400'
                          }`}></div>
                          <div>
                            <p className="text-white font-medium capitalize">{transaction.type === 'deposit' ? 'Depósito' : transaction.type === 'withdrawal' ? 'Saque' : 'Bônus'}</p>
                            <p className="text-sm text-gray-400">{transaction.method}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'deposit' || transaction.type === 'bonus' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={!isEditing}
                        className="bg-gray-700 border-purple-500/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                        className="bg-gray-700 border-purple-500/30 text-white"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Salvar
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white">Zona de Perigo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    <span className="text-gray-300">Ações irreversíveis da conta</span>
                  </div>
                  <Button 
                    onClick={logout}
                    variant="outline" 
                    className="border-red-500 text-red-400 hover:bg-red-900/20"
                  >
                    Sair da Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;