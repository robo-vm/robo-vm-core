import React from 'react';
import './Robots.css';

function Robots() {
  const robots = [
    { id: 'robot_001', status: 'active', battery: 85, position: [10.5, 20.3], tasks: 12 },
    { id: 'robot_002', status: 'active', battery: 92, position: [15.2, 18.7], tasks: 8 },
    { id: 'robot_003', status: 'idle', battery: 45, position: [5.1, 12.4], tasks: 15 },
    { id: 'robot_004', status: 'executing', battery: 78, position: [22.3, 30.1], tasks: 5 }
  ];

  return (
    <div className="robots">
      <h1>Robots</h1>
      <div className="robots-grid">
        {robots.map(robot => (
          <div key={robot.id} className="robot-card">
            <div className="robot-header">
              <h2>{robot.id}</h2>
              <span className={`robot-status ${robot.status}`}>
                {robot.status}
              </span>
            </div>
            <div className="robot-info">
              <div className="info-item">
                <span className="info-label">Battery:</span>
                <span className="info-value">{robot.battery}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Position:</span>
                <span className="info-value">[{robot.position[0]}, {robot.position[1]}]</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tasks Completed:</span>
                <span className="info-value">{robot.tasks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Robots;

