import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Coins, Play, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GameCard = ({ game, featured = false }) => {
  const { user } = useAuth();

  const handlePlayGame = () => {
    if (!user) {
      // Trigger login modal or redirect to login
      console.log('User needs to login to play');
      return;
    }
    // Handle game play logic
    console.log('Playing game:', game.title);
  };

  return (
    <Card className="group relative overflow-hidden bg-gray-800/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="relative overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handlePlayGame}
            size="lg"
            className="bg-yellow-500/90 hover:bg-yellow-400 text-black font-bold backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5" />
            Jogar Agora
          </Button>
        </div>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-purple-600/80 text-white backdrop-blur-sm">
          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
        </Badge>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white/70 hover:text-red-400 hover:bg-black/70 transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {game.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{game.players}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span>R$ {game.minBet} - R$ {game.maxBet}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePlayGame}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold"
          >
            <Play className="mr-2 h-4 w-4" />
            Jogar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;