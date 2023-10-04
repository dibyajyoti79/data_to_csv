const express = require("express");
const bodyParser = require("body-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
// app.use(express.static("public"));

// Define your route for exporting data to CSV
app.post("/export-csv", (req, res) => {
  const data = req.body; // Assuming data is sent as JSON in the request body
  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: "Invalid or empty data provided." });
  }
  const csvWriter = createCsvWriter({
    path: "exported-data.csv",
    header: Object.keys(data[0]), // Use the keys from the first object as headers
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      res.download("exported-data.csv"); // Download the generated CSV file
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
