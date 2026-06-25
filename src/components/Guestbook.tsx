import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send } from 'lucide-react';
import type { Comment } from '../types';

export function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ikata-comments');
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      // Default comments
      setComments([
        { id: '1', name: 'Budi 05', message: 'Selamat ulang tahun IKATA! Jaya selalu Tambang UPN!', timestamp: Date.now() - 86400000 },
        { id: '2', name: 'Andi M', message: 'Semoga makin solid angkatan 2005.', timestamp: Date.now() - 3600000 },
      ]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem('ikata-comments', JSON.stringify(updated));
    setName('');
    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 bg-white border border-[#e5e0d8] shadow-sm rounded-none overflow-hidden">
      <div className="p-4 border-b border-[#f7f3ee] bg-[#fdfaf8] flex justify-between items-center">
        <h3 className="font-bold text-sm text-[#4a3f35] flex items-center gap-2">
          <MessageSquare size={16} className="text-[#8b5e3c]" />
          Buku Tamu Angkatan
        </h3>
        <span className="text-[10px] bg-[#8b7e6d] text-white px-2 py-0.5 rounded-full">{comments.length} Comments</span>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nama (Misal: Joko - 05)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#fdfaf8] border border-[#e5e0d8] text-[#4a3f35] focus:outline-none focus:border-[#8b7e6d] focus:ring-1 focus:ring-[#8b7e6d] transition-colors placeholder-[#a89f91] text-sm"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Tuliskan kesan & pesan untuk IKATA..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-[#fdfaf8] border border-[#e5e0d8] text-[#4a3f35] focus:outline-none focus:border-[#8b7e6d] focus:ring-1 focus:ring-[#8b7e6d] transition-colors placeholder-[#a89f91] resize-none text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-[#2d4f1e] hover:bg-[#3a6627] text-white font-medium flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Send size={16} />
            Kirim Pesan
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={comment.id}
              className="flex gap-4 text-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#d8c3a5] shrink-0 flex items-center justify-center text-[#8b5e3c] font-bold uppercase">
                {comment.name.substring(0, 2)}
              </div>
              <div className="flex-1 pb-4 border-b border-[#f7f3ee] last:border-0">
                <p className="font-bold text-[#4a3f35] mb-1">
                  {comment.name} 
                  <span className="font-normal text-[10px] text-[#8b7e6d] ml-2">
                    {new Date(comment.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </p>
                <p className="text-[#5c5146] leading-relaxed whitespace-pre-wrap">{comment.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
