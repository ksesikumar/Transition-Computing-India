require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rules = require("./config/rules");

const app = express();
app.use(cors());
app.use(express.json());

const apiUrl = process.env.API_URL || "http://example.com/api";

// API endpoint to process checklist
app.get("/api/checklist", async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Apply rules
    const results = rules.map((rule) => ({
      name: rule.name,
      status: rule.check(data) ? "Passed" : "Failed",
    }));

    res.json(results);
  } catch (error) {
    console.error("Error fetching or processing data:", error.message);
    res.status(500).json({ error: "Failed to fetch or process data" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
