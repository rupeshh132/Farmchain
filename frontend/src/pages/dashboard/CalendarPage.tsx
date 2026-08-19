import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Droplets, Sprout, Bug, Wheat, NotepadText, CheckCircle2 } from 'lucide-react';
import { getFarms } from '../../api/farm';
import { getActivePlan, type FarmingPlan, type FarmingTask } from '../../api/plan';

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [plan, setPlan] = useState<FarmingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDayTasks, setSelectedDayTasks] = useState<FarmingTask[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmList = await getFarms();
        if (farmList.length > 0) {
          const active = await getActivePlan(farmList[0].id);
          setPlan(active);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getTasksForDate = (date: Date) => {
    if (!plan) return [];
    return plan.tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === date.getDate() && 
             taskDate.getMonth() === date.getMonth() && 
             taskDate.getFullYear() === date.getFullYear();
    });
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'SOWING': return <Sprout size={14} className="text-emerald-500" />;
      case 'FERTILIZER': return <Bug size={14} className="text-purple-500" />;
      case 'HARVEST': return <Wheat size={14} className="text-amber-500" />;
      default: return <NotepadText size={14} className="text-gray-500" />;
    }
  };

  const getTaskBgColor = (type: string) => {
    switch (type) {
      case 'SOWING': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'FERTILIZER': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'HARVEST': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setSelectedDayTasks(getTasksForDate(clickedDate));
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-32 border border-soil-100/50 bg-soil-50/30 p-2"></div>);
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const isToday = new Date().toDateString() === date.toDateString();
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const dayTasks = getTasksForDate(date);
    
    days.push(
      <div 
        key={`day-${d}`} 
        onClick={() => handleDayClick(d)}
        className={`min-h-32 border border-soil-100 bg-white p-2 flex flex-col cursor-pointer transition-all hover:bg-soil-50 hover:shadow-sm ${isSelected ? 'ring-2 ring-soil-900 z-10 relative' : ''}`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className={`text-sm font-sans font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-soil-900 text-cream' : 'text-soil-700'}`}>
            {d}
          </span>
          {dayTasks.length > 0 && (
            <span className="text-[10px] font-bold bg-soil-100 text-soil-700 px-1.5 py-0.5 rounded">
              {dayTasks.length}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 mt-1 scrollbar-hide">
          {dayTasks.map((task, idx) => (
            <div key={idx} className={`text-[10px] font-medium px-1.5 py-1 rounded border flex items-center gap-1 ${getTaskBgColor(task.taskType)} truncate`}>
              {getTaskIcon(task.taskType)}
              <span className="truncate">{task.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soil-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      
      {/* Calendar Section */}
      <div className="flex-1 flex flex-col bg-cream/30 rounded-[32px] p-6 border border-soil-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-soil-900 flex items-center gap-3">
              <CalendarIcon className="text-leaf" size={32} />
              Farm Calendar
            </h1>
            <p className="text-soil-600 font-body text-sm mt-1">Schedule and track your farming activities.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-soil-100">
            <button onClick={prevMonth} className="p-1 hover:bg-soil-100 rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-soil-700" />
            </button>
            <h2 className="text-lg font-heading font-bold text-soil-900 w-32 text-center">
              {monthNames[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-1 hover:bg-soil-100 rounded-lg transition-colors">
              <ChevronRight size={20} className="text-soil-700" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-soil-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Sowing
          </div>
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-soil-600">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> Fertilizers
          </div>
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-soil-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Harvesting
          </div>
          <div className="flex items-center gap-2 text-xs font-sans font-medium text-soil-600">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span> Other Tasks
          </div>
        </div>

        {/* Grid Header */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center font-sans font-bold text-sm text-soil-500 py-2 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-7 bg-soil-100 border border-soil-100 rounded-2xl overflow-hidden gap-px">
          {days}
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 bg-white rounded-[32px] border border-soil-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 flex flex-col">
        {selectedDate ? (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-soil-900">
                {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
              </h3>
              <p className="text-sm font-sans text-soil-500">{dayNames[selectedDate.getDay()]}, {selectedDate.getFullYear()}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
              {selectedDayTasks.length > 0 ? (
                selectedDayTasks.map(task => (
                  <div key={task.id} className={`p-4 rounded-2xl border ${getTaskBgColor(task.taskType)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {getTaskIcon(task.taskType)}
                      <span className="text-xs font-bold uppercase tracking-wider opacity-80">{task.taskType}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base mb-1">{task.title}</h4>
                    {task.notes && (
                      <p className="text-xs opacity-90 mt-2 bg-white/50 p-2 rounded-lg">{task.notes}</p>
                    )}
                    {task.isCompleted && (
                      <div className="mt-3 inline-flex items-center gap-1 bg-white/70 px-2 py-1 rounded text-xs font-bold text-emerald-700">
                        <CheckCircle2 size={12} />
                        Completed
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-10">
                  <CalendarIcon size={48} className="mb-4" />
                  <p className="font-sans font-medium">No tasks scheduled<br/>for this day.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <CalendarIcon size={64} className="mb-6 opacity-20" />
            <h3 className="text-xl font-heading font-bold text-soil-900 mb-2">Select a Date</h3>
            <p className="font-sans font-medium text-sm text-soil-600 px-4">
              Click on any day in the calendar to view its scheduled tasks.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
