const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/products/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// // Serve HTML form
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
function uniqueId() {
  const id =
    new Date().toISOString().slice(0, 10).replace(/-/g, "").toString() +
    Math.floor(Math.random() * 1000);
  return parseInt(id);
}
// Handle form submission
app.post("/submit", upload.single("imageFile"), (req, res) => {
  // Process form data
  const formData = req.body;
  const image = req.file;
  console.log(formData);
  // Save data to JSON file
  const newItem = {
    productId: uniqueId(),
    sellerId: formData["sellerId"],
    name: formData["product-name"],
    quantity: formData["product-quantity"],
    price: formData["product-price"],
    image: image ? "../resources/img/products/" + image.filename : null,
  };
  ////////////////
  //jsonData.items.push(newItem);

  // Write the updated JSON data back to the file

  console.log(newItem);
  fs.readFile("../items.json", (err, data) => {
    if (err) throw err;

    let jsonData = JSON.parse(data);
    if (!jsonData.hasOwnProperty("items") || !Array.isArray(jsonData.items)) {
      console.error(
        "Invalid JSON structure: items property is missing or not an array"
      );
      return;
    }
    console.log(jsonData);
    jsonData.items.push(newItem);

    fs.writeFile("../items.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) throw err;
      console.log("Data saved to data.json");
    });
  });

  res.send("Item uploaded successfully");
});

////////////////////////////////edit the current balance/////////////////////////////////////////////
app.use(express.json());
app.put("/currentBalance", (req, res) => {
  const { username, password, balance } = req.body;

  console.log(username);

  fs.readFile("../users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal server error");
    }
    const appusers = JSON.parse(data);
    const user = appusers.users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the balance
    user.balance = parseInt(user.balance) - parseInt(balance);

    fs.writeFile("../users.json", JSON.stringify(appusers, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal server error");
      }
      console.log("Balance updated successfully.");
      return res.status(200).send("Balance updated successfully.");
    });
  });
});

/////////////////////////////////end edit current balance

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
