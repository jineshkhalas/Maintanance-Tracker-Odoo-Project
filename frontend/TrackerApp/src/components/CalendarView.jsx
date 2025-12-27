import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';

const CalendarView = ({ requests, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter only Preventive requests for the calendar
  const preventiveRequests = requests.filter(r => r.type === 'Preventive');

  // Calendar Logic
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1));

  const days = Array.from({ length: daysInMonth(year, currentDate.getMonth()) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white/70 backdrop-blur-md p-6 rounded-4xl border border-slate-100 shadow-lg gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{monthName} {year}</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Preventive Schedule</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button onClick={prevMonth} className="cursor-pointer p-2 hover:bg-white hover:text-indigo-600 rounded-xl transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">
            Today
          </button>
          <button onClick={nextMonth} className="cursor-pointer p-2 hover:bg-white hover:text-indigo-600 rounded-xl transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/50 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/10">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-[120px] sm:auto-rows-[160px]">
          {emptyDays.map(i => <div key={`empty-${i}`} className="border-r border-b border-slate-50 bg-slate-50/20" />)}
          
          {days.map(day => {
            const dateStr = new Date(year, currentDate.getMonth(), day).toISOString().split('T')[0];
            const dayRequests = preventiveRequests.filter(r => r.scheduledDate.startsWith(dateStr));

            return (
              <div 
                key={day} 
                onClick={() => onDateClick(new Date(year, currentDate.getMonth(), day))}
                className="group relative border-r border-b border-slate-50 p-2 sm:p-4 hover:bg-indigo-50/30 transition-all cursor-pointer overflow-y-auto no-scrollbar"
              >
                <span className="text-xs font-black text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {day}
                </span>
                
                <div className="mt-2 space-y-1">
                  {dayRequests.map(req => (
                    <div key={req.id} className="bg-white border border-indigo-100 p-1.5 rounded-lg shadow-sm">
                      <p className="text-[9px] font-extrabold text-slate-800 truncate leading-tight">{req.subject}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock size={8} className="text-indigo-400" />
                        <span className="text-[8px] font-bold text-slate-400 truncate">{req.equipment?.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover Add Button */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-indigo-600 text-white p-1 rounded-lg shadow-lg">
                    <Plus size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;