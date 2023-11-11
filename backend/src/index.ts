import express, { Application } from 'express';
import fileSystemRoutes from './routes/fileSystemRoutes';
const cors = require('cors');

const port = process.env.PORT || 3001;
const frontEndPoint: string = "http://localhost:5173";

const app: Application = express();
config(app);

app.use(fileSystemRoutes); // Use your file system routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//middleware config
function config(app: Application): Application { 
  app.use(cors({
    origin: frontEndPoint
  }));

  app.use(express.json()); 

  return app;
}
