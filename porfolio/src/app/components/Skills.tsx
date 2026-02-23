import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Progress } from './ui/progress';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'PYTHON', level: 90, category: 'LANGUAGES' },
  { name: 'JAVA', level: 75, category: 'LANGUAGES' },
  { name: 'JAVASCRIPT', level: 80, category: 'LANGUAGES' },
  { name: 'SQL', level: 85, category: 'LANGUAGES' },
  
  // Web Development
  { name: 'DJANGO', level: 90, category: 'WEB DEV' },
  { name: 'DRF', level: 85, category: 'WEB DEV' },
  { name: 'FASTAPI', level: 80, category: 'WEB DEV' },
  { name: 'HTML/CSS', level: 85, category: 'WEB DEV' },
  
  // AI & ML
  { name: 'TENSORFLOW', level: 80, category: 'AI & ML' },
  { name: 'KERAS', level: 80, category: 'AI & ML' },
  { name: 'OPENCV', level: 75, category: 'AI & ML' },
  { name: 'SCIKIT', level: 75, category: 'AI & ML' },
  { name: 'NLP', level: 70, category: 'AI & ML' },
  
  // Automation
  { name: 'N8N', level: 90, category: 'TOOLS' },
  { name: 'API', level: 85, category: 'TOOLS' },
  { name: 'GIT', level: 85, category: 'TOOLS' },
  { name: 'POSTGRESQL', level: 85, category: 'TOOLS' },
];

const categories = ['LANGUAGES', 'WEB DEV', 'AI & ML', 'TOOLS'];

const categoryColors: { [key: string]: string } = {
  'LANGUAGES': '#FFD700',
  'WEB DEV': '#00F0FF',
  'AI & ML': '#FF006E',
  'TOOLS': '#FF8800',
};

export function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className="py-20 px-6 relative" style={{ backgroundColor: '#0D0221' }}>
      {/* Pixel Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#FFD700 2px, transparent 2px),
            linear-gradient(90deg, #FFD700 2px, transparent 2px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <div 
              className="inline-block px-8 py-4 mb-6"
              style={{
                backgroundColor: '#1A0B2E',
                border: '4px solid #FFD700',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              <h2 
                className="text-3xl md:text-4xl retro-text-shadow"
                style={{ 
                  fontFamily: 'Press Start 2P, monospace',
                  color: '#FFD700',
                  lineHeight: '1.6',
                }}
              >
                POWER-UPS
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '24px',
                color: '#A8A8C0',
              }}
            >
              LEVEL UP YOUR GAME
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div 
                  className="p-6 h-full"
                  style={{
                    backgroundColor: '#1A0B2E',
                    border: `4px solid ${categoryColors[category]}`,
                    boxShadow: `6px 6px 0px ${categoryColors[category]}`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-4 h-4"
                      style={{
                        backgroundColor: categoryColors[category],
                        boxShadow: `0 0 10px ${categoryColors[category]}`,
                      }}
                    />
                    <h3 
                      className="text-base md:text-lg"
                      style={{ 
                        fontFamily: 'Press Start 2P, monospace',
                        color: categoryColors[category],
                        fontSize: '12px',
                      }}
                    >
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span 
                              className="text-sm"
                              style={{ 
                                fontFamily: 'VT323, monospace',
                                fontSize: '20px',
                                color: '#FFFFFF',
                              }}
                            >
                              {skill.name}
                            </span>
                            <span 
                              className="text-sm"
                              style={{ 
                                fontFamily: 'Press Start 2P, monospace',
                                fontSize: '10px',
                                color: categoryColors[category],
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Pixelated Progress Bar */}
                          <div 
                            className="relative h-6" 
                            style={{ 
                              backgroundColor: '#0D0221',
                              border: `2px solid ${categoryColors[category]}`,
                            }}
                          >
                            <motion.div
                              className="h-full"
                              style={{
                                backgroundColor: categoryColors[category],
                                boxShadow: `inset 0 0 10px rgba(255, 255, 255, 0.3)`,
                              }}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ 
                                duration: 1.5, 
                                delay: categoryIndex * 0.1 + index * 0.05,
                                ease: "easeOut"
                              }}
                            >
                              {/* Pixel pattern overlay */}
                              <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                  backgroundImage: `
                                    linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
                                  `,
                                  backgroundSize: '4px 4px',
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Badge */}
          <motion.div variants={itemVariants} className="mt-12">
            <div 
              className="p-6 text-center arcade-glow"
              style={{
                backgroundColor: '#0D0221',
                border: '4px solid #FF006E',
                boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
              }}
            >
              <div className="mb-3">
                <span style={{ fontSize: '40px' }}>🏆</span>
              </div>
              <p 
                className="text-sm md:text-base"
                style={{ 
                  fontFamily: 'VT323, monospace',
                  fontSize: '22px',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ 
                  color: '#FFD700', 
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '12px'
                }}>
                  ACHIEVEMENT UNLOCKED:
                </span>
                <br />
                CONTINUOUS LEARNING MODE ACTIVATED
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
