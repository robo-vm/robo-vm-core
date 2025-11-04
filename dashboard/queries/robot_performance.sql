SELECT 
    r.name,
    r.type,
    r.status,
    r.total_tasks,
    r.completed_tasks,
    ROUND((r.completed_tasks * 100.0 / r.total_tasks), 2) as success_rate,
    r.reputation_score,
    r.staked_amount,
    r.battery_level
FROM robots r
ORDER BY r.reputation_score DESC;

