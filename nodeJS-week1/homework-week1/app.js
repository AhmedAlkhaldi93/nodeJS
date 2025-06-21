import express from 'express'
import documents from './documents.json' with { type: "json" };
import knex from 'knex'

const knexInstance = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "114519",
    database: process.env.DB_NAME || "hyf_node_week3_warmup",
    multipleStatements: true,
  },
});

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

const apiRouter = express.Router();
app.use("/api", apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use("/contacts", contactsAPIRouter);

contactsAPIRouter.get("/", async (req, res) => {            //http://localhost:3000/api/contacts
  let query = knexInstance.select("*").from("contacts");
  const columnInfo = await knexInstance("contacts").columnInfo();

  const columnNames = Object.keys(columnInfo);
  const allowedDirections = ["asc", "desc"];


  if ("sort" in req.query) {
    const orderBy = req.query.sort.toLowerCase().split(" ");
    const column = orderBy[0];
    const direction = orderBy[1] || "asc";

    if(columnNames.includes(column) && allowedDirections.includes(direction)){
      const sortQuery = column + " " + direction;
      query = query.orderByRaw(sortQuery);
    }else{
      return res.status(400).json({ error: "Invalid sort parameters" });
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});


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