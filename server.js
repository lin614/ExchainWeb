const express = require('express')
const path = require('path')
const app = express()

// app.use(express.static(path.join(__dirname, 'dist')))
console.log(__dirname)
app.use(express.static('./'));
app.listen(8080, () => {
  console.log(`App listening at http://127.0.0.1:8080/index_prod.html`)
})
