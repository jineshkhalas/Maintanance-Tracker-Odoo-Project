import React from 'react';
import { Wrench, MapPin, Box, ShieldCheck } from 'lucide-react';

const EquipmentCard = ({ item, onOpenHistory }) => {
    const openRequestsCount = item.requests?.filter(r => r.status !== 'Repaired').length || 0;

    return (
        <div className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${item.isScrapped ? 'border-red-100 opacity-75' : 'border-slate-100 hover:border-indigo-100'}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-extrabold text-slate-800">{item.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">{item.serialNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${item.isScrapped ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                    {item.isScrapped ? 'Scrapped' : 'Operational'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Box size={16} className="text-slate-400" /> <span>{item.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-slate-400" /> <span>{item.location}</span>
                </div>
            </div>

            <button
                onClick={() => onOpenHistory(item.id)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors relative"
            >
                <Wrench size={18} /> Maintenance History
                {openRequestsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
                        {openRequestsCount}
                    </span>
                )}
            </button>
        </div>
    );
};

export default EquipmentCard;