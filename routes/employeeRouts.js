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
  

//   SyntaxError: Unexpected end of JSON input
//   at JSON.parse (<anonymous>)
//   at createStrictSyntaxError (D:\Bussiness Projects\collectofin-backend\node_modules\body-parser\lib\types\json.js:156:10)
//   at parse (D:\Bussiness Projects\collectofin-backend\node_modules\body-parser\lib\types\json.js:71:15)
//   at D:\Bussiness Projects\collectofin-backend\node_modules\body-parser\lib\read.js:123:18   
//   at AsyncResource.runInAsyncScope (node:async_hooks:211:14)
//   at invokeCallback (D:\Bussiness Projects\collectofin-backend\node_modules\raw-body\index.js:238:16)
//   at done (D:\Bussiness Projects\collectofin-backend\node_modules\raw-body\index.js:227:7)   
//   at IncomingMessage.onEnd (D:\Bussiness Projects\collectofin-backend\node_modules\raw-body\index.js:287:7)
//   at IncomingMessage.emit (node:events:518:28)
//   at endReadableNT (node:internal/streams/readable:1698:12)