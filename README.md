# K6 Postgres Sharding Lab

This project is a local simulation designed to demonstrate the performance differences between a monolithic database architecture and a distributed, sharded database architecture.

We use Docker to spin up PostgreSQL containers with severely restricted CPU limits (10% of a core). This artificial bottleneck allows us to simulate heavy database load and observe "hotspots" without crashing the host machine.

## Architecture

- **Database Layer:** Three PostgreSQL containers. One acts as the monolith, and the other two act as shards.
- **API Layer:** A simple Node.js (Express) server that routes traffic. It has two endpoints:
  - `/monolith`: Routes all traffic to the single monolithic database.
  - `/sharded`: Inspects a simulated User ID header and splits traffic evenly between Shard 1 and Shard 2.
- **Load Testing:** K6 scripts that generate concurrent virtual users to hammer the API endpoints.

## Prerequisites

- Docker and Docker Compose
- Node.js and pnpm

## How to Run the Lab

1. **Start the Infrastructure:**
   Run docker compose up -d from the root directory. This starts Postgres, InfluxDB, Grafana, and also installs k6 for testing.

2. **Start the API Server:**
   In your main terminal, run:

   ```bash
   pnpm install
   pnpm run dev
   ```

   _Note: Check the terminal for logs to confirm requests are hitting the server._

3. **Run the Load Tests:**
   Use the pre-configured npm scripts to ensure data is sent to InfluxDB:
   - **Monolith Test:** `pnpm run test:monolith`
   - **Sharded Test:** `pnpm run test:sharded`

4. **Visualize in Grafana:**
   - Open [http://localhost:3001](http://localhost:3001) (No login required).
   - Go to **Explore** (compass icon).
   - Select the **k6** datasource.
   - Select a measurement like `http_req_duration`.
   - **Pro Tip:** Import a pre-made dashboard! Go to **Dashboards > Import** and enter ID `2587`. This will give you a professional k6 visualization immediately.

## Cleanup

To stop the databases and completely wipe the persistent data volumes, run:
`docker compose down -v`
