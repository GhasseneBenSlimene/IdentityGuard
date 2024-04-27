import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files from the `dist` directory
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  // Respond with the `index.html` file from the `dist` directory for any request
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = /*import.meta.env.VITE_SERVER_PORT ||*/ 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
