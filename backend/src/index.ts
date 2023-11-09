import express from 'express'


import * as path from 'path';

const app = express();

const cors = require('cors');

const port = process.env.PORT || 3001


const frontEndPoint: string = "http://localhost:5173"


app.use(cors({
  origin: frontEndPoint
}));


app.get('/main', (req, res) => {
    res.json({ message: 'Response sent from /main' });
  });


app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})