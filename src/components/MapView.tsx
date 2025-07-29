import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Car, Truck, Bus, Ambulance, Wifi, Radio, Router, TrafficCone } from 'lucide-react';
import { Vehicle, InfrastructureNode } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  vehicles: Vehicle[];
  nodes: InfrastructureNode[];
}

const MapView: React.FC<MapViewProps> = ({ vehicles, nodes }) => {
  const [connections, setConnections] = useState<Array<{ from: [number, number], to: [number, number] }>>([]);

  useEffect(() => {
    const newConnections: Array<{ from: [number, number], to: [number, number] }> = [];

    vehicles.forEach(vehicle => {
      if (vehicle.status === 'online') {
        vehicle.connectedNodes.forEach(nodeId => {
          const node = nodes.find(n => n.id === nodeId);
          if (node && node.status === 'active') {
            newConnections.push({
              from: [vehicle.position.lat, vehicle.position.lng],
              to: [node.position.lat, node.position.lng]
            });
          }
        });
      }
    });

    setConnections(newConnections);
  }, [vehicles, nodes]);

  const createCustomIcon = (type: string, status: string) => {
    const color = status === 'online' || status === 'active' ? '#10B981' :
                  status === 'offline' || status === 'inactive' ? '#6B7280' : '#EF4444';

    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  const getVehicleIcon = (type: Vehicle['type']) => {
    switch (type) {
      case 'truck': return Truck;
      case 'bus': return Bus;
      case 'emergency': return Ambulance;
      default: return Car;
    }
  };

  const getNodeIcon = (type: InfrastructureNode['type']) => {
    switch (type) {
      case 'traffic_light': return TrafficCone;
      case 'sensor': return Radio;
      case 'gateway': return Router;
      case 'rsu': return Wifi;
      default: return Radio;
    }
  };

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-slate-600">
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Vehicle Markers */}
        {vehicles.map((vehicle) => {
          const VehicleIcon = getVehicleIcon(vehicle.type);
          return (
            <Marker
              key={vehicle.id}
              position={[vehicle.position.lat, vehicle.position.lng]}
              icon={createCustomIcon('vehicle', vehicle.status)}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <VehicleIcon className="w-4 h-4 mr-2" />
                    <strong>{vehicle.plateNumber}</strong>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Model:</strong> {vehicle.model}</p>
                    <p><strong>Status:</strong> <span className={`capitalize ${
                      vehicle.status === 'online' ? 'text-green-600' :
                      vehicle.status === 'offline' ? 'text-gray-600' : 'text-yellow-600'
                    }`}>{vehicle.status}</span></p>
                    <p><strong>Speed:</strong> {vehicle.speed} mph</p>
                    <p><strong>Security:</strong> {vehicle.securityLevel}</p>
                    <p><strong>Connected Nodes:</strong> {vehicle.connectedNodes.length}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Infrastructure Node Markers */}
        {nodes.map((node) => {
          const NodeIcon = getNodeIcon(node.type);
          return (
            <Marker
              key={node.id}
              position={[node.position.lat, node.position.lng]}
              icon={createCustomIcon('node', node.status)}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <NodeIcon className="w-4 h-4 mr-2" />
                    <strong>{node.name}</strong>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Type:</strong> {node.type.replace('_', ' ')}</p>
                    <p><strong>Status:</strong> <span className={`capitalize ${
                      node.status === 'active' ? 'text-green-600' :
                      node.status === 'inactive' ? 'text-gray-600' : 'text-red-600'
                    }`}>{node.status}</span></p>
                    <p><strong>Security:</strong> {node.securityLevel}</p>
                    <p><strong>Connected Vehicles:</strong> {node.connectedVehicles.length}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Connection Lines */}
        {connections.map((connection, index) => (
          <Polyline
            key={index}
            positions={[connection.from, connection.to]}
            color="#3B82F6"
            weight={2}
            opacity={0.6}
            dashArray="5, 5"
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
