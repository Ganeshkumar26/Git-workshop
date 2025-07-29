import React from 'react';
import { Car, Truck, Bus, Ambulance, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles }) => {
  const getVehicleIcon = (type: Vehicle['type']) => {
    switch (type) {
      case 'truck': return Truck;
      case 'bus': return Bus;
      case 'emergency': return Ambulance;
      default: return Car;
    }
  };

  const getStatusIcon = (status: Vehicle['status']) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return XCircle;
      case 'maintenance': return Clock;
    }
  };

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-yellow-500';
    }
  };

  const getSecurityColor = (level: Vehicle['securityLevel']) => {
    switch (level) {
      case 'high': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-red-600';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Vehicle Fleet</h2>
        <div className="text-sm text-slate-400">
          {vehicles.filter(v => v.status === 'online').length} of {vehicles.length} vehicles online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => {
          const VehicleIcon = getVehicleIcon(vehicle.type);
          const StatusIcon = getStatusIcon(vehicle.status);
          
          return (
            <div key={vehicle.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-blue-600 p-2 rounded-lg mr-3">
                    <VehicleIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{vehicle.plateNumber}</h3>
                    <p className="text-sm text-slate-400">{vehicle.model}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <StatusIcon className={`w-5 h-5 ${getStatusColor(vehicle.status)}`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Speed:</span>
                  <span className="text-white">{vehicle.speed} mph</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Security Level:</span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${getSecurityColor(vehicle.securityLevel)}`}>
                    {vehicle.securityLevel.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Connected Nodes:</span>
                  <span className="text-white">{vehicle.connectedNodes.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Communication:</span>
                  <span className="text-white">
                    {new Date(vehicle.lastCommunication).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-600">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Position:</span>
                  <span>{vehicle.position.lat.toFixed(4)}, {vehicle.position.lng.toFixed(4)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleGrid;