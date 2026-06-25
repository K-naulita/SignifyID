import React, { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { 
  User, 
  Trash2, 
  Gauge, 
  Languages,
  Info 
} from 'lucide-react'; 

const CHARACTER_IMAGES = {
  default: '/animasi2.png',       
  khusus: '/mohonmaaf.png',  
  halo: '/halo.png',
  'terima kasih': '/terimakasih.png',
  'selamat tinggal': '/selamattinggal.png',
  maaf: '/maaf.png',
  tidak: '/tidak.png',
  berhenti: '/berhenti.png',
  silakan: '/silakan.png'
};

export default function TranslatePage() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState('1.0x');
  
  const [activeCharacter, setActiveCharacter] = useState('default');
  const [activeChip, setActiveChip] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  
  const [queue, setQueue] = useState([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(-1);
  
  const timerRef = useRef(null);

  const maxWords = 10;
  
  const kumpulanKataInput = text.trim() === '' ? [] : text.trim().split(/\s+/);
  const wordCount = kumpulanKataInput.length;

  const handleTextChange = (e) => {
    const value = e.target.value;
    const kataBaru = value.trim() === '' ? [] : value.trim().split(/\s+/);
    
    if (kataBaru.length <= maxWords) {
      setText(value);
    } else {
      const teksDipotong = value.split(/\s+/).slice(0, maxWords).join(' ');
      setText(teksDipotong);
    }
  };

  const dapatkanDurasiKecepatan = () => {
    switch (speed) {
      case '0.5x': return 3000; 
      case '1.5x': return 1000; 
      case '2.0x': return 700;  
      default: return 1800;     
    }
  };

  useEffect(() => {
    if (queue.length > 0 && currentQueueIndex >= 0 && currentQueueIndex < queue.length) {
      const itemSaatIni = queue[currentQueueIndex];
      
      setActiveCharacter(itemSaatIni.idGambar);
      setShowWarning(itemSaatIni.apakahKhusus);

      timerRef.current = setTimeout(() => {
        setCurrentQueueIndex((prevIndex) => prevIndex + 1);
      }, dapatkanDurasiKecepatan());

    } else if (currentQueueIndex >= queue.length && queue.length > 0) {
      setCurrentQueueIndex(-1);
      setQueue([]);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [queue, currentQueueIndex, speed]);

  const handleTranslate = () => {
    if (!text.trim()) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    const kumpulanKata = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .trim()
      .split(/\s+/);

    const antreanBaru = [];

    kumpulanKata.forEach((kata) => {
      if (!kata) return;

      if (kata === 'terima' && kumpulanKata[kumpulanKata.indexOf(kata) + 1] === 'kasih') {
        antreanBaru.push({ teksAsli: 'terima kasih', idGambar: 'terima kasih', apakahKhusus: false });
        kumpulanKata[kumpulanKata.indexOf(kata) + 1] = ""; 
      } else if (kata === 'selamat' && kumpulanKata[kumpulanKata.indexOf(kata) + 1] === 'tinggal') {
        antreanBaru.push({ teksAsli: 'selamat tinggal', idGambar: 'selamat tinggal', apakahKhusus: false });
        kumpulanKata[kumpulanKata.indexOf(kata) + 1] = ""; 
      } else if (kata === "") {
        // Skip
      } else if (CHARACTER_IMAGES[kata]) {
        antreanBaru.push({ teksAsli: kata, idGambar: kata, apakahKhusus: false });
      } else {
        antreanBaru.push({ teksAsli: kata, idGambar: 'khusus', apakahKhusus: true });
      }
    });

    if (antreanBaru.length > 0) {
      setQueue(antreanBaru);
      setCurrentQueueIndex(0); 
    }

    const teksMurni = text.trim().toLowerCase();
    if (['halo', 'terima kasih', 'selamat tinggal', 'maaf'].includes(teksMurni)) {
      setActiveChip(teksMurni);
    } else {
      setActiveChip('');
    }
  };

  const handleChipClick = (chipValue) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setText(chipValue);
    setActiveChip(chipValue.toLowerCase());
    setShowWarning(false);
    
    setQueue([]);
    setCurrentQueueIndex,-1;
    setActiveCharacter(chipValue.toLowerCase());
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setText('');
    setActiveChip('');
    setActiveCharacter('default');
    setShowWarning(false);
    setQueue([]);
    setCurrentQueueIndex(-1);
  };

  return (
    <div className="min-h-screen bg-transparent flex justify-center items-center p-4">
      
      <div className="w-[390px] h-[820px] bg-transparent flex flex-col font-sans relative overflow-hidden rounded-none isolate">
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        <div className="p-4 pl-4 flex items-center justify-between bg-white border-b border-gray-100 shrink-0 z-10 shadow-sm">
          <div className="flex items-center">
            <img src="/Logo kotak.png" alt="Logo" className="h-12 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </div>
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-gray-200 text-slate-500">
              <User size={20} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-24 overflow-x-hidden bg-transparent no-scrollbar">
          
          {currentQueueIndex >= 0 && queue[currentQueueIndex] && (
            <div className="text-center mt-2">
              <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Isyarat: {queue[currentQueueIndex].teksAsli}
              </span>
            </div>
          )}

          <div className="flex justify-center my-4 shrink-0">
            <img 
              src={CHARACTER_IMAGES[activeCharacter] || CHARACTER_IMAGES.default} 
              alt="Mascot SignifyID" 
              className="w-60 h-60 object-contain transition-all duration-300" 
            />
          </div>

          {showWarning && (
            <div className="mb-4 flex items-center gap-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl px-4 py-3.5 shadow-sm transition-all animate-fadeIn shrink-0">
              <Info className="w-5 h-5 text-[#2563EB] shrink-0" />
              <p className="text-[#1E40AF] font-medium text-xs">
                Mohon maaf, kata ini belum tersedia.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#0F172A] text-sm">Masukkan Teks untuk Diterjemahkan</h3>
              <span className={`text-xs font-semibold ${wordCount >= maxWords ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                {wordCount}/{maxWords} kata
              </span>
            </div>

            <textarea
              className="w-full h-32 p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 placeholder-gray-300 shadow-sm text-sm resize-none transition-all"
              placeholder="Ketik sesuatu di sini... (Maksimal 10 kata)"
              value={text}
              onChange={handleTextChange}
            />

            <button 
              onClick={handleTranslate}
              className="w-full bg-[#05004E] hover:bg-[#0A0066] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform text-sm"
            >
              <Languages size={18} />
              Terjemahkan ke Isyarat
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button 
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm"
            >
              <Trash2 size={16} />
              Hapus
            </button>

            <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl bg-white relative shadow-sm">
              <Gauge size={16} className="text-slate-400" />
              <select 
                value={speed} 
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full bg-transparent text-slate-700 font-bold text-sm outline-none appearance-none cursor-pointer"
              >
                <option value="0.5x">0.5x</option>
                <option value="1.0x">1.0x</option>
                <option value="1.5x">1.5x</option>
                <option value="2.0x">2.0x</option>
              </select>
              <span className="absolute right-4 pointer-events-none text-[10px] text-slate-500">▼</span>
            </div>
          </div>

          <div className="flex gap-2 mt-5 overflow-x-auto py-1 shrink-0 no-scrollbar">
            {['Halo', 'Terima kasih', 'Selamat tinggal', 'Maaf'].map((chip) => {
              const isSelected = activeChip === chip.toLowerCase();
              return (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className={`whitespace-nowrap px-5 py-2 border rounded-full font-bold text-xs transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#05004E] border-[#05004E] text-white' 
                      : 'bg-white border-gray-200 text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 bg-white border-t border-gray-100 z-20">
          <BottomNav />
        </div>

      </div>
    </div>
  );
}