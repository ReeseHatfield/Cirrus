import express, { Application, Request, Response, NextFunction } from 'express';
import fileSystemRoutes from './routes/fileSystemRoutes';
import cron from 'node-cron';
import cors from 'cors';

// Constants
const port = process.env.PORT || 3001;
const frontEndPoint: string = "http://localhost:5173";

// Create Express Instance
let app: Application = express();


// Create sesssion ID on auth and reset every 30 minutes
declare global { var sessionID: string; }
const resetSessionID = () => { global.sessionID = ""; }
global.sessionID = "";
cron.schedule('*/30 * * * *', resetSessionID);

// Configure and start Server
app = config(app);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



/**
 * `config`:
 * Configures the application to use all required middleware
 * - Cors (see issue #54)
 * - Express
 * - All /api routes from /routes/fileSystemRoutes
 * @param {Application} app ExpressJS Application Instance to configure
 * @returns Configured Application.
 */
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

  app.use("/api", fileSystemRoutes); 

  return app;
}



