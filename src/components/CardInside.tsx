import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Edit3, Save, Youtube } from 'lucide-react';
import type { CardData } from '../types';

interface CardInsideProps {
  data: CardData;
  onUpdate: (data: CardData) => void;
}

const extractYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function CardInside({ data, onUpdate }: CardInsideProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMessage, setTempMessage] = useState(data.message);
  const [tempYoutubeUrl, setTempYoutubeUrl] = useState(data.youtubeId ? `https://youtube.com/watch?v=${data.youtubeId}` : '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate({ 
      ...data, 
      message: tempMessage,
      youtubeId: extractYoutubeId(tempYoutubeUrl)
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-none shadow-2xl border-[12px] border-white relative"
    >
      <div className="p-8 md:p-12">
        <div className="text-center mb-10 border-b border-[#e5e0d8] pb-6 relative group">
          {/* Logo Section */}
          <div className="mx-auto w-32 h-32 mb-6 relative">
            {data.logo ? (
              <img src={data.logo} alt="Logo Tambang 2005" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full border-2 border-dashed border-[#e5e0d8] rounded-full flex flex-col items-center justify-center text-[#8b7e6d]">
                <Camera size={24} className="mb-2 opacity-50" />
                <p className="text-[10px] font-medium text-center px-2">Tambah Logo</p>
              </div>
            )}
            
            {/* Edit Logo Overlay */}
            <div className={`absolute inset-0 bg-white/80 rounded-full opacity-0 ${isEditing ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity flex items-center justify-center cursor-pointer`}
                 onClick={() => logoInputRef.current?.click()}>
              <div className="flex flex-col items-center text-[#4a3f35]">
                <Edit3 size={20} className="mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ganti Logo</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={logoInputRef} 
              onChange={handleLogoUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-[#8b7e6d] mb-2">Memperingati 26 Tahun Ikatan Alumni Tambang</p>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4a3f35] font-bold mb-2"
          >
            HUT IKATA KE-26
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-[#2d4f1e] font-medium italic"
          >
            UPN "Veteran" Yogyakarta Angkatan 2005
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo Section */}
          <div className="relative group overflow-hidden aspect-[4/5] bg-[#e5e0d8] border-[8px] border-white shadow-sm">
            {data.photo ? (
              <img src={data.photo} alt="Alumni Tambang 2005" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#8b7e6d] p-6 text-center">
                <Camera size={48} className="mb-4 opacity-50" />
                <p className="text-sm font-medium mb-2">Belum ada foto.</p>
                <p className="text-xs">Rekomendasi ukuran: 1080 x 1350 pixel (Rasio 4:5)</p>
              </div>
            )}
            
            {/* Edit Photo Overlay */}
            <div className={`absolute inset-0 bg-black/40 opacity-0 ${isEditing ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity flex flex-col items-center justify-center`}>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#fdfaf8] text-[#4a3f35] rounded-full font-medium flex items-center gap-2 hover:bg-white transition-colors shadow-lg text-sm mb-2"
              >
                <Camera size={18} />
                Ganti Foto
              </button>
              {isEditing && (
                 <p className="text-white text-xs bg-black/50 px-2 py-1 rounded">Disarankan: Rasio 4:5 (Portrait)</p>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          {/* Message Section */}
          <div className="flex flex-col justify-center h-full">
            <div className="relative">
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={tempMessage}
                    onChange={(e) => setTempMessage(e.target.value)}
                    className="w-full h-48 md:h-64 p-4 bg-[#fdfaf8] border border-[#e5e0d8] text-[#5c5146] focus:outline-none focus:border-[#8b7e6d] focus:ring-1 focus:ring-[#8b7e6d] resize-none font-serif text-lg leading-relaxed shadow-inner"
                  />
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2d4f1e] hover:bg-[#3a6627] text-white rounded font-medium transition-colors text-sm"
                  >
                    <Save size={18} /> Simpan Pesan
                  </button>
                </div>
              ) : (
                <div className="group relative">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#4a3f35]">
                    <span className="w-6 h-[1px] bg-[#8b7e6d]"></span> Pesan <span className="w-6 h-[1px] bg-[#8b7e6d]"></span>
                  </h2>
                  <div className="text-[#5c5146] font-serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap italic indent-6">
                    "{data.message}"
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2d4f1e] flex items-center justify-center text-white font-bold text-xs">
                      05
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4a3f35]">Dari Alumni 2005</p>
                      <p className="text-[10px] text-[#8b7e6d] uppercase tracking-wider">Solidaritas Tanpa Batas</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="absolute -top-2 -right-2 p-2 bg-white text-[#8b7e6d] hover:text-[#4a3f35] rounded-full opacity-0 group-hover:opacity-100 transition-all border border-[#e5e0d8] shadow-sm"
                    title="Edit pesan"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e5e0d8] pt-8">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-[#4a3f35]">
                <span className="w-6 h-[1px] bg-[#8b7e6d]"></span> Video Kenangan <span className="w-6 h-[1px] bg-[#8b7e6d]"></span>
              </h2>
           </div>
           
           {isEditing && (
              <div className="mb-6 space-y-2 bg-[#fdfaf8] p-4 border border-[#e5e0d8]">
                 <label className="block text-sm font-bold text-[#4a3f35] flex items-center gap-2">
                    <Youtube size={16} className="text-red-600" /> Link Video YouTube
                 </label>
                 <input 
                    type="text" 
                    placeholder="Contoh: https://www.youtube.com/watch?v=..."
                    value={tempYoutubeUrl}
                    onChange={(e) => setTempYoutubeUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#e5e0d8] text-[#4a3f35] focus:outline-none focus:border-[#8b7e6d] focus:ring-1 focus:ring-[#8b7e6d] text-sm"
                 />
                 <p className="text-xs text-[#8b7e6d]">Masukkan link YouTube untuk menampilkan video angkatan.</p>
              </div>
           )}

           {data.youtubeId ? (
              <div className="aspect-video w-full bg-[#e5e0d8] border-[8px] border-white shadow-sm relative overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${data.youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
           ) : (
              <div className="aspect-video w-full bg-[#e5e0d8] border-[8px] border-white shadow-sm flex flex-col items-center justify-center text-[#8b7e6d]">
                 <Youtube size={48} className="mb-4 opacity-50 text-[#8b5e3c]" />
                 <p className="text-sm font-medium">Belum ada video. Tambahkan link YouTube di mode edit.</p>
              </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}
