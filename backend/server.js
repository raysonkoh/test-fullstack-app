const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
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
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}!`));
