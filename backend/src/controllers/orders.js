const pool = require("../db")

async function getAll(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function create(req, res) {
  try {
    const { items, total } = req.body
    const { rows } = await pool.query(
      "INSERT INTO orders (user_id, items, total, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
      [req.userId, JSON.stringify(items), total]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getAll, create }