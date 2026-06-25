import { motion } from 'motion/react';
import { MailOpen } from 'lucide-react';

interface CardCoverProps {
  onOpen: () => void;
  logo: string | null;
}

export function CardCover({ onOpen, logo }: CardCoverProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] cursor-pointer group"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-72 h-48 md:w-96 md:h-64 bg-[#e5e0d8] border-8 border-white rounded-lg shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-105 group-hover:shadow-2xl">
        <div className="absolute inset-1 border border-[#8b7e6d]/30 rounded-sm pointer-events-none" />
        
        {/* Envelope Flap styling */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-sm pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#d8c3a5]/30 rotate-45 border-b border-r border-white shadow-inner" />
        </div>

        <div className="z-10 flex flex-col items-center text-center p-6 bg-white/90 backdrop-blur-sm rounded-full border border-[#e5e0d8] shadow-md relative w-32 h-32 justify-center">
          {logo ? (
             <img src={logo} alt="Logo" className="w-full h-full object-contain absolute inset-0 p-2" />
          ) : (
            <>
              <MailOpen className="text-[#2d4f1e] mb-2" size={32} />
              <p className="text-[#8b5e3c] font-bold tracking-widest uppercase text-sm font-sans">Buka Kartu</p>
            </>
          )}
        </div>
      </div>
      <motion.p 
        className="mt-8 text-[#8b7e6d] text-sm tracking-wider uppercase font-semibold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Ketuk untuk membuka
      </motion.p>
    </motion.div>
  );
}
