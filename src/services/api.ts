import { Vehicle, InfrastructureNode, CommunicationMessage, SecurityAlert } from '../types';

// Enhanced API service with more realistic data and expanded fleet
class ApiService {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateRandomPosition(centerLat: number, centerLng: number, radius: number = 0.1) {
    const randomLat = centerLat + (Math.random() - 0.5) * radius;
    const randomLng = centerLng + (Math.random() - 0.5) * radius;
    return { lat: randomLat, lng: randomLng };
  }

  async getVehicles(): Promise<Vehicle[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const vehicleModels = [
      { model: 'Tesla Model S', type: 'car' as const },
      { model: 'BMW i8', type: 'car' as const },
      { model: 'Audi e-tron', type: 'car' as const },
      { model: 'Mercedes EQS', type: 'car' as const },
      { model: 'Ford Transit', type: 'truck' as const },
      { model: 'Volvo FH16', type: 'truck' as const },
      { model: 'MAN TGX', type: 'truck' as const },
      { model: 'Mercedes Sprinter', type: 'truck' as const },
      { model: 'City Bus 2024', type: 'bus' as const },
      { model: 'Electric Bus Pro', type: 'bus' as const },
      { model: 'Ambulance Unit', type: 'emergency' as const },
      { model: 'Fire Truck', type: 'emergency' as const },
      { model: 'Police Cruiser', type: 'emergency' as const }
    ];

    const plateNumbers = [
      'ABC-123', 'XYZ-789', 'EMG-911', 'BUS-001', 'TRK-456', 'CAR-789',
      'VAN-234', 'SUV-567', 'POL-999', 'AMB-112', 'FIR-911', 'BUS-002',
      'CAR-101', 'TRK-202', 'VAN-303', 'SUV-404', 'CAR-505', 'BUS-606',
      'TRK-707', 'EMG-808', 'CAR-909', 'VAN-010', 'SUV-111', 'BUS-212'
    ];

    const statuses: Vehicle['status'][] = ['online', 'offline', 'maintenance'];
    const securityLevels: Vehicle['securityLevel'][] = ['low', 'medium', 'high'];
    
    // New York City center coordinates
    const nycCenter = { lat: 40.7128, lng: -74.0060 };

    return Array.from({ length: 24 }, (_, i) => {
      const vehicleModel = vehicleModels[i % vehicleModels.length];
      const status = i < 18 ? 'online' : statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `v${i + 1}`,
        plateNumber: plateNumbers[i],
        model: vehicleModel.model,
        type: vehicleModel.type,
        status,
        position: this.generateRandomPosition(nycCenter.lat, nycCenter.lng, 0.2),
        speed: status === 'online' ? Math.floor(Math.random() * 80) + 10 : 0,
        securityLevel: securityLevels[Math.floor(Math.random() * securityLevels.length)],
        lastCommunication: new Date(Date.now() - Math.random() * 300000).toISOString(),
        connectedNodes: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, 
          (_, j) => `n${Math.floor(Math.random() * 12) + 1}`)
      };
    });
  }

  async getInfrastructureNodes(): Promise<InfrastructureNode[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const nodeTypes: InfrastructureNode['type'][] = ['traffic_light', 'sensor', 'gateway', 'rsu'];
    const statuses: InfrastructureNode['status'][] = ['active', 'inactive', 'error'];
    const securityLevels: InfrastructureNode['securityLevel'][] = ['low', 'medium', 'high'];
    
    const nycCenter = { lat: 40.7128, lng: -74.0060 };

    const nodeNames = [
      'Traffic Light - 5th Ave', 'Highway Sensor - I-95', 'RSU Gateway - Downtown',
      'Emergency Gateway', 'Traffic Light - Broadway', 'Sensor - FDR Drive',
      'Gateway - Midtown', 'RSU - Brooklyn Bridge', 'Traffic Light - Times Square',
      'Sensor - Lincoln Tunnel', 'Gateway - Central Park', 'RSU - Queens Borough'
    ];

    return Array.from({ length: 12 }, (_, i) => {
      const nodeType = nodeTypes[i % nodeTypes.length];
      const status = i < 10 ? 'active' : statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `n${i + 1}`,
        name: nodeNames[i],
        type: nodeType,
        status,
        position: this.generateRandomPosition(nycCenter.lat, nycCenter.lng, 0.15),
        securityLevel: securityLevels[Math.floor(Math.random() * securityLevels.length)],
        connectedVehicles: Array.from({ length: Math.floor(Math.random() * 6) + 1 }, 
          (_, j) => `v${Math.floor(Math.random() * 24) + 1}`),
        lastUpdate: new Date(Date.now() - Math.random() * 180000).toISOString()
      };
    });
  }

  async getCommunicationMessages(): Promise<CommunicationMessage[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const messageTypes: CommunicationMessage['messageType'][] = ['safety', 'traffic', 'emergency', 'info'];
    const communicationTypes: CommunicationMessage['type'][] = ['v2v', 'v2i', 'i2v'];
    
    const sampleMessages = [
      'Requesting traffic light status',
      'Emergency vehicle approaching - clear lane',
      'Speed limit change detected - 35 mph',
      'Traffic congestion ahead - alternate route suggested',
      'Weather alert: Heavy rain detected',
      'Parking space available at location',
      'Road construction ahead - reduce speed',
      'Vehicle breakdown assistance requested',
      'Collision avoidance warning',
      'Traffic light malfunction reported',
      'Emergency broadcast: Amber alert',
      'Fuel station information update',
      'Route optimization data',
      'Vehicle diagnostic information',
      'Security checkpoint ahead'
    ];

    return Array.from({ length: 15 }, (_, i) => ({
      id: this.generateId(),
      from: Math.random() > 0.5 ? `v${Math.floor(Math.random() * 24) + 1}` : `n${Math.floor(Math.random() * 12) + 1}`,
      to: Math.random() > 0.5 ? `v${Math.floor(Math.random() * 24) + 1}` : `n${Math.floor(Math.random() * 12) + 1}`,
      type: communicationTypes[Math.floor(Math.random() * communicationTypes.length)],
      messageType: messageTypes[Math.floor(Math.random() * messageTypes.length)],
      content: sampleMessages[i],
      encrypted: Math.random() > 0.2,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      securityHash: `sha256:${Math.random().toString(36).substr(2, 16)}...`
    }));
  }

  async getSecurityAlerts(): Promise<SecurityAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const alertTypes: SecurityAlert['type'][] = ['authentication', 'encryption', 'intrusion', 'malformed_message'];
    const levels: SecurityAlert['level'][] = ['low', 'medium', 'high', 'critical'];
    
    const alertMessages = [
      'Vehicle authentication token expires in 10 minutes',
      'Encryption key rotation completed successfully',
      'Suspicious communication pattern detected from unknown source',
      'Failed authentication attempt from vehicle v15',
      'Malformed message received from infrastructure node',
      'Intrusion detection system triggered',
      'Certificate validation failed',
      'Unusual traffic pattern detected',
      'Security protocol violation detected',
      'Unauthorized access attempt blocked'
    ];

    return Array.from({ length: 10 }, (_, i) => ({
      id: this.generateId(),
      level: levels[Math.floor(Math.random() * levels.length)],
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      message: alertMessages[i],
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
      resolved: Math.random() > 0.4
    }));
  }

  // New method for analytics data
  async getAnalyticsData() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        messages: Math.floor(Math.random() * 100) + 20,
        vehicles: Math.floor(Math.random() * 15) + 5
      })),
      messageTypeDistribution: [
        { name: 'Safety', value: 35, color: '#EF4444' },
        { name: 'Traffic', value: 28, color: '#3B82F6' },
        { name: 'Emergency', value: 15, color: '#F59E0B' },
        { name: 'Info', value: 22, color: '#10B981' }
      ],
      securityMetrics: [
        { name: 'Encrypted', value: 85 },
        { name: 'Authenticated', value: 92 },
        { name: 'Verified', value: 88 }
      ]
    };
  }
}

export const apiService = new ApiService();