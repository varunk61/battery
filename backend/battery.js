app.post('/batteries', async (req, res) => {
    try {
      // Extract battery data from request body
      const { id, batteryName, category, imageLink, newPrice } = req.body;
  
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