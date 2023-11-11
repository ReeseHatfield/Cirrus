import express, { Application} from 'express'
import { FileSystem } from './FileSystem';

import * as path from 'path';



const cors = require('cors');

const port = process.env.PORT || 3001

const frontEndPoint: string = "http://localhost:5173"

const fs: FileSystem = new FileSystem();

//let app: Application = express();
const app = config(express());

app.get('/ls', (req, res) => {
    res.json({ main: fs.getFilesInWorkingDir()});
  });

app.get('/getWorkingDir', (req, res) => {
  res.json({main: fs.getWorkingDir()})
})


app.post('/cd', (req, res) => {
  const data = req.body;

  console.log(data.name);

  fs.changeDirectory({name: data.name, isDirectory: true})

  res.json({ status: 'success', message: 'Data received', data: data });
})

app.listen(port, () =>{
  console.log(`Server running on port ${port}`)
})



function config(app: Application): Application{ 
  app.use(cors({
    origin: frontEndPoint
  }));
  app.use(express.json());

  return app;
}