# Secure Cloud-Vehicle Communication Platform

A comprehensive platform for managing V2V (Vehicle-to-Vehicle) and V2I (Vehicle-to-Infrastructure) communications with advanced security monitoring and real-time analytics.

## Features

### 🚗 Vehicle Management
- **24 Vehicles** across different types (cars, trucks, buses, emergency vehicles)
- Real-time status monitoring (online, offline, maintenance)
- Speed tracking and location monitoring
- Security level assessment (low, medium, high)
- Connection status with infrastructure nodes

### 🏗️ Infrastructure Network
- **12 Infrastructure Nodes** including traffic lights, sensors, gateways, and RSUs
- Real-time status monitoring and health checks
- Geographic positioning and coverage mapping
- Connected vehicle tracking
- Security level monitoring

### 📡 Communication System
- **V2V Communication**: Direct vehicle-to-vehicle messaging
- **V2I Communication**: Vehicle-to-infrastructure interaction
- **I2V Communication**: Infrastructure-to-vehicle broadcasts
- Message encryption and security hash verification
- Real-time communication logs with filtering

### 🛡️ Security Monitoring
- Real-time security alerts and threat detection
- Authentication and encryption monitoring
- Intrusion detection system
- Security metrics dashboard
- Alert resolution tracking

### 📊 Analytics & Visualization
- **Interactive Maps**: Real-time network topology with connection visualization
- **Traffic Analytics**: 24-hour communication patterns
- **Message Distribution**: Pie charts showing message type breakdown
- **Security Metrics**: Bar charts for security performance
- **Real-time Charts**: Live data updates with Recharts

### 🔐 Authentication System
- Multi-role authentication (Admin, Operator, Driver, Supervisor, Technician)
- Secure login/logout functionality
- Session management with local storage
- Remember me functionality
- Role-based access control

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | password123 |
| Admin | supervisor | password123 |
| Operator | operator | password123 |
| Operator | technician | password123 |
| Driver | driver | password123 |

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd secure-vehicle-communication-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Local Deployment

```bash
npm run build:local
```

This creates a local build in the `local-build` directory that can be served by any static file server.

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Login.tsx        # Authentication
│   ├── VehicleGrid.tsx  # Vehicle management
│   ├── InfrastructureGrid.tsx # Infrastructure monitoring
│   ├── CommunicationLog.tsx   # Message logs
│   ├── SecurityPanel.tsx      # Security monitoring
│   ├── MapView.tsx            # Interactive map
│   └── AnalyticsCharts.tsx    # Data visualization
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── services/            # API services
│   └── api.ts          # Mock API service
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── App.tsx             # Main application component
```

## Features Overview

### Dashboard Tabs
1. **Overview**: Analytics charts and key metrics
2. **Network Map**: Interactive map with real-time connections
3. **Vehicles**: Vehicle fleet management grid
4. **Infrastructure**: Infrastructure node monitoring
5. **Communication**: Real-time message logs
6. **Security**: Security alerts and monitoring

### Data Export
- Export all platform data as JSON
- Includes vehicles, infrastructure, messages, alerts, and analytics
- Timestamped exports for data tracking

### Real-time Updates
- Simulated real-time message updates every 5 seconds
- Live connection visualization on maps
- Dynamic status updates across all components

## Security Features

- **End-to-end Encryption**: All messages are encrypted by default
- **Authentication Tokens**: Secure JWT-like token system
- **Security Hash Verification**: SHA-256 hashing for message integrity
- **Intrusion Detection**: Real-time threat monitoring
- **Role-based Access**: Different permission levels for different user roles

## Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Optimized state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.