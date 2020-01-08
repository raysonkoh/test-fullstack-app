const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('./config/passportConfig');
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const db = keys.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    UseCreateNewIndex: true,
  })
  .then(() => console.log('Connected to mongoDB!'))
  .catch(err => console.log(err));

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}!`));
