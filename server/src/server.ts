import cors from "cors";
import express from "express";
import sequelize from "./config/connection";

const app = express();
const forceDBRefresh = false;
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: forceDBRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
  });
});
