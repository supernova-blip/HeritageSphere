from flask import Flask, jsonify, send_from_directory
import psycopg2
from pymongo import MongoClient
from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__, static_folder="frontend", static_url_path="/static")

# MongoDB connection
mongo_client = MongoClient("mongodb://127.0.0.1:27017/")
mongo_db = mongo_client["heritagesphere"]
artifacts_collection = mongo_db["artifacts"]

# Neo4j connection
neo4j_driver = GraphDatabase.driver(
     "bolt://127.0.0.1:7687",
    auth=("neo4j", "Divya@2007")
)

def get_db_connection():
    connection = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    return connection


@app.route("/")
def home():
    return send_from_directory("frontend" , "index.html")


@app.route("/api/monuments")
def get_monuments():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
    SELECT
        m.monument_id,
        m.name,
        m.monument_type,
        m.historical_period,
        m.year_built,
        l.address,
        l.latitude,
        l.longitude,
        e.event_name,
        e.event_year,
        e.description,
        r.restoration_year,
        r.description,
        r.organization
    FROM monuments m
    JOIN locations l
        ON m.location_id = l.location_id
    LEFT JOIN historical_events e
        ON m.monument_id = e.monument_id
    LEFT JOIN restoration_records r
    ON m.monument_id = r.monument_id
    ORDER BY m.monument_id;
""")

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    monuments = []

    for row in rows:
       monuments.append({
    "id": row[0],
    "name": row[1],
    "type": row[2],
    "period": row[3],
    "year": row[4],
    "location": row[5],
    "latitude": row[6],
    "longitude": row[7],
    "event": row[8],
    "event_year": row[9],
    "event_description": row[10],
    "restoration_year": row[11],
    "restoration_description": row[12],
    "organization": row[13]
})
    return jsonify(monuments)


@app.route("/api/artifacts")
def get_artifacts():

    artifacts = list(artifacts_collection.find({}, {"_id": 0}))

    return jsonify(artifacts)

@app.route("/api/analytics")
def get_analytics():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            r.region_name,
            SUM(f.heritage_count) AS total_heritage
        FROM fact_heritage f
        JOIN dim_region r
            ON f.region_id = r.region_id
        GROUP BY r.region_name
        ORDER BY r.region_name;
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    analytics = []

    for row in rows:
        analytics.append({
            "region": row[0],
            "total": row[1]
        })

    return jsonify(analytics)


@app.route("/api/relationships")
def get_relationships():

    query = """
    MATCH (n)-[r]->(m)
    RETURN
        labels(n)[0] AS source_type,
        n.name AS source,
        type(r) AS relationship,
        labels(m)[0] AS target_type,
        m.name AS target
    ORDER BY source
    """

    with neo4j_driver.session() as session:
        result = session.run(query)

        relationships = []

        for record in result:
            relationships.append({
                "source_type": record["source_type"],
                "source": record["source"],
                "relationship": record["relationship"],
                "target_type": record["target_type"],
                "target": record["target"]
            })

    return jsonify(relationships)

if __name__ == "__main__":
    app.run(debug=True)
