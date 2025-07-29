import React from 'react';
import { TrafficCone as Traffic, Radar, Router, Radio, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { InfrastructureNode } from '../types';

interface InfrastructureGridProps {
  nodes: InfrastructureNode[];
}

const InfrastructureGrid: React.FC<InfrastructureGridProps> = ({ nodes }) => {
  const getNodeIcon = (type: InfrastructureNode['type']) => {
    switch (type) {
      case 'traffic_light': return Traffic;
      case 'sensor': return Radar;
      case 'gateway': return Router;
      case 'rsu': return Radio;
      default: return Radio;
    }
  };

  const getStatusIcon = (status: InfrastructureNode['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return XCircle;
      case 'error': return AlertCircle;
    }
  };

  const getStatusColor = (status: InfrastructureNode['status']) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'inactive': return 'text-gray-500';
      case 'error': return 'text-red-500';
    }
  };

  const getSecurityColor = (level: InfrastructureNode['securityLevel']) => {
    switch (level) {
      case 'high': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-red-600';
    }
  };

  const getTypeLabel = (type: InfrastructureNode['type']) => {
    switch (type) {
      case 'traffic_light': return 'Traffic Light';
      case 'sensor': return 'Road Sensor';
      case 'gateway': return 'Gateway';
      case 'rsu': return 'Road Side Unit';
      default: return 'Unknown';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Infrastructure Network</h2>
        <div className="text-sm text-slate-400">
          {nodes.filter(n => n.status === 'active').length} of {nodes.length} nodes active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node) => {
          const NodeIcon = getNodeIcon(node.type);
          const StatusIcon = getStatusIcon(node.status);
          
          return (
            <div key={node.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-green-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-lg mr-3">
                    <NodeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{node.name}</h3>
                    <p className="text-sm text-slate-400">{getTypeLabel(node.type)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <StatusIcon className={`w-5 h-5 ${getStatusColor(node.status)}`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Status:</span>
                  <span className={`capitalize ${getStatusColor(node.status)}`}>
                    {node.status}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Security Level:</span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${getSecurityColor(node.securityLevel)}`}>
                    {node.securityLevel.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Connected Vehicles:</span>
                  <span className="text-white">{node.connectedVehicles.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Update:</span>
                  <span className="text-white">
                    {new Date(node.lastUpdate).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-600">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Location:</span>
                  <span>{node.position.lat.toFixed(4)}, {node.position.lng.toFixed(4)}</span>
                </div>
              </div>

              {node.connectedVehicles.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-600">
                  <div className="text-xs text-slate-400 mb-1">Active Connections:</div>
                  <div className="flex flex-wrap gap-1">
                    {node.connectedVehicles.map((vehicleId) => (
                      <span key={vehicleId} className="px-2 py-1 bg-blue-600 text-xs text-white rounded">
                        {vehicleId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfrastructureGrid;