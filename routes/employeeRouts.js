// routes/employeeRoutes.js
router.get('/clients', async (req, res) => {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } }
          ]
        }
      : {};
  
    const clients = await Client.find(query);
    res.json(clients);
  });
  

  router.post('/submit-collection', async (req, res) => {
    const { clientId, employeeId, status, amountCollected, notes } = req.body;
  
    const collection = new Collection({
      clientId,
      employeeId,
      status,
      amountCollected,
      notes
    });
  
    await collection.save();
    res.status(201).json({ message: "Collection submitted successfully", collection });
  });
  

