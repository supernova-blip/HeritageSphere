CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);


CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(region_id),
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geom GEOGRAPHY(POINT, 4326)
);


CREATE TABLE monuments (
    monument_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    monument_type VARCHAR(100),
    historical_period VARCHAR(100),
    year_built INTEGER,
    location_id INTEGER REFERENCES locations(location_id)
);


CREATE TABLE historical_events (
    event_id SERIAL PRIMARY KEY,
    monument_id INTEGER REFERENCES monuments(monument_id),
    event_name VARCHAR(200) NOT NULL,
    event_year INTEGER,
    description TEXT
);


CREATE TABLE restoration_records (
    restoration_id SERIAL PRIMARY KEY,
    monument_id INTEGER REFERENCES monuments(monument_id),
    restoration_year INTEGER,
    description TEXT,
    organization VARCHAR(200)
);