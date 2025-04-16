
/**
 * Plays a sound effect for user feedback
 * @param type The type of sound to play
 */
export const playSound = (type: 'notification' | 'achievement' | 'levelup' | 'success' | 'error' | 'warning') => {
  try {
    const audio = new Audio();
    
    switch (type) {
      case 'notification':
        audio.src = '/sounds/notification.mp3';
        break;
      case 'achievement':
        audio.src = '/sounds/achievement.mp3';
        break;
      case 'levelup':
        audio.src = '/sounds/levelup.mp3';
        break;
      case 'success':
        audio.src = '/sounds/success.mp3';
        break;
      case 'error':
        audio.src = '/sounds/error.mp3';
        break;
      case 'warning':
        audio.src = '/sounds/warning.mp3';
        break;
      default:
        return;
    }
    
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.log('Audio playback error:', err.message);
    });
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
};

/**
 * Preloads sound effects for faster playback
 */
export const preloadSounds = () => {
  const soundTypes = [
    'notification',
    'achievement',
    'levelup',
    'success',
    'error',
    'warning'
  ];
  
  soundTypes.forEach(type => {
    const audio = new Audio();
    switch (type) {
      case 'notification':
        audio.src = '/sounds/notification.mp3';
        break;
      case 'achievement':
        audio.src = '/sounds/achievement.mp3';
        break;
      case 'levelup':
        audio.src = '/sounds/levelup.mp3';
        break;
      case 'success':
        audio.src = '/sounds/success.mp3';
        break;
      case 'error':
        audio.src = '/sounds/error.mp3';
        break;
      case 'warning':
        audio.src = '/sounds/warning.mp3';
        break;
    }
    
    // Just load it, don't play
    audio.load();
  });
};
