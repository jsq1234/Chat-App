const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000 || process.env.PORT;

// set path for public folder to server static files

app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,() => console.log(`Running on port ${PORT}`))
