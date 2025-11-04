SELECT 
    DATE(completed_at) as date,
    COUNT(*) as completed_tasks
FROM tasks
WHERE completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    AND status = 'completed'
GROUP BY DATE(completed_at)
ORDER BY date;

