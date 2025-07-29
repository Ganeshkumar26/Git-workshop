import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface AnalyticsData {
  hourlyTraffic: Array<{ hour: number; messages: number; vehicles: number }>;
  messageTypeDistribution: Array<{ name: string; value: number; color: string }>;
  securityMetrics: Array<{ name: string; value: number }>;
}

interface AnalyticsChartsProps {
  data: AnalyticsData;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Hourly Traffic Chart */}
      <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4">24-Hour Communication Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.hourlyTraffic}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#9CA3AF"
              tickFormatter={(value) => `${value}:00`}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#374151', 
                border: '1px solid #4B5563',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              labelFormatter={(value) => `Hour: ${value}:00`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="messages" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Messages"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="vehicles" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Active Vehicles"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Type Distribution */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <h3 className="text-lg font-semibold text-white mb-4">Message Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.messageTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.messageTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: '1px solid #4B5563',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Security Metrics */}
        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <h3 className="text-lg font-semibold text-white mb-4">Security Metrics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.securityMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: '1px solid #4B5563',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value) => [`${value}%`, 'Percentage']}
              />
              <Bar 
                dataKey="value" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;