const pool = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function register(req, res) {
  try {
    const { name, email, password } = req.body
    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [email])
    if (exists.rows[0]) return res.status(400).json({ error: "Email já cadastrado" })

    const hash = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
      [name, email, hash]
    )
    const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ user: rows[0], token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if (!rows[0]) return res.status(400).json({ error: "Email ou senha inválidos" })

    const valid = await bcrypt.compare(password, rows[0].password)
    if (!valid) return res.status(400).json({ error: "Email ou senha inválidos" })

    const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ user: { id: rows[0].id, name: rows[0].name, email: rows[0].email, role: rows[0].role }, token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { register, login }