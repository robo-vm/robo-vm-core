import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaRobot, FaClipboardList, FaCheckCircle, FaCoins } from 'react-icons/fa';
import './Dashboard.css';

const COLORS = ['#d2618f', '#667eea', '#764ba2', '#a855f7', '#8b5cf6', '#7c3aed'];

function generateTimeSeriesData(days = 30) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tasks: Math.floor(Math.random() * 50) + 20,
      transactions: Math.floor(Math.random() * 100) + 50,
      rewards: Math.floor(Math.random() * 1000) + 500,
      robots: Math.floor(Math.random() * 5) + 10
    });
  }
  return data;
}

function generateRobotDistribution() {
  return [
    { name: 'Active', value: 12, color: '#d2618f' },
    { name: 'Idle', value: 5, color: '#667eea' },
    { name: 'Maintenance', value: 2, color: '#764ba2' },
    { name: 'Offline', value: 1, color: '#a855f7' }
  ];
}

function generateTaskStatus() {
  return [
    { name: 'Completed', value: 142, color: '#d2618f' },
    { name: 'In Progress', value: 8, color: '#667eea' },
    { name: 'Pending', value: 5, color: '#764ba2' },
    { name: 'Failed', value: 3, color: '#a855f7' }
  ];
}

function generateHourlyData() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({
      hour: `${i}:00`,
      activity: Math.floor(Math.random() * 100),
      efficiency: Math.floor(Math.random() * 30) + 70
    });
  }
  return hours;
}

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: ['INFO', 'WARN', 'SUCCESS', 'ERROR'][Math.floor(Math.random() * 4)],
        message: [
          'Task #' + Math.floor(Math.random() * 100) + ' completed successfully',
          'Robot robot_' + String(Math.floor(Math.random() * 20)).padStart(3, '0') + ' connected',
          'Blockchain transaction confirmed: 0x' + Math.random().toString(16).substr(2, 8),
          'New task created: "Scan area ' + ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] + '"',
          'IPFS node synchronized',
          'Reputation score updated for robot_' + String(Math.floor(Math.random() * 20)).padStart(3, '0'),
          'Smart contract event detected',
          'Network latency: ' + (Math.random() * 50 + 10).toFixed(2) + 'ms'
        ][Math.floor(Math.random() * 8)]
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(timer);
  }, []);

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return {
        activeRobots: 12,
        pendingTasks: 5,
        completedTasks: 142,
        totalTransactions: 384,
        totalRewards: '1,247.50',
        networkLatency: '23.4ms',
        blockchainHeight: 3456789,
        ipfsNodes: 8,
        avgTaskTime: '2.3m',
        successRate: '94.2%'
      };
    }
  });

  const timeSeriesData = generateTimeSeriesData();
  const robotDistribution = generateRobotDistribution();
  const taskStatus = generateTaskStatus();
  const hourlyData = generateHourlyData();

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>System Health</h3>
            <div className="health-item">
              <span className="health-label">Blockchain</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '98%' }}></div>
              </div>
              <span className="health-value">98%</span>
            </div>
            <div className="health-item">
              <span className="health-label">IPFS</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '95%' }}></div>
              </div>
              <span className="health-value">95%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Network</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '99%' }}></div>
              </div>
              <span className="health-value">99%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Storage</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: '72%' }}></div>
              </div>
              <span className="health-value">72%</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Controls</h3>
            <button className="control-btn">Sync Blockchain</button>
            <button className="control-btn">Refresh Data</button>
            <button className="control-btn">Export Logs</button>
            <button className="control-btn">Network Settings</button>
          </div>

          <div className="sidebar-section">
            <h3>Token Info</h3>
            <div className="token-info">
              <div className="token-item">
                <span>RVM Price</span>
                <span className="token-value">$0.0234</span>
              </div>
              <div className="token-item">
                <span>Market Cap</span>
                <span className="token-value">$23.4M</span>
              </div>
              <div className="token-item">
                <span>24h Volume</span>
                <span className="token-value">$145.2K</span>
              </div>
              <div className="token-item">
                <span>Supply</span>
                <span className="token-value">1.0B RVM</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Recent Events</h3>
            <div className="event-list">
              <div className="event-item">
                <span className="event-time">2m ago</span>
                <span className="event-text">Task #42 completed</span>
              </div>
              <div className="event-item">
                <span className="event-time">5m ago</span>
                <span className="event-text">Robot connected</span>
              </div>
              <div className="event-item">
                <span className="event-time">8m ago</span>
                <span className="event-text">Transaction confirmed</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="dashboard-main">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <div className="time-display">{currentTime.toLocaleString()}</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaRobot />
              </div>
              <div className="stat-content">
                <h3>Active Robots</h3>
                <p className="stat-value">{stats?.activeRobots || 0}</p>
                <p className="stat-change">+2 from last hour</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaClipboardList />
              </div>
              <div className="stat-content">
                <h3>Pending Tasks</h3>
                <p className="stat-value">{stats?.pendingTasks || 0}</p>
                <p className="stat-change">-3 from last hour</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>
              <div className="stat-content">
                <h3>Completed Tasks</h3>
                <p className="stat-value">{stats?.completedTasks || 0}</p>
                <p className="stat-change">+8 today</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaCoins />
              </div>
              <div className="stat-content">
                <h3>Total Rewards</h3>
                <p className="stat-value">{stats?.totalRewards || '0'} RVM</p>
                <p className="stat-change">+234.5 RVM today</p>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Task Activity (30 Days)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1e3e', border: '1px solid #d2618f' }} />
                  <Area type="monotone" dataKey="tasks" stroke="#d2618f" fill="#d2618f" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="transactions" stroke="#667eea" fill="#667eea" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Robot Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={robotDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {robotDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1e3e', border: '1px solid #d2618f' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Hourly Activity</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                  <XAxis dataKey="hour" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1e3e', border: '1px solid #d2618f' }} />
                  <Bar dataKey="activity" fill="#d2618f" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Task Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={taskStatus} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                  <XAxis type="number" stroke="#888" />
                  <YAxis dataKey="name" type="category" stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1e3e', border: '1px solid #d2618f' }} />
                  <Bar dataKey="value" fill="#d2618f">
                    {taskStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-section">
              <h2>Transaction Volume</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1e3e', border: '1px solid #d2618f' }} />
                  <Line type="monotone" dataKey="transactions" stroke="#d2618f" strokeWidth={2} />
                  <Line type="monotone" dataKey="rewards" stroke="#667eea" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <aside className="log-panel">
          <div className="log-header">
            <h3>System Log</h3>
            <button className="log-clear-btn" onClick={() => setLogs([])}>Clear</button>
          </div>
          <div className="log-content">
            {logs.map(log => (
              <div key={log.id} className={`log-entry log-${log.level.toLowerCase()}`}>
                <span className="log-timestamp">[{log.timestamp}]</span>
                <span className="log-level">[{log.level}]</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="log-empty">No logs yet...</div>
            )}
          </div>
        </aside>
      </div>

      <div className="stats-bar">
        <div className="stats-bar-item">
          <span className="stats-bar-label">Network Latency</span>
          <span className="stats-bar-value">{stats?.networkLatency || '0ms'}</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">IPFS Nodes</span>
          <span className="stats-bar-value">{stats?.ipfsNodes || 0}</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Avg Task Time</span>
          <span className="stats-bar-value">{stats?.avgTaskTime || '0m'}</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Success Rate</span>
          <span className="stats-bar-value">{stats?.successRate || '0%'}</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Total Transactions</span>
          <span className="stats-bar-value">{stats?.totalTransactions || 0}</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Total Rewards</span>
          <span className="stats-bar-value">{stats?.totalRewards || '0'} RVM</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Uptime</span>
          <span className="stats-bar-value">99.8%</span>
        </div>
        <div className="stats-bar-item">
          <span className="stats-bar-label">Active Sessions</span>
          <span className="stats-bar-value">247</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
