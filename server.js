const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
  console.log(req.body);
  const transporter = nodemailer.createTransport
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})