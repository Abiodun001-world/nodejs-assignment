const http = require("http");
const fs = require("fs");
const path = require("path");
const itemsDbPath = path.join(__dirname, "files", "items.json");

const PORT = 3001;
const HOST_NAME = "localhost";

// second task solution

function requestHandler(req, res) {
  if (req.url === "/items" && req.method === "GET") {
    // LOAD AND RETURN ITEMS
    getAllItems(req, res);
  } else if (req.url === "/items" && req.method === "POST") {
    addItem(req, res);
  } else if (req.url.startsWith("/items/") && req.method === "GET") {
    getItemById(req, res);
  } else if (req.url === "/items" && req.method === "PUT") {
    updateItem(req, res);
  } else if (req.url === "/items" && req.method === "DELETE") {
    deleteItem(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Resource not found" }));
  }
}

// get all items
function getAllItems(req, res) {
  fs.readFile(itemsDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
}

// Create a new item
function addItem(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const newItem = JSON.parse(body);
      newItem.id = Math.random().toString(36).slice(2, 9);

      // Validate item structure
      if (!newItem.name || !newItem.price || !["s", "m", "l"].includes(newItem.size)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid item structure" }));
        return;
      }

      fs.readFile(itemsDbPath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile(itemsDbPath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return;
          }

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Item created successfully", item: newItem }));
        });
      });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "An error occurred" }));
    }
  });
}

// Update an item
function updateItem(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const updatedDetails = JSON.parse(body);
      const id = updatedDetails.id;

      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Item ID is required for updating" }));
        return;
      }

      if (updatedDetails.size && !["s", "m", "l"].includes(updatedDetails.size)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid size value" }));
        return;
      }

      fs.readFile(itemsDbPath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const items = JSON.parse(data);
        const itemIndex = items.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Item not found" }));
          return;
        }

        const updatedItem = { ...items[itemIndex], ...updatedDetails, id };
        items[itemIndex] = updatedItem;

        fs.writeFile(itemsDbPath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Item updated successfully", item: updatedItem }));
        });
      });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "An error occurred" }));
    }
  });
}

// Delete an item
function deleteItem(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const { id } = JSON.parse(body);

      if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Item ID is required for deletion" }));
        return;
      }

      fs.readFile(itemsDbPath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }

        const items = JSON.parse(data);
        const itemIndex = items.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Item not found" }));
          return;
        }

        const deletedItem = items.splice(itemIndex, 1)[0];

        fs.writeFile(itemsDbPath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Item deleted successfully", item: deletedItem }));
        });
       });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "An error occurred" }));
    }
  });
}


const apiServer = http.createServer(requestHandler);

apiServer.listen(PORT, HOST_NAME, () => {
  console.log(`API Server is running on http://${HOST_NAME}:${PORT}`);
});
