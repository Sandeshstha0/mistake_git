const express = require("express");
const studentsRoutes = require("./src/students/routes");
const router = require("./src/students/routes");
const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/api/v1/students", studentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
