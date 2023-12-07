import express, { Application, Request, Response, NextFunction } from 'express';
import fileSystemRoutes from './routes/fileSystemRoutes';
import fs from 'fs';

const cors = require('cors');

const port = process.env.PORT || 3001;
const frontEndPoint: string = "http://localhost:5173";

let app: Application = express();

declare global {
  var sessionID: string;
}

global.sessionID = ""; //set session id to be empty

app = config(app);
app.use(fileSystemRoutes); // use routes from routes/fileSystemRoutes


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//middleware config
function config(app: Application): Application {
  app.use(cors({
    origin: frontEndPoint,
  }));

  app.use(express.json());

  return app;
}


