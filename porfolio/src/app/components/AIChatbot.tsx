import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const starterQuestions = [
    "WHAT ARE SKILLS?",
    "SHOW PROJECTS",
    "INTERNSHIP STATUS?",
  ];

  const handleStarterQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Floating Trigger Button - Retro Style */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#FF006E',
          border: '4px solid #FFD700',
          boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 6px 6px 0px #FFD700',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-8 h-8 text-white mx-auto" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot className="w-8 h-8 text-white mx-auto" />
              <motion.div
                className="absolute top-0 right-0 w-3 h-3"
                style={{ backgroundColor: '#00F0FF' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel - Retro Game Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] h-[600px] flex flex-col overflow-hidden"
            style={{
              backgroundColor: '#1A0B2E',
              border: '4px solid #FF006E',
              boxShadow: '0 0 50px rgba(255, 0, 110, 0.5), 8px 8px 0px #FFD700',
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b flex items-center gap-3"
              style={{
                backgroundColor: '#0D0221',
                borderColor: '#FF006E',
                borderWidth: '4px',
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: '#FF006E',
                  border: '2px solid #FFD700',
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3
                  style={{
                    fontFamily: 'Press Start 2P, monospace',
                    fontSize: '10px',
                    color: '#FFD700',
                  }}
                >
                  AI HELPER
                </h3>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '16px',
                    color: '#A8A8C0',
                  }}
                >
                  ASK ABOUT MOHAMMAD
                </p>
              </div>
              <motion.div
                className="w-3 h-3"
                style={{ backgroundColor: '#00F0FF' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                backgroundColor: '#0D0221',
              }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 mb-4 flex items-center justify-center"
                    style={{
                      backgroundColor: '#FF006E',
                      border: '3px solid #FFD700',
                      boxShadow: '0 0 20px rgba(255, 0, 110, 0.5)',
                    }}
                  >
                    <Sparkles className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                  </div>
                  <p
                    className="text-center mb-6 px-4"
                    style={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '20px',
                      color: '#FFFFFF',
                      lineHeight: '1.4',
                    }}
                  >
                    HI! I'M MOHAMMAD'S AI ASSISTANT. ASK ME ANYTHING!
                  </p>

                  <div className="space-y-2 w-full px-2">
                    <p
                      className="text-xs text-center mb-3"
                      style={{
                        fontFamily: 'Press Start 2P, monospace',
                        fontSize: '8px',
                        color: '#FFD700',
                      }}
                    >
                      QUICK START:
                    </p>
                    {starterQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleStarterQuestion(question)}
                        className="w-full p-3 text-left text-sm transition-all duration-300"
                        style={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '18px',
                          backgroundColor: '#1A0B2E',
                          color: '#FFFFFF',
                          border: '2px solid #00F0FF',
                        }}
                      >
                        ► {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[80%] p-3"
                        style={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '18px',
                          backgroundColor: msg.role === 'user'
                            ? '#FFD700'
                            : '#1A0B2E',
                          color: msg.role === 'user' ? '#0D0221' : '#FFFFFF',
                          border: msg.role === 'user'
                            ? '2px solid #FF006E'
                            : '2px solid #00F0FF',
                        }}
                      >
                        {msg.role === 'user' ? (
                          msg.content
                        ) : msg.isTyping ? (
                          <TypewriterText text={msg.content} />
                        ) : (
                          <MarkdownMessage text={msg.content} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: '#1A0B2E',
                          border: '2px solid #00F0FF',
                        }}
                      >
                        <div className="flex gap-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-3 h-3"
                              style={{ backgroundColor: '#00F0FF' }}
                              animate={{ y: [0, -8, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4"
              style={{
                backgroundColor: '#0D0221',
                borderTop: '4px solid #FF006E',
              }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="TYPE HERE..."
                  className="flex-1 px-4 py-3 border outline-none focus:border-[#FFD700] transition-colors"
                  style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '20px',
                    backgroundColor: '#1A0B2E',
                    borderColor: '#00F0FF',
                    borderWidth: '2px',
                    color: '#FFFFFF',
                  }}
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#FFD700',
                    border: '3px solid #FF006E',
                    boxShadow: '4px 4px 0px #FF006E',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '6px 6px 0px #FF006E',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" style={{ color: '#0D0221' }} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Lightweight markdown renderer — no external library needed
function MarkdownMessage({ text }: { text: string }) {
  const lines = text.split('\n');

  const renderInline = (line: string, key: number) => {
    // Split by bold (**...**), italic (*...*), and inline code (`...`)
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/);
    return (
      <span key={key}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} style={{ color: '#00F0FF', fontWeight: 'bold' }}>
                {part.slice(2, -2)}
              </strong>
            );
          } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return (
              <em key={i} style={{ color: '#FFD700', fontStyle: 'italic' }}>
                {part.slice(1, -1)}
              </em>
            );
          } else if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={i}
                style={{
                  backgroundColor: '#0D0221',
                  color: '#FF006E',
                  padding: '0 4px',
                  border: '1px solid #FF006E',
                  fontFamily: 'VT323, monospace',
                  fontSize: '16px',
                }}
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div style={{ lineHeight: '1.5' }}>
      {lines.map((line, index) => {
        const trimmed = line.trim();

        // Bullet list item
        if (/^[-•*]\s/.test(trimmed)) {
          return (
            <div key={index} style={{ display: 'flex', gap: '6px', marginBottom: '2px' }}>
              <span style={{ color: '#00F0FF', flexShrink: 0 }}>▸</span>
              <span>{renderInline(trimmed.slice(2), index)}</span>
            </div>
          );
        }

        // Numbered list item
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.\s)(.*)/)!;
          return (
            <div key={index} style={{ display: 'flex', gap: '6px', marginBottom: '2px' }}>
              <span style={{ color: '#FFD700', flexShrink: 0 }}>{match[1]}</span>
              <span>{renderInline(match[2], index)}</span>
            </div>
          );
        }

        // Heading (## or #)
        if (/^#{1,3}\s/.test(trimmed)) {
          const headingText = trimmed.replace(/^#{1,3}\s/, '');
          return (
            <div
              key={index}
              style={{
                color: '#FFD700',
                fontWeight: 'bold',
                marginTop: '6px',
                marginBottom: '2px',
                fontSize: '20px',
              }}
            >
              {headingText}
            </div>
          );
        }

        // Empty line = spacing
        if (trimmed === '') {
          return <div key={index} style={{ height: '6px' }} />;
        }

        // Regular paragraph line
        return <div key={index}>{renderInline(line, index)}</div>;
      })}
    </div>
  );
}

// Typewriter effect component
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Show plain text while typing, full markdown once done
  const isDone = currentIndex >= text.length;
  return isDone
    ? <MarkdownMessage text={text} />
    : <span>{displayedText}</span>;
}
