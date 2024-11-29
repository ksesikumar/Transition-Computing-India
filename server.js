const express = require("express");
const axios = require("axios");
const cors = require("cors");
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.static("build"));

const apiUrl = "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";

// Define checklist rules
const rules = [
  {
    name: "Valuation Fee Paid",
    check: (data) => data.isValuationFeePaid === true,
  },
  {
    name: "UK Resident",
    check: (data) => data.isUkResident === true,
  },
  {
    name: "Risk Rating Medium",
    check: (data) => data.riskRating === "Medium",
  },
  {
    name: "LTV Below 60%",
    check: (data) => {
      const ltv = (data.loanRequired / data.purchasePrice) * 100;
      return ltv < 60;
    },
  },
];

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
