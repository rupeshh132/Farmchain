import React, { useState, useEffect, useRef } from 'react';
import { Camera, Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Upload, Clock, Sprout } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  note: string;
  photoBase64: string | null;
  timestamp: number;
}

export const FieldJournalPage: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('farmchain_journal');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse journal data');
      }
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('farmchain_journal', JSON.stringify(newEntries));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEntry = () => {
    if (!note.trim() && !photo) return;
    
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: dateStr,
      note,
      photoBase64: photo,
      timestamp: Date.now()
    };
    
    saveEntries([newEntry, ...entries]);
    setNote('');
    setPhoto(null);
  };

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const todayDateStr = new Date().toISOString().split('T')[0];
  
  // Set of dates that have entries
  const activeDates = new Set(entries.map(e => e.date));
  
  const renderCalendar = () => {
    const days = [];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Header
    const header = weekDays.map((d, i) => (
      <div key={`h-${i}`} className="text-center font-sans font-medium text-xs text-soil-500 py-2 border-b border-soil-200">
        {d}
      </div>
    ));
    
    // Empty cells before 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`e-${i}`} className="p-2 border-b border-r border-soil-200/50 bg-wheat-50/20" />);
    }
    
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isActive = activeDates.has(dateStr);
      const isToday = dateStr === todayDateStr;
      
      days.push(
        <div key={d} className={`relative p-2 h-14 md:h-16 border-b border-r border-soil-200/50 flex flex-col items-center justify-center transition-colors
          ${isToday ? 'bg-leaf-50' : 'hover:bg-soil-50'}
        `}>
          <span className={`font-sans font-medium text-sm z-10 ${isToday ? 'font-bold text-leaf-700' : 'text-soil-700'}`}>
            {d}
          </span>
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <CheckCircle2 size={32} className="text-leaf-600 opacity-20" strokeWidth={1} />
            </div>
          )}
          {isActive && (
             <div className="mt-1 w-1.5 h-1.5 rounded-2xl bg-leaf-600" />
          )}
        </div>
      );
    }
    
    return (
      <div className="border-t border-l border-soil-200/50">
        <div className="grid grid-cols-7">
          {header}
          {days}
        </div>
      </div>
    );
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  // Current Streak Calculation
  let currentStreak = 0;
  const tempDate = new Date();
  while (true) {
    const dStr = tempDate.toISOString().split('T')[0];
    if (activeDates.has(dStr)) {
      currentStreak++;
      tempDate.setDate(tempDate.getDate() - 1);
    } else {
      if (currentStreak === 0 && dStr === todayDateStr) {
        // Allow missing today without breaking streak if yesterday was logged
        tempDate.setDate(tempDate.getDate() - 1);
        const yStr = tempDate.toISOString().split('T')[0];
        if (activeDates.has(yStr)) {
          currentStreak++;
          tempDate.setDate(tempDate.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  return (
    <div className="min-h-screen bg-cream px-4 md:px-8 py-8 md:py-12 max-w-5xl mx-auto selection:bg-soil-900 selection:text-cream">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-soil-900 pb-6 gap-4">
        <div>
          <button onClick={() => navigate('/dashboard')} className="font-sans font-medium text-[10px] tracking-wide text-soil-500 hover:text-soil-900 mb-4 flex items-center gap-2">
             ← Return to Dashboard
          </button>
          <h1 className="text-4xl md:text-5xl font-heading text-soil-900 mb-2 flex items-center gap-4 font-bold tracking-tight">
            Field Journal
          </h1>
          <p className="text-soil-600 font-body text-base italic">
            Document daily observations, crop health, and activities.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tracker and Entry Form */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Calendar Streak Tracker (FarmChain Editorial Style) */}
          <Card className="bg-transparent shadow-none border-soil-900 rounded-2xl p-0 overflow-hidden">
            <div className="p-4 border-b border-soil-900 bg-soil-900 text-cream flex justify-between items-center">
              <span className="font-sans font-medium text-xs tracking-wide flex items-center gap-2">
                <CalendarIcon size={14} /> Activity Ledger
              </span>
              <span className="font-sans font-medium text-[10px] tracking-wide border border-cream/30 px-2 py-0.5">
                Streak: {currentStreak} Days
              </span>
            </div>
            
            <div className="p-4 flex justify-between items-center bg-wheat-50 border-b border-soil-200">
              <button onClick={prevMonth} className="p-1 hover:bg-soil-200"><ChevronLeft size={16} className="text-soil-900" /></button>
              <span className="font-heading text-lg text-soil-900">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={nextMonth} className="p-1 hover:bg-soil-200"><ChevronRight size={16} className="text-soil-900" /></button>
            </div>
            
            {renderCalendar()}
          </Card>

          {/* New Entry Form */}
          <Card className="bg-transparent shadow-none border-soil-900 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-soil-200 pb-3">
              <Sprout size={16} strokeWidth={1.5} className="text-soil-900"/>
              <span className="font-sans font-medium text-soil-900 uppercase text-xs tracking-[0.15em] font-bold">New Log Entry</span>
            </div>

            <div className="space-y-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Observed slight yellowing on lower leaves in Plot B..."
                className="w-full bg-wheat-50 border border-soil-300 p-4 font-body text-soil-800 placeholder:text-soil-400 focus:outline-none focus:border-soil-900 focus:ring-1 focus:ring-soil-900 min-h-[120px] rounded-2xl resize-y"
              />
              
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={16} /> 
                  {photo ? 'Photo Attached' : 'Attach Photo'}
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={!note.trim() && !photo}
                  onClick={handleSaveEntry}
                >
                  Save Log
                </Button>
              </div>

              {photo && (
                <div className="relative h-32 w-full mt-4 border border-soil-200">
                  <img src={photo} alt="Preview" className="w-full h-full object-cover grayscale contrast-125" />
                  <button 
                    onClick={() => setPhoto(null)}
                    className="absolute top-2 right-2 bg-soil-900 text-cream w-6 h-6 flex items-center justify-center font-sans font-medium text-xs hover:bg-red-700"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Timeline History */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8 border-b-2 border-soil-200 pb-2">
            <h2 className="font-heading text-2xl text-soil-900">Historical Archive</h2>
            <span className="font-sans font-medium text-[10px] text-soil-500 tracking-wide">{entries.length} Records</span>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-soil-900 before:via-soil-300 before:to-transparent">
            {entries.length === 0 ? (
              <div className="text-center py-12 relative z-10 bg-cream max-w-sm mx-auto">
                <p className="font-sans font-medium text-soil-500 uppercase text-xs tracking-widest">No entries found for this ledger.</p>
              </div>
            ) : (
              entries.map((entry, _index) => {
                const dateObj = new Date(entry.timestamp);
                return (
                  <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    <div className="flex items-center justify-center w-8 h-8 rounded-2xl border-2 border-soil-900 bg-cream text-soil-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-sm">
                       <Clock size={14} strokeWidth={2} />
                    </div>
                    
                    <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 border-soil-900 shadow-none rounded-2xl bg-wheat-50 hover:bg-cream transition-colors duration-300 relative">
                       {/* Connector Line (Desktop) */}
                       <div className="hidden md:block absolute top-4 w-8 h-px bg-soil-300 -left-8 group-odd:left-auto group-odd:-right-8" />
                       
                       <div className="flex justify-between items-start border-b border-soil-200 pb-2 mb-3">
                         <span className="font-sans font-medium text-xs tracking-wide font-bold text-soil-900">
                           {dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                         </span>
                         <span className="font-sans font-medium text-[10px] text-soil-500 tracking-wide">
                           {dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute:'2-digit' })}
                         </span>
                       </div>
                       
                       {entry.note && (
                         <p className="font-body text-soil-800 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
                           {entry.note}
                         </p>
                       )}
                       
                       {entry.photoBase64 && (
                         <div className="border border-soil-900 p-1 bg-white">
                           <img src={entry.photoBase64} alt="Journal record" className="w-full h-auto grayscale contrast-110 hover:grayscale-0 transition-all duration-500" />
                         </div>
                       )}
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
