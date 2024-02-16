import express, { Application, Request, Response, NextFunction } from 'express';
import fileSystemRoutes from './routes/fileSystemRoutes';
import cron from 'node-cron';
import fs from 'fs';

const cors = require('cors');

const port = process.env.PORT || 3001;
const frontEndPoint: string = "http://localhost:5173";

let app: Application = express();

declare global {
  var sessionID: string;
}

const resetSessionID = () => {
  global.sessionID = "";
}

global.sessionID = ""; //set session id to be empty
cron.schedule('*/30 * * * *', resetSessionID);

app = config(app);
app.use("/api", fileSystemRoutes); // use routes from routes/fileSystemRoutes


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//middleware config
function config(app: Application): Application {
  app.use(cors({
    origin: frontEndPoint,
    
  }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.json());

  return app;
}



