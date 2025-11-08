-- ✅ SEED DATA FOR FUEL EU MARITIME DATABASE

-- 🌍 Routes
INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance_km, total_emissions, is_baseline)
VALUES
('R001', 'Container', 'HFO', 2024, 91.000, 5000, 12000, 4500, TRUE),
('R002', 'BulkCarrier', 'LNG', 2024, 88.000, 4800, 11500, 4200, FALSE),
('R003', 'Tanker', 'MGO', 2024, 93.500, 5100, 12500, 4700, FALSE),
('R004', 'RoRo', 'HFO', 2025, 89.200, 4900, 11800, 4300, FALSE),
('R005', 'Container', 'LNG', 2025, 90.500, 4950, 11900, 4400, FALSE);

-- 🚢 Ship Compliance (CB data)
INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
VALUES
('S001', 2024, 52000.250000),
('S002', 2024, -18000.750000),
('S003', 2024, 35000.000000),
('S004', 2025, -26000.000000),
('S005', 2025, 42000.500000);

-- 💰 Bank Entries
INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
VALUES
('S001', 2024, 15000.000000),
('S003', 2024, 5000.000000),
('S005', 2025, 7000.000000),
('S001', 2025, 3000.000000);

-- 🫱 Pooling (shared balance adjustments)
INSERT INTO pools (year)
VALUES
(2024),
(2025);

-- Pool Members
INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after)
VALUES
(1, 'S001', 52000.250000, 48000.000000),
(1, 'S002', -18000.750000, -16000.000000),
(1, 'S003', 35000.000000, 34000.000000),
(2, 'S004', -26000.000000, -24000.000000),
(2, 'S005', 42000.500000, 40000.000000);
