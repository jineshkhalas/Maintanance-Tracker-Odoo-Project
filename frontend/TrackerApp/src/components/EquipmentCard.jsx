import React from 'react';
import { Wrench, Box, User, Building, ShieldCheck, Tag, MoreVertical } from 'lucide-react';

const EquipmentCard = ({ item, onOpenHistory }) => {
  const isInProgress = item.requests?.some(r => r.status === 'In Progress');
  const openRequestsCount = item.requests?.filter(r => r.status !== 'Repaired' && r.status !== 'Scrap').length || 0;

  // Modern Status Configuration
  const statusConfig = item.isScrapped 
    ? { label: 'Scrapped', color: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' }
    : isInProgress 
      ? { label: 'Repairing', color: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' }
      : { label: 'Operational', color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' };

  return (
    <div className="group relative bg-white rounded-4xl border border-slate-100 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1">
      {/* Top Section: Title & Status */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{item.category}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-tighter">
            Ref: {item.serialNumber}
          </p>
        </div>
        <div className={`${statusConfig.bg} ${statusConfig.text} px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-current/10`}>
          {statusConfig.label}
        </div>
      </div>

      {/* Info Grid: Minimalist Tiles */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col gap-1 border border-transparent group-hover:border-slate-100 transition-all">
          <Building size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-600 truncate">{item.company}</span>
        </div>
        <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col gap-1 border border-transparent group-hover:border-slate-100 transition-all">
          <Box size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-600 truncate">{item.department}</span>
        </div>
        <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col gap-1 border border-transparent group-hover:border-slate-100 transition-all">
          <User size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-600 truncate">{item.employee || 'Guest'}</span>
        </div>
        <div className="bg-slate-50/50 rounded-2xl p-3 flex flex-col gap-1 border border-transparent group-hover:border-slate-100 transition-all">
          <ShieldCheck size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-600 truncate">{item.technicianId || 'Auto'}</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onOpenHistory(item.id)}
          disabled={item.isScrapped}
          className={`cursor-pointer flex-1 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all relative ${
            item.isScrapped 
            ? 'bg-slate-100 text-slate-400' 
            : 'bg-indigo-400 text-white hover:bg-indigo-600 active:scale-95 shadow-lg shadow-slate-200'
          }`}
        >
          <Wrench size={16} />
          {item.isScrapped ? 'Asset Retired' : 'Manage Logs'}
          
          {openRequestsCount > 0 && !item.isScrapped && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-4 border-white text-[10px] font-black">
              {openRequestsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EquipmentCard;