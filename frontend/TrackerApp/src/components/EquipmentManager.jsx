import React, { useState, useEffect } from 'react';
import api from '../axiosApi/Axios';
import { Plus, Trash2, Box, Info, Loader2 } from 'lucide-react';

const EquipmentManager = ({ refreshData }) => {
  const [equipments, setEquipments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', 
    serialNumber: '', 
    department: '', 
    category: '', 
    company: '', 
    employee: '', 
    maintenanceTeamId: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resEq, resTeams] = await Promise.all([
        api.get('/equipment'),
        api.get('/teams')
      ]);
      setEquipments(resEq.data);
      setTeams(resTeams.data);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/equipment', formData);
      // Reset form
      setFormData({ 
        name: '', serialNumber: '', department: '', category: '', 
        company: '', employee: '', maintenanceTeamId: '' 
      });
      setShowForm(false);
      
      fetchData(); 
      if(refreshData) refreshData(); 
      
    } catch (err) { 
      alert("Error adding equipment: " + (err.response?.data?.error || err.message)); 
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this asset?")) {
      try {
        await api.delete(`/equipment/${id}`);
        fetchData();
        if(refreshData) refreshData();
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Delete failed: Check if asset has active maintenance records.");
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <Box size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">Asset Inventory</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage and register company equipment</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
            showForm ? 'bg-slate-100 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {showForm ? 'Cancel' : <><Plus size={20} /> Add New Asset</>}
        </button>
      </div>

      {/* Responsive Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-indigo-50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Asset Name', key: 'name', ph: 'e.g. CNC Machine' },
              { label: 'Serial Number', key: 'serialNumber', ph: 'SN-XXXX' },
              { label: 'Category', key: 'category', ph: 'e.g. Production' },
              { label: 'Company', key: 'company', ph: 'e.g. Factory A' },
              { label: 'Department', key: 'department', ph: 'e.g. Engineering' },
              { label: 'Employee/User', key: 'employee', ph: 'e.g. John Doe' },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">{field.label}</label>
                <input 
                  type="text" 
                  className="w-full border-slate-200 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder={field.ph}
                  value={formData[field.key]} 
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} 
                  required 
                />
              </div>
            ))}
            
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Responsible Team</label>
                <select 
                    className="cursor-pointer w-full border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 bg-white" 
                    value={formData.maintenanceTeamId} 
                    onChange={(e) => setFormData({...formData, maintenanceTeamId: e.target.value})}
                >
                    <option value="">Select a team (Optional)</option>
                    {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
                </div>

            <div className="lg:col-span-2 flex items-end">
              <button type="submit" className="cursor-pointer w-full bg-slate-900 text-white py-3.5 rounded-xl font-black hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest text-xs">
                Register Asset to Database
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Asset Table - Responsive Layout */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identification</th>
                <th className="hidden md:table-cell px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Assignment</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="3" className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" /></td></tr>
              ) : equipments.map(eq => (
                <tr key={eq.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm sm:text-base">{eq.name}</div>
                    <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase">{eq.serialNumber}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                        <Box size={12} className="text-slate-300" /> {eq.company}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
                        <Info size={12} className="text-slate-200" /> {eq.department}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(eq.id)}
                      className="cursor-pointer p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentManager;