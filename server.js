const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Hardcoded username and password for authentication
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Secret key for JWT
const secretKey = 'your-secret-key';

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
    req.user = user;
    next();
  });
};

// Endpoint for generating auth token
app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
  }

  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Endpoint to fetch detailed country information
app.get('/country/:name', authenticate, async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v3/name/${name}`);
    const countryData = response.data[0];
    res.json(countryData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to retrieve a list of countries based on filters and sorting
app.get('/countries', authenticate, async (req, res) => {
   const { population, area, language, sort, page, limit } = req.query;
 
   // Build the query to the REST Countries API based on filters and sorting
   let apiUrl = 'https://restcountries.com/v3/all?fields=name,population,area,languages';
 
   try {
     // Make the request to the REST Countries API
     const response = await axios.get(apiUrl);
 
     // Parse and format the response as needed
     let countries = response.data;
 
     // Apply filters
     if (population) {
       countries = countries.filter(country => country.population <= parseInt(population));
     }
 
     if (area) {
       countries = countries.filter(country => country.area <= parseInt(area));
     }
 
     if (language) {
      countries = countries.filter(country =>
        Object.values(country.languages).some(lang => lang.toLowerCase() === language.toLowerCase())
      );
    }
 
     // Sort the countries
     if (sort && (sort === 'asc' || sort === 'desc')) {
       countries.sort((a, b) => {
         if (sort === 'asc') {
           return a.name.official.localeCompare(b.name.official);
         } else {
           return b.name.official.localeCompare(a.name.official);
         }
       });
     }
 
     // Implement pagination
     const currentPage = parseInt(page) || 1;
     const itemsPerPage = parseInt(limit) || 10;
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
 
     countries = countries.slice(startIndex, endIndex);
 
     // Return the data as JSON response
     res.json({ countries });
   } catch (error) {
     res.status(500).json({ message: 'Internal server error' });
   }
 });
 
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
