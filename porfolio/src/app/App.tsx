import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AIChatbot } from './components/AIChatbot';

export default function App() {
  return (
    <div 
      className="min-h-screen overflow-x-hidden scanline"
      style={{
        fontFamily: 'VT323, monospace',
        backgroundColor: '#0D0221',
        color: '#FFFFFF',
      }}
    >
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer 
        className="py-8 px-6 border-t text-center relative"
        style={{ 
          borderColor: 'rgba(255, 215, 0, 0.3)',
          backgroundColor: '#1A0B2E',
          borderWidth: '4px',
          borderStyle: 'solid',
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #FFD700 0px,
            transparent 1px,
            transparent 2px,
            #FFD700 3px
          )`
        }} />
        <p 
          className="text-lg relative z-10"
          style={{ 
            fontFamily: 'Press Start 2P, monospace',
            color: '#A8A8C0',
            fontSize: '10px',
            lineHeight: '1.8',
          }}
        >
          © 2026 MOHAMMAD N. SHAIKH
          <br />
          <span style={{ color: '#FFD700' }}>BUILT WITH</span>{' '}
          <span style={{ color: '#00F0FF' }}>REACT</span>{' '}
          <span style={{ color: '#FF006E' }}>TYPESCRIPT</span>{' '}
          <span style={{ color: '#FF8800' }}>& AI</span>
        </p>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
