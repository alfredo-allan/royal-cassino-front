import React, { useState } from 'react';
import { mockGames, mockCategories, mockPromotions } from '../data/mockData';
import GameCarousel from '../components/GameCarousel';
import GameCard from '../components/GameCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, TrendingUp, Users, Gift, Zap, Trophy } from 'lucide-react';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  const filteredGames = selectedCategory === 'todos' 
    ? mockGames 
    : mockGames.filter(game => game.category === selectedCategory);

  const featuredGames = mockGames.filter(game => game.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section com Carrossel de Promoções */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-yellow-900/80 z-10"></div>
        <GameCarousel promotions={mockPromotions} />
        
        <div className="relative z-20 container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Royal Casino
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Experimente a emoção dos melhores jogos de cassino online com gráficos incríveis 
            e chances reais de ganhar grandes prêmios
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold px-8 py-3 text-lg">
              <Gift className="mr-2 h-5 w-5" />
              Resgatar Bônus
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg">
              <Trophy className="mr-2 h-5 w-5" />
              Ver Torneios
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                150k+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Jogadores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                R$ 2M+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Prêmios Pagos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                500+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Jogos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-gray-300 text-sm md:text-base">Suporte Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jogos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Jogos em <span className="text-yellow-400">Destaque</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Os jogos mais populares e rentáveis da nossa plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredGames.map((game, index) => (
              <div key={game.id} className="relative group">
                <Badge className="absolute top-4 left-4 z-10 bg-yellow-500 text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Destaque
                </Badge>
                <GameCard game={game} featured={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias e Todos os Jogos */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore Nossos <span className="text-yellow-400">Jogos</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Encontre o jogo perfeito para você entre centenas de opções
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {mockCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold" 
                  : "border-purple-500/50 text-gray-300 hover:bg-purple-900/50 hover:text-yellow-400"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Grid de Jogos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold px-8 py-3">
              <Zap className="mr-2 h-5 w-5" />
              Ver Todos os Jogos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Promocional */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-yellow-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para <span className="text-yellow-400">Ganhar?</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de jogadores e comece sua jornada rumo à fortuna hoje mesmo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold px-8 py-4 text-lg">
              Criar Conta Grátis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg"
            >
              Jogar Agora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;