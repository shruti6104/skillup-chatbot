
// Audio utility functions for the chatbot

// Sound effect URLs - these are kept minimal to avoid string termination issues
const AUDIO_URLS = {
  notification: '/sounds/notification.mp3',
  achievement: '/sounds/achievement.mp3',
  levelup: '/sounds/levelup.mp3',
  success: '/sounds/success.mp3'
};

/**
 * Play a sound effect
 * @param type The type of sound to play
 */
export function playSound(type: 'notification' | 'achievement' | 'levelup' | 'success'): void {
  try {
    const audio = new Audio();
    audio.src = AUDIO_URLS[type];
    audio.play().catch(err => console.error('Error playing sound:', err));
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
}
