import "dotenv/config";
import app from "./src/app";
import dbConnection from "./src/common/config/db";

const PORT = process.env.PORT || 3000;

const start = async () => {
  //Connect to database
  await dbConnection();
  app.listen(PORT, () => {
    console.log(
      `Server is up and running at port: ${PORT} in ${process.env.NODE_DEV} mode`,
    );
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
