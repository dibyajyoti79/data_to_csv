const express = require("express");
const { Parser } = require("@json2csv/plainjs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/export-csv", (req, res) => {
  try {
    // const data = [
    //   {
    //     id: 1,
    //     name: "John Doe",
    //     email: "john@example.com",
    //     age: 30,
    //   },
    //   {
    //     id: 2,
    //     name: "Jane Smith",
    //     email: "jane@example.com",
    //     age: 25,
    //   },
    //   {
    //     id: 3,
    //     name: "Bob Johnson",
    //     email: "bob@example.com",
    //     age: 40,
    //   },
    // ];
    const data = req.body;
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "Invalid or empty data provided." });
    }
    const csvFields = Object.keys(data[0]);

    const parser = new Parser({ csvFields });
    const csv = parser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; exportedData.csv");
    res.status(200).end(csv);
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
