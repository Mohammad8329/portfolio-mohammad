import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Send, CheckCircle, Mail, Linkedin, Github, Zap } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const EMAIL_URL = import.meta.env.VITE_EMAIL_URL || 'mailto:shaikhmohummad86@gmail.com';
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/mohammad-shaikh-692a36213/';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || 'https://github.com/Mohammad8329/portfolio-mohammad';

export function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to submit form');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="py-20 px-6 relative" style={{ backgroundColor: '#0D0221' }}>
      {/* Pixel Grid Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#FFD700 2px, transparent 2px),
            linear-gradient(90deg, #FFD700 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
                JOIN PARTY
              </h2>
            </div>
            <p
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '28px',
                color: '#A8A8C0',
              }}
            >
              LET'S TEAM UP FOR EPIC PROJECTS
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Form */}
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
                  <Zap className="w-5 h-5" style={{ color: '#00F0FF' }} />
                  <h3
                    className="text-lg"
                    style={{
                      fontFamily: 'Press Start 2P, monospace',
                      fontSize: '25px',
                      color: '#00F0FF',
                    }}
                  >
                    SEND MSG
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm mb-2"
                      style={{
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '12px',
                        color: '#FFD700',
                      }}
                    >
                      NAME:
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border outline-none focus:border-[#FFD700] transition-colors"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '24px',
                        backgroundColor: '#0D0221',
                        borderColor: '#FFD700',
                        borderWidth: '2px',
                        color: '#FFFFFF',
                      }}
                      placeholder="YOUR NAME"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-2"
                      style={{
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '12px',
                        color: '#FFD700',
                      }}
                    >
                      EMAIL:
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border outline-none focus:border-[#FFD700] transition-colors"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '24px',
                        backgroundColor: '#0D0221',
                        borderColor: '#FFD700',
                        borderWidth: '2px',
                        color: '#FFFFFF',
                      }}
                      placeholder="YOUR@EMAIL.COM"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-2"
                      style={{
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '12px',
                        color: '#FFD700',
                      }}
                    >
                      MESSAGE:
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border outline-none focus:border-[#FFD700] transition-colors resize-none"
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '24px',
                        backgroundColor: '#0D0221',
                        borderColor: '#FFD700',
                        borderWidth: '2px',
                        color: '#FFFFFF',
                      }}
                      placeholder="YOUR MESSAGE..."
                    />
                  </div>

                  {error && (
                    <div
                      className="p-3 text-sm"
                      style={{
                        backgroundColor: '#0D0221',
                        color: '#FF006E',
                        border: '2px solid #FF006E',
                        fontFamily: 'VT323, monospace',
                        fontSize: '22px',
                      }}
                    >
                      ERROR: {error}
                    </div>
                  )}

                  {isSuccess && (
                    <div
                      className="p-3 text-sm flex items-center gap-2"
                      style={{
                        backgroundColor: '#0D0221',
                        color: '#00F0FF',
                        border: '2px solid #00F0FF',
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '12px',
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      MESSAGE SENT!
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    style={{
                      fontFamily: 'Press Start 2P, monospace',
                      fontSize: '16px',
                      backgroundColor: '#FFD700',
                      color: '#0D0221',
                      border: '4px solid #FFD700',
                      boxShadow: '6px 6px 0px #FF006E',
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '8px 8px 0px #FF006E',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      'SENDING...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div
                className="p-6"
                style={{
                  backgroundColor: '#1A0B2E',
                  border: '4px solid #FF006E',
                  boxShadow: '6px 6px 0px #FF006E',
                }}
              >
                <h3
                  className="text-lg mb-6"
                  style={{
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '25px',
                    color: '#FF006E',
                  }}
                >
                  CONNECT
                </h3>

                <div className="space-y-3">
                  <a
                    href={EMAIL_URL}
                    className="flex items-center gap-3 p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#0D0221',
                      border: '2px solid #FFD700',
                    }}
                  >
                    <Mail className="w-5 h-5" style={{ color: '#FFD700' }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '16px',
                          color: '#FFD700',
                        }}
                      >
                        EMAIL
                      </p>
                      <p
                        className="text-xs break-all"
                        style={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '20px',
                          color: '#A8A8C0',
                        }}
                      >
                        SHAIKHMOHUMMAD86@GMAIL.COM
                      </p>
                    </div>
                  </a>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#0D0221',
                      border: '2px solid #00F0FF',
                    }}
                  >
                    <Linkedin className="w-5 h-5" style={{ color: '#00F0FF' }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '16px',
                          color: '#00F0FF',
                        }}
                      >
                        LINKEDIN
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '20px',
                          color: '#A8A8C0',
                        }}
                      >
                        PROFESSIONAL NETWORK
                      </p>
                    </div>
                  </a>

                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#0D0221',
                      border: '2px solid #FF8800',
                    }}
                  >
                    <Github className="w-5 h-5" style={{ color: '#FF8800' }} />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{
                          fontFamily: 'Press Start 2P, monospace',
                          fontSize: '16px',
                          color: '#FF8800',
                        }}
                      >
                        GITHUB
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '20px',
                          color: '#A8A8C0',
                        }}
                      >
                        VIEW SOURCE CODE
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div
                className="p-6 arcade-glow"
                style={{
                  backgroundColor: '#0D0221',
                  border: '4px solid #FF8800',
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  <span style={{
                    color: '#FF8800',
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '25px',
                  }}>
                    QUEST AVAILABLE:
                  </span>
                  <br />
                  SEEKING BACKEND DEV & AI INTERNSHIP OPPORTUNITIES.
                  LET'S BUILD SOMETHING LEGENDARY!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
