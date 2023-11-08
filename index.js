require('dotenv').config()
const express = require('express');
const RegistrationRoutes = require('./src/routes/registration.routes')
const LoginRoutes = require('./src/routes/login.routes')
const LogoutRoutes = require('./src/routes/logout.routes')
const UsersRoutes = require('./src/routes/users.routes')
const zapisiRouter = require('./src/routes/zapisi.routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./src/middleware/error.midleware')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'https://localhost:3000' || 'https://depapp.ru'
}))
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });
app.use('/api',RegistrationRoutes, LoginRoutes, LogoutRoutes, UsersRoutes, zapisiRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});
