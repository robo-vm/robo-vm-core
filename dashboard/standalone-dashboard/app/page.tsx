'use client';

import { useState, useMemo } from 'react';
import {
  robots,
  tasks,
  transactions,
  getTaskCompletionTrend,
  getTransactionVolume,
  getBatteryTrend,
  getTaskTypeDistribution,
  getRobotStatusDistribution,
  getReputationScores,
  getEnergyConsumption,
  getMonthDates,
  getDailyTaskActivity,
  getHourlyActivity,
} from './data/sampleData';
import MetricCard from './components/MetricCard';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import AreaChart from './components/AreaChart';
import Table from './components/Table';
import Heatmap from './components/Heatmap';
import GaugeChart from './components/GaugeChart';
import ScatterChart from './components/ScatterChart';
import Timeline from './components/Timeline';
import WalletButton from './components/WalletButton';
import WalletInfo from './components/WalletInfo';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const monthDates = useMemo(() => getMonthDates(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });
  
  // Get daily activity data based on selected date
  const dailyTaskActivity = useMemo(() => getDailyTaskActivity(selectedDate), [selectedDate]);
  const hourlyActivity = useMemo(() => getHourlyActivity(selectedDate), [selectedDate]);
  
  const activeRobots = useMemo(() => robots.filter(r => r.status === 'active').length, []);
  const pendingTasks = useMemo(() => tasks.filter(t => t.status === 'pending').length, []);
  const completedTasks = useMemo(() => tasks.filter(t => t.status === 'completed').length, []);
  const totalRewards = useMemo(() => tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.reward, 0), []);
  const totalStaked = useMemo(() => robots.reduce((sum, r) => sum + r.stakedAmount, 0), []);
  const successRate = useMemo(() => {
    const total = robots.reduce((sum, r) => sum + r.totalTasks, 0);
    const completed = robots.reduce((sum, r) => sum + r.completedTasks, 0);
    return total > 0 ? ((completed / total) * 100).toFixed(1) : '0';
  }, []);
  const avgExecutionTime = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed' && t.completedAt);
    if (completed.length === 0) return '0';
    const avg = completed.reduce((sum, t) => {
      const start = new Date(t.createdAt).getTime();
      const end = new Date(t.completedAt!).getTime();
      return sum + (end - start) / 1000 / 60;
    }, 0) / completed.length;
    return avg.toFixed(1);
  }, []);

  const taskTrend = getTaskCompletionTrend();
  const transactionVolume = getTransactionVolume();
  const batteryTrend = getBatteryTrend();
  const taskTypeDist = getTaskTypeDistribution();
  const robotStatusDist = getRobotStatusDistribution();
  const reputationScores = getReputationScores();
  const energyConsumption = getEnergyConsumption();

  return (
    <div className="min-h-screen bg-robovm-bg text-robovm-text">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-robovm-accent mb-2">
              RoboVM Network Analytics
            </h1>
            <p className="text-robovm-text-secondary">
              Comprehensive monitoring and analysis dashboard
            </p>
            <p className="text-sm text-robovm-text-secondary mt-2">
              Token: <span className="text-robovm-accent font-semibold">RoboVM (RVM)</span> • Network: <span className="text-robovm-accent font-semibold">BSC (Binance Smart Chain)</span>
            </p>
          </div>
          <WalletButton />
        </div>

        <WalletInfo />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Active Robots"
            value={activeRobots}
            subtitle={`of ${robots.length} total`}
            trend="+2"
            icon="🤖"
          />
          <MetricCard
            title="Pending Tasks"
            value={pendingTasks}
            subtitle="awaiting assignment"
            trend="+1"
            icon="⏳"
          />
          <MetricCard
            title="Completed Tasks"
            value={completedTasks}
            subtitle={`${successRate}% success rate`}
            trend="+12"
            icon="✅"
          />
          <MetricCard
            title="Total Rewards"
            value={`${totalRewards.toFixed(0)} RVM`}
            subtitle="distributed"
            trend="+5.2%"
            icon="🪙"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Staked"
            value={`${(totalStaked / 1000).toFixed(1)}K RVM`}
            subtitle="in reputation system"
            trend="+8.5%"
            icon="🔒"
          />
          <MetricCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle="task completion"
            trend="+2.1%"
            icon="📊"
          />
          <MetricCard
            title="Avg Execution"
            value={`${avgExecutionTime} min`}
            subtitle="per task"
            trend="-5.3%"
            icon="⏱️"
          />
          <MetricCard
            title="Transactions"
            value={transactions.length}
            subtitle="last 24h"
            trend="+15"
            icon="⛓️"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Task Completion Trend
            </h2>
            <LineChart
              data={taskTrend}
              xKey="date"
              yKey="completed"
              color="#d2618f"
            />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Transaction Volume
            </h2>
            <Timeline
              dates={monthDates}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              autoPlay={true}
              speed={2000}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Task Activity (Ziua Selectată)
            </h2>
            <LineChart
              data={dailyTaskActivity}
              xKey="hour"
              yKey="tasks"
              color="#4a90e2"
            />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Activitate pe Ore (Ziua Selectată)
            </h2>
            <BarChart
              data={hourlyActivity}
              xKey="hour"
              yKey="transactions"
              color="#50c878"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Robot Status
            </h2>
            <PieChart data={robotStatusDist} />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Task Types
            </h2>
            <PieChart data={taskTypeDist} />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              System Health
            </h2>
            <GaugeChart value={parseFloat(successRate)} max={100} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Reputation Scores
            </h2>
            <BarChart
              data={reputationScores}
              xKey="name"
              yKey="score"
              color="#d2618f"
              horizontal
            />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Battery Levels
            </h2>
            <BarChart
              data={robots.map(r => ({ name: r.name, value: r.battery }))}
              xKey="name"
              yKey="value"
              color="#50c878"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Battery Trend (24h)
            </h2>
            <LineChart
              data={batteryTrend[0]?.data || []}
              xKey="hour"
              yKey="battery"
              color="#50c878"
              multiLine={batteryTrend.slice(0, 3)}
            />
          </div>

          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Energy Consumption
            </h2>
            <BarChart
              data={energyConsumption}
              xKey="type"
              yKey="energy"
              color="#f5a623"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Robot Performance
            </h2>
            <Table
              data={robots.map(r => ({
                id: r.id,
                name: r.name,
                status: r.status,
                battery: `${r.battery}%`,
                tasks: r.completedTasks,
                reputation: r.reputationScore,
                staked: `${(r.stakedAmount / 1000).toFixed(1)}K RVM`,
              }))}
              columns={['name', 'status', 'battery', 'tasks', 'reputation', 'staked']}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-robovm-border rounded-lg p-6 border border-robovm-border/50">
            <h2 className="text-xl font-semibold mb-4 text-robovm-accent">
              Recent Transactions
            </h2>
            <Table
              data={transactions.map(tx => ({
                hash: tx.txHash,
                type: tx.txType,
                robot: tx.robotId,
                task: tx.taskId,
                amount: tx.amount > 0 ? `${tx.amount} RVM` : '-',
                time: new Date(tx.timestamp).toLocaleTimeString(),
                status: tx.status,
              }))}
              columns={['hash', 'type', 'robot', 'task', 'amount', 'time', 'status']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

