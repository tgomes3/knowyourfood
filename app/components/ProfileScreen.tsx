import Link from 'next/link';

export default function ProfileScreen() {
  const profileOptions = [
    {
      icon: '🏆',
      title: 'Achievements',
      description: 'View your nutrition badges',
      action: () => alert('Achievements screen would open here')
    },
    {
      icon: '🎯',
      title: 'Goals',
      description: 'Manage your learning objectives',
      action: () => alert('Goals screen would open here')
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'App preferences and notifications',
      action: () => alert('Settings screen would open here')
    },
    {
      icon: '❓',
      title: 'Help & Support',
      description: 'Get help and send feedback',
      action: () => alert('Help screen would open here')
    },
    {
      icon: 'ℹ️',
      title: 'About',
      description: 'App version and credits',
      action: () => alert('About screen would open here')
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-pink-400 to-yellow-400 p-5 text-white">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 backdrop-blur-lg">
          👤
        </div>
        <h1 className="text-2xl font-bold mb-1">Sarah Johnson</h1>
        <p className="text-sm opacity-90">Nutrition Ninja • Level 12</p>
      </div>

      <div className="flex flex-col gap-4">
        {profileOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className="bg-white/15 rounded-[15px] p-4 backdrop-blur-lg cursor-pointer transition-all duration-300 flex items-center gap-4 hover:bg-white/25"
          >
            <div className="text-xl">{option.icon}</div>
            <div className="flex-1 text-left">
              <div className="text-base font-semibold mb-1">{option.title}</div>
              <div className="text-xs opacity-80">{option.description}</div>
            </div>
            <div className="text-base opacity-60">→</div>
          </button>
        ))}
        
        <Link href="/onboarding">
          <div className="bg-white/15 rounded-[15px] p-4 backdrop-blur-lg cursor-pointer transition-all duration-300 flex items-center gap-4 hover:bg-white/25">
            <div className="text-xl">🚀</div>
            <div className="flex-1 text-left">
              <div className="text-base font-semibold mb-1">Onboarding</div>
              <div className="text-xs opacity-80">Replay the app introduction</div>
            </div>
            <div className="text-base opacity-60">→</div>
          </div>
        </Link>
      </div>
    </div>
  );
} 