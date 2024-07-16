// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/b-charge', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});



const batterySchema = new mongoose.Schema({
    id: String,
    batteryName: String,
    category: String,
    imageLink: String,
    newPrice: String
});
// Define user model
const User = mongoose.model('users', userSchema);
 
// Signup endpoint
app.post('/signup', async (req, res) => {
    console.log("pani chestuna");
    try {
        // Extract signup data from request body
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const newUser = new User({ username, email, password: hashedPassword });

        // Save user document to MongoDB
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const Battery = mongoose.model('batteries',batterySchema)
app.post('/batteries', async (req, res) => {
    try {
        console.log("I am working");
        
      // Extract battery data from request body
      const { id, batteryName, category, imageLink, newPrice } = req.body;
      console.log(req.body)
      // Create new battery document
      const newBattery = new Battery({ id, batteryName, category, imageLink, newPrice });
  
      // Save battery document to MongoDB
      await newBattery.save();
  
      res.status(201).json({ message: 'Battery added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/batteries', async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        return res.status(400).json({ error: 'Category parameter is required' });
      }
  
      const batteries = await Battery.find({ category });
      res.json(batteries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  // Assuming app is your Express application instance
app.get('/batteries/:id', async (req, res) => {
  try {
      const productId = req.params.id;
      // Fetch battery details from the database using the productId
      // Example:
      //const battery = await Battery.findById(productId);
      const battery = await Battery.findOne({ id: productId });
      if (!battery) {
          return res.status(404).json({ error: 'Battery not found' });
      }
      // Send the battery details in the response
      console.log('Received productId:', productId);

      res.json(battery);
  } catch (error) {
      console.error('Error fetching battery details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get("/data",async (req,res)=>{
  const data=await Battery.find({});
  res.send(data);

})
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
