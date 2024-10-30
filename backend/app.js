const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const stuffRoutes = require('./routes/stuff'); // Import des routes pour stuff
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://subham:Minou364@cluster0.y9qyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utiliser les routes pour 'stuff'
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
