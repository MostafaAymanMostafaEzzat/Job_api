require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB= require('./db/connect')
const authenticateUser = require('./middleware/authentication')
const app = express();
// security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//router
const jobrouter= require('./routes/jobs')
const authrouter= require('./routes/auth')

app.use(express.json());
//Midlleware Security
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);


// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth',authrouter)
app.use('/api/v1/jobs', authenticateUser ,jobrouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
