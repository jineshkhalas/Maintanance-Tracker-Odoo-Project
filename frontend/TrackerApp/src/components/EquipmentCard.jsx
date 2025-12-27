import React from 'react';
import { Wrench, MapPin, Box } from 'lucide-react';

const EquipmentCard = ({ item }) => {
    const openRequests = item.requests?.filter(r => r.status !== 'Repaired').length || 0;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">SN: {item.serialNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.isScrapped ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {item.isScrapped ? 'Scrapped' : 'Operational'}
                </span>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Box size={16} /> <span>{item.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} /> <span>{item.location}</span>
                </div>
            </div>

            <button className="w-full bg-indigo-50 text-indigo-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors relative">
                <Wrench size={18} />
                Maintenance
                {openRequests > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        {openRequests}
                    </span>
                )}
            </button>
        </div>
    );
};

export default EquipmentCard;
