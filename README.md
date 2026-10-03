# HeritageSphere

## Heritage Data Integration and Intelligence Platform

HeritageSphere is a digital heritage intelligence platform designed to
integrate and organize heritage information from multiple data models.

The system supports heritage documentation, preservation, retrieval,
relationship exploration and analytical processing.

## Features

- Heritage monument management
- Heritage artifact management
- PostgreSQL-based structured heritage data
- PostGIS spatial data and map visualization
- MongoDB-based semi-structured artifact data
- Neo4j graph-based heritage relationships
- XML and XML Schema validation
- XPath and XQuery processing
- Data warehouse using a star schema
- OLAP operations including roll-up, drill-down, slice and dice
- Flask REST APIs
- Search functionality
- Interactive heritage map
- Web-based analytics and relationship visualization

## System Architecture

```text
                    HeritageSphere
                          |
                     Flask Backend
                          |
       +------------------+------------------+
       |                  |                  |
   PostgreSQL          MongoDB             Neo4j
   + PostGIS           Artifacts        Relationships
       |
   Data Warehouse
    Star Schema

       XML + XSD
       XPath
       XQuery

                          |
                    Web Interface
                 HTML + CSS + JavaScript