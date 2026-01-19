import http from "http";
import app from "./src/app.js";
const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server is Running on Port: ${port}"`);
});
