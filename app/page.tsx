'use client';

import { useState } from 'react';
import GameScreen from './components/GameScreen';
import ProgressScreen from './components/ProgressScreen';
import BottomNavigation from './components/BottomNavigation';
import StatusBar from './components/StatusBar';

export type Screen = 'game' | 'progress';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('game');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex justify-center items-center p-4">
      <div className="w-96 h-[812px] bg-black rounded-[40px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
          <StatusBar />
          
          <div className="flex-1 relative overflow-hidden">
            {currentScreen === 'game' && <GameScreen />}
            {currentScreen === 'progress' && <ProgressScreen />}
          </div>
          
          <BottomNavigation 
            currentScreen={currentScreen} 
            onScreenChange={setCurrentScreen} 
          />
        </div>
      </div>
      
      {/* Floating onboarding button */}
      <div className="fixed top-4 right-4">
        <a 
          href="/onboarding" 
          className="bg-white/90 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-white transition-all duration-300"
        >
          🚀 Get Started
        </a>
      </div>
    </div>
  );
}
