SELECT 
    status,
    COUNT(*) as count
FROM robots
GROUP BY status;

