// my globals to keep all my functions together
const express = require("express");
const PORT = process.env.PORT || 3001;
const htmlRoutes = require("./routes/html");
const apiRoutes = require("./routes/api");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});