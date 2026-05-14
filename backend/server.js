const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", require("./src/routes/products"))
app.use("/api/auth", require("./src/routes/auth"))
app.use("/api/orders", require("./src/routes/orders"))

app.get("/", (req, res) => {
  res.json({ message: "TechStore API rodando!" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})