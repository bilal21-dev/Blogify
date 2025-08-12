const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://bilalAdmin:strongPassword123@cluster0.ys5jano.mongodb.net/Blogverse?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));

module.exports = mongoose;