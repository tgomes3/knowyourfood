'use client';

import { useState, useEffect } from 'react';

// Centralized styling configuration
const STYLES = {
  // Background colors
  background: 'bg-gradient-to-br from-amber-400 to-orange-500',
  
  // Container backgrounds
  containerBg: 'bg-white/00',
  containerBgSecondary: 'bg-white/10',
  containerBgSecondaryResults: 'bg-white/10', // Results screen secondary containers
  containerBgSecondarySubmit: 'bg-white/00', // Submit screen secondary containers
  containerBgTertiary: 'bg-white/30',
  
  // Text colors
  textPrimary: 'text-white',
  textSecondary: 'text-white/80',
  textTertiary: 'text-white/95',
  
  // Border colors
  borderColor: 'border-white/30',
  
  // Button colors
  buttonBg: 'bg-white/90',
  buttonText: 'text-red-400',
  
  // Accuracy colors
  accuracyGood: 'text-green-500',
  accuracyOver: 'text-red-500',
  accuracyUnder: 'text-blue-500',
  
  // Food emoji container
  emojiContainer: 'bg-gradient-to-br from-orange-400 to-orange-500',
  
  // Overall accuracy container
  overallAccuracyBg: 'bg-white/90',
  overallAccuracyText: 'text-red-400',
};

