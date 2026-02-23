import { motion } from 'motion/react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useEffect, useState } from 'react';

export function Hero() {
  const typedText = useTypewriter({
    words: ['BACKEND DEV', 'AI MASTER', 'CODE WIZARD'],
    typeSpeed: 100,
    deleteSpeed: 60,
    delaySpeed: 2000,
  });

  const [showCursor, setShowCursor] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore(prev => (prev + 100) % 999900);
    }, 100);
    return () => clearInterval(scoreInterval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Retro Arcade Background */}
      <div className="absolute inset-0 z-0">
        {/* Pixel Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FFD700', '#00F0FF', '#FF006E', '#FF8800'][i % 4],
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Retro Gradient Orbs */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(at 20% 30%, rgba(255, 215, 0, 0.2) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(0, 240, 255, 0.2) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(255, 0, 110, 0.15) 0px, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Score Display - Top Right Corner */}
      <div 
        className="absolute top-8 right-8 z-20 px-6 py-3"
        style={{
          fontFamily: 'Press Start 2P, monospace',
          fontSize: '12px',
          color: '#FFD700',
          backgroundColor: '#1A0B2E',
          border: '4px solid #FFD700',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
        }}
      >
        SCORE: {score.toString().padStart(6, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          <div 
            className="inline-block px-8 py-4 mb-8"
            style={{
              backgroundColor: '#1A0B2E',
              border: '4px solid #FFD700',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 215, 0, 0.1)',
            }}
          >
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl mb-0 retro-text-shadow"
              style={{ 
                fontFamily: 'Press Start 2P, monospace',
                color: '#FFD700',
                lineHeight: '1.6',
              }}
            >
              MOHAMMAD
              <br />
              N. SHAIKH
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div
            className="inline-block px-6 py-3 arcade-glow"
            style={{
              backgroundColor: '#0D0221',
              border: '3px solid #00F0FF',
            }}
          >
            <p 
              className="text-xl md:text-2xl lg:text-3xl"
              style={{ 
                fontFamily: 'Press Start 2P, monospace',
                color: '#00F0FF',
                fontSize: '16px',
                lineHeight: '1.8',
              }}
            >
              {'> '}{typedText}
              <span 
                style={{ 
                  opacity: showCursor ? 1 : 0,
                  color: '#FFD700'
                }}
              >
                █
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p 
            className="text-base md:text-lg mb-8 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'VT323, monospace',
              color: '#A8A8C0',
              fontSize: '24px',
              lineHeight: '1.4',
            }}
          >
            MCA STUDENT • BACKEND DEV • AI INTEGRATION
            <br />
            BUILDING INTELLIGENT SYSTEMS
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 font-medium transition-all duration-300"
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '12px',
              backgroundColor: '#FFD700',
              color: '#0D0221',
              border: '4px solid #FFD700',
              boxShadow: '6px 6px 0px #FF006E',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '8px 8px 0px #FF006E',
            }}
            whileTap={{ scale: 0.95 }}
          >
            START GAME
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 font-medium transition-all duration-300"
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '12px',
              border: '4px solid #00F0FF',
              color: '#00F0FF',
              backgroundColor: '#0D0221',
              boxShadow: '6px 6px 0px #FF8800',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '8px 8px 0px #FF8800',
            }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT
          </motion.a>
        </motion.div>

        {/* Retro Player Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <p
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '10px',
              color: '#FF006E',
            }}
          >
            PLAYER 1 READY
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator - Retro Style */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '20px',
            color: '#FFD700',
          }}
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  );
}
