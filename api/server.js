const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const poolMonolith = new Pool({
  connectionString: "postgres://postgres:password@localhost:5430/postgres",
});
const poolShard1 = new Pool({
  connectionString: "postgres://postgres:password@localhost:5431/postgres",
});
const poolShard2 = new Pool({
  connectionString: "postgres://postgres:password@localhost:5432/postgres",
});

const SIMULATED_QUERY = "SELECT pg_sleep(0.05);";

app.get("/monolith", async (req, res) => {
  console.log("GET /monolith - querying monolith database");
  try {
    await poolMonolith.query(SIMULATED_QUERY);
    res.status(200).send("Monolith Success");
  } catch (err) {
    console.error("Monolith Error:", err);
    res.status(500).send("Database Overloaded");
  }
});

app.get("/sharded", async (req, res) => {
  const userId = parseInt(req.headers["x-user-id"] || "1", 10);
  console.log(
    `GET /sharded - User ID: ${userId} - querying shard ${userId % 2 === 0 ? 1 : 2}`,
  );

  try {
    if (userId % 2 === 0) {
      await poolShard1.query(SIMULATED_QUERY);
    } else {
      await poolShard2.query(SIMULATED_QUERY);
    }
    res.status(200).send("Sharded Success");
  } catch (err) {
    console.error("Sharded Error:", err);
    res.status(500).send("Database Overloaded");
  }
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
