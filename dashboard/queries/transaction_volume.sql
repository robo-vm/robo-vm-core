SELECT 
    DATE(timestamp) as date,
    HOUR(timestamp) as hour,
    COUNT(*) as transaction_count
FROM transactions
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY DATE(timestamp), HOUR(timestamp)
ORDER BY date, hour;

