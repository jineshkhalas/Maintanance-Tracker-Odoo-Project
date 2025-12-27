import React, { useState, useEffect } from 'react';
import api from './axiosApi/Axios';

// Component Imports
import Navbar from './components/Navbar';
import EquipmentCard from './components/EquipmentCard';
import KanbanBoard from './components/KanbanBoard';
import RequestForm from './components/RequestForm';
import CalendarView from './components/CalendarView';
import HistoryModal from './components/HistoryModal';
import TeamsManager from './components/TeamsManager';
import EquipmentManager from './components/EquipmentManager';

function App() {
  const [view, setView] = useState('assets'); 
  const [equipments, setEquipments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [preselectedDate, setPreselectedDate] = useState(null); // For Calendar Clicks
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
      console.error("Sync error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- INTERACTIVE HANDLERS ---

  // Opens modal when a calendar date is clicked
  const handleDateClick = (date) => {
    setPreselectedDate(date);
    setShowRequestModal(true);
  };

  // Logic for Drag & Drop Rescheduling
  const handleReschedule = async (requestId, newDate) => {
    try {
      await api.patch(`/requests/${requestId}`, { 
        scheduledDate: newDate.toISOString() 
      });
      fetchData(); // Refresh UI
    } catch (err) {
      console.error("Reschedule failed:", err);
      alert("Could not update schedule.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      <Navbar 
        view={view} 
        setView={setView} 
        onNewRequest={() => {
          setPreselectedDate(null);
          setShowRequestModal(true);
        }} 
      />

      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-600 font-bold">Syncing ERP Data...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            
            {view === 'assets' && (
              <div className="space-y-10">
                <EquipmentManager refreshData={fetchData} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {equipments.map(item => (
                    <EquipmentCard 
                      key={item.id} 
                      item={item} 
                      onOpenHistory={(id) => setSelectedHistoryId(id)} 
                    />
                  ))}
                </div>
              </div>
            )}

            {view === 'kanban' && <KanbanBoard requests={requests} refresh={fetchData} />}
            
            {view === 'calendar' && (
              <CalendarView 
                requests={requests} 
                onDateClick={handleDateClick}
                onReschedule={handleReschedule} // Prepared for drag-and-drop
              />
            )}

            {view === 'teams' && <TeamsManager />}

          </div>
        )}
      </main>

      {/* Modals */}
      {showRequestModal && (
        <RequestForm 
          equipments={equipments} 
          refresh={fetchData} 
          initialDate={preselectedDate}
          onclose={() => {
            setShowRequestModal(false);
            setPreselectedDate(null);
          }} 
        />
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