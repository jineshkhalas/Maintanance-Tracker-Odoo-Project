import React from 'react';
import { Settings, LayoutGrid, ClipboardList, Calendar, Users, Box, Plus } from 'lucide-react';

const Navbar = ({ view, setView, onNewRequest }) => {
  const navItems = [
    { id: 'assets', label: 'Assets', icon: <Box size={18} /> },
    { id: 'kanban', label: 'Board', icon: <ClipboardList size={18} /> },
    { id: 'calendar', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'teams', label: 'Teams', icon: <Users size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sm:py-4 sticky top-0 z-50 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          <a href='/' className="text-xl sm:text-2xl font-black cursor-pointer text-indigo-600 tracking-tighter flex items-center gap-2">
            <Settings className="animate-spin-slow" /> MAINTAIN.IO
          </a>
          
          <button onClick={onNewRequest} className="md:hidden p-2 bg-indigo-600 text-white rounded-lg"><Plus size={20} /></button>
        </div>
        
        <div className="flex overflow-x-auto w-full md:w-auto bg-slate-100 p-1 rounded-xl no-scrollbar">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)}
              className={`cursor-pointer flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                view === item.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {item.icon} <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={onNewRequest}
          className="cursor-pointer hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} /> New Request
        </button>
      </div>
    </nav>
  );
};

export default Navbar;