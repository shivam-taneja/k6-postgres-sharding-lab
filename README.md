# Postgres Sharding Lab 🚀

This lab demonstrates the performance difference between a monolithic and a sharded PostgreSQL architecture using custom real-time visualization.

## Architecture

- **Monolith:** Single PostgreSQL node limited to 10% CPU.
- **Sharded:** 2-shard cluster (5% CPU each) distributing load based on User ID.
- **Visualization:** Custom HTML/JS dashboard polling InfluxDB for real-time metrics.

## Setup & Running

1. **Start Infrastructure:**

   ```bash
   docker compose up -d
   ```

2. **Start API Server:**

   ```bash
   pnpm install
   pnpm run dev
   ```

3. **Open Dashboard:**
   Open `index.html` in your browser. It will automatically start listening for test data.

4. **Run Load Tests:**
   Run these in separate terminals to see the comparison:
   - **Monolith:** `pnpm run test:monolith`
   - **Sharded:** `pnpm run test:sharded`

## Visualization Note

Once both tests are completed, a **Victory Modal** will appear showing the final performance gains (+Throughput, -Latency). Use this for your screen recordings/reels!

## Cleanup

```bash
docker compose down -v
```
