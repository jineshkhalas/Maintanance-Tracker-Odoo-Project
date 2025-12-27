import React from 'react';
import api from '../axiosApi/Axios';
import { Clock, AlertCircle } from 'lucide-react';

const STAGES = ["New", "In Progress", "Repaired", "Scrap"];

const KanbanBoard = ({ requests, refresh }) => {
    const updateStatus = async (id, newStatus) => {
        await api.patch(`/requests/${id}`, { status: newStatus });
        refresh();
    };

    const isOverdue = (date, status) => new Date(date) < new Date() && status !== "Repaired";

    return (
        <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
            {STAGES.map(stage => (
                <div key={stage} className="flex-1 min-w-[320px] bg-slate-100/50 rounded-2xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest">{stage}</h3>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">
                            {requests.filter(r => r.status === stage).length}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4">
                        {requests.filter(r => r.status === stage).map(req => (
                            <div key={req.id} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${isOverdue(req.scheduledDate, req.status) ? 'border-red-500' : 'border-indigo-400'}`}>
                                <div className="flex justify-between mb-3">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${req.type === 'Preventive' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {req.type}
                                    </span>
                                    {isOverdue(req.scheduledDate, req.status) && <AlertCircle size={14} className="text-red-500 animate-pulse" />}
                                </div>
                                <h4 className="font-bold text-slate-800 mb-1 leading-snug">{req.subject}</h4>
                                <p className="text-xs text-slate-500 mb-4">{req.equipment?.name}</p>
                                <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                                        <Clock size={12} /> {new Date(req.scheduledDate).toLocaleDateString()}
                                    </div>
                                    <select
                                        value={req.status}
                                        onChange={(e) => updateStatus(req.id, e.target.value)}
                                        className="text-[10px] font-bold bg-slate-50 border-none rounded cursor-pointer"
                                    >
                                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;