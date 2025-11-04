export interface Robot {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'executing';
  battery: number;
  latitude: number;
  longitude: number;
  totalTasks: number;
  completedTasks: number;
  reputationScore: number;
  stakedAmount: number;
}

export interface Task {
  id: number;
  description: string;
  taskType: string;
  reward: number;
  status: 'completed' | 'pending' | 'executing';
  createdAt: string;
  completedAt?: string;
}

export interface Transaction {
  id: number;
  txHash: string;
  txType: string;
  robotId: string;
  taskId: number;
  amount: number;
  timestamp: string;
  status: string;
}

export const robots: Robot[] = [
  { id: 'robot_001', name: 'Alpha Rover', type: 'rover', status: 'active', battery: 87.5, latitude: 40.7128, longitude: -74.0060, totalTasks: 142, completedTasks: 138, reputationScore: 1240, stakedAmount: 5000 },
  { id: 'robot_002', name: 'Beta Drone', type: 'drone', status: 'active', battery: 92.3, latitude: 40.7580, longitude: -73.9855, totalTasks: 98, completedTasks: 95, reputationScore: 980, stakedAmount: 3200 },
  { id: 'robot_003', name: 'Gamma Explorer', type: 'rover', status: 'executing', battery: 65.8, latitude: 40.7505, longitude: -73.9934, totalTasks: 156, completedTasks: 151, reputationScore: 1450, stakedAmount: 7500 },
  { id: 'robot_004', name: 'Delta Scout', type: 'scout', status: 'idle', battery: 45.2, latitude: 40.7282, longitude: -74.0776, totalTasks: 87, completedTasks: 84, reputationScore: 720, stakedAmount: 2100 },
  { id: 'robot_005', name: 'Epsilon Carrier', type: 'delivery', status: 'active', battery: 78.9, latitude: 40.6892, longitude: -74.0445, totalTasks: 203, completedTasks: 198, reputationScore: 1820, stakedAmount: 9800 },
  { id: 'robot_006', name: 'Zeta Mapper', type: 'mapper', status: 'active', battery: 88.1, latitude: 40.7614, longitude: -73.9776, totalTasks: 134, completedTasks: 130, reputationScore: 1150, stakedAmount: 6400 },
  { id: 'robot_007', name: 'Eta Guardian', type: 'guardian', status: 'executing', battery: 71.4, latitude: 40.7489, longitude: -73.9680, totalTasks: 112, completedTasks: 108, reputationScore: 1020, stakedAmount: 4500 },
  { id: 'robot_008', name: 'Theta Harvester', type: 'harvester', status: 'active', battery: 83.7, latitude: 40.6782, longitude: -73.9442, totalTasks: 165, completedTasks: 162, reputationScore: 1490, stakedAmount: 8200 },
  { id: 'robot_009', name: 'Iota Surveyor', type: 'surveyor', status: 'idle', battery: 52.6, latitude: 40.7282, longitude: -73.9942, totalTasks: 76, completedTasks: 73, reputationScore: 650, stakedAmount: 1800 },
  { id: 'robot_010', name: 'Kappa Transporter', type: 'transporter', status: 'active', battery: 91.2, latitude: 40.7589, longitude: -73.9851, totalTasks: 189, completedTasks: 185, reputationScore: 1680, stakedAmount: 9200 },
  { id: 'robot_011', name: 'Lambda Observer', type: 'observer', status: 'active', battery: 79.5, latitude: 40.7505, longitude: -73.9934, totalTasks: 145, completedTasks: 141, reputationScore: 1320, stakedAmount: 6800 },
  { id: 'robot_012', name: 'Mu Collector', type: 'collector', status: 'executing', battery: 68.3, latitude: 40.6892, longitude: -74.0445, totalTasks: 128, completedTasks: 124, reputationScore: 1180, stakedAmount: 5600 },
];

