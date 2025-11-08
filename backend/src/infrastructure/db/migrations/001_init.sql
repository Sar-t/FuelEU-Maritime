-- migrations/001_init.sql
CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  route_id VARCHAR(32) UNIQUE NOT NULL,
  vessel_type VARCHAR(64) NOT NULL,
  fuel_type VARCHAR(64) NOT NULL,
  year INT NOT NULL,
  ghg_intensity NUMERIC(12,6) NOT NULL,
  fuel_consumption NUMERIC(12,6) NOT NULL,
  distance_km NUMERIC(12,6) NOT NULL,
  total_emissions NUMERIC(12,6) NOT NULL,
  is_baseline BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ship_compliance (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(64),
  year INT,
  cb_gco2eq NUMERIC(18,6),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bank_entries (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(64),
  year INT,
  amount_gco2eq NUMERIC(18,6),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pools (
  id SERIAL PRIMARY KEY,
  year INT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pool_members (
  id SERIAL PRIMARY KEY,
  pool_id INT REFERENCES pools(id) ON DELETE CASCADE,
  ship_id VARCHAR(64),
  cb_before NUMERIC(18,6),
  cb_after NUMERIC(18,6)
);
