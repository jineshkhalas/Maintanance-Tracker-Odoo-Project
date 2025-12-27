import React, { useState } from 'react';
import api from '../axiosApi/Axios';

const RequestForm = ({ equipments, onclose, refresh }) => {
    const [formData, setFormData] = useState({
        equipmentId: '',
        subject: '',
        type: 'Corrective',
        scheduledDate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/requests', formData);
            refresh();
            onclose();
        } catch (err) {
            alert("Error creating request");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">Create Maintenance Request</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Equipment</label>
                        <select
                            required
                            className="w-full border rounded-lg p-2.5"
                            value={formData.equipmentId}
                            onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                        >
                            <option value="">-- Choose Machine --</option>
                            {equipments.filter(e => !e.isScrapped).map(eq => (
                                <option key={eq.id} value={eq.id}>{eq.name} ({eq.department})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Subject</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Unusual noise from motor"
                            className="w-full border rounded-lg p-2.5"
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full border rounded-lg p-2.5"
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Corrective">Corrective (Breakdown)</option>
                                <option value="Preventive">Preventive (Planned)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                            <input
                                required
                                type="date"
                                className="w-full border rounded-lg p-2.5"
                                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button type="button" onClick={onclose} className="flex-1 py-3 text-gray-600 font-medium">Cancel</button>
                        <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
                            Create Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;