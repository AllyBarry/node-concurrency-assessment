// server.js
const app = require('./index');
require('dotenv').config();
const port = process.env.PORT || 3000;

// DB connection
var MONGODB_URL = process.env.MONGO_DB_CONN;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})