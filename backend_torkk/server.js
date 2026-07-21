require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const { PORT } = require("./src/config/env");
// Server updated 2026-07-21

async function bootstrap() {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`🚀 Torkkk API v2.0 running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Server failed to start:", err.message);
  process.exit(1);
});
