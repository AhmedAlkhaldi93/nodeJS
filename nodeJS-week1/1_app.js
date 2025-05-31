import express from 'express'

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello class!')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});