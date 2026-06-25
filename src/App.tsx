import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CardCover } from './components/CardCover';
import { CardInside } from './components/CardInside';
import { Guestbook } from './components/Guestbook';
import { AudioPlayer } from './components/AudioPlayer';
import type { CardData } from './types';
import { cardDocRef } from './lib/firebase';
import { onSnapshot, setDoc } from 'firebase/firestore';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState<CardData>({
    photo: null,
    logo: 'https://i.ibb.co.com/ycTkYnHP/Untitled-design-2.png',
    youtubeId: 'T1D5yADPMck',
    message: "Selamat memperingati hari jadi yang ke-26, IKATA UPN 'Veteran' Yogyakarta!\n\nSemoga ikatan persaudaraan alumni tambang semakin solid, terus berkontribusi untuk almamater dan kemajuan pertambangan nusantara. Tambang!!",
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    // Listen for changes from Firestore
    const unsubscribe = onSnapshot(cardDocRef, (doc) => {
      if (doc.exists()) {
        setCardData(doc.data() as CardData);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateCard = async (newData: CardData) => {
    // Optimistic update
    setCardData(newData);
    setSaveStatus('saving');
    // Save to Firestore
    try {
      await setDoc(cardDocRef, newData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      setSaveStatus('error');
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    
    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#8b5e3c', '#2d4f1e', '#8b7e6d', '#d8c3a5']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#8b5e3c', '#2d4f1e', '#8b7e6d', '#d8c3a5']
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#4a3f35] font-sans selection:bg-[#d8c3a5]/50">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#8b7e6d 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 min-h-screen flex flex-col items-center">
        {!isOpen ? (
          <CardCover onOpen={handleOpen} logo={cardData.logo} />
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <CardInside data={cardData} onUpdate={handleUpdateCard} saveStatus={saveStatus} />
            <Guestbook />
          </div>
        )}
      </main>

      {/* Audio player only mounts when card is opened to try auto-playing */}
      {isOpen && (
        <AudioPlayer youtubeId={cardData.youtubeId} /> 
      )}
    </div>
  );
}

