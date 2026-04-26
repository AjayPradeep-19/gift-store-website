const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get cart
router.get("/", auth, async (req, res) => {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) cart = { items: [] };

    res.json(cart);
});

// Add to cart
router.post("/", auth, async (req, res) => {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
        cart = new Cart({ userId: req.user.id, items: [] });
    }

    cart.items.push(req.body);
    await cart.save();

    res.json(cart);
});

module.exports = router;
