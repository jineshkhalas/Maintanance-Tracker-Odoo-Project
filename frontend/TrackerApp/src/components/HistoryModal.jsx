import React, { useEffect, useState } from 'react';
import api from '../axiosApi/Axios';

const HistoryModal = ({ equipmentId, equipmentName, onclose }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.get(`/equipment/${equipmentId}/history`).then(res => setLogs(res.data));
    }, [equipmentId]);

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                    <h2 className="text-2xl font-black text-slate-800">History: {equipmentName}</h2>
                    <button onClick={onclose} className="cursor-pointer text-slate-400 hover:text-slate-900 text-3xl font-light">&times;</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-8">
                    <div className="space-y-6">
                        {logs.map(log => (
                            <div key={log.id} className="flex gap-4 items-start pb-6 border-b border-slate-50 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-sm font-black text-slate-800">{new Date(log.scheduledDate).toLocaleDateString()}</span>
                                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">{log.status}</span>
                                    </div>
                                    <p className="text-slate-600 font-medium">{log.subject}</p>
                                    <p className="text-xs text-slate-400 mt-1">Duration: {log.duration || 0} hrs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryModal;