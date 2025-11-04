SELECT 
    t.task_type,
    COUNT(*) as total_tasks,
    SUM(t.reward) as total_rewards,
    AVG(tm.execution_time) as avg_execution_time,
    AVG(tm.energy_consumed) as avg_energy_consumed,
    AVG(tm.quality_score) as avg_quality_score
FROM tasks t
LEFT JOIN task_metrics tm ON t.id = tm.task_id
GROUP BY t.task_type;

