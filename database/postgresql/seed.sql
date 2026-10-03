-- ============================================
-- HeritageSphere Sample Data
-- ============================================

-- Regions
INSERT INTO regions (name, country)
VALUES
('Tamil Nadu', 'India'),
('Delhi', 'India'),
('Rajasthan', 'India');


-- Locations
INSERT INTO locations
(region_id, address, latitude, longitude, geom)
VALUES
(
    1,
    'Thanjavur, Tamil Nadu',
    10.7828,
    79.1318,
    ST_SetSRID(ST_MakePoint(79.1318, 10.7828), 4326)::geography
),
(
    1,
    'Mahabalipuram, Tamil Nadu',
    12.6169,
    80.1922,
    ST_SetSRID(ST_MakePoint(80.1922, 12.6169), 4326)::geography
),
(
    2,
    'New Delhi, Delhi',
    28.6562,
    77.2410,
    ST_SetSRID(ST_MakePoint(77.2410, 28.6562), 4326)::geography
),
(
    3,
    'Jaipur, Rajasthan',
    26.9855,
    75.8513,
    ST_SetSRID(ST_MakePoint(75.8513, 26.9855), 4326)::geography
);


-- Monuments
INSERT INTO monuments
(name, description, monument_type, historical_period, year_built, location_id)
VALUES
(
    'Brihadisvara Temple',
    'A historic temple known for its monumental architecture and cultural significance.',
    'Temple',
    'Chola Period',
    1010,
    1
),
(
    'Shore Temple',
    'A historic structural temple complex located at Mahabalipuram.',
    'Temple',
    'Pallava Period',
    725,
    2
),
(
    'Qutub Minar',
    'A historic monument and tower complex in Delhi.',
    'Tower',
    'Delhi Sultanate',
    1199,
    3
),
(
    'Hawa Mahal',
    'A historic palace structure in Jaipur known for its distinctive facade.',
    'Palace',
    'Rajput Period',
    1799,
    4
);


-- Historical Events
INSERT INTO historical_events
(monument_id, event_name, event_year, description)
VALUES
(
    1,
    'Temple Construction Completed',
    1010,
    'Major construction of the Brihadisvara Temple was completed.'
),
(
    2,
    'Shore Temple Construction',
    725,
    'Construction of the Shore Temple complex.'
),
(
    3,
    'Qutub Minar Construction',
    1199,
    'Construction of the Qutub Minar was initiated.'
),
(
    4,
    'Hawa Mahal Construction',
    1799,
    'Construction of the Hawa Mahal was completed.'
);


-- Restoration Records
INSERT INTO restoration_records
(monument_id, restoration_year, description, organization)
VALUES
(
    1,
    2022,
    'Conservation and structural maintenance activities.',
    'Archaeological Conservation Team'
),
(
    2,
    2021,
    'Stone conservation and structural preservation.',
    'Heritage Conservation Team'
),
(
    3,
    2020,
    'Routine conservation and structural maintenance.',
    'Heritage Preservation Team'
),
(
    4,
    2023,
    'Facade and structural conservation work.',
    'Heritage Conservation Team'
);