import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const CalendarView = ({ requests }) => {
    const preventiveTasks = requests
        .filter(r => r.type === 'Preventive')
        .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-black">Maintenance Schedule</h3>
                    <p className="text-slate-400 text-sm">Active Preventive Tasks</p>
                </div>
                <CalendarIcon size={32} className="opacity-20" />
            </div>
            <div className="divide-y divide-slate-100">
                {preventiveTasks.map(task => (
                    <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg shadow-indigo-100">
                                <span className="text-[10px] uppercase">{new Date(task.scheduledDate).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-xl leading-none">{new Date(task.scheduledDate).getDate()}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{task.subject}</h4>
                                <p className="text-slate-500">{task.equipment?.name} • {task.equipment?.location}</p>
                            </div>
                        </div>
                        <span className="bg-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-lg">{task.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;