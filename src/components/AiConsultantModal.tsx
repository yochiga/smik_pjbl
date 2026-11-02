import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ProjectSimulation } from '../types';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectContext: ProjectSimulation | null;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  projectContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Halo! Saya Guru Pembimbing AI SimulasiVokasi. Ada alat atau bahan yang tidak tersedia di lab SMKN 4 Kendari? Atau Anda butuh bantuan teknis terkait langkah kerja "${projectContext?.title || 'Purwarupa'}"? Tanyakan langsung di sini!`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          projectContext: {
            title: projectContext?.title,
            profession: projectContext?.profession,
            tools: projectContext?.toolsUsed,
            materials: projectContext?.materialsUsed,
          },
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Tetap utamakan keselamatan kerja dan gunakan alat yang terverifikasi aman.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Maaf, terjadi gangguan jaringan ke server AI. Anda dapat menggunakan alat cadangan yang disarankan di modul kerja.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col h-[520px] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center border border-purple-500/40">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Konsultasi Pembimbing Vokasi AI
              </h3>
              <p className="text-[11px] text-slate-400">
                Solusi Substitusi Alat &amp; Bantuan Teknis SMKN 4 Kendari
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/40 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs text-slate-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Guru Pembimbing AI sedang menyusun solusi...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/80 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanyakan substitusi bahan, troubleshooting, atau K3..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Kirim</span>
          </button>
        </form>
      </div>
    </div>
  );
};
