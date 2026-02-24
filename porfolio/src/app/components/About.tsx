import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code2, Brain, Trophy } from 'lucide-react';

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="about" className="py-20 px-6 relative" style={{ backgroundColor: '#0D0221' }}>
      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#FF006E 2px, transparent 2px),
            linear-gradient(90deg, #FF006E 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px',
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
                border: '4px solid #FF006E',
                boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
              }}
            >
              <h2
                className="text-3xl md:text-4xl retro-text-shadow"
                style={{
                  fontFamily: 'Press Start 2P, monospace',
                  color: '#FF006E',
                  lineHeight: '1.6',
                }}
              >
                PLAYER INFO
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '28px',
                color: '#A8A8C0',
              }}
            >
              CHARACTER STATS & BACKGROUND
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Bio */}
            <motion.div variants={itemVariants}>
              <div
                className="p-6 h-full"
                style={{
                  backgroundColor: '#1A0B2E',
                  border: '4px solid #FFD700',
                  boxShadow: '6px 6px 0px #FFD700',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3"
                    style={{
                      backgroundColor: '#FFD700',
                      animation: 'blink 1s infinite',
                    }}
                  />
                  <h3
                    className="text-lg"
                    style={{
                      fontFamily: 'Press Start 2P, monospace',
                      fontSize: '25px',
                      color: '#FFD700',
                    }}
                  >
                    PROFILE
                  </h3>
                </div>
                <p
                  className="leading-relaxed mb-4"
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '26px',
                    color: '#FFFFFF',
                  }}
                >
                  I'M <strong style={{ color: '#FFD700' }}>MOHAMMAD NUMAN SHAIKH</strong>, AN MCA STUDENT
                  MASTERING THE ART OF BACKEND DEVELOPMENT, AI INTEGRATION, AND WORKFLOW AUTOMATION.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '24px',
                    color: '#A8A8C0',
                  }}
                >
                  MY GAMEPLAY: COMBINING ROBUST BACKEND ARCHITECTURE WITH CUTTING-EDGE AI
                  TO CREATE SYSTEMS THAT ARE INTELLIGENT, FUNCTIONAL, AND SCALABLE.
                </p>

                {/* Player Stats */}
                <div
                  className="mt-6 p-4"
                  style={{
                    backgroundColor: '#0D0221',
                    border: '2px solid #FFD700',
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '12px', color: '#A8A8C0' }}>
                        CODING
                      </p>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '16px', color: '#FFD700' }}>
                        LV. 90
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '12px', color: '#A8A8C0' }}>
                        AI MAGIC
                      </p>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '16px', color: '#00F0FF' }}>
                        LV. 85
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '12px', color: '#A8A8C0' }}>
                        AUTOMATION
                      </p>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '16px', color: '#FF006E' }}>
                        LV. 95
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '12px', color: '#A8A8C0' }}>
                        TEAMWORK
                      </p>
                      <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: '16px', color: '#FF8800' }}>
                        LV. 88
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Education */}
            <motion.div variants={itemVariants}>
              <div
                className="p-6 h-full"
                style={{
                  backgroundColor: '#1A0B2E',
                  border: '4px solid #00F0FF',
                  boxShadow: '6px 6px 0px #00F0FF',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-5 h-5" style={{ color: '#00F0FF' }} />
                  <h3
                    className="text-lg"
                    style={{
                      fontFamily: 'Press Start 2P, monospace',
                      fontSize: '25px',
                      color: '#00F0FF',
                    }}
                  >
                    EDUCATION
                  </h3>
                </div>

                {/* MCA */}
                <div
                  className="mb-4 p-4"
                  style={{
                    backgroundColor: '#0D0221',
                    border: '2px solid #00F0FF',
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <GraduationCap className="w-5 h-5 flex-shrink-0" style={{ color: '#00F0FF' }} />
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '14px',
                          color: '#00F0FF',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                        }}
                      >
                        MCA DEGREE
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'VT323, monospace',
                          fontSize: '22px',
                        }}
                      >
                        BHARATI VIDYAPEETH UNIVERSITY, PUNE
                      </p>
                      <div className="flex gap-4 mt-2">
                        <span style={{
                          color: '#FFD700',
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '12px',
                        }}>
                          CGPA: 8.67
                        </span>
                        <span style={{
                          color: '#A8A8C0',
                          fontFamily: 'VT323, monospace',
                          fontSize: '20px',
                        }}>
                          2024-2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BCA */}
                <div
                  className="p-4"
                  style={{
                    backgroundColor: '#0D0221',
                    border: '2px solid #FF006E',
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Code2 className="w-5 h-5 flex-shrink-0" style={{ color: '#FF006E' }} />
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '14px',
                          color: '#FF006E',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                        }}
                      >
                        BCA DEGREE
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'VT323, monospace',
                          fontSize: '22px',
                        }}
                      >
                        SAVITRIBAI PHULE PUNE UNIVERSITY
                      </p>
                      <div className="flex gap-4 mt-2">
                        <span style={{
                          color: '#FFD700',
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '12px',
                        }}>
                          CGPA: 7.36
                        </span>
                        <span style={{
                          color: '#A8A8C0',
                          fontFamily: 'VT323, monospace',
                          fontSize: '20px',
                        }}>
                          2019-2022
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interests */}
          <motion.div variants={itemVariants} className="mt-6">
            <div
              className="p-6"
              style={{
                backgroundColor: '#1A0B2E',
                border: '4px solid #FF8800',
                boxShadow: '6px 6px 0px #FF8800',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6" style={{ color: '#FF8800' }} />
                <h3
                  className="text-lg"
                  style={{
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '25px',
                    color: '#FF8800',
                  }}
                >
                  SPECIAL ABILITIES
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'BACKEND ARCH', color: '#FFD700' },
                  { name: 'AI/ML FUSION', color: '#00F0FF' },
                  { name: 'AUTOMATION', color: '#FF006E' },
                  { name: 'API MASTERY', color: '#FF8800' },
                  { name: 'DATA PROCESSING', color: '#FFD700' },
                  { name: 'SYSTEM DESIGN', color: '#00F0FF' },
                ].map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2"
                    style={{
                      fontFamily: 'Press Start 2P, monospace',
                      fontSize: '16px',
                      backgroundColor: '#0D0221',
                      color: interest.color,
                      border: `2px solid ${interest.color}`,
                    }}
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
