import React from 'react';
import { ArrowRight, ArrowLeft, ArrowUpDown, Lock, Shield, Clock } from 'lucide-react';
import { CommunicationMessage } from '../types';

interface CommunicationLogProps {
  messages: CommunicationMessage[];
}

const CommunicationLog: React.FC<CommunicationLogProps> = ({ messages }) => {
  const getMessageTypeIcon = (type: CommunicationMessage['type']) => {
    switch (type) {
      case 'v2v': return ArrowUpDown;
      case 'v2i': return ArrowRight;
      case 'i2v': return ArrowLeft;
    }
  };

  const getMessageTypeColor = (type: CommunicationMessage['type']) => {
    switch (type) {
      case 'v2v': return 'text-purple-400 bg-purple-600/20';
      case 'v2i': return 'text-blue-400 bg-blue-600/20';
      case 'i2v': return 'text-green-400 bg-green-600/20';
    }
  };

  const getMessageTypeLabel = (messageType: CommunicationMessage['messageType']) => {
    switch (messageType) {
      case 'safety': return 'Safety Alert';
      case 'traffic': return 'Traffic Info';
      case 'emergency': return 'Emergency';
      case 'info': return 'Information';
    }
  };

  const getMessageTypeStyle = (messageType: CommunicationMessage['messageType']) => {
    switch (messageType) {
      case 'safety': return 'bg-yellow-600 text-white';
      case 'traffic': return 'bg-blue-600 text-white';
      case 'emergency': return 'bg-red-600 text-white';
      case 'info': return 'bg-gray-600 text-white';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Communication Log</h2>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
            V2V
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            V2I
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            I2V
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message) => {
          const MessageIcon = getMessageTypeIcon(message.type);
          
          return (
            <div key={message.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${getMessageTypeColor(message.type)}`}>
                    <MessageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium">{message.from}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-white font-medium">{message.to}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getMessageTypeStyle(message.messageType)}`}>
                        {getMessageTypeLabel(message.messageType)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{message.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {message.encrypted && (
                    <div className="flex items-center text-green-400" title="Encrypted">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex items-center text-blue-400" title="Secure Hash">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex items-center text-slate-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-xs">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-600">
                <div className="flex items-center space-x-4">
                  <span>Type: {message.type.toUpperCase()}</span>
                  <span>Encrypted: {message.encrypted ? 'Yes' : 'No'}</span>
                </div>
                <span className="font-mono">Hash: {message.securityHash}</span>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <MessageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No communication messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationLog;