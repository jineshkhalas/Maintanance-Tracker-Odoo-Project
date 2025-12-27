import React, { useState, useEffect } from 'react';
import api from '../axiosApi/Axios';
import { Users, Plus, Building2, UserPlus, Trash2, Loader2 } from 'lucide-react';

const TeamsManager = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', company: '', members: '' });

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (err) {
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);


  const handleAddTeam = async (e) => {
    e.preventDefault();
    
    // Basic UI validation
    if (!formData.name.trim() || !formData.company.trim()) {
      alert("Please enter Team Name and Company.");
      return;
    }

    try {
      const membersToSubmit = formData.members
        ? formData.members.split(',').map(m => m.trim()).filter(m => m !== "")
        : [];

      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        members: membersToSubmit
      };

      console.log("Sending payload:", payload); 

      const response = await api.post('/teams', payload);
      
      if (response.status === 201) {
        setFormData({ name: '', company: '', members: '' });
        fetchTeams();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "An unexpected error occurred.";
      console.error("Error adding team:", errorMsg);
      alert("Failed to add team: " + errorMsg);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm("Delete this team? This action cannot be undone.")) {
      try {
        await api.delete(`/teams/${id}`);
        fetchTeams();
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Cannot delete team. It might still have assigned assets (Equipment).");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col justify-between items-center gap-6">
        <div className='w-full text-center'>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Maintenance Teams</h2>
          <p className="text-slate-500 font-medium">Define work centers, internal departments, and technical staff.</p>
        </div>
        
        {/* ADD TEAM FORM */}
        <form onSubmit={handleAddTeam} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-end justify-center animate-in fade-in slide-in-from-top-4 duration-500 w-autp">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-indigo-400 ml-1 tracking-widest">Team Name</label>
            <input 
              type="text" 
              placeholder="e.g. Mechanical Dept" 
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-48 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-indigo-400 ml-1 tracking-widest">Company</label>
            <input 
              type="text" 
              placeholder="e.g. Tesla Motors" 
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-40 transition-all"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-indigo-400 ml-1 tracking-widest">Members (Comma Separated)</label>
            <input 
              type="text" 
              placeholder="Names: John, Sarah, Steve" 
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
              value={formData.members}
              onChange={(e) => setFormData({...formData, members: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="cursor-pointer bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-100 h-11.5 flex items-center gap-2 max-w-md"
          >
            <Plus size={18} /> Add Team
          </button>
        </form>
      </div>

      {/* TEAMS GRID */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
              <div className="p-7">
                <div className="flex items-center gap-5 mb-5">
                  <div className="bg-indigo-50 p-3.5 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xl leading-tight">{team.name}</h4>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium mt-0.5">
                      <Building2 size={14} />
                      <span>{team.company}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 pb-2">
                    Active Members ({team.members?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {team.members?.map((member, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border border-slate-100">
                        <UserPlus size={12} className="text-indigo-400" />
                        {member}
                      </span>
                    ))}
                    {(!team.members || team.members.length === 0) && (
                      <span className="text-slate-300 text-xs italic font-medium">No personnel assigned</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto bg-slate-50/50 px-7 py-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">ID: {team.id.substring(0, 10)}</span>
                <button 
                  onClick={() => handleDeleteTeam(team.id)}
                  className="cursor-pointer text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          {teams.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-4xl">
              <p className="text-slate-400 font-bold italic">No teams registered yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamsManager;