const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Place order
router.post("/", auth, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.json({ message: "Cart empty" });

    const total = cart.items.reduce((sum, i) => sum + i.price, 0);

    const order = new Order({
        userId: req.user.id,
        items: cart.items,
        total
    });

    await order.save();

    // clear cart
    await Cart.deleteOne({ userId: req.user.id });

    res.json({ message: "Order placed", order });
});

module.exports = router;





// const express = require("express");
// const router = express.Router();

// const Order = require("../models/Order");
// const Cart = require("../models/Cart");
// const auth = require("../middleware/authMiddleware");

// router.post("/", auth, async (req,res)=>{

// try{

// const cart = await Cart.findOne({ userId:req.user.id });

// if(!cart || cart.items.length===0){
// return res.status(400).json({ message:"Cart empty" });
// }

// const total = cart.items.reduce((sum,i)=>sum+i.price,0);

// const order = new Order({
// userId:req.user.id,
// items:cart.items,
// total:total,
// paymentMethod:req.body.paymentMethod
// });

// await order.save();

// await Cart.deleteOne({ userId:req.user.id });

// res.json({ message:"Order Saved", order });

// }catch(err){
// res.status(500).json({ message:"Server error" });
// }

// });

// module.exports = router;

