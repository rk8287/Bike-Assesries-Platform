const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected!"))
.catch((error) => console.log(error))



// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/users", require("./routes/user"));



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));