export const tasks: Task[] = [
  { id: 1, description: 'Scan area A coordinates', taskType: 'scan', reward: 100.50, status: 'completed', createdAt: '2024-01-15T10:00:00Z', completedAt: '2024-01-15T11:00:00Z' },
  { id: 2, description: 'Map zone B perimeter', taskType: 'map', reward: 150.75, status: 'completed', createdAt: '2024-01-15T09:00:00Z', completedAt: '2024-01-15T10:00:00Z' },
  { id: 3, description: 'Navigate to waypoint [40.758, -73.985]', taskType: 'navigate', reward: 80.25, status: 'executing', createdAt: '2024-01-15T12:30:00Z' },
  { id: 4, description: 'Explore sector C', taskType: 'explore', reward: 200.00, status: 'executing', createdAt: '2024-01-15T12:15:00Z' },
  { id: 5, description: 'Collect samples from area D', taskType: 'collect', reward: 120.50, status: 'pending', createdAt: '2024-01-15T12:50:00Z' },
  { id: 6, description: 'Deliver package to location E', taskType: 'delivery', reward: 90.00, status: 'completed', createdAt: '2024-01-15T08:00:00Z', completedAt: '2024-01-15T10:00:00Z' },
  { id: 7, description: 'Patrol route F', taskType: 'patrol', reward: 110.75, status: 'completed', createdAt: '2024-01-15T07:00:00Z', completedAt: '2024-01-15T09:00:00Z' },
  { id: 8, description: 'Survey building G', taskType: 'survey', reward: 175.25, status: 'pending', createdAt: '2024-01-15T12:55:00Z' },
];

export const transactions: Transaction[] = [
  { id: 1, txHash: '0x1234...5678', txType: 'TaskCreated', robotId: 'robot_001', taskId: 1, amount: 100.50, timestamp: '2024-01-15T10:00:00Z', status: 'confirmed' },
  { id: 2, txHash: '0x2345...6789', txType: 'TaskAccepted', robotId: 'robot_001', taskId: 1, amount: 0, timestamp: '2024-01-15T10:05:00Z', status: 'confirmed' },
  { id: 3, txHash: '0x3456...7890', txType: 'TaskFinalized', robotId: 'robot_001', taskId: 1, amount: 100.50, timestamp: '2024-01-15T11:00:00Z', status: 'confirmed' },
  { id: 4, txHash: '0x4567...8901', txType: 'TaskCreated', robotId: 'robot_006', taskId: 2, amount: 150.75, timestamp: '2024-01-15T09:00:00Z', status: 'confirmed' },
  { id: 5, txHash: '0x5678...9012', txType: 'TaskAccepted', robotId: 'robot_006', taskId: 2, amount: 0, timestamp: '2024-01-15T09:05:00Z', status: 'confirmed' },
  { id: 6, txHash: '0x6789...0123', txType: 'TaskFinalized', robotId: 'robot_006', taskId: 2, amount: 150.75, timestamp: '2024-01-15T10:00:00Z', status: 'confirmed' },
  { id: 7, txHash: '0x7890...1234', txType: 'StakeDeposited', robotId: 'robot_003', taskId: 0, amount: 5000.00, timestamp: '2024-01-15T06:00:00Z', status: 'confirmed' },
  { id: 8, txHash: '0x8901...2345', txType: 'TaskCreated', robotId: 'robot_003', taskId: 3, amount: 80.25, timestamp: '2024-01-15T12:30:00Z', status: 'confirmed' },
];

export const getTaskCompletionTrend = () => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });
  
  return days.map(day => ({
    date: day,
    completed: Math.floor(Math.random() * 20) + 10,
  }));
};

export const getTransactionVolume = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    hour,
    count: Math.floor(Math.random() * 50) + 20,
    amount: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const getBatteryTrend = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return robots.slice(0, 5).map(robot => ({
    robotId: robot.id,
    robotName: robot.name,
    data: hours.map(hour => ({
      hour,
      battery: Math.max(20, robot.battery - Math.random() * 30),
    })),
  }));
};

export const getTaskTypeDistribution = () => {
  const types = ['scan', 'map', 'navigate', 'explore', 'collect', 'delivery', 'patrol', 'survey'];
  return types.map(type => ({
    name: type,
    value: tasks.filter(t => t.taskType === type).length,
  }));
};

export const getRobotStatusDistribution = () => {
  const statuses = ['active', 'idle', 'executing'];
  return statuses.map(status => ({
    name: status,
    value: robots.filter(r => r.status === status).length,
  }));
};

export const getReputationScores = () => {
  return robots
    .sort((a, b) => b.reputationScore - a.reputationScore)
    .map(robot => ({
      name: robot.name,
      score: robot.reputationScore,
    }));
};

export const getEnergyConsumption = () => {
  return tasks
    .filter(t => t.status === 'completed')
    .map(task => ({
      taskId: task.id,
      type: task.taskType,
      energy: Math.random() * 20 + 5,
    }));
};

