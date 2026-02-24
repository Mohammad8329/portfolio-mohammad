import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Calendar, Star } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  highlights: string[];
  color: string;
  level: number;
}

const projects: Project[] = [
  {
    title: 'DATA PIPELINE',
    description: 'Automated workflows using n8n for data extraction, transformation, and AI-powered analysis with Google Gemini.',
    technologies: ['N8N', 'PYTHON', 'GEMINI', 'POSTGRESQL'],
    date: 'DEC 2024',
    highlights: [
      'AUTO DATA EXTRACTION',
      'REAL-TIME PROCESSING',
      'AI INSIGHTS',
      'SCALABLE ARCHITECTURE'
    ],
    color: '#FFD700',
    level: 4,
  },
  {
    title: 'AI TRAVEL PLANNER',
    description: 'Django web app generating personalized travel itineraries using Claude AI with budget optimization.',
    technologies: ['DJANGO', 'DRF', 'CLAUDE AI', 'POSTGRESQL'],
    date: 'NOV 2024',
    highlights: [
      'USER AUTH SYSTEM',
      'AI ITINERARIES',
      'BUDGET OPTIMIZER',
      'REAL-TIME RECS'
    ],
    color: '#00F0FF',
    level: 5,
  },
  {
    title: 'PIXEL FIRE GAME',
    description: '2D survival game with procedural enemy generation, dynamic scoring, and progressive difficulty.',
    technologies: ['PYTHON', 'PYGAME'],
    date: 'OCT 2024',
    highlights: [
      'PROCEDURAL ENEMIES',
      'DYNAMIC DIFFICULTY',
      'OPTIMIZED RENDERING',
      'COLLISION DETECTION'
    ],
    color: '#FF006E',
    level: 3,
  },
  {
    title: 'GESTURE CONTROL',
    description: 'Real-time gesture recognition using computer vision and deep learning. 92% accuracy achieved.',
    technologies: ['TENSORFLOW', 'KERAS', 'OPENCV', 'PYTHON'],
    date: 'SEP 2024',
    highlights: [
      'CUSTOM CNN MODEL',
      '92% ACCURACY',
      'REAL-TIME VIDEO',
      'OPTIMIZED INFERENCE'
    ],
    color: '#FF8800',
    level: 4,
  },
];

export function Projects() {
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
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="projects" className="py-20 px-6 relative" style={{ backgroundColor: '#1A0B2E' }}>
      {/* Pixel Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#00F0FF 2px, transparent 2px),
            linear-gradient(90deg, #00F0FF 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
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
                backgroundColor: '#0D0221',
                border: '4px solid #00F0FF',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
              }}
            >
              <h2
                className="text-3xl md:text-4xl retro-text-shadow"
                style={{
                  fontFamily: 'Press Start 2P, monospace',
                  color: '#00F0FF',
                  lineHeight: '1.6',
                }}
              >
                QUEST LOG
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '28px',
                color: '#A8A8C0',
              }}
            >
              COMPLETED MISSIONS
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cursor-pointer"
              >
                <div
                  className="p-6 h-full flex flex-col"
                  style={{
                    backgroundColor: '#0D0221',
                    border: `4px solid ${project.color}`,
                    boxShadow: `6px 6px 0px ${project.color}`,
                  }}
                >
                  {/* Project Header with Level Stars */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-lg md:text-xl font-medium"
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '25px',
                          color: project.color,
                          lineHeight: '1.6',
                        }}
                      >
                        {project.title}
                      </h3>
                      <div className="flex gap-1">
                        {[...Array(project.level)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={project.color}
                            style={{ color: project.color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div
                      className="inline-block px-2 py-1"
                      style={{
                        backgroundColor: project.color,
                        color: '#0D0221',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '16px',
                        }}
                      >
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="mb-4 leading-relaxed"
                    style={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '24px',
                      color: '#FFFFFF',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4 flex-1">
                    <p
                      className="text-sm mb-2"
                      style={{
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '14px',
                        color: project.color,
                      }}
                    >
                      ACHIEVEMENTS:
                    </p>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2"
                          style={{
                            fontFamily: 'VT323, monospace',
                            fontSize: '22px',
                            color: '#A8A8C0',
                          }}
                        >
                          <span style={{ color: project.color }}>►</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div
                    className="flex flex-wrap gap-2 mt-auto pt-4"
                    style={{
                      borderTop: `2px solid ${project.color}`,
                    }}
                  >
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1"
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '16px',
                          backgroundColor: '#1A0B2E',
                          color: project.color,
                          border: `2px solid ${project.color}`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <p
              className="text-lg mb-6"
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '28px',
                color: '#A8A8C0',
              }}
            >
              MORE QUESTS AVAILABLE ON GITHUB
            </p>
            <motion.a
              href={import.meta.env.VITE_GITHUB_URL || "https://github.com/Mohammad8329/portfolio-mohammad"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-medium"
              style={{
                fontFamily: 'Press Start 2P, monospace',
                fontSize: '16px',
                border: '4px solid #FFD700',
                color: '#FFD700',
                backgroundColor: '#0D0221',
                boxShadow: '6px 6px 0px #FF006E',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '8px 8px 0px #FF006E',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              GITHUB PROFILE
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
