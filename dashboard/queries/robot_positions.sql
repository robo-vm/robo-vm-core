SELECT 
    id,
    name,
    latitude,
    longitude,
    status,
    battery_level
FROM robots
WHERE latitude IS NOT NULL 
    AND longitude IS NOT NULL;

