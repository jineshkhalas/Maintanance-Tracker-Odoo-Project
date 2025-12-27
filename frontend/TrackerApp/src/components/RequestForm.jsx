import React, { useState } from 'react';
import api from '../axiosApi/Axios';
import { X, ClipboardCheck, Calendar, Wrench, Info } from 'lucide-react';

const RequestForm = ({ equipments, refresh, onclose, initialDate }) => {
  // Format Date for Input: YYYY-MM-DDTHH:MM
  const formatDefaultDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    d.setHours(9, 0, 0, 0); // Default to 9:00 AM
    return d.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    subject: '',
    equipmentId: '',
    type: 'Preventive',
    scheduledDate: formatDefaultDate(initialDate),
    technicianId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', formData);
      refresh();
      onclose();
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Check your inputs"));
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-xl">
              <ClipboardCheck size={20} />
            </div>
            <h2 className="text-lg font-black uppercase tracking-widest">New Maintenance Task</h2>
          </div>
          <button onClick={onclose} className="cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Task Subject</label>
            <input 
              className="w-full border-slate-200 border rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              placeholder="e.g. Monthly Oil Change & Inspection"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Asset / Equipment</label>
              <select 
                className="cursor-pointer w-full border-slate-200 border rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-indigo-50 outline-none bg-white"
                value={formData.equipmentId}
                onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
                required
              >
                <option value="">Select Asset...</option>
                {equipments.map(eq => <option key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Maintenance Type</label>
              <select 
                className="cursor-pointer w-full border-slate-200 border rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-indigo-50 outline-none bg-white"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Preventive">Preventive</option>
                <option value="Corrective">Corrective (Breakdown)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest flex items-center gap-2">
              <Calendar size={12} className="text-indigo-500" /> Scheduled Start Time
            </label>
            <input 
              type="datetime-local"
              className="cursor-pointer w-full border-slate-200 border rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-indigo-50 outline-none"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
              required
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onclose}
              className="cursor-pointer flex-1 bg-slate-50 text-slate-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="cursor-pointer flex-2 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
            >
              Create Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;