SELECT 
    robot_id,
    DATE(timestamp) as date,
    HOUR(timestamp) as hour,
    AVG(battery_level) as avg_battery,
    AVG(cpu_usage) as avg_cpu,
    AVG(memory_usage) as avg_memory,
    AVG(network_latency) as avg_latency
FROM robot_telemetry
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY robot_id, DATE(timestamp), HOUR(timestamp)
ORDER BY date DESC, hour DESC;

