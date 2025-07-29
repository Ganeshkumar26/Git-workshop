import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Shield, Lock, Zap, Eye } from 'lucide-react';
import { SecurityAlert } from '../types';

interface SecurityPanelProps {
  alerts: SecurityAlert[];
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ alerts }) => {
  const getAlertIcon = (level: SecurityAlert['level']) => {
    switch (level) {
      case 'critical': return XCircle;
      case 'high': return AlertTriangle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
    }
  };

  const getAlertColor = (level: SecurityAlert['level']) => {
    switch (level) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-red-400 bg-red-400/20 border-red-400/50';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
      case 'low': return 'text-green-400 bg-green-400/20 border-green-400/50';
    }
  };

  const getTypeIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'authentication': return Shield;
      case 'encryption': return Lock;
      case 'intrusion': return Eye;
      case 'malformed_message': return Zap;
    }
  };

  const getTypeLabel = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'authentication': return 'Authentication';
      case 'encryption': return 'Encryption';
      case 'intrusion': return 'Intrusion Detection';
      case 'malformed_message': return 'Message Validation';
    }
  };

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  const criticalCount = alerts.filter(a => a.level === 'critical' && !a.resolved).length;
  const highCount = alerts.filter(a => a.level === 'high' && !a.resolved).length;
  const mediumCount = alerts.filter(a => a.level === 'medium' && !a.resolved).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Security Monitoring</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-red-400">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Critical: {criticalCount}
          </div>
          <div className="flex items-center text-yellow-400">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            High: {highCount}
          </div>
          <div className="flex items-center text-blue-400">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Medium: {mediumCount}
          </div>
        </div>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">System Status</p>
              <p className="text-lg font-semibold text-green-400">Secure</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Encryption</p>
              <p className="text-lg font-semibold text-green-400">Active</p>
            </div>
            <Lock className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Intrusion Detection</p>
              <p className="text-lg font-semibold text-blue-400">Monitoring</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Alerts</p>
              <p className="text-lg font-semibold text-yellow-400">{unresolvedAlerts.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {unresolvedAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Security Alerts</h3>
          <div className="space-y-3">
            {unresolvedAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.level);
              const TypeIcon = getTypeIcon(alert.type);
              
              return (
                <div key={alert.id} className={`rounded-lg p-4 border ${getAlertColor(alert.level)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <AlertIcon className="w-5 h-5 mr-3" />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <TypeIcon className="w-4 h-4" />
                          <span className="font-medium text-white">{getTypeLabel(alert.type)}</span>
                          <span className={`px-2 py-1 rounded text-xs uppercase font-semibold ${
                            alert.level === 'critical' ? 'bg-red-600 text-white' :
                            alert.level === 'high' ? 'bg-red-500 text-white' :
                            alert.level === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-green-500 text-white'
                          }`}>
                            {alert.level}
                          </span>
                        </div>
                        <p className="text-sm text-slate-200">{alert.message}</p>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recently Resolved</h3>
          <div className="space-y-2">
            {resolvedAlerts.map((alert) => {
              const TypeIcon = getTypeIcon(alert.type);
              
              return (
                <div key={alert.id} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <TypeIcon className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-300">{alert.message}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No security alerts</p>
          <p className="text-sm mt-2">All systems are secure</p>
        </div>
      )}
    </div>
  );
};

export default SecurityPanel;