import knex from 'knex'
import express from 'express'

const app = express();
const port = 4000;

const knexInstance = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '114519',
    database: 'hyf_node_week1'
  }
});


app.get('/info', async (req, res) => {
    const[rows] = await knexInstance.raw('SELECT VERSION()');
    res.json({
        mysqlVersion: rows[0]['VERSION()']
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});