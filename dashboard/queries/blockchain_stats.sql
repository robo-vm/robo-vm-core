SELECT 
    tx_type,
    COUNT(*) as transaction_count,
    SUM(amount) as total_amount,
    AVG(gas_used * gas_price / 1000000000000000000) as avg_gas_cost,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count
FROM transactions
GROUP BY tx_type;

