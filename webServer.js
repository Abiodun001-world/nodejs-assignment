const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const HOST_NAME = "localhost";

// first task solution
// create server
const webServer = http.createServer((req, res) => {
  let url = req.url === "/" ? "/public/index.html" : `/public${req.url}`;

  fs.readFile(path.join(__dirname, url), "utf8", (err, data) => {
    if (err) {
      // Handle 404 error: File not found
      fs.readFile(
        path.join(__dirname, "public/404.html"),
        "utf8",
        (err404, notFoundData) => {
          if (err404) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          } else {
            // Send the custom 404.html
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(notFoundData);
          }
        }
      );
    } else {
      // If the file exists, send the content
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

// Start the server
webServer.listen(PORT, HOST_NAME, () => {
  console.log(`Web Server started successfully at http://${HOST_NAME}:${PORT}`);
});
