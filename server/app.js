import express from 'express';
import 'dotenv/config';
// import cors from 'cors'


// Create Express app
const app = express();
// app.use(cors());

app.get('/', (req,res)=>{
    res.send('Server is Live')
})

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server is Running on Port: " + PORT));