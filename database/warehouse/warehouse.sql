-- HeritageSphere Data Warehouse
-- Star Schema

CREATE TABLE dim_region (
    region_id SERIAL PRIMARY KEY,
    region_name VARCHAR(100),
    country VARCHAR(100)
);

CREATE TABLE dim_monument (
    monument_id SERIAL PRIMARY KEY,
    monument_name VARCHAR(200),
    monument_type VARCHAR(100),
    historical_period VARCHAR(100)
);

CREATE TABLE dim_time (
    time_id SERIAL PRIMARY KEY,
    year INTEGER,
    period VARCHAR(100)
);

CREATE TABLE fact_heritage (
    fact_id SERIAL PRIMARY KEY,
    monument_id INTEGER REFERENCES dim_monument(monument_id),
    region_id INTEGER REFERENCES dim_region(region_id),
    time_id INTEGER REFERENCES dim_time(time_id),
    heritage_count INTEGER
);