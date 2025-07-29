export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'driver';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  type: 'car' | 'truck' | 'bus' | 'emergency';
  status: 'online' | 'offline' | 'maintenance';
  position: {
    lat: number;
    lng: number;
  };
  speed: number;
  securityLevel: 'low' | 'medium' | 'high';
  lastCommunication: string;
  connectedNodes: string[];
}

export interface InfrastructureNode {
  id: string;
  name: string;
  type: 'traffic_light' | 'sensor' | 'gateway' | 'rsu'; // RSU = Road Side Unit
  status: 'active' | 'inactive' | 'error';
  position: {
    lat: number;
    lng: number;
  };
  securityLevel: 'low' | 'medium' | 'high';
  connectedVehicles: string[];
  lastUpdate: string;
}

export interface CommunicationMessage {
  id: string;
  from: string;
  to: string;
  type: 'v2v' | 'v2i' | 'i2v';
  messageType: 'safety' | 'traffic' | 'emergency' | 'info';
  content: string;
  encrypted: boolean;
  timestamp: string;
  securityHash: string;
}

export interface SecurityAlert {
  id: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  type: 'authentication' | 'encryption' | 'intrusion' | 'malformed_message';
  message: string;
  timestamp: string;
  resolved: boolean;
}