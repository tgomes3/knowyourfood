import { Screen } from '../page';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'game' as Screen, icon: '🎯', label: 'Play' },
    { id: 'progress' as Screen, icon: '📊', label: 'Progress' },
  ];

  return (
    <div className="h-20 bg-white/95 backdrop-blur-xl border-t border-black/10 flex justify-around items-center px-5 z-10">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onScreenChange(item.id)}
          className={`flex flex-col items-center transition-all duration-300 p-2 rounded-xl min-w-[60px] ${
            currentScreen === item.id
              ? 'bg-red-400/15'
              : 'hover:bg-red-400/10'
          }`}
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className={`text-xs font-medium ${
            currentScreen === item.id ? 'text-red-400' : 'text-gray-600'
          }`}>
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
} 