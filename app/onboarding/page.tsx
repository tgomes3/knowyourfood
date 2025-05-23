'use client';

import { useState, useEffect } from 'react';
import styles from './onboarding.module.css';

interface Goal {
  id: string;
  title: string;
  description: string;
}

const goals: Goal[] = [
  { id: 'intuition', title: '🎯 Build Nutrition Intuition', description: 'Learn to visually estimate nutritional content of foods' },
  { id: 'fitness', title: '💪 Support Fitness Goals', description: 'Better understand portion sizes and macro content' },
  { id: 'education', title: '🧠 Educational Fun', description: 'Challenge yourself and learn about nutrition' },
  { id: 'family', title: '👥 Family Health', description: 'Help make better food choices for your family' },
];


export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'right' | 'left'>('right');
  const totalScreens = 5;

  const showScreen = (screenNum: number, direction: 'right' | 'left') => {
    setAnimationDirection(direction);
    setCurrentScreen(screenNum);
  };

  const handleNextScreen = () => {
    if (currentScreen < totalScreens) {
      if (currentScreen === 4 && !selectedGoalId) return; // Prevent moving from goals screen if no goal selected
      showScreen(currentScreen + 1, 'right');
    }
  };

  const handlePrevScreen = () => {
    if (currentScreen > 1) {
      showScreen(currentScreen - 1, 'left');
    }
  };

  const handleGoToScreen = (screenNum: number) => {
    const direction = screenNum > currentScreen ? 'right' : 'left';
    showScreen(screenNum, direction);
  };

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
  };

  const handleRequestCameraPermission = () => {
    setTimeout(() => {
      alert('Camera permission granted! You can now start using Know Your Food to build your nutrition intuition.');
      // Navigate to main app or next step
    }, 500);
  };

  const handleSkipPermission = () => {
    alert('You can enable camera access later in Settings. Welcome to Know Your Food!');
    // Navigate to main app or next step
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentScreen < totalScreens) {
        // Allow progression from screen 4 only if a goal is selected or it's not screen 4
        if (currentScreen === 4 && !selectedGoalId) return;
        handleNextScreen();
      } else if (e.key === 'ArrowLeft' && currentScreen > 1) {
        handlePrevScreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentScreen, selectedGoalId]); // Re-attach if these change

  const getScreenClassName = (screenNum: number) => {
    let className = styles.screen;
    if (screenNum === currentScreen) {
      className += ` ${styles.active} ${animationDirection === 'right' ? styles.slideInRight : styles.slideInLeft}`;
    }
    return className;
  };

  const isNextDisabled = currentScreen === 4 && !selectedGoalId;
  const showNextButton = currentScreen < totalScreens;
  const showPrevButton = currentScreen > 1;


  return (
    <div className={styles.phoneContainer}>
      {/* Screen 1: Welcome */}
      <div className={getScreenClassName(1)}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className={`${styles.content} ${styles.welcomeBg}`}>
          <div className={styles.logo}>🍎</div>
          <h1 className={styles.welcomeTitle}>Know Your Food</h1>
          <p className={styles.welcomeSubtitle}>Train your eye to see nutrition in every bite</p>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleNextScreen}>Get Started</button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handleGoToScreen(5)}>Skip Intro</button>
        </div>
      </div>

      {/* Screen 2: See & Guess Feature */}
      <div className={getScreenClassName(2)} style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className={`${styles.content} ${styles.featureScreen}`}>
          <div>
            <div className={styles.featureIcon}>👁️</div>
            <h2 className={styles.featureTitle}>See & Guess</h2>
            <p className={styles.featureDescription}>Look at real food photos and guess their nutritional content. Build your visual nutrition instincts!</p>
            <div className={styles.featureDemo}>
              <div className={styles.demoFoodImage}>🥗</div>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>What do you think?</p>
              <div className={styles.demoStats}>
                <div className={styles.demoStat}><div className={styles.demoStatLabel}>Calories</div><div className={styles.demoStatValue}>???</div></div>
                <div className={styles.demoStat}><div className={styles.demoStatLabel}>Protein</div><div className={styles.demoStatValue}>???</div></div>
                <div className={styles.demoStat}><div className={styles.demoStatLabel}>Carbs</div><div className={styles.demoStatValue}>???</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 3: Learn & Improve Feature */}
      <div className={getScreenClassName(3)} style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className={`${styles.content} ${styles.featureScreen}`}>
          <div>
            <div className={styles.featureIcon}>📈</div>
            <h2 className={styles.featureTitle}>Learn & Improve</h2>
            <p className={styles.featureDescription}>Get instant feedback on your guesses and watch your nutrition intuition improve over time.</p>
            <div className={styles.featureDemo}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '14px' }}>Your guess: 450 cal</span>
                <span style={{ fontSize: '14px' }}>Actual: 380 cal</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.3)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#4CAF50', height: '100%', width: '85%', borderRadius: '4px' }}></div>
              </div>
              <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.8 }}>85% accuracy - Great job!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen 4: Goals Selection */}
      <div className={getScreenClassName(4)}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className={`${styles.content} ${styles.goalsScreen}`}>
          <h2 className={styles.goalsTitle}>What's your goal?</h2>
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`${styles.goalOption} ${selectedGoalId === goal.id ? styles.goalOptionSelected : ''}`}
              onClick={() => handleSelectGoal(goal.id)}
            >
              <div className={styles.goalOptionTitle}>{goal.title}</div>
              <div className={styles.goalOptionDesc}>{goal.description}</div>
            </div>
          ))}
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            style={{ marginTop: '15px', opacity: isNextDisabled ? 0.5 : 1 }}
            onClick={handleNextScreen}
            disabled={isNextDisabled}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Screen 5: Camera Permission */}
      <div className={getScreenClassName(5)}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className={`${styles.content} ${styles.permissionScreen}`}>
          <div className={styles.permissionIcon}>📸</div>
          <h2 className={styles.permissionTitle}>Camera Access</h2>
          <p className={styles.permissionDescription}>We need camera access to let you take photos of food for our visual nutrition challenges.</p>
          <div className={styles.permissionBenefits}>
            <div className={styles.benefitItem}><div className={styles.benefitIcon}>📱</div><div className={styles.benefitText}>Take photos of your meals instantly</div></div>
            <div className={styles.benefitItem}><div className={styles.benefitIcon}>🎯</div><div className={styles.benefitText}>Practice with real-world food scenarios</div></div>
            <div className={styles.benefitItem}><div className={styles.benefitIcon}>🔒</div><div className={styles.benefitText}>Photos are processed locally and never stored</div></div>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleRequestCameraPermission}>Allow Camera Access</button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleSkipPermission}>Maybe Later</button>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navContainer}>
        {showPrevButton && (
          <button className={styles.navBtn} onClick={handlePrevScreen}>Back</button>
        )}
        <div className={styles.navDots}>
          {[...Array(totalScreens)].map((_, i) => (
            <div
              key={i}
              className={`${styles.navDot} ${currentScreen === i + 1 ? styles.active : ''}`}
              onClick={() => handleGoToScreen(i + 1)} // Allow direct navigation by clicking dots
            />
          ))}
        </div>
        {showNextButton && (
          <button
            className={styles.navBtn}
            onClick={handleNextScreen}
            disabled={isNextDisabled}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
} 