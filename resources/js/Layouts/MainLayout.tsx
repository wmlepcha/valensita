import { ReactNode, useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';
import ValuePropositions from '../Components/ValuePropositions';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({ children, title = 'VALENSITA' }: MainLayoutProps) {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the first section (Hero section) height
      const firstSection = document.querySelector('section');
      if (firstSection) {
        const firstSectionHeight = firstSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Show button after scrolling past the first section
        if (scrollPosition > firstSectionHeight) {
          setShowWhatsApp(true);
        } else {
          setShowWhatsApp(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check on mount in case page loads scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <ValuePropositions />
        <Footer />
      </div>
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.link/387mpu"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          showWhatsApp 
            ? 'opacity-100 translate-y-0 animate-bounce' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Chat on WhatsApp"
      >
        <img 
          src="/storage/images/whatsapp-logo.png" 
          alt="WhatsApp" 
          className="w-8 h-8 object-contain rounded-full"
        />
      </a>
    </>
  );
}

