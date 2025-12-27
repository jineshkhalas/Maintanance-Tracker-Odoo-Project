import React, { useState, useEffect } from 'react';
import api from './axiosApi/Axios';
import EquipmentCard from './components/EquipmentCard';
import KanbanBoard from './components/KanbanBoard';
import RequestForm from './components/RequestForm';
import CalendarView from './components/CalendarView';
import HistoryModal from './components/HistoryModal';
import { LayoutDashboard, ClipboardList, Plus, Calendar, Settings } from 'lucide-react';

function App() {
  const [view, setView] = useState('equipment'); // 'equipment', 'kanban', 'calendar'
  const [equipments, setEquipments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resEq, resReq] = await Promise.all([
        api.get('/equipment'),
        api.get('/requests')
      ]);
      setEquipments(resEq.data);
      setRequests(resReq.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tight flex items-center gap-2">
            <Settings /> MAINTAIN.IO
          </h1>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['equipment', 'kanban', 'calendar'].map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${view === v ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} /> New Request
        </button>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20 animate-pulse text-indigo-600 font-bold">Synchronizing...</div>
        ) : (
          <>
            {view === 'equipment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {equipments.map(item => (
                  <EquipmentCard key={item.id} item={item} onOpenHistory={(id) => setSelectedHistoryId(id)} />
                ))}
              </div>
            )}
            {view === 'kanban' && <KanbanBoard requests={requests} refresh={fetchData} />}
            {view === 'calendar' && <CalendarView requests={requests} />}
          </>
        )}
      </main>

      {showRequestModal && (
        <RequestForm equipments={equipments} refresh={fetchData} onclose={() => setShowRequestModal(false)} />
      )}

      {selectedHistoryId && (
        <HistoryModal
          equipmentId={selectedHistoryId}
          equipmentName={equipments.find(e => e.id === selectedHistoryId)?.name}
          onclose={() => setSelectedHistoryId(null)}
        />
      )}
    </div>
  );
}

export default App;