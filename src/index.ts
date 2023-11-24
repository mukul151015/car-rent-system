import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  handle404,
  handleError,
  handleResponse,
} from './services/common/requestResponseHandler';
import db from './models/index';
import authRoutes from './module/authModule/routes';
import  carRoutes  from './module/carModule/routes';
import { config } from './config/config';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import  tripRoutes  from './module/tripModule/routes';
import  expenditureRoutes from './module/expenditureModule/routes';
// express app initialized
const app = express();
// import the sagger lib

//After creating any declare in postman collection and then go this link and paste postman json here copy and then paste in swagger yaml file
//Link :- https://metamug.com/util/postman-to-swagger/
const swaggerDocument = YAML.load('src/swagger/swagger.yaml');
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// enable cors request from browser
app.use(cors());

//body parser to retrieve data from form body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// expressSwagger(options)
const authRouter = express.Router();
const carRouter = express.Router();
const tripRouter = express.Router();
const expenditureRouter=express.Router();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/car',carRouter);
app.use('/api/v1/trip',tripRouter);
app.use('/api/v1/expenditure',expenditureRouter);

authRoutes.authRoutes(authRouter);
carRoutes.carRoutes(carRouter);
tripRoutes.tripRoutes(tripRouter);
expenditureRoutes.expenditureRoutes(expenditureRouter);

// Success Response
app.use(handleResponse);

//404 error handling
app.use(handle404);

// Generic Error Handling
app.use(handleError);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// App listening on port
export default app.listen(config.serverConfig.PORT, () => {
  console.log(`Server running on port ${config.serverConfig.PORT}`);
});

db.sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error: any) => {
    console.error('Database connection error', error);
  });
