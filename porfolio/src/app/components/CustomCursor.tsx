import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Pixelated Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: isHovering ? '#FFD700' : '#00F0FF',
            boxShadow: isHovering 
              ? '0 0 20px #FFD700, 0 0 30px #FFD700' 
              : '0 0 15px #00F0FF',
            imageRendering: 'pixelated',
          }}
        />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 2 : 1.5,
          opacity: 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#FF006E',
            imageRendering: 'pixelated',
          }}
        />
      </motion.div>
    </>
  );
}
