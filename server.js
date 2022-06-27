const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 5000
// setup static and middleware
app.use(express.static('./pub'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/pub/examples.html"));
})

app.get('/documentation', (req, res)=>{
  res.sendFile(path.join(__dirname, '/pub/documentation.html'));
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 