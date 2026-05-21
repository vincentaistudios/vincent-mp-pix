require("dotenv").config();
const express = require("express");
const pixRoutes = require("./routes/pix");

const app = express();
app.use(express.json());

app.use("/api/pix", pixRoutes);

app.get("/health", (req, res) => res.json({ status: "ok", service: "Vincent MP Pix Gateway" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Vincent MP Pix Gateway rodando na porta ${PORT}`));
