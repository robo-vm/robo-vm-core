CREATE TABLE IF NOT EXISTS robots (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    status VARCHAR(20),
    battery_level DECIMAL(5,2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    total_tasks INTEGER,
    completed_tasks INTEGER,
    reputation_score INTEGER,
    staked_amount DECIMAL(18,2),
    last_activity TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    description TEXT,
    task_type VARCHAR(50),
    reward DECIMAL(18,2),
    creator_address VARCHAR(66),
    assigned_robot VARCHAR(50),
    status VARCHAR(20),
    created_at TIMESTAMP,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP,
    result_cid VARCHAR(100),
    min_stake DECIMAL(18,2),
    min_reputation INTEGER
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    tx_hash VARCHAR(66),
    tx_type VARCHAR(50),
    from_address VARCHAR(66),
    to_address VARCHAR(66),
    robot_id VARCHAR(50),
    task_id INTEGER,
    amount DECIMAL(18,2),
    gas_used DECIMAL(18,0),
    gas_price DECIMAL(18,0),
    block_number INTEGER,
    timestamp TIMESTAMP,
    status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS robot_telemetry (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    robot_id VARCHAR(50),
    timestamp TIMESTAMP,
    battery_level DECIMAL(5,2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    speed DECIMAL(5,2),
    temperature DECIMAL(5,2),
    cpu_usage DECIMAL(5,2),
    memory_usage DECIMAL(5,2),
    network_latency DECIMAL(8,2)
);

CREATE TABLE IF NOT EXISTS task_metrics (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_id INTEGER,
    robot_id VARCHAR(50),
    execution_time DECIMAL(10,2),
    distance_traveled DECIMAL(10,2),
    energy_consumed DECIMAL(10,2),
    waypoints_count INTEGER,
    obstacles_encountered INTEGER,
    data_collected_mb DECIMAL(10,2),
    quality_score DECIMAL(5,2)
);

INSERT INTO robots (id, name, type, status, battery_level, latitude, longitude, total_tasks, completed_tasks, reputation_score, staked_amount, last_activity) VALUES
('robot_001', 'Alpha Rover', 'rover', 'active', 87.5, 40.7128, -74.0060, 142, 138, 1240, 5000.00, NOW() - INTERVAL 5 MINUTE),
('robot_002', 'Beta Drone', 'drone', 'active', 92.3, 40.7580, -73.9855, 98, 95, 980, 3200.00, NOW() - INTERVAL 2 MINUTE),
('robot_003', 'Gamma Explorer', 'rover', 'executing', 65.8, 40.7505, -73.9934, 156, 151, 1450, 7500.00, NOW() - INTERVAL 1 MINUTE),
('robot_004', 'Delta Scout', 'scout', 'idle', 45.2, 40.7282, -74.0776, 87, 84, 720, 2100.00, NOW() - INTERVAL 15 MINUTE),
('robot_005', 'Epsilon Carrier', 'delivery', 'active', 78.9, 40.6892, -74.0445, 203, 198, 1820, 9800.00, NOW() - INTERVAL 3 MINUTE),
('robot_006', 'Zeta Mapper', 'mapper', 'active', 88.1, 40.7614, -73.9776, 134, 130, 1150, 6400.00, NOW() - INTERVAL 4 MINUTE),
('robot_007', 'Eta Guardian', 'guardian', 'executing', 71.4, 40.7489, -73.9680, 112, 108, 1020, 4500.00, NOW() - INTERVAL 1 MINUTE),
('robot_008', 'Theta Harvester', 'harvester', 'active', 83.7, 40.6782, -73.9442, 165, 162, 1490, 8200.00, NOW() - INTERVAL 2 MINUTE),
('robot_009', 'Iota Surveyor', 'surveyor', 'idle', 52.6, 40.7282, -73.9942, 76, 73, 650, 1800.00, NOW() - INTERVAL 20 MINUTE),
('robot_010', 'Kappa Transporter', 'transporter', 'active', 91.2, 40.7589, -73.9851, 189, 185, 1680, 9200.00, NOW() - INTERVAL 3 MINUTE),
('robot_011', 'Lambda Observer', 'observer', 'active', 79.5, 40.7505, -73.9934, 145, 141, 1320, 6800.00, NOW() - INTERVAL 5 MINUTE),
('robot_012', 'Mu Collector', 'collector', 'executing', 68.3, 40.6892, -74.0445, 128, 124, 1180, 5600.00, NOW() - INTERVAL 2 MINUTE);

INSERT INTO tasks (id, description, task_type, reward, creator_address, assigned_robot, status, created_at, accepted_at, completed_at, result_cid, min_stake, min_reputation) VALUES
(1, 'Scan area A coordinates', 'scan', 100.50, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'robot_001', 'completed', NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, 'QmXxYyZz123', 0, 0),
(2, 'Map zone B perimeter', 'map', 150.75, '0x8ba1f109551bD432803012645Hac136c98', 'robot_006', 'completed', NOW() - INTERVAL 3 HOUR, NOW() - INTERVAL 3 HOUR, NOW() - INTERVAL 1 HOUR, 'QmAbCdEf456', 0, 0),
(3, 'Navigate to waypoint [40.758, -73.985]', 'navigate', 80.25, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'robot_003', 'executing', NOW() - INTERVAL 30 MINUTE, NOW() - INTERVAL 30 MINUTE, NULL, NULL, 0, 0),
(4, 'Explore sector C', 'explore', 200.00, '0x8ba1f109551bD432803012645Hac136c98', 'robot_007', 'executing', NOW() - INTERVAL 45 MINUTE, NOW() - INTERVAL 45 MINUTE, NULL, NULL, 0, 0),
(5, 'Collect samples from area D', 'collect', 120.50, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', NULL, 'pending', NOW() - INTERVAL 10 MINUTE, NULL, NULL, NULL, 0, 0),
(6, 'Deliver package to location E', 'delivery', 90.00, '0x8ba1f109551bD432803012645Hac136c98', 'robot_005', 'completed', NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 2 HOUR, 'QmGhIjKl789', 0, 0),
(7, 'Patrol route F', 'patrol', 110.75, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'robot_011', 'completed', NOW() - INTERVAL 5 HOUR, NOW() - INTERVAL 5 HOUR, NOW() - INTERVAL 3 HOUR, 'QmMnOpQr012', 0, 0),
(8, 'Survey building G', 'survey', 175.25, '0x8ba1f109551bD432803012645Hac136c98', NULL, 'pending', NOW() - INTERVAL 5 MINUTE, NULL, NULL, NULL, 0, 0);

INSERT INTO transactions (tx_hash, tx_type, from_address, to_address, robot_id, task_id, amount, gas_used, gas_price, block_number, timestamp, status) VALUES
('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 'TaskCreated', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', '0x0000000000000000000000000000000000000000', NULL, 1, 100.50, 45000, 20000000000, 18452341, NOW() - INTERVAL 2 HOUR, 'confirmed'),
('0x2345678901bcdef012345678901bcdef012345678901bcdef012345678901bcde', 'TaskAccepted', '0x1234567890123456789012345678901234567890', '0x0000000000000000000000000000000000000000', 'robot_001', 1, 0, 21000, 20000000000, 18452342, NOW() - INTERVAL 2 HOUR, 'confirmed'),
('0x3456789012cdef0123456789012cdef0123456789012cdef0123456789012cdef', 'TaskFinalized', '0x0000000000000000000000000000000000000000', '0x1234567890123456789012345678901234567890', 'robot_001', 1, 100.50, 65000, 20000000000, 18452350, NOW() - INTERVAL 1 HOUR, 'confirmed'),
('0x4567890123def01234567890123def01234567890123def01234567890123def0', 'TaskCreated', '0x8ba1f109551bD432803012645Hac136c98', '0x0000000000000000000000000000000000000000', NULL, 2, 150.75, 45000, 20000000000, 18452320, NOW() - INTERVAL 3 HOUR, 'confirmed'),
('0x5678901234ef012345678901234ef012345678901234ef012345678901234ef01', 'TaskAccepted', '0x2345678901234567890123456789012345678901', '0x0000000000000000000000000000000000000000', 'robot_006', 2, 0, 21000, 20000000000, 18452321, NOW() - INTERVAL 3 HOUR, 'confirmed'),
('0x6789012345f0123456789012345f0123456789012345f0123456789012345f012', 'TaskFinalized', '0x0000000000000000000000000000000000000000', '0x2345678901234567890123456789012345678901', 'robot_006', 2, 150.75, 65000, 20000000000, 18452380, NOW() - INTERVAL 1 HOUR, 'confirmed'),
('0x78901234560123456789012345601234567890123456012345678901234560123', 'StakeDeposited', '0x3456789012345678901234567890123456789012', '0x0000000000000000000000000000000000000000', 'robot_003', NULL, 5000.00, 85000, 20000000000, 18452390, NOW() - INTERVAL 6 HOUR, 'confirmed'),
('0x89012345671234567890123456712345678901234567123456789012345671234', 'TaskCreated', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', '0x0000000000000000000000000000000000000000', NULL, 3, 80.25, 45000, 20000000000, 18452400, NOW() - INTERVAL 30 MINUTE, 'confirmed'),
('0x90123456782345678901234567823456789012345678234567890123456782345', 'TaskAccepted', '0x4567890123456789012345678901234567890123', '0x0000000000000000000000000000000000000000', 'robot_003', 3, 0, 21000, 20000000000, 18452401, NOW() - INTERVAL 30 MINUTE, 'confirmed');

INSERT INTO robot_telemetry (robot_id, timestamp, battery_level, latitude, longitude, speed, temperature, cpu_usage, memory_usage, network_latency) VALUES
('robot_001', NOW() - INTERVAL 5 MINUTE, 87.5, 40.7128, -74.0060, 1.2, 35.5, 45.2, 62.8, 12.3),
('robot_002', NOW() - INTERVAL 2 MINUTE, 92.3, 40.7580, -73.9855, 5.8, 28.3, 38.7, 55.1, 8.9),
('robot_003', NOW() - INTERVAL 1 MINUTE, 65.8, 40.7505, -73.9934, 0.8, 42.1, 68.4, 78.2, 15.6),
('robot_001', NOW() - INTERVAL 10 MINUTE, 88.2, 40.7125, -74.0062, 1.1, 35.2, 44.8, 61.5, 11.8),
('robot_002', NOW() - INTERVAL 7 MINUTE, 92.8, 40.7582, -73.9853, 5.9, 28.1, 39.1, 56.2, 9.2),
('robot_004', NOW() - INTERVAL 15 MINUTE, 45.2, 40.7282, -74.0776, 0.0, 38.5, 12.3, 34.7, 22.1),
('robot_005', NOW() - INTERVAL 3 MINUTE, 78.9, 40.6892, -74.0445, 2.5, 31.2, 52.6, 68.9, 10.4),
('robot_006', NOW() - INTERVAL 4 MINUTE, 88.1, 40.7614, -73.9776, 1.5, 33.8, 48.3, 65.4, 11.2),
('robot_007', NOW() - INTERVAL 1 MINUTE, 71.4, 40.7489, -73.9680, 0.9, 40.2, 61.7, 72.3, 14.7),
('robot_008', NOW() - INTERVAL 2 MINUTE, 83.7, 40.6782, -73.9442, 1.8, 36.9, 55.4, 70.1, 13.5);

INSERT INTO task_metrics (task_id, robot_id, execution_time, distance_traveled, energy_consumed, waypoints_count, obstacles_encountered, data_collected_mb, quality_score) VALUES
(1, 'robot_001', 1250.50, 450.25, 12.8, 8, 2, 45.6, 92.5),
(2, 'robot_006', 1890.75, 680.50, 18.2, 12, 1, 78.3, 88.7),
(6, 'robot_005', 980.25, 320.75, 9.5, 5, 0, 23.4, 95.2),
(7, 'robot_011', 1450.00, 520.30, 14.3, 10, 3, 56.8, 90.1);

