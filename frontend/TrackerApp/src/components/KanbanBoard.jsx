import React from 'react';
import api from '../axiosApi/Axios';
import { Clock, AlertCircle, Box, ChevronRight } from 'lucide-react';

const STAGES = ["New", "In Progress", "Repaired", "Scrap"];

const KanbanBoard = ({ requests, refresh }) => {
  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/requests/${id}`, { status: newStatus });
      refresh();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const isOverdue = (date, status) => 
    new Date(date) < new Date() && status !== "Repaired" && status !== "Scrap";

  // Stage color mapping for the minimalist dots
  const getStageColor = (stage) => {
    switch(stage) {
      case 'New': return 'bg-indigo-400';
      case 'In Progress': return 'bg-amber-400';
      case 'Repaired': return 'bg-emerald-400';
      case 'Scrap': return 'bg-rose-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="flex flex-nowrap lg:flex-row gap-5 md:gap-8 overflow-x-auto lg:overflow-x-visible pb-10 pt-2 snap-x h-[calc(100vh-280px)] no-scrollbar">
      {STAGES.map(stage => (
        <div 
          key={stage} 
          className="shrink-0 lg:shrink flex-1 min-w-75 lg:min-w-0 flex flex-col snap-center"
        >
          <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${getStageColor(stage)} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
              <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-[0.2em]">{stage}</h3>
            </div>
            <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black tabular-nums">
              {requests.filter(r => r.status === stage).length}
            </span>
          </div>

          {/* Cards Container */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
            {requests.filter(r => r.status === stage).map(req => (
              <div 
                key={req.id} 
                className="group relative bg-white/70 backdrop-blur-sm p-5 rounded-3xl border border-slate-200/50 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/40 hover:-rotate-1"
              >
                {/* Minimalist Urgency Bar */}
                <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-all ${
                  isOverdue(req.scheduledDate, req.status) ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-indigo-500'
                }`} />

                <div className="pl-2">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-400">
                      {req.type} Maintenance
                    </span>
                    {isOverdue(req.scheduledDate, req.status) && (
                      <div className="flex items-center gap-1 bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full text-[8px] font-black uppercase animate-pulse">
                        <AlertCircle size={10} /> Overdue
                      </div>
                    )}
                  </div>

                  <h4 className="font-extrabold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {req.subject}
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] mb-5">
                    <Box size={12} className="text-slate-300" />
                    <span className="truncate">{req.equipment?.name || "Unknown Asset"}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100/50 pt-4">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black">
                      <Clock size={12} className="text-slate-300" /> 
                      {new Date(req.scheduledDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    
                    <div className="relative">
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="appearance-none bg-slate-50 text-slate-600 pl-3 pr-8 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter border-none cursor-pointer focus:ring-2 focus:ring-indigo-100 transition-all hover:bg-slate-100"
                      >
                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty State Illustration for Empty Columns */}
            {requests.filter(r => r.status === stage).length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 opacity-20 grayscale">
                <Box size={40} className="text-slate-300 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clear</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;