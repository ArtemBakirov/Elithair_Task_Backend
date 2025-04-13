
<img src="https://elithairtransplant.com/german/wp-content/uploads/2024/03/elithair-logo-primary.svg" width="300" alt="Description"> 

# Task Assignment
## Virtual Meeting Slot Reservation System - Backend

## Overview
Express/TypeScript backend with MongoDB for meeting slot reservations.

## Technical Stack
- Node.js with Express
- TypeScript
- MongoDB (via Mongoose)
- Railway.app for deployment
- Docker for containerization

## Key Features
- REST API endpoints for slot management
- Supports two slot types with different booking rules
- Automatic slot initialization

## Architecture Decisions

### 1. Api Endpoints
- GET  /api/slots       - initialize and Get all slots
- POST /api/reserve     - Reserve a slot

### 2 Initialization
- Auto-creates time slots on first run
- Handles both time periods (morning/afternoon)
