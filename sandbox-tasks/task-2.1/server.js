import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const port = Number(process.env.port) || 3000;

app.use(express.json());
app.use('/user', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
