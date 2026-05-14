const pool = require("../db")

async function getAll(req, res) {
  try {
    const { category, search, minPrice, maxPrice } = req.query
    let query = "SELECT * FROM products WHERE 1=1"
    const params = []

    if (category) {
      params.push(category)
      query += ` AND category = $${params.length}`
    }
    if (search) {
      params.push(`%${search}%`)
      query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`
    }
    if (minPrice) {
      params.push(Number(minPrice))
      query += ` AND price >= $${params.length}`
    }
    if (maxPrice) {
      params.push(Number(maxPrice))
      query += ` AND price <= $${params.length}`
    }

    query += " ORDER BY created_at DESC"

    const { rows } = await pool.query(query, params)
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getById(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: "Produto não encontrado" })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function create(req, res) {
  try {
    const { name, description, price, stock, category, image_url, specs } = req.body
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, stock, category, image_url, specs)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, stock, category, image_url, specs]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
    const { name, description, price, stock, category, image_url, specs } = req.body
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, stock=$4,
       category=$5, image_url=$6, specs=$7 WHERE id=$8 RETURNING *`,
      [name, description, price, stock, category, image_url, specs, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: "Produto não encontrado" })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function remove(req, res) {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [req.params.id])
    res.json({ message: "Produto removido" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getAll, getById, create, update, remove }