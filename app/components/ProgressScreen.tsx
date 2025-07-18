export default function ProgressScreen() {
  const stats = [
    { value: '87%', label: 'Overall Accuracy' },
    { value: '42', label: 'Games Played' },
    { value: '7', label: 'Day Streak' },
    { value: '92%', label: 'Best Score' },
  ];

  const recentGames = [
    { emoji: '🥗', name: 'Garden Salad', accuracy: '89%' },
    { emoji: '🍝', name: 'Pasta Bolognese', accuracy: '76%' },
    { emoji: '🥪', name: 'Turkey Sandwich', accuracy: '94%' },
    { emoji: '🍎', name: 'Apple Slices', accuracy: '91%' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-cyan-300 to-pink-200 p-5 text-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Progress</h1>
        <p className="text-sm opacity-90">Track your nutrition intuition improvement</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/20 rounded-[20px] p-5 text-center backdrop-blur-lg">
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-xs opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/15 rounded-[20px] p-5 backdrop-blur-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Games</h2>
        <div className="space-y-3">
          {recentGames.map((game, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{game.emoji}</div>
                <div className="text-sm font-medium">{game.name}</div>
              </div>
              <div className="text-sm font-semibold px-2 py-1 rounded-lg bg-white/20">
                {game.accuracy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 