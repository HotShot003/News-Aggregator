const express = require("express") ;
const app = express() ;

require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

// middleware to parse the objects from the req body
app.use(express.json()) ;

// try adding cookie parser


require("./config/connectDB").connectDB() ;

// route import and mount
const news = require("./routes/news") ;
app.use("/api/v1", news) ;

// activate
app.listen(PORT, () => {
    console.log(`App is currently listening at ${PORT}`) ;
})