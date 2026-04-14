
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sivion EnterpriseTech Hub API is running",
  });
});

app.use("/api/auth", require("./routes/auth.router"));
app.use("/api/projects", require("./routes/project.router"));
app.use("/api/blogs", require("./routes/blog.router"));
app.use("/api/contact", require("./routes/contact.router"));
app.use("/api/quotes", require("./routes/quote.router"));
app.use("/api/careers", require("./routes/career.router"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});