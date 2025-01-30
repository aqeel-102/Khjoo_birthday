'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function BirthdayPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [popBalloons, setPopBalloons] = useState(0);
  const [showCake, setShowCake] = useState(false);
  const [showPanda, setShowPanda] = useState(false);
  const [releaseBalloons, setReleaseBalloons] = useState(false);
  const [messageBubbles, setMessageBubbles] = useState([]);
  const [showHearts, setShowHearts] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);
  const [showUnicorn, setShowUnicorn] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [messageMode, setMessageMode] = useState(false);
  const [showButterflies, setShowButterflies] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSpecialBalloon, setShowSpecialBalloon] = useState(false);
  const [fadeElements, setFadeElements] = useState(false);

  const messages = [
    "Hey beautiful! 🌸 Happy Birthday! ✨",
    "You're the sweetest friend anyone could ask for! 🍬",
    "Your smile lights up everyone's day! 🌟",
    "Here's to more amazing memories together! 💖",
    "You make the world a better place! 🌈",
    "Stay as wonderful as you are! 🦋",
  ];

  const handleBalloonPop = () => {
    const newCount = popBalloons + 1;
    setPopBalloons(newCount);
    
    if (newCount === 3) {
      setShowSparkles(true);
      setShowMusic(true);
      setTimeout(() => setShowStars(true), 300);
      setTimeout(() => setShowButterflies(true), 450);
      setTimeout(() => setShowPanda(true), 600);
      setTimeout(() => setShowCake(true), 900);
      setTimeout(() => setShowUnicorn(true), 1200);
      setTimeout(() => {
        setReleaseBalloons(true);
        setShowHearts(true);
        setShowRainbow(true);
      }, 1500);

      setTimeout(() => {
        setFadeElements(true);
        setTimeout(() => setShowSpecialBalloon(true), 1000);
      }, 4000);
    }
  };

  const handleSpecialBalloonPop = () => {
    setShowSpecialBalloon(false);
    setFadeElements(false);
    createMessageBubbles();
  };

  const createBubbles = () => {
    const isMobile = window.innerWidth <= 768;
    const newBubbles = [];
    for (let i = 0; i < (isMobile ? 8 : 15); i++) {
      newBubbles.push({
        id: i,
        size: isMobile ? (Math.random() * 30 + 15) : (Math.random() * 60 + 20),
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      });
    }
    setBubbles(newBubbles);
    setTimeout(() => {
      setShowMessage(true);
    }, 500);
  };

  const createMessageBubbles = () => {
    setMessageMode(true);
    const isMobile = window.innerWidth <= 768;
    
    const newBubbles = messages.map((msg, index) => {
      const angle = (index / messages.length) * 2 * Math.PI;
      const radius = isMobile ? 40 : 45;
      const centerX = 50;
      const centerY = 50;
      
      const randomRadius = radius + (Math.random() * 10);
      const x = centerX + Math.cos(angle) * randomRadius;
      const y = centerY + Math.sin(angle) * randomRadius;

      return {
        id: index,
        message: msg,
        size: isMobile ? 90 : 120,
        left: x,
        top: y,
        delay: index * 0.2,
        rotation: Math.random() * 6 - 3,
        floatDelay: Math.random() * 2,
        scale: 0.95 + Math.random() * 0.1,
        opacity: 1
      };
    });

    setMessageBubbles(newBubbles);
    setShowMessage(true);
  };

  useEffect(() => {
    createBackgroundDecorations();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (showMessage) {
        createMessageBubbles();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMessage]);

  const createBackgroundDecorations = () => {
    const decorations = document.createElement('div');
    decorations.className = styles.backgroundDecorations;
    
    const isMobile = window.innerWidth <= 768;
    const numBalloons = isMobile ? 10 : 20;
    
    for (let i = 0; i < numBalloons; i++) {
      const balloon = document.createElement('div');
      balloon.className = styles.backgroundBalloon;
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.animationDelay = `${Math.random() * 5}s`;
      balloon.style.fontSize = `${isMobile ? (Math.random() + 0.5) : (Math.random() * 2 + 1)}rem`;
      balloon.innerHTML = '🎈';
      decorations.appendChild(balloon);
    }

    const numPoppers = isMobile ? 4 : 8;
    for (let i = 0; i < numPoppers; i++) {
      const popper = document.createElement('div');
      popper.className = styles.partyPopper;
      const section = (100 / numPoppers) * i;
      popper.style.left = `${section + (Math.random() * 15 - 7.5)}%`;
      popper.style.top = `${Math.random() * 70 + 15}%`;
      popper.style.animationDelay = `${Math.random() * 10}s`;
      popper.innerHTML = '🎉';
      decorations.appendChild(popper);
    }

    document.body.appendChild(decorations);
  };

  return (
    <main className={styles.main}>
      <div className={styles.confettiContainer}>
        {[...Array(window.innerWidth <= 768 ? 25 : 50)].map((_, i) => (
          <div
            key={i}
            className={styles.confetti}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
            }}
          />
        ))}
      </div>
      <div className={`${styles.container} ${messageMode ? styles.messageMode : ''}`}>
        <h1 className={styles.title}>
          Happy Birthday! 🎂
        </h1>

        <div className={styles.photoSection}>
          <div className={styles.photoFrame}>
            <img 
              src="/mem.JPG"
              alt="Our memories"
              className={styles.photo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className={styles.photoOverlay}>Our Beautiful Memories ❤️</div>
          </div>
        </div>
        
        <div className={styles.interactiveElements}>
          <div className={styles.leftSection}>
            {showPanda && (
              <div className={`${styles.pandaContainer} ${messageMode ? styles.hide : ''}`}>
                <div className={styles.panda}>
                  🐼
                  <div className={styles.pandaSpeech}>
                    Happy Birthday! You're beary special! 
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.centerSection}>
            <div className={styles.balloonContainer}>
              {[1, 2, 3].map((balloon) => (
                <div
                  key={balloon}
                  className={`${styles.balloon} 
                    ${popBalloons >= balloon ? styles.popped : ''} 
                    ${releaseBalloons ? styles.flyAway : ''}`}
                  onClick={handleBalloonPop}
                >
                  🎈
                </div>
              ))}
            </div>

            {showCake && (
              <div className={`${styles.cakeContainer} ${messageMode ? styles.hide : ''}`}>
                <div className={styles.cake}>
                  🎂
                  <div className={styles.sparkles}>✨✨✨</div>
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.rightSection}>
            {showUnicorn && (
              <div className={`${styles.unicornContainer} ${messageMode ? styles.hide : ''}`}>
                <div className={styles.unicorn}>
                  🦄
                  <div className={styles.unicornMessage}>
                    Magic and wishes coming your way! ✨
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.bubblesContainer}>
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={styles.bubble}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.left}%`,
                animationDelay: `${bubble.delay}s`
              }}
            />
          ))}
        </div>

        {showMessage && (
          <div className={styles.messageBubblesContainer}>
            {messageBubbles.map((bubble) => (
              <div
                key={bubble.id}
                className={styles.messageBubble}
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${bubble.left}%`,
                  top: `${bubble.top}%`,
                  '--delay': `${bubble.delay}s`,
                  '--rotation': `${bubble.rotation}deg`,
                  '--float-delay': `${bubble.floatDelay}s`,
                  transform: `scale(${bubble.scale})`,
                  opacity: bubble.opacity,
                  animationDelay: `${bubble.delay}s, ${bubble.delay + bubble.floatDelay}s`
                }}
              >
                <div className={styles.messageBubbleContent}>
                  {bubble.message}
                </div>
              </div>
            ))}
          </div>
        )}

        {showHearts && (
          <div className={styles.heartsContainer}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={styles.floatingHeart}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 1 + 1}rem`
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        )}

        {showStars && (
          <div className={styles.starsContainer}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={styles.twinklingStar}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        )}

      
        {showSparkles && (
          <div className={styles.sparklesOverlay}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.magicSparkle}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}

        {showButterflies && (
          <div className={styles.butterfliesContainer}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={styles.butterfly}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 0.5 + 1}rem`
                }}
              >
                🦋
              </div>
            ))}
          </div>
        )}

        {showMusic && (
          <div className={styles.musicNotesContainer}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={styles.musicNote}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                {['🎵', '🎶'][Math.floor(Math.random() * 2)]}
              </div>
            ))}
          </div>
        )}

        {releaseBalloons && (
          <div className={styles.floatingBalloons}>
            {[...Array(window.innerWidth <= 768 ? 5 : 10)].map((_, i) => (
              <div 
                key={i} 
                className={styles.floatingBalloon}
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  left: `${Math.random() * 100}%`
                }}
              >
                🎈
              </div>
            ))}
          </div>
        )}

        {showSpecialBalloon && (
          <div className={styles.specialBalloonContainer}>
            <div 
              className={styles.specialBalloon}
              onClick={handleSpecialBalloonPop}
            >
              🎈
              <div className={styles.specialBalloonText}>
                Pop me for a special surprise! ✨
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
