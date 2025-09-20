import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Play, Gift } from 'lucide-react';

const GameCarousel = ({ promotions }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${promotion.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/50 to-transparent"></div>
              
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {promotion.title}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                      {promotion.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold">
                        <Gift className="mr-2 h-5 w-5" />
                        Resgatar Agora
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                        <Play className="mr-2 h-4 w-4" />
                        Saiba Mais
                      </Button>
                    </div>
                    {promotion.code && (
                      <div className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg font-mono font-bold">
                        Código: {promotion.code}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;