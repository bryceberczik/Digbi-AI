import express from "express";
import sequelize from "./config/connection";
import routes from "./routes/index";
import path from "node:path";
import dotenv from "dotenv";
import cors from "cors";

import "./config/webSocket";

dotenv.config();

const app = express();
const forceDBRefresh = false;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(express.static(path.join(process.cwd(), "../client/dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
});

sequelize.sync({ force: forceDBRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
  });
});
