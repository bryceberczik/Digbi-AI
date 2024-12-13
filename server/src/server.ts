import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
