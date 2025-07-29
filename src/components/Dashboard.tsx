import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Car, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Signal,
  Lock,
  Users,
  MessageSquare,
  LogOut,
  Map,
  BarChart3,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Vehicle, InfrastructureNode, CommunicationMessage, SecurityAlert } from '../types';
import VehicleGrid from './VehicleGrid';
import InfrastructureGrid from './InfrastructureGrid';
import CommunicationLog from './CommunicationLog';
import SecurityPanel from './SecurityPanel';
import MapView from './MapView';
import AnalyticsCharts from './AnalyticsCharts';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [infrastructureNodes, setInfrastructureNodes] = useState<InfrastructureNode[]>([]);
  const [messages, setMessages] = useState<CommunicationMessage[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehiclesData, nodesData, messagesData, alertsData, analytics] = await Promise.all([
          apiService.getVehicles(),
          apiService.getInfrastructureNodes(),
          apiService.getCommunicationMessages(),
          apiService.getSecurityAlerts(),
          apiService.getAnalyticsData()
        ]);

        setVehicles(vehiclesData);
        setInfrastructureNodes(nodesData);
        setMessages(messagesData);
        setAlerts(alertsData);
        setAnalyticsData(analytics);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Simulate real-time updates
    const interval = setInterval(async () => {
      const newMessages = await apiService.getCommunicationMessages();
      setMessages(prev => [...newMessages, ...prev.slice(0, 20)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onlineVehicles = vehicles.filter(v => v.status === 'online').length;
  const activeNodes = infrastructureNodes.filter(n => n.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.level === 'high' || a.level === 'critical').length;

  const handleDownload = () => {
    const data = {
      vehicles,
      infrastructureNodes,
      messages,
      alerts,
      analyticsData,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vehicle-communication-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-200">Loading secure communication platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-xl font-bold text-white">SecureComm Platform</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-300">
                Welcome, <span className="text-blue-400 font-medium">{user?.username}</span>
                <span className="ml-2 px-2 py-1 bg-blue-600 text-xs rounded capitalize">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-slate-400">Online Vehicles</p>
                <p className="text-2xl font-bold text-white">{onlineVehicles}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <Wifi className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-slate-400">Active Nodes</p>
                <p className="text-2xl font-bold text-white">{activeNodes}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-slate-400">Messages Today</p>
                <p className="text-2xl font-bold text-white">{messages.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <AlertTriangle className={`w-8 h-8 ${criticalAlerts > 0 ? 'text-red-500' : 'text-green-500'}`} />
              <div className="ml-4">
                <p className="text-sm text-slate-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-white">{criticalAlerts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 mb-6">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'map', label: 'Network Map', icon: Map },
                { id: 'vehicles', label: 'Vehicles', icon: Car },
                { id: 'infrastructure', label: 'Infrastructure', icon: Wifi },
                { id: 'communication', label: 'Communication', icon: MessageSquare },
                { id: 'security', label: 'Security', icon: Shield }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center py-4 px-2 border-b-2 transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && analyticsData && <AnalyticsCharts data={analyticsData} />}
            {activeTab === 'map' && <MapView vehicles={vehicles} nodes={infrastructureNodes} />}
            {activeTab === 'vehicles' && <VehicleGrid vehicles={vehicles} />}
            {activeTab === 'infrastructure' && <InfrastructureGrid nodes={infrastructureNodes} />}
            {activeTab === 'communication' && <CommunicationLog messages={messages} />}
            {activeTab === 'security' && <SecurityPanel alerts={alerts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;