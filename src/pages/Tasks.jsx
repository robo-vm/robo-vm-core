import React, { useState } from 'react';
import './Tasks.css';

function Tasks() {
  const [tasks] = useState([
    { id: 42, description: 'Scan area A', reward: '100 RVM', status: 'completed', robot: 'robot_003' },
    { id: 43, description: 'Map coordinates [10,20]', reward: '150 RVM', status: 'pending', robot: null },
    { id: 44, description: 'Explore zone B', reward: '200 RVM', status: 'executing', robot: 'robot_007' },
    { id: 45, description: 'Navigate to waypoint', reward: '80 RVM', status: 'pending', robot: null }
  ]);

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <button className="create-task-btn">Create Task</button>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h2>Task #{task.id}</h2>
              <span className={`task-status ${task.status}`}>
                {task.status}
              </span>
            </div>
            <div className="task-description">
              {task.description}
            </div>
            <div className="task-footer">
              <span className="task-reward">Reward: {task.reward}</span>
              {task.robot && (
                <span className="task-robot">Assigned to: {task.robot}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;

