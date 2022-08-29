const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { info } = require('console');
const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP, //This part right here is probably my big problem This is where the custom server stuff is https://youtu.be/30VeUWxZjS8?t=1980
    auth: {
      user: process.env.FROM,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: 'bwassink@wilco.org', //this will later need to send to the appropriate addresses from the department
    subject: `Work Request`,
    text: `A work order request has been submitted. Please read below for details. <br> Subject area: ${req.body.department}<br> Address: ${req.body.address}<br> Description of the Problem: ${req.body.description}<br> Contact Preference: ${req.body.contact}<br> Name: ${req.body.name}<br> Phone Number: ${req.body.phone}<br> Email: ${req.body.email}` 
  }
  
  transporter.sendMail(mailOptions, (error, info)=>{
      if(error){
        console.log(error);
        res.send('error');
      }else{
        console.log('Email sent: ' + info.response);
        res.send('success');
      }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})