interface Food {
  emoji: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const foods: Food[] = [
  { emoji: '🥗', name: 'Garden Salad', description: 'Fresh mixed greens with vegetables', calories: 180, protein: 8, carbs: 15, fat: 12 },
  { emoji: '🍝', name: 'Pasta Bolognese', description: 'Spaghetti with meat sauce', calories: 520, protein: 22, carbs: 68, fat: 18 },
  { emoji: '🥪', name: 'Turkey Sandwich', description: 'Whole wheat bread with turkey', calories: 340, protein: 28, carbs: 35, fat: 8 },
  { emoji: '🍎', name: 'Apple Slices', description: 'Fresh sliced apple', calories: 95, protein: 0, carbs: 25, fat: 0 },
  { emoji: '🥑', name: 'Avocado Toast', description: 'Whole grain toast with avocado', calories: 280, protein: 8, carbs: 32, fat: 22 },
  { emoji: '🍌', name: 'Banana Smoothie', description: 'Banana with milk and honey', calories: 220, protein: 12, carbs: 45, fat: 2 },
  { emoji: '🍗', name: 'Grilled Chicken', description: 'Seasoned chicken breast', calories: 380, protein: 42, carbs: 0, fat: 15 },
  { emoji: '🥙', name: 'Chicken Wrap', description: 'Tortilla with chicken and veggies', calories: 450, protein: 35, carbs: 38, fat: 20 }
];

export default function GameScreen() {
  const [currentFood, setCurrentFood] = useState<Food>(foods[0]);
  const [guess, setGuess] = useState({ calories: 300, protein: 15, carbs: 20, fat: 10 });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    calories: { actual: 0, guess: 0, accuracy: 0, difference: 0 },
    protein: { actual: 0, guess: 0, accuracy: 0, difference: 0 },
    carbs: { actual: 0, guess: 0, accuracy: 0, difference: 0 },
    fat: { actual: 0, guess: 0, accuracy: 0, difference: 0 },
    overall: 0
  });

  const loadNewFood = () => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    setCurrentFood(foods[randomIndex]);
    setGuess({ calories: 300, protein: 15, carbs: 20, fat: 10 });
    setShowResults(false);
  };

  const submitGuess = () => {
    // Calculate accuracy and differences
    const caloriesAccuracy = Math.max(0, 100 - Math.abs(guess.calories - currentFood.calories) / currentFood.calories * 100);
    const proteinAccuracy = Math.max(0, 100 - Math.abs(guess.protein - currentFood.protein) / Math.max(currentFood.protein, 1) * 100);
    const carbsAccuracy = Math.max(0, 100 - Math.abs(guess.carbs - currentFood.carbs) / Math.max(currentFood.carbs, 1) * 100);
    const fatAccuracy = Math.max(0, 100 - Math.abs(guess.fat - currentFood.fat) / Math.max(currentFood.fat, 1) * 100);
    
    const overallAccuracy = Math.round((caloriesAccuracy + proteinAccuracy + carbsAccuracy + fatAccuracy) / 4);
    
    setResults({
      calories: {
        actual: currentFood.calories,
        guess: guess.calories,
        accuracy: Math.round(caloriesAccuracy),
        difference: guess.calories - currentFood.calories
      },
      protein: {
        actual: currentFood.protein,
        guess: guess.protein,
        accuracy: Math.round(proteinAccuracy),
        difference: guess.protein - currentFood.protein
      },
      carbs: {
        actual: currentFood.carbs,
        guess: guess.carbs,
        accuracy: Math.round(carbsAccuracy),
        difference: guess.carbs - currentFood.carbs
      },
      fat: {
        actual: currentFood.fat,
        guess: guess.fat,
        accuracy: Math.round(fatAccuracy),
        difference: guess.fat - currentFood.fat
      },
      overall: overallAccuracy
    });
    
    setShowResults(true);
  };

  const nextFood = () => {
    loadNewFood();
  };

  useEffect(() => {
    loadNewFood();
  }, []);

  if (showResults) {
    return (
      <div className={`h-full ${STYLES.background} p-3 flex flex-col gap-2`}>
        <div className="bg-white/20 rounded-[20px] p-4 backdrop-blur-xl border border-white/30 text-center">
          <div className={`w-24 h-24 ${STYLES.emojiContainer} rounded-[12px] flex items-center justify-center text-4xl mb-2 mx-auto shadow-lg`}>
            {currentFood.emoji}
          </div>
          <h2 className={`text-base font-semibold ${STYLES.textPrimary} mb-1`}>{currentFood.name}</h2>
          <div className={`${STYLES.overallAccuracyBg} ${STYLES.overallAccuracyText} rounded-[10px] py-2 px-3 mb-3`}>
            <div className="text-lg font-bold">{results.overall}%</div>
            <div className="text-xs">Overall Accuracy</div>
          </div>
        </div>

        <div className={`${STYLES.containerBgSecondaryResults} rounded-[15px] p-2 backdrop-blur-xl border ${STYLES.borderColor}`}>
          <div className="flex flex-col gap-1">
            <div className={`${STYLES.containerBg} rounded-[8px] p-2 backdrop-blur-lg`}>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-xs ${STYLES.textPrimary} font-medium`}>Calories</div>
                <div className={`text-xs ${STYLES.textPrimary}`}>{results.calories.accuracy}%</div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className={STYLES.textSecondary}>Your guess: {results.calories.guess}</div>
                <div className={STYLES.textSecondary}>Actual: {results.calories.actual}</div>
              </div>
              <div className={`text-xs mt-1 ${results.calories.difference > 0 ? STYLES.accuracyOver : results.calories.difference < 0 ? STYLES.accuracyUnder : STYLES.accuracyGood}`}>
                {results.calories.difference > 0 ? `+${results.calories.difference} over` : 
                 results.calories.difference < 0 ? `${Math.abs(results.calories.difference)} under` : 'Perfect!'}
              </div>
            </div>

            <div className={`${STYLES.containerBg} rounded-[8px] p-2 backdrop-blur-lg`}>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-xs ${STYLES.textPrimary} font-medium`}>Protein</div>
                <div className={`text-xs ${STYLES.textPrimary}`}>{results.protein.accuracy}%</div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className={STYLES.textSecondary}>Your guess: {results.protein.guess}g</div>
                <div className={STYLES.textSecondary}>Actual: {results.protein.actual}g</div>
              </div>
              <div className={`text-xs mt-1 ${results.protein.difference > 0 ? STYLES.accuracyOver : results.protein.difference < 0 ? STYLES.accuracyUnder : STYLES.accuracyGood}`}>
                {results.protein.difference > 0 ? `+${results.protein.difference}g over` : 
                 results.protein.difference < 0 ? `${Math.abs(results.protein.difference)}g under` : 'Perfect!'}
              </div>
            </div>

            <div className={`${STYLES.containerBg} rounded-[8px] p-2 backdrop-blur-lg`}>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-xs ${STYLES.textPrimary} font-medium`}>Carbs</div>
                <div className={`text-xs ${STYLES.textPrimary}`}>{results.carbs.accuracy}%</div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className={STYLES.textSecondary}>Your guess: {results.carbs.guess}g</div>
                <div className={STYLES.textSecondary}>Actual: {results.carbs.actual}g</div>
              </div>
              <div className={`text-xs mt-1 ${results.carbs.difference > 0 ? STYLES.accuracyOver : results.carbs.difference < 0 ? STYLES.accuracyUnder : STYLES.accuracyGood}`}>
                {results.carbs.difference > 0 ? `+${results.carbs.difference}g over` : 
                 results.carbs.difference < 0 ? `${Math.abs(results.carbs.difference)}g under` : 'Perfect!'}
              </div>
            </div>

            <div className={`${STYLES.containerBg} rounded-[8px] p-2 backdrop-blur-lg`}>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-xs ${STYLES.textPrimary} font-medium`}>Fat</div>
                <div className={`text-xs ${STYLES.textPrimary}`}>{results.fat.accuracy}%</div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className={STYLES.textSecondary}>Your guess: {results.fat.guess}g</div>
                <div className={STYLES.textSecondary}>Actual: {results.fat.actual}g</div>
              </div>
              <div className={`text-xs mt-1 ${results.fat.difference > 0 ? STYLES.accuracyOver : results.fat.difference < 0 ? STYLES.accuracyUnder : STYLES.accuracyGood}`}>
                {results.fat.difference > 0 ? `+${results.fat.difference}g over` : 
                 results.fat.difference < 0 ? `${Math.abs(results.fat.difference)}g under` : 'Perfect!'}
              </div>
            </div>
          </div>
        </div>

        <div className={`${STYLES.containerBgSecondaryResults} rounded-[15px] p-3 backdrop-blur-xl border ${STYLES.borderColor}`}>
          <button
            onClick={nextFood}
            className={`w-full ${STYLES.buttonBg} ${STYLES.buttonText} border-none rounded-[12px] py-2.5 px-4 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg`}
          >
            Next Food
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${STYLES.background} p-3 flex flex-col gap-2`}>
      <div className="bg-white/20 rounded-[20px] p-4 backdrop-blur-xl border border-white/30 text-center flex-1 flex flex-col justify-center">
        <div className={`w-32 h-32 ${STYLES.emojiContainer} rounded-[15px] flex items-center justify-center text-5xl mb-3 mx-auto shadow-lg`}>
          {currentFood.emoji}
        </div>
        <h2 className={`text-lg font-semibold ${STYLES.textPrimary} mb-1`}>{currentFood.name}</h2>
        <p className={`text-xs ${STYLES.textSecondary} mb-3`}>{currentFood.description}</p>
      </div>

      <div className={`${STYLES.containerBgSecondarySubmit} rounded-[15px] p-2 backdrop-blur-xl border ${STYLES.borderColor}`}>
        <div className="flex flex-col gap-1">
          <div className={`${STYLES.containerBgTertiary} rounded-[8px] p-1.5 backdrop-blur-lg`}>
            <div className={`text-xs ${STYLES.textTertiary} font-medium mb-1`}>Calories</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="range"
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  min="50"
                  max="800"
                  value={guess.calories}
                  onChange={(e) => setGuess({ ...guess, calories: parseInt(e.target.value) })}
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(guess.calories - 50) / (800 - 50) * 100}%, rgba(255,255,255,0.2) ${(guess.calories - 50) / (800 - 50) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
              <div className="px-2 py-0.5 rounded-[4px] text-xs font-semibold min-w-[35px] text-center bg-white/90 text-gray-800">
                {guess.calories}
              </div>
            </div>
          </div>

          <div className={`${STYLES.containerBgTertiary} rounded-[8px] p-1.5 backdrop-blur-lg`}>
            <div className={`text-xs ${STYLES.textTertiary} font-medium mb-1`}>Protein (g)</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="range"
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  min="0"
                  max="60"
                  value={guess.protein}
                  onChange={(e) => setGuess({ ...guess, protein: parseInt(e.target.value) })}
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(guess.protein - 0) / (60 - 0) * 100}%, rgba(255,255,255,0.2) ${(guess.protein - 0) / (60 - 0) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
              <div className="px-2 py-0.5 rounded-[4px] text-xs font-semibold min-w-[35px] text-center bg-white/90 text-gray-800">
                {guess.protein}g
              </div>
            </div>
          </div>

          <div className={`${STYLES.containerBgTertiary} rounded-[8px] p-1.5 backdrop-blur-lg`}>
            <div className={`text-xs ${STYLES.textTertiary} font-medium mb-1`}>Carbs (g)</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="range"
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  min="0"
                  max="100"
                  value={guess.carbs}
                  onChange={(e) => setGuess({ ...guess, carbs: parseInt(e.target.value) })}
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(guess.carbs - 0) / (100 - 0) * 100}%, rgba(255,255,255,0.2) ${(guess.carbs - 0) / (100 - 0) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
              <div className="px-2 py-0.5 rounded-[4px] text-xs font-semibold min-w-[35px] text-center bg-white/90 text-gray-800">
                {guess.carbs}g
              </div>
            </div>
          </div>

          <div className={`${STYLES.containerBgTertiary} rounded-[8px] p-1.5 backdrop-blur-lg`}>
            <div className={`text-xs ${STYLES.textTertiary} font-medium mb-1`}>Fat (g)</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="range"
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  min="0"
                  max="40"
                  value={guess.fat}
                  onChange={(e) => setGuess({ ...guess, fat: parseInt(e.target.value) })}
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(guess.fat - 0) / (40 - 0) * 100}%, rgba(255,255,255,0.2) ${(guess.fat - 0) / (40 - 0) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
              <div className="px-2 py-0.5 rounded-[4px] text-xs font-semibold min-w-[35px] text-center bg-white/90 text-gray-800">
                {guess.fat}g
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${STYLES.containerBgSecondarySubmit} rounded-[15px] p-3 backdrop-blur-xl border ${STYLES.borderColor}`}>
        <button
          onClick={submitGuess}
          className={`w-full ${STYLES.buttonBg} ${STYLES.buttonText} border-none rounded-[12px] py-2.5 px-4 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg`}
        >
          Submit All Guesses
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          height: 4px;
        }
        
        .slider::-moz-range-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          height: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
} 