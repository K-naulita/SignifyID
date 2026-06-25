import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { supabase } from '../supabaseClient'; 
import { 
  ArrowLeft, 
  Trash2, 
  Mic, 
  User,
  RotateCcw
} from 'lucide-react';

import BottomNav from '../components/BottomNav'; 

const ANIMATION_DICTIONARY = {
  default: '/dengar.png',       
  khusus: '/mohonmaaf.png',  
  halo: '/halo.png',
  'terima kasih': '/terimakasih.png',
  'selamat tinggal': '/selamattinggal.png',
  maaf: '/maaf.png',
  tidak: '/tidak.png',
  berhenti: '/berhenti.png',
  silakan: '/silakan.png'
};

export default function SignifyIDHome() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [userProfile, setUserProfile] = useState(null);

  const [currentCharacterImage, setCurrentCharacterImage] = useState(ANIMATION_DICTIONARY.default);
  const [bubbleText, setBubbleText] = useState('SAYA MENDENGARKAN...');
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const MAX_WORDS = 10;
  
  const recognitionRef = useRef(null);
  const baseTextRef = useRef('');
  const intervalRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile(user);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = true; 
      recognition.lang = 'id-ID'; 

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const newSpeechText = finalTranscript || interimTranscript;
        const combinedText = baseTextRef.current 
          ? `${baseTextRef.current} ${newSpeechText}`
          : newSpeechText;
        
        const cleanedText = combinedText.trim().replace(/\s+/g, ' ');
        const wordsArray = cleanedText ? cleanedText.split(' ') : [];
        const words = wordsArray.length;

        if (words <= MAX_WORDS) {
          setTranscription(cleanedText);
        } else {
          const truncatedText = wordsArray.slice(0, MAX_WORDS).join(' ');
          setTranscription(truncatedText);
          handleStopRecording(truncatedText);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Browser ini tidak mendukung Web Speech API.');
    }
  }, []);

  useEffect(() => {
    const cleanedText = transcription.trim().replace(/\s+/g, ' ');
    if (!cleanedText) {
      setWordCount(0);
      return;
    }
    const words = cleanedText.split(' ').length;
    setWordCount(words);
  }, [transcription]);

  const startTranslationProcess = (fullText) => {
    if (!fullText.trim()) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsTranslating(true);
    setShowWarningAlert(false);

    const cleanWords = fullText.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
    const tokensQueue = [];
    
    let i = 0;
    while (i < cleanWords.length) {
      if (i + 1 < cleanWords.length) {
        const bigram = `${cleanWords[i]} ${cleanWords[i+1]}`;
        if (ANIMATION_DICTIONARY[bigram]) {
          tokensQueue.push(bigram);
          i += 2;
          continue;
        }
      }
      tokensQueue.push(cleanWords[i]);
      i++;
    }
    
    let currentIndex = 0;
    const intervalDuration = 1500 / speed;

    intervalRef.current = setInterval(() => {
      if (currentIndex >= tokensQueue.length) {
        clearInterval(intervalRef.current);
        setIsTranslating(false);
        setCurrentCharacterImage(ANIMATION_DICTIONARY.default);
        setBubbleText('SAYA MENDENGARKAN...');
        setShowWarningAlert(false); 
        return;
      }

      const currentToken = tokensQueue[currentIndex];
      setBubbleText(currentToken.toUpperCase()); 

      if (ANIMATION_DICTIONARY[currentToken]) {
        setCurrentCharacterImage(ANIMATION_DICTIONARY[currentToken]);
        setShowWarningAlert(false);
      } else {
        setCurrentCharacterImage(ANIMATION_DICTIONARY.khusus); 
        setShowWarningAlert(true); 
      }

      currentIndex++;
    }, intervalDuration);
  };

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Fitur rekam suara tidak didukung di browser ini.');
      return;
    }

    if (isRecording) {
      handleStopRecording(transcription);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      baseTextRef.current = transcription.trim();
      setIsRecording(true);
      setShowWarningAlert(false);
      recognitionRef.current.start();
    }
  };

  const handleStopRecording = async (textToSave) => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop(); 
    }

    if (textToSave.trim() !== '') {
      startTranslationProcess(textToSave);

      const finalWordsCount = textToSave.trim().replace(/\s+/g, ' ').split(' ').length;
      const { error } = await supabase
        .from('transcriptions')
        .insert([
          { 
            text: textToSave, 
            word_count: finalWordsCount,
            user_id: userProfile?.id || null 
          }
        ]);
      
      if (error) console.error('Gagal menyimpan ke Supabase:', error.message);
    }
  };

  const handleClear = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setTranscription('');
    baseTextRef.current = ''; 
    setIsRecording(false);
    setIsTranslating(false);
    setShowWarningAlert(false);
    setCurrentCharacterImage(ANIMATION_DICTIONARY.default);
    setBubbleText('SIAP MENDENGARKAN...');
  };

  const handleChangeSpeed = () => {
    setSpeed((prev) => {
      if (prev === 0.5) return 1.0;
      if (prev === 1.0) return 1.5;
      if (prev === 1.5) return 2.0;
      return 0.5;
    });
  };

  const handleReplayAnimation = () => {
    if (transcription.trim() && !isRecording) {
      startTranslationProcess(transcription);
    }
  };

  return (
    <div className="flex justify-center bg-transparent min-h-screen">
      <div className="w-full max-w-md bg-transparent flex flex-col justify-between min-h-screen relative font-sans text-slate-800">
        
        <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-gray-50 bg-white rounded-t-3xl">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)} 
              className="text-slate-700 hover:opacity-70 p-1"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-1.5">
              <img 
                src="/Logo kotak.png"  
                alt="SignifyID Logo" 
                className="w-25 h-25 object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              Online
            </span>
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-gray-200 text-slate-500">
              <User size={20} />
            </div>            
          </div>
        </div>

        <div className="flex-1 px-6 pt-2 flex flex-col items-center overflow-y-auto pb-24">
          
          <div className="w-full relative flex flex-col items-center my-2">
            <div className="absolute right-4 top-2 bg-amber-100 border border-amber-200 shadow-sm rounded-2xl rounded-tr-none px-4 py-2 max-w-[150px] z-10 transition-all">
              <p className="text-xs text-amber-900 font-bold leading-tight">
                {isRecording ? "MENDENGARKAN..." : bubbleText}
              </p>
            </div>
            
            <div className="w-48 h-48 my-4 flex items-center justify-center relative">
              <img 
                src={currentCharacterImage} 
                alt="Karakter SignifyID" 
                className="w-full h-full object-contain transition-all"
              />
            </div>
          </div>

          {showWarningAlert && (
            <div className="w-full flex items-center gap-3 bg-[#FCEF91] border border-[#EAD460] rounded-2xl px-4 py-3 mb-4 shadow-sm animate-fade-in">
              <div className="w-5 h-5 bg-[#4285F4] rounded-full flex items-center justify-center text-white font-bold text-xs">
                i
              </div>
              <p className="text-sm text-[#2B54D3] font-medium">
                Mohon maaf, kata ini belum tersedia.
              </p>
            </div>
          )}

          <div className="w-full bg-white border-2 border-slate-50 shadow-sm rounded-3xl p-5 relative min-h-[140px] flex flex-col justify-between border-l-4 border-l-amber-400">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-950 text-sm">Transkripsi Suara</h3>
              <span className={`text-xs ${wordCount >= MAX_WORDS ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                {wordCount}/{MAX_WORDS} kata
              </span>
            </div>
            <p className={`text-sm flex-1 mb-6 ${transcription ? 'text-slate-800' : 'text-gray-400'}`}>
              {transcription || 'Ketuk tombol mikrofon di bawah lalu mulai berbicara...'}
            </p>

            {/* TOMBOL ULANGI */}
            {transcription && !isRecording && (
              <button
                onClick={handleReplayAnimation}
                disabled={isTranslating}
                className={`absolute bottom-3 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm border border-amber-200 transition-all ${
                  isTranslating 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 active:scale-95'
                }`}
                title="Ulangi gerakan animasi"
              >
                <RotateCcw size={14} className={isTranslating ? "" : "animate-spin-slow"} />
                Ulangi
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full max-w-xs mt-6 mb-4">
            <button 
              onClick={handleClear}
              className="flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-red-600 shadow-sm transition-all duration-150 transform active:bg-red-500 active:text-white active:scale-95">
                <Trash2 className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-900 font-medium">Hapus</span>
            </button>

            <button 
              onClick={handleToggleRecording}
              disabled={(wordCount >= MAX_WORDS && !isRecording) || isTranslating}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-slate-900 shadow-md transform transition active:scale-95 ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : (wordCount >= MAX_WORDS || isTranslating ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-amber-100')
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>

            <button 
              onClick={handleChangeSpeed}
              className="flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-slate-800 shadow-sm group-active:scale-95 transition font-bold text-sm">
                {speed.toFixed(1)}x
              </div>
              <span className="text-xs text-slate-900 font-medium">Kecepatan</span>
            </button>
          </div>

          <button 
            onClick={handleToggleRecording}
            disabled={(wordCount >= MAX_WORDS && !isRecording) || isTranslating}
            className={`w-full py-3.5 rounded-full font-bold text-xs tracking-wider transition shadow-md active:scale-[0.99] ${
              isRecording 
                ? 'bg-red-600 text-white' 
                : (wordCount >= MAX_WORDS || isTranslating ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-950 text-white')
            }`}
          >
            {isRecording ? 'BERHENTI BERBICARA' : 'MULAI BERBICARA'}
          </button>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}