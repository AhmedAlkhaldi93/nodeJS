import express from 'express'
import data from './data.json' with {type: 'json'}

const app = express();
const port = 4000;

const router = express.Router();
app.use(router);

// router.get('/user', (req, res) => {
//     res.send('List of users');
// });

router.post('/user', (req, res) => {
    res.send('user created');
});

router.get('/all-users', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});