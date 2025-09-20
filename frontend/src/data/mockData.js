export const mockGames = [
  {
    id: 1,
    title: "Royal Blackjack",
    category: "mesa",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    minBet: 10,
    maxBet: 1000,
    players: 234,
    featured: true,
    description: "Jogo clássico de blackjack com dealers ao vivo"
  },
  {
    id: 2,
    title: "Golden Roulette",
    category: "roleta",
    image: "https://images.unsplash.com/photo-1566533563558-3e97e81b8d5e?w=400&h=300&fit=crop",
    minBet: 5,
    maxBet: 500,
    players: 189,
    featured: true,
    description: "Roleta europeia com multiplicadores especiais"
  },
  {
    id: 3,
    title: "Mega Fortune Slots",
    category: "slots",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop",
    minBet: 1,
    maxBet: 100,
    players: 567,
    featured: true,
    description: "Slot machine com jackpot progressivo"
  },
  {
    id: 4,
    title: "Diamond Poker",
    category: "poker",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=300&fit=crop",
    minBet: 25,
    maxBet: 2000,
    players: 89,
    featured: false,
    description: "Texas Hold'em com torneios diários"
  },
  {
    id: 5,
    title: "Lightning Baccarat",
    category: "mesa",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    minBet: 20,
    maxBet: 1500,
    players: 156,
    featured: false,
    description: "Baccarat com multiplicadores aleatórios"
  },
  {
    id: 6,
    title: "Crystal Dice",
    category: "dados",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
    minBet: 2,
    maxBet: 200,
    players: 78,
    featured: false,
    description: "Jogo de dados com apostas múltiplas"
  }
];

export const mockCategories = [
  { id: 'todos', name: 'Todos os Jogos', icon: 'Grid3X3' },
  { id: 'slots', name: 'Slots', icon: 'Zap' },
  { id: 'mesa', name: 'Jogos de Mesa', icon: 'CircleDot' },
  { id: 'roleta', name: 'Roleta', icon: 'RotateCcw' },
  { id: 'poker', name: 'Poker', icon: 'Spade' },
  { id: 'dados', name: 'Dados', icon: 'Dice6' }
];

export const mockPromotions = [
  {
    id: 1,
    title: "Bônus de Boas-vindas",
    description: "100% até R$ 1.000 + 50 rodadas grátis",
    code: "WELCOME100",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Cashback Semanal",
    description: "10% de volta em todas as suas perdas",
    code: "CASHBACK10",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Torneio de Slots",
    description: "R$ 50.000 em prêmios - Inscreva-se já!",
    code: "TOURNAMENT",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop"
  }
];