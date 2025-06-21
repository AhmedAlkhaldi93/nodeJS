import express from 'express'
import documents from './documents.json' with { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/search", (req, res) => {
  const search = req.query.q;
  if(!search){
    return res.json(documents);
  }else{
    const searchDoc = documents.filter(doc =>
    Object.values(doc).some(value => typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())));

    res.json(searchDoc);
  }
});

app.get("/documents/:id", (req, res) => {
  const id = Number(req.params.id);

  const searchByID = documents.find(doc => doc.id === id);

  if(!searchByID){
    return res.status(404).json({ error: "This ID does not exist." });
  }else{
    res.json(searchByID);
  }
});

app.post("/search", (req, res) => {
  const search = req.query.q;
  const fields = req.body.fields;
  if(search && fields){
    return res.status(400).json({ error: "Cannot provide both query parameter 'q' and body 'fields' at the same time." });
  }
  
  if(search){
    const searchDoc = documents.filter(doc =>
    Object.values(doc).some(value => typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())));
    return res.json(searchDoc);
  }

  if(fields){    
    const result = documents.filter(doc =>
    Object.entries(fields).every(([key, value]) => doc[key] === value));
    return res.json(result);
  }
  res.json(documents);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});