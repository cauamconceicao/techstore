const express = require("express")
const router = express.Router()
const ordersController = require("../controllers/orders")

router.get("/", ordersController.getAll)
router.post("/", ordersController.create)

module.exports = router