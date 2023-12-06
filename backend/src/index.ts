import express, { Application, Request, Response, NextFunction } from 'express';
import fileSystemRoutes from './routes/fileSystemRoutes';
import fs from 'fs';

const cors = require('cors');

const port = process.env.PORT || 3001;
const frontEndPoint: string = "http://localhost:5173";

let app: Application = express();


app = config(app);
app.use(authenticateHeaders); // check valid headers
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

function authenticateHeaders(req: Request, res: Response, next: NextFunction) {
  const username = req.headers['username'];
  const password = req.headers['password'];

  console.log(`Username: ${username}, Password: ${password}`);

  const dbPath = "../backend/src/security/database.json";
  const database = fs.readFileSync(dbPath, "utf-8");

  const users = JSON.parse(database);

  const userInfo = users.filter((user: any) => {
    return Object.keys(user)[0] === '??'; //fix me
  });

  console.log(`Reese info: ${JSON.stringify(userInfo)}`);

  //use next middleware func
  next();
}


