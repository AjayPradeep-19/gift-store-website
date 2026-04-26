// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // routes
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/products", require("./routes/productRoutes"));
// app.use("/cart", require("./routes/cartRoutes"));
// app.use("/orders", require("./routes/orderRoutes"));

// // test route
// app.get("/", (req, res) => {
//     res.send("Backend is running...");
// });

// // start server
// app.listen(process.env.PORT, () => {
//     console.log("Server running on port", process.env.PORT);
// });





require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.use(express.static(__dirname));

app.get("/intro", (req,res)=>{
res.sendFile(path.join(__dirname,"intro.html"));
});

app.listen(process.env.PORT || 5000, ()=>{
console.log("Server running on port 5000");
});





