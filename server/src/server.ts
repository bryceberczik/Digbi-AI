import cors from "cors";
import express from "express";
import sequelize from "./config/connection";
import routes from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const forceDBRefresh = false;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client/dist"));

app.use(routes);

app.use(express.static("../client/dist"));

sequelize.sync({ force: forceDBRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
  });
});
