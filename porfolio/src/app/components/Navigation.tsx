import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? '#1A0B2E' : 'rgba(13, 2, 33, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '4px solid',
        borderImage: 'linear-gradient(90deg, #FFD700, #00F0FF, #FF006E, #FF8800) 1',
        boxShadow: isScrolled ? '0 4px 20px rgba(255, 215, 0, 0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3"
          >
            <div
              className="px-4 py-2"
              style={{
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '14px',
                color: '#FFD700',
                backgroundColor: '#0D0221',
                border: '3px solid #FFD700',
                boxShadow: '4px 4px 0px #FF006E',
              }}
            >
              MS
            </div>
          </a>

          {/* Lives Display */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <span
              style={{
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '10px',
                color: '#FF006E',
              }}
            >
              LIVES:
            </span>
            {[...Array(lives)].map((_, i) => (
              <span key={i} style={{ color: '#FF006E', fontSize: '16px' }}>♥</span>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="font-medium transition-all duration-300 px-3 py-1"
                style={{
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '10px',
                  color: '#FFFFFF',
                }}
                whileHover={{
                  color: '#FFD700',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            style={{ 
              color: '#FFD700',
              border: '2px solid #FFD700',
              backgroundColor: '#0D0221',
            }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4"
            style={{ 
              borderTop: '2px solid #FFD700',
            }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium transition-colors duration-300 hover:text-[#FFD700] px-3 py-2"
                  style={{
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '10px',
                    color: '#FFFFFF',
                    border: '2px solid #00F0FF',
                    backgroundColor: '#0D0221',